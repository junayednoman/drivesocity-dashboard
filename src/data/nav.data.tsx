import {
  Bell,
  CircleDollarSign,
  Crown,
  Settings,
  UserRoundCog,
} from "lucide-react";

type TNavMain = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

export const navItems: TNavMain = [
  {
    title: "User Management",
    url: "/dashboard/user-management",
    icon: <UserRoundCog />,
  },
  {
    title: "Earning Overview",
    url: "/dashboard/earnings",
    icon: <CircleDollarSign />,
  },
  {
    title: "Subscription Plans",
    url: "/dashboard/subscription-plans",
    icon: <Crown />,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
];
