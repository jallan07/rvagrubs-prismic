import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";

/**
 * @typedef {import("@prismicio/client").Content.StepsSlice} StepsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StepsSlice>} StepsProps
 * @param {StepsProps}
 */
const Steps = ({ slice }) => {
  const steps = slice.items
    .map((item) => {
      const nestedField = item.steps[0];
      return nestedField && nestedField.type === "paragraph"
        ? nestedField.text
        : null;
    })
    .filter((text) => text !== null);

  return (
    <Bounded as="section">
      <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed my-5">
        {steps && steps.length > 0 && (
          <Heading as="h6" className="font-serif mb-6">
            Steps
          </Heading>
        )}
        {steps && steps.length > 0 && (
          <ol className="mx-6">
            {steps.map((item, i) => (
              <li
                className="list-decimal list-outside my-3"
                key={`${i}-${item}`}
              >
                {item}
              </li>
            ))}
          </ol>
        )}
      </div>
    </Bounded>
  );
};

export default Steps;
