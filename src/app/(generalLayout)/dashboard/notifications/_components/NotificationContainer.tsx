"use client";

import { Button } from "@/components/ui/button";
import NotificationCard from "./NotificationCard";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import {
  useGetAllNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useDeleteAllNotificationsMutation,
} from "@/redux/api/notificationApi";
import handleMutation from "@/utils/handleMutation";
import { useState } from "react";

const NotificationContainer = () => {
  const increment = 6;
  const [limit, setLimit] = useState<number>(increment);

  const {
    data: notificationsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAllNotificationsQuery({ limit });
  const [markAllNotificationsAsRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsAsReadMutation();
  const [deleteAllNotifications, { isLoading: isDeletingAll }] =
    useDeleteAllNotificationsMutation();

  const notifications = notificationsResponse?.data?.notificationList || [];
  const totalItems = notificationsResponse?.meta?.total || 0;

  const handleMarkAllAsRead = () => {
    handleMutation("", markAllNotificationsAsRead, "Marking all as read...");
  };

  const handleDeleteAll = () => {
    handleMutation("", deleteAllNotifications, "Deleting all notifications...");
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + increment);
  };

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;

  return (
    <div className="min-h-screen bg-background p-6 w-1/2">
      <div className="flex justify-between">
        <h1 className="text-foreground text-2xl font-bold mb-6">
          Notifications
        </h1>
        {notifications.length > 0 && (
          <div className="flex justify-between gap-3">
            <Button
              size="lg"
              disabled={isMarkingAll}
              onClick={handleMarkAllAsRead}
            >
              {isMarkingAll ? "Marking all as read..." : "Mark all as read"}
            </Button>
            <Button
              size="lg"
              className="bg-destructive hover:bg-destructive/80"
              disabled={isDeletingAll}
              onClick={handleDeleteAll}
            >
              {isDeletingAll ? "Deleting..." : "Delete All"}
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification: any) => (
            <NotificationCard
              key={notification._id}
              title={notification.message}
              message={notification.description}
              timestamp={notification.date}
              read={notification.read}
              notificationId={notification._id}
            />
          ))
        ) : (
          <div className="py-64 text-center text-muted-foreground">
            No notifications found
          </div>
        )}
      </div>
      {notifications.length > 0 && notifications.length < totalItems && (
        <div className="p-4 flex justify-center">
          <Button disabled={isFetching} size="lg" onClick={handleLoadMore}>
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
