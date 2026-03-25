'use client'
import { useUserStore } from "@/entities/user/model/store";
import { AuthForm } from "@/features/authForm";
import { handleLogin } from "@/processes/authSession/api/handleLogin";
import { handleRegister } from "@/processes/authSession/api/handleRegister";
import { restoreSession } from "@/processes/authSession/model/session";
import { PATH_AUTH, PATH_CHAT } from "@/shared/api/api";
import { redirect, RedirectType, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const pathname = usePathname();
  
  useEffect(() => {
    restoreSession();

    if (!useUserStore.getState().currentUser) return;

    if (pathname.includes(PATH_AUTH)) {
      redirect(PATH_CHAT, RedirectType.push)
    }
    
  }, [useUserStore.getState().currentUser]);

  return (
    <>
      <AuthForm onLogin={handleLogin} onRegister={handleRegister}/>
    </>
  )
}