import { Metadata } from "next";
import { AppSidebar } from "@/features/app-sidebar/ui";
import { SidebarProvider } from "@/shared/ui/Sidebar";
import { TooltipProvider } from "@/shared/ui/Tooltip";

export const metadata: Metadata = {
  title: "Chat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />
          <main className="w-full">
            {children}
          </main>
        </TooltipProvider>
      </SidebarProvider>
    </>
  )
}