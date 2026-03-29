import { cn } from "@/shared/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const typography = cva("", {
  variants: {
    variant: {
      normal: "font-normal",
      bold: "font-bold",
      focusTitle: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    },
  },
  defaultVariants: {
    variant: "normal",
  },
});

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof typography> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export function Typography<T extends React.ElementType = "p">(
  props: TypographyProps<T>,
) {
  const { as, variant, className, children, ...rest } = props;

  const Component = as || "p";

  return (
    <Component className={cn(typography({ variant }), className)} {...rest}>
      {children}
    </Component>
  );
}
