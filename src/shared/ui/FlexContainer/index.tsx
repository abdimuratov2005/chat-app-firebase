import { cva, VariantProps } from "class-variance-authority";

const flex = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      rowRevers: "flex-row-reverse",
      col: "flex-col",
      colRevers: "flex-col-reverse"
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
    width: {
      full: "w-full"
    },
    height: {
      full: "h-full"
    }
  },
  defaultVariants: {
    direction: "row",
  },
});

type FlexContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof flex>;

export function FlexContainer({ className, ...props }: FlexContainerProps) {
  return <div className={flex({ ...props, className })} {...props} />;
}
