import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { HorizontalDivider } from "@/components/HorizontalDivider";
import { HiChevronDoubleDown } from "react-icons/hi2";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function LatestRecipe({ recipe }) {
  const date = prismic.asDate(
    recipe.data.publishDate || recipe.first_publication_date
  );

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicNextLink document={recipe}>
          <PrismicText field={recipe.data.title} />
        </PrismicNextLink>
      </h1>
      <p className="font-serif italic tracking-tighter text-slate-500">
        {dateFormatter.format(date)}
      </p>
    </li>
  );
}

export async function generateMetadata({ params }) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const recipe = await client
    .getByUID("recipe", params.uid)
    .catch(() => notFound());

  return {
    title: `${prismic.asText(recipe.data.title)} | ${prismic.asText(
      settings.data.name
    )}`,
    description: recipe.data.meta_description,
    openGraph: {
      title: recipe.data.meta_title,
      images: [
        {
          url: recipe.data.meta_image.url,
        },
      ],
    },
  };
}

export const Page = withPageAuthRequired(async ({ params }) => {
  const client = createClient();

  const recipe = await client
    .getByUID("recipe", params.uid)
    .catch(() => notFound());
  const latestRecipes = await client.getAllByType("recipe", {
    limit: 3,
    orderings: [
      { field: "my.recipe.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  const date = prismic.asDate(
    recipe.data.publishDate || recipe.first_publication_date
  );

  const { tags } = recipe;

  return (
    <Layout navigation={navigation} settings={settings}>
      <Bounded>
        <Link
          href="/recipes"
          className="font-semibold tracking-tight text-slate-400"
        >
          &larr; Back to Recipes
        </Link>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
            <PrismicText field={recipe.data.title} />
          </h1>
          <div className="flex flex-row space-x-6">
            <p className="font-serif italic tracking-tighter text-slate-500">
              {dateFormatter.format(date)}
            </p>
            <p>|</p>
            <a href="#ingredients">
              <button className="font-serif italic tracking-tighter text-slate-500 flex flex-row align-middle my-auto space-x-2">
                Jump to recipe <HiChevronDoubleDown className="my-auto ml-1" />
              </button>
            </a>
          </div>

          <p className="italic text-sm mt-3 text-slate-500">
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => (
                <a
                  href={`/tags/${encodeURIComponent(tag)}`}
                  key={tag}
                >{`#${tag.toLowerCase()} `}</a>
              ))}
          </p>
        </Bounded>
        <SliceZone slices={recipe.data.slices} components={components} />
      </article>
      {latestRecipes.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest recipes
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestRecipes.map((recipe) => (
                  <LatestRecipe key={recipe.id} recipe={recipe} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
});

export async function generateStaticParams() {
  const client = createClient();

  const recipes = await client.getAllByType("recipe");

  return recipes.map((recipe) => {
    return { uid: recipe.uid };
  });
}

export default Page;
