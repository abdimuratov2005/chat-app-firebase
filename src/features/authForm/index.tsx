import { addUser } from "@/entities/user/api/addUser";
import { loginWithCode } from "@/entities/user/api/loginWithCode";
import { useUserStore } from "@/entities/user/model/store";
import { handleLogOut } from "@/processes/authSession/api/handleLogOut";
import { Button } from "@/shared/ui/Button";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";

type AuthFormProps = {
  onRegister: typeof addUser;
  onLogin: typeof loginWithCode;
};

export function AuthForm({ onLogin, onRegister }: AuthFormProps) {
  const currentUser = useUserStore((state) => state.currentUser);
  const [username, setUsername] = useState("");
  const [loginCode, setLoginCode] = useState("");

  const register = async () => {
    try {
      await onRegister(username).finally(() => {
        
      });
    } catch (e: any) {
      alert(e.message);
    }
  };

  const login = async () => {
    try {
      await onLogin(currentUser?.username || username, loginCode);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
      <FlexContainer align={"center"} direction={"col"}>
        <Input
          readOnly={Boolean(currentUser)}
          onKeyDown={(event) => event.key === "Enter" && register}
          value={currentUser?.username || username}
          onChange={(event) => setUsername(event.target.value)}
          name="username"
          placeholder="username"
        />
        <Button name="username" onClick={register} type="submit">
          Next Step
        </Button>

        {currentUser && (
          <>
            <Input
              type="number"
              onKeyDown={(event) => event.key === "Enter" && login}
              value={loginCode}
              onChange={(event) => setLoginCode(event.target.value)}
              name="code"
              placeholder="code"
            />
            <Button name="username" onClick={login} type="submit">
              Login
            </Button>
          </>
        )}
      </FlexContainer>

      <Button name="username" onClick={handleLogOut} type="button">
        Log Out
      </Button>
    </>
  );
}
