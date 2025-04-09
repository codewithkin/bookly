import { Menu } from "lucide-react";
import { Button } from "../button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";

import {
  LucideIcon,
  Home,
  Calendar,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";

export type SidebarLink = {
  icon: LucideIcon;
  text: string;
  href: string;
};

export const sidebarLinks: SidebarLink[] = [
  {
    icon: Home,
    text: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Calendar,
    text: "Bookings",
    href: "/dashboard/bookings",
  },
  {
    icon: Users,
    text: "Clients",
    href: "/dashboard/clients",
  },
  {
    icon: Settings,
    text: "Settings",
    href: "/dashboard/settings",
  },
  {
    icon: LogOut,
    text: "Logout",
    href: "/logout",
  },
];

function Sidebar() {
  // Get the current path
  const path = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="default" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full md:w-1/4" side="left">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-primary">
            Menu
          </SheetTitle>
        </SheetHeader>

        {/*Links */}
        <article className="flex flex-col gap-4 px-4">
          {sidebarLinks.map((link: SidebarLink) => (
            <Button
              variant={link.href == path ? "secondary" : "ghost"}
              key={link.href}
            >
              <link.icon className="mr-2" />
              {link.text}
            </Button>
          ))}
        </article>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary" size="default">
              Close Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
