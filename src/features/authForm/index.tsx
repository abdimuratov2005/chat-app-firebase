'use client'

import { Button } from "@/shared/ui/Button";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/Field";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Input } from "@/shared/ui/Input";
import { Motion } from "@/shared/ui/motion";
import { TypographyInlineCode } from "@/shared/ui/Typography/InlineCode";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAuthStore } from "../../processes/authSession/model/store";

export function AuthForm() {
  const { login, register, logOut, currentUser, username, setUsername, loginCode, setLoginCode } = useAuthStore();

  return (
    <FlexContainer
      direction={"col"}
      justify={"center"}
      align={"center"}
      width={"full"}
      height={"full"}
    >
      <Motion
        effects={["fade", "slideRight"]}
        isVisible={!Boolean(currentUser)}
        className="w-full"
      >
        <Field data-disabled={Boolean(currentUser)} className="w-[85%] md:w-[50%] lg:w-[40%] xl:w-[400]">
          <FieldLabel className="font-medium" htmlFor="input-field-username">
            Username
          </FieldLabel>
          <Input
            disabled={Boolean(currentUser)}
            data-i
            id="input-field-username"
            type="name"
            placeholder="Enter your username"
            onKeyDown={(event) => event.key === "Enter" && register}
            onChange={(event) => setUsername(event.target.value)}
            name="input-field-username"
          />
          <FieldDescription>
            Choose a unique username for your account.
          </FieldDescription>
          <Button
            className="md:mt-10 w-[50]! h-[50]! self-end md:w-full! md:self-end md:rounded-full md:h-9!"
            name="input-field-username"
            onClick={register}
            type="button"
          >
            <HugeiconsIcon
              className="block md:hidden"
              icon={ArrowRight02Icon}
              size={32}
              color="currentColor"
              strokeWidth={2.5}
            />
            <span className="hidden md:block">Next Step</span>
          </Button>
        </Field>
      </Motion>

      <Motion
        effects={["fade", "slideRight"]}
        isVisible={Boolean(currentUser) && Boolean(!currentUser?.alreadyCreated)}
        className="w-full"
      >
        <TypographyInlineCode>
          {currentUser?.loginCode}
        </TypographyInlineCode>
        <Button name="username" onClick={logOut} type="button">
            Log Out
          </Button>
      </Motion>

      <Motion
        effects={["fade", "slideRight"]}
        isVisible={Boolean(currentUser) && Boolean(currentUser?.alreadyCreated)}
        className="w-full"
      >
        <Field className="w-[85%] md:w-[50%]">
          <Button name="username" onClick={logOut} type="button">
            Log Out
          </Button>
          <FieldLabel className="font-medium" htmlFor="input-field-code">
            Log in
          </FieldLabel>
          <Input
            id="input-field-code"
            placeholder="Enter your code"
            type="number"
            onKeyDown={(event) => event.key === "Enter" && login}
            value={loginCode}
            onChange={(event) => setLoginCode(event.target.value)}
            name="input-field-code"
          />
          <Button
            className="md:mt-10 w-[50]! h-[50]! self-end md:w-full! md:self-end md:rounded-full md:h-9!"
            name="input-field-username"
            onClick={register}
            type="button"
          >
            <HugeiconsIcon
              className="block md:hidden"
              icon={ArrowRight02Icon}
              size={32}
              color="currentColor"
              strokeWidth={2.5}
            />
            <span className="hidden md:block">Next Step</span>
          </Button>
        </Field>
      </Motion>
    </FlexContainer>
  );
}
