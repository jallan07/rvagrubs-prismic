import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Recipe } from "@/components/Recipe";
import { Heading } from "@/components/Heading";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: prismic.asText(settings.data.name),
  };
}

export default async function Index() {
  const client = createClient();

  //   const features = await client.getByTag("featured", {
  //     orderings: [
  //       { field: "my.article.publishDate", direction: "desc" },
  //       { field: "document.first_publication_date", direction: "desc" },
  //     ],
  //   });

  const recipes = await client.getAllByType("recipe", {
    orderings: [
      { field: "my.recipe.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  console.log("🚀 ~ Index ~ recipes:", recipes);

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
      withProfile={false}
    >
      <Bounded size="widest">
        <ul className="grid grid-cols-1 gap-16">
          {/* <Heading as="h2" className="text-center">
            Featured Recipes
          </Heading>
          <hr className="w-1/5 mx-auto" />
          {features &&
            features.results.map((feature) => (
              <Article key={feature.id} article={feature} />
            ))} */}

          {/* <hr />
          <Heading as="h2" className="text-center">
            All Recipes
          </Heading> */}
          {/* <hr className="w-1/5 mx-auto" /> */}
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </Bounded>
    </Layout>
  );
}
