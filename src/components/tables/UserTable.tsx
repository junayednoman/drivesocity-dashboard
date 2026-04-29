"use client";

import { Button } from "@/components/ui/button";
import { Eye, Lock, Search, Unlock } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Input } from "@/components/ui/input";
import { UserDetailsModal } from "@/components/modal/UserDetailsModal";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import {
  useGetUsersQuery,
  useChangeUseStatusMutation,
} from "@/redux/api/userApi";
import handleMutation from "@/utils/handleMutation";

interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  bio: string | null;
  address: string | null;
  status: "active" | "blocked";
  id: string;
  createdAt: string;
  coverPhoto: string | null;
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "blocked", label: "Blocked" },
];

const UserTable = ({
  title,
  pagination = true,
  limit = 10,
}: {
  title?: string;
  pagination?: boolean;
  limit?: number;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const {
    data: usersResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery({
    page: currentPage,
    limit,
    searchTerm: debouncedSearchText || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });
  const [changeUseStatus, { isLoading: isChangingStatus }] =
    useChangeUseStatusMutation();

  const users: User[] = usersResponse?.data || [];
  const totalItems = usersResponse?.meta?.total || 0;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleBlockUser = (user: User) => {
    const newStatus = user.status === "active" ? "blocked" : "active";
    const payload = { userId: user._id, status: newStatus };
    handleMutation(
      payload,
      changeUseStatus,
      `Changing status for ${user.name}...`
    );
  };

  const handleViewDetails = (id: string) => {
    setSelectedUserId(id);
  };

  const closeModal = () => {
    setSelectedUserId(null);
  };

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;

  return (
    <div className="space-y-6 bg-card p-6 px-8 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          {title || "User Management"}
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 border-border"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <AFilterSelect
            className="!w-[120px]"
            onChange={handleStatusChange}
            placeholder="Status"
            value={statusFilter}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="bg-primary px-4 py-3">
          <div className="grid grid-cols-12 gap-2 items-center text-card">
            <div className="col-span-3 font-semibold">User</div>
            <div className="col-span-3 font-semibold">Email</div>
            <div className="col-span-2 font-semibold">Registration Date</div>
            <div className="col-span-2 font-semibold">Status</div>
            <div className="col-span-2 font-semibold text-right">Action</div>
          </div>
        </div>

        {/* Data Rows or No Data Message */}
        <div className="divide-y divide-border">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="px-4 py-3 hover:bg-accent transition-colors rounded"
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* User Name Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate">
                      {user.name}
                    </span>
                  </div>

                  {/* Email Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate">
                      {user.email}
                    </span>
                  </div>

                  {/* Registration Date Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-2">
                    <span
                      className={`text-primary-foreground ${
                        user.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </div>

                  {/* Action Column */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Button
                      onClick={() => handleViewDetails(user._id)}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-border hover:bg-card"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <AAlertDialog
                      onAction={() => handleBlockUser(user)}
                      title={`Confirm ${
                        user.status === "active" ? "Block" : "Unblock"
                      } User`}
                      description={`Are you sure you want to ${
                        user.status === "active" ? "block" : "unblock"
                      } ${user.name}?`}
                    >
                      <Button
                        size="icon"
                        className={`h-8 w-8 rounded-full ${
                          user.status === "active"
                            ? "bg-destructive/90 hover:bg-destructive"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                        disabled={isChangingStatus}
                      >
                        {user.status === "active" ? <Lock /> : <Unlock />}
                      </Button>
                    </AAlertDialog>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-44 text-center text-muted-foreground">
              No users found
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && totalItems > limit && (
          <div className="p-4 flex">
            <APagination
              totalItems={totalItems}
              itemsPerPage={limit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxVisiblePages={5}
            />
          </div>
        )}
        <UserDetailsModal
          isOpen={selectedUserId !== null}
          onClose={closeModal}
          user={users.find((user) => user._id === selectedUserId)}
        />
      </div>
    </div>
  );
};

export default UserTable;
