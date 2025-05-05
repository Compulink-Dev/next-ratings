import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Label } from "@/components/ui/label";
import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <div className="lg:hidden">
          <AppSidebar />
        </div>
      </div>
      <main className="w-screen h-screen overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-100 border-b w-full">
          <SidebarTrigger />
          <div className="flex items-center space-x-4">
            <Label>Admin</Label>
            <UserButton />
          </div>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
