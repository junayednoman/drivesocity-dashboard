"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { defaultImg } from "@/data/global.data";

interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  bio: string | null;
  address: string | null;
  status: string;
  id: string;
  createdAt: string;
  coverPhoto: string | null;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  user,
}: UserDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary-foreground">
            User Details
          </DialogTitle>
          <DialogDescription className="sr-only">
            User details modal
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <div
            className="w-32 h-32 bg-cover bg-center bg-no-repeat rounded-full"
            style={{
              backgroundImage: `url(${user?.photoUrl || defaultImg})`,
            }}
          ></div>
          <div className="w-full space-y-2 mt-3">
            <h4 className="text-lg font-semibold text-primary-foreground">
              User Details
            </h4>
            <div>
              <p className="text-sm text-foreground py-3">
                Name: {user?.name || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Email: {user?.email || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Bio: {user?.bio || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Address: {user?.address || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t pt-3">
                Status:{" "}
                {user?.status
                  ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
