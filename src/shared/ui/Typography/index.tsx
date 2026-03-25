import { cn } from "@/shared/lib/utils";
import { cva } from "class-variance-authority";

type TypographyVariant = "bold" | "normal"

type TypographyProps = {
  variant?: TypographyVariant;
  children?: React.ReactNode;
  className?: string;
}

const typography = cva("text-gray-900", {
  variants: {
    variant: {
      bold: "font-bold text-lg",
      normal: "font-normal text-base"
    }
  },
  defaultVariants: {
    variant: "normal"
  }
})

export function Typography(props: TypographyProps) {
  const { variant, className } = props;

  return (
    <p
      className={cn(typography({ variant, className }))}
      {...props}
    >{props.children}</p>
  )
}