import { DisplayChats } from "@/features/chat/ui/displayChats";
import { FindUserForm } from "@/features/findUser/ui/form";
import { FindUserResult } from "@/features/findUser/ui/result";
import { Sidebar, SidebarContent, SidebarHeader } from "@/shared/ui/Sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <FindUserForm />
      </SidebarHeader>
      <SidebarContent>
        <FindUserResult />
        <DisplayChats />
      </SidebarContent>
    </Sidebar>
  )
}