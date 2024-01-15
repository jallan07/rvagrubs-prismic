import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";

/**
 * @typedef {import("@prismicio/client").Content.IngredientsSlice} IngredientsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IngredientsSlice>} IngredientsProps
 * @param {IngredientsProps}
 */
const Ingredients = ({ slice }) => {
  const ingredients = slice.items
    .map((item) => {
      const nestedField = item.ingredient[0];
      return nestedField && nestedField.type === "paragraph"
        ? nestedField.text
        : null;
    })
    .filter((text) => text !== null);

  return (
    <Bounded as="section">
      <div
        className="font-serif leading-relaxed md:text-xl md:leading-relaxed my-5 border-[1.3px] py-3 px-4 rounded-xl"
        id="ingredients"
      >
        {ingredients && ingredients.length > 0 && (
          <Heading as="h6" className="font-serif mb-6">
            Ingredients
          </Heading>
        )}

        {ingredients && ingredients.length > 0 && (
          <ul className="mx-6">
            {ingredients.map((item, i) => (
              <li className="list-disc list-outside my-3" key={`${i}-${item}`}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Bounded>
  );
};

export default Ingredients;
