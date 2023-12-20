/**
 * @typedef {import("@prismicio/client").Content.RestaurantDetailsSlice} RestaurantDetailsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RestaurantDetailsSlice>} RestaurantDetailsProps
 * @param {RestaurantDetailsProps}
 */

import { Bounded } from "@/components/Bounded";

const RestaurantDetails = ({ slice }) => {
  console.log({ slice });
  return (
    <Bounded as="section">
      <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed my-5 border-[1.3px] py-3 px-4 rounded-xl">
        {slice?.primary?.primary_category && (
          <h5 className="text-sm my-3">
            <span className="font-bold">Primary Category:</span>{" "}
            {slice.primary.primary_category}
          </h5>
        )}
        {slice?.primary?.address && (
          <h5 className="text-sm my-3">
            <span className="font-bold">Address:</span> {slice.primary.address}
          </h5>
        )}
        {slice?.primary?.website && (
          <h5 className="text-sm my-3 ">
            <span className="font-bold">Website:</span>{" "}
            <a
              className="underline text-blue-600"
              href={slice.primary.website.url}
              target={slice.primary.website.target}
            >
              {slice.primary.website.url}
            </a>
          </h5>
        )}

        {slice?.primary?.menu?.url && (
          <h5 className="text-sm my-3 ">
            <span className="font-bold">Menu:</span>{" "}
            <a
              className="underline text-blue-600"
              href={slice.primary.menu.url}
              target={slice.primary.menu.target}
            >
              {slice.primary.menu.url}
            </a>
          </h5>
        )}

        {slice?.primary?.phone_number && (
          <h5 className="text-sm my-3">
            <span className="font-bold">Phone Number:</span>{" "}
            <a
              className="underline text-blue-600"
              href={`tel:${slice.primary.phone_number}`}
            >
              {slice.primary.phone_number}
            </a>
          </h5>
        )}
        {slice?.primary?.score && (
          <h5 className="text-sm my-3">
            <span className="font-bold">Score:</span> {slice.primary.score}
          </h5>
        )}
      </div>
    </Bounded>
  );
};

export default RestaurantDetails;
