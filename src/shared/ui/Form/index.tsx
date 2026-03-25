import { cva } from "class-variance-authority";

type FormVariant = "base"

type FormProps = React.ComponentProps<'form'> & {
  variant?: FormVariant,
  onSubmit?: (data: any) => void; 
}

const form = cva("", {
  variants: {
    variant: {
      base: ""
    }
  }
})

export function Form(props: FormProps) {

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget).entries())
    if (props.onSubmit) props.onSubmit(formData);
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLFormElement> = (
    event,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.currentTarget).entries())
      if (props.onSubmit) props.onSubmit(formData);
    }
  };

  return (
    <form
      className={form({ variant: props.variant })}
      onSubmit={handleSubmit}
      onKeyDown={onKeyDown}
      {...props}
    />
  )
}