import { PrismicText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import * as prismic from "@prismicio/client";
import { getExcerpt } from "@/lib/getExcerpt";
import { findFirstImage } from "@/lib/findFirstImage";
import { dateFormatter } from "@/lib/dateFormatter";
import { Heading } from "./Heading";

export function Recipe({ recipe }) {
  const featuredImage =
    (prismic.isFilled.image(recipe.data.featuredImage) &&
      recipe.data.featuredImage) ||
    findFirstImage(recipe.data.slices);
  const date = prismic.asDate(
    recipe.data.publishDate || recipe.first_publication_date
  );
  const excerpt = getExcerpt(recipe.data.slices);

  return (
    <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      <PrismicNextLink
        document={recipe}
        tabIndex="-1"
        href={`/recipes/${recipe.uid}`}
      >
        <div className="aspect-h-3 aspect-w-4 relative bg-gray-100">
          {prismic.isFilled.image(featuredImage) && (
            <PrismicNextImage
              field={featuredImage}
              fill={true}
              className="object-cover"
            />
          )}
        </div>
      </PrismicNextLink>
      <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <Heading as="h2">
          <PrismicNextLink document={recipe} href={`/recipes/${recipe.uid}`}>
            <PrismicText field={recipe.data.title} />
          </PrismicNextLink>
        </Heading>
        <p className="font-serif italic tracking-tighter text-slate-500">
          {dateFormatter.format(date)}
        </p>
        {excerpt && (
          <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </li>
  );
}
