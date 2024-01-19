import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Recipe } from "@/components/Recipe";
import { Heading } from "@/components/Heading";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: prismic.asText(settings.data.name),
  };
}

const Recipes = withPageAuthRequired(async () => {
  const client = createClient();

  const recipes = await client.getAllByType("recipe", {
    orderings: [
      { field: "my.recipe.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return (
    <Layout navigation={navigation} settings={settings}>
      <Bounded size="widest">
        <ul className="grid grid-cols-1 gap-16">
          <Heading as="h2" className="text-center">
            All Recipes
          </Heading>
          <hr className="w-1/5 mx-auto" />
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </Bounded>
    </Layout>
  );
});

export default Recipes;
