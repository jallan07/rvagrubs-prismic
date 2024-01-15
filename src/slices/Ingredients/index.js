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
      <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed my-5 border-[1.3px] py-3 px-4 rounded-xl">
        {ingredients && ingredients.length > 0 && (
          <Heading as="h6" className="font-serif mb-6">
            Ingredients
          </Heading>
        )}
        {ingredients &&
          ingredients.length > 0 &&
          ingredients.map((item, i) => (
            <div class="flex items-center mb-4" key={`${item}-${i}`}>
              <input
                id={`checkbox-${item}`}
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                key={`${item}-${i}`}
              />
              <label
                htmlFor={`checkbox-${item}`}
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                key={`${item}-${i}`}
              >
                {item}
              </label>
            </div>
          ))}
      </div>
    </Bounded>
  );
};

export default Ingredients;
