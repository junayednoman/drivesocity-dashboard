"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteSingleNotificationMutation } from "@/redux/api/notificationApi";
import handleMutation from "@/utils/handleMutation";

interface NotificationCardProps {
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  notificationId: string;
}

const NotificationCard = ({
  title,
  message,
  timestamp,
  read,
  notificationId,
}: NotificationCardProps) => {
  const [deleteSingleNotification, { isLoading }] =
    useDeleteSingleNotificationMutation();

  const handleDelete = () => {
    handleMutation(
      notificationId,
      deleteSingleNotification,
      "Deleting notification..."
    );
  };
  return (
    <div className="p-4 px-6 bg-card rounded-xl">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h6
            className={`text-xl text-primary-foreground ${
              read ? "font-medium" : "font-extrabold"
            }`}
          >
            {title}
          </h6>
          <p
            className={`text-primary-foreground m-1 -ml-[1px] ${
              read ? "font-normal" : "font-bold"
            }`}
          >
            {message}
          </p>
          <p className="mt-4 text-sm text-card-foreground">
            {new Date(timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-destructive hover:bg-destructive/80"
            size="icon"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 className="w-4 h-4 text-accent" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
