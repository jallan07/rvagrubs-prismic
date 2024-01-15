/**
 * @typedef {import("@prismicio/client").Content.IngredientsSlice} IngredientsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IngredientsSlice>} IngredientsProps
 * @param {IngredientsProps}
 */
const Ingredients = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for ingredients (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Ingredients;
