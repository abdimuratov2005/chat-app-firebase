import { cva } from "class-variance-authority";

type TypographyVariant = "bold" | "normal"

type TypographyProps = {
  variant?: TypographyVariant;
  children?: React.ReactNode
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
  return (
    <p
      className={typography({ variant: props.variant })}
      {...props}
    >{props.children}</p>
  )
}