import clsx from "clsx";

export function Bounded({
  as: Comp = "div",
  size = "base",
  className,
  children,
}) {
  return (
    <Comp className={clsx("px-4 py-6 md:px-6 md:py-4 lg:py-6", className)}>
      <div
        className={clsx(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "widest" && "max-w-6xl"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
