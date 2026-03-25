export function TypographyInlineCode({ children }: React.ComponentProps<"code">) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-2xl tracking-widest font-semibold">{children}</code>
  )
}