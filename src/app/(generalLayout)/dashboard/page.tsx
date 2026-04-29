import { Metadata } from "next";
import DashboardContainer from "./DashboardContainer";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
    <main>
      <DashboardContainer />
    </main>
  );
}
