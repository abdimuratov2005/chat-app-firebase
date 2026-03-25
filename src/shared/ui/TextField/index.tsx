import { cva } from "class-variance-authority";

type TextFieldVariant = "chat" | "auth"

type TextFieldProps = {
  variant?: TextFieldVariant;
};

const textField = cva("text-gray-100 w-full bg-gray-500 rounded-4xl pl-2 content-center resize-none outline-none overflow-hidden", {
  variants: {
    variant: {
      chat: "",
      auth: ""
    }
  },
  defaultVariants: {
    variant: "auth"
  }
})

export function TextField(props: TextFieldProps) {
  // const onInputMessage: React.ChangeEvent<Input> = (event) => {
  //   const element = event.currentTarget;
  //   element.style.height = "auto";
  //   element.style.height = element.scrollHeight + "px";
  // };
  
  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  };
  
  return (
    <div className="w-full p-3 flex fixed backdrop-blur-[2px] items-center justify-center bottom-0">
      <textarea
        onKeyDown={onKeyDown}
        className={textField({ variant: props.variant })}
        placeholder="Напишите сообщение..."
        {...props}
      />
    </div>
  );
}
