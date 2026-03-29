"use client";

import { Button } from "@/shared/ui/Button";
import { Field, FieldLabel } from "@/shared/ui/Field";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Input } from "@/shared/ui/Input";
import { Motion } from "@/shared/ui/motion";
import { useAuthStore } from "@/processes/authSession/model/store";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/entities/user/model/store";
import { useEffect, useState } from "react";
import { Spinner } from "@/shared/ui/Spinner";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Typography } from "@/shared/ui/Typography";

export function AuthForm() {
  const router = useRouter();
  const {
    username,
    password,
    isLoading,
    isUsernameSetted,
    currentUser,
    setUsername,
    setPassword,
    onAuth,
  } = useAuthStore();
  const { setCurrentUser } = useUserStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focused, setFocused] = useState<"username" | "password" | null>(
    "username",
  );

  useEffect(() => {
    if (!currentUser?.error) {
      setCurrentUser(currentUser);
      if (!isLoading) router.push(process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL!);
    }
  }, [currentUser]);

  const isAuthButtonEnabled = username.length && password.length;
  const focusUsername = focused === "username" || username.length;
  const focusPassword = focused === "password" || password.length;

  return (
    <FlexContainer
      direction={"col"}
      justify={"center"}
      align={"center"}
      width={"full"}
      height={"full"}
      gap={"lg"}
    >
      <div className="text-center space-y-1">
        <Typography as={"h2"} variant={"focusTitle"}>
          Chat
        </Typography>
        <Typography as={"p"} className="text-sm">
          Sign in to continue
        </Typography>
      </div>
      <div className="flex gap-1 w-[85%] md:w-[50%] lg:w-[40%] xl:w-[400]">
        <Field id="authForm" data-disabled={isLoading}>
          <div className="relative">
            <Input
              disabled={isLoading}
              value={username}
              id="input-field-username"
              type="name"
              onChange={(event) => setUsername(event.target.value)}
              onFocus={() => setFocused("username")}
              onBlur={() => setFocused(null)}
              className="h-[48] text-xl! pt-6 pl-4"
              required
              autoFocus
            />
            <Motion
              initial={{
                top: 12,
              }}
              animate={{
                top: focusUsername ? 0 : 12,
              }}
              className="absolute left-[20] pointer-events-none"
              transition={{ duration: 0.2 }}
            >
              <FieldLabel
                htmlFor="input-field-username"
                className={`transition-all ${focusUsername ? "text-[14px]" : "text-base"}`}
              >
                Username
              </FieldLabel>
            </Motion>
          </div>
          <div className="relative">
            <Input
              aria-invalid={
                !password.length && currentUser?.error === "inCorrectPassword"
              }
              disabled={isLoading}
              value={password}
              id="input-field-password"
              type={showPassword ? "text" : "password"}
              onKeyDown={(event) => event.key === "Enter" && onAuth}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              name="input-field-password"
              className="h-[48] text-xl! pt-6 pl-4"
              required
            />
            <Motion
              initial={{
                top: 12,
                fontSize: 12,
              }}
              animate={{
                top: focusPassword ? 0 : 12,
              }}
              className="absolute left-[20] pointer-events-none"
              transition={{ duration: 0.2 }}
            >
              <FieldLabel
                htmlFor="input-field-password"
                className={`transition-all ${focusPassword ? "text-[14px]" : "text-base"}`}
              >
                Password
              </FieldLabel>
            </Motion>
            <div className="absolute w-[45]! h-[40] right-1 top-1">
              <Button
                disabled={isLoading}
                variant={"ghost"}
                className={`h-full cursor-pointer`}
                name="input-field-username"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <Eye size={32} strokeWidth={2.5} />
                ) : (
                  <EyeOff size={32} strokeWidth={2.5} />
                )}
              </Button>
            </div>
          </div>
        </Field>
      </div>
      <div className="rounded-full">
        <Motion className={`w-[50] h-[50]`}>
          <Button
            disabled={!isAuthButtonEnabled}
            variant={"outline"}
            className={`self-end w-full h-full cursor-pointer`}
            name="input-field-username"
            onClick={onAuth}
            type="button"
          >
            {isLoading ? (
              <Spinner data-icon="inline-end" />
            ) : (
              <ArrowRight size={38} strokeWidth={3} />
            )}
          </Button>
        </Motion>
      </div>
    </FlexContainer>
  );
}
