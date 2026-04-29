import AContainer from "@/components/AContainer";
import UserTable from "@/components/tables/UserTable";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "User Management",
};

const UserManagement = () => {
  return (
    <main>
      <AContainer>
        <UserTable limit={11} pagination />
      </AContainer>
    </main>
  );
};

export default UserManagement;
