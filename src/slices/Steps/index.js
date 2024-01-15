import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";

/**
 * @typedef {import("@prismicio/client").Content.StepsSlice} StepsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StepsSlice>} StepsProps
 * @param {StepsProps}
 */
const Steps = ({ slice }) => {
  console.log("🚀 ~ Steps ~ slice:", slice);
  const steps = slice.items
    .map((item) => {
      const nestedField = item.steps[0];
      return nestedField && nestedField.type === "paragraph"
        ? nestedField.text
        : null;
    })
    .filter((text) => text !== null);
  console.log("🚀 ~ Steps ~ steps:", steps);

  return (
    <Bounded as="section">
      <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed my-5">
        {steps && steps.length > 0 && (
          <Heading as="h6" className="font-serif mb-6">
            Steps
          </Heading>
        )}
        {steps &&
          steps.length > 0 &&
          steps.map((item, i) => (
            <div className="flex items-center mb-4" key={`${item}-${i}`}>
              <input
                id={`checkbox-${item}`}
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                key={`${item}-${i}`}
              />
              <label
                htmlFor={`checkbox-${item}`}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                key={`${item}-${i}`}
              >
                {i + 1} - {item}
              </label>
            </div>
          ))}
      </div>
    </Bounded>
  );
};

export default Steps;
