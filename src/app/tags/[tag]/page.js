import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { Article } from "@/components/Article";
import { Recipe } from "@/components/Recipe";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: prismic.asText(settings.data.name),
  };
}

export default async function Page({ params }) {
  const client = createClient();

  const tag = decodeURIComponent(params.tag);
  const data = await client.getByTag(tag, {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const results = data.results || [];

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  const articles = results.filter((item) => item.type === "article");
  const recipes = results.filter((item) => item.type === "recipe");

  return (
    <Layout navigation={navigation} settings={settings}>
      <Bounded size="widest">
        <ul className="grid grid-cols-1 gap-16">
          <Heading as="h2" className="text-center">
            {`#${tag}`}
          </Heading>
          <hr className="w-1/5 mx-auto" />
          {articles &&
            articles.length > 0 &&
            articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          {recipes &&
            recipes.length > 0 &&
            recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
        </ul>
      </Bounded>
    </Layout>
  );
}
