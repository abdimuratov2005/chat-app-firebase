'use client'
import { handleLogOut } from "@/processes/authSession/api/handleLogOut";
import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

export default function Page() {

  const route = useRouter();
  
  const handleLogout = () => {
    handleLogOut();
    route.push("/auth")
  }

  return (
    <>
      <div>Chat</div>
      <Button type="button" onClick={handleLogout}>Log Out</Button>
    </>
  )
}