import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import Header from "@/components/sidebar/Header";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main>
          {children}
          <Toaster position="top-center" duration={3500} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default GeneralLayout;
