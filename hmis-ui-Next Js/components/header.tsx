"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Bell, Search, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import type { ProfileData } from "@/lib/api/user-profile";

export function Header({ children }: { children?: React.ReactNode }) {
  const { user, loading } = useCurrentUser();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [open, setOpen] = useState(false);

  // 🔁 Handle redirection after render
  useEffect(() => {
    if (!loading && !user && !hasRedirected) {
      router.push("/login");
      setHasRedirected(true); // Prevent infinite loop
    }
  }, [loading, user, hasRedirected]);

  // 🧠 Show nothing or loading UI until we know auth status
  if (loading || !user) {
    return (
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="flex h-14 md:h-16 items-center px-2 sm:px-4 md:px-6 justify-end ml-auto gap-2">
          {/* Optional loader */}
          <span>Loading...</span>
        </div>
      </header>
    );
  }

  // 🧾 Extract profile data for display
  const fullName = user.profile?.full_name || user.email.split("@")[0];
  const title = user.profile?.title || "";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarSrc = user.profile?.profile_photo
    ? `${process.env.NEXT_PUBLIC_API_URL}${user.profile.profile_photo}`
    : "/placeholder.svg?height=32&width=32";

  const displayName = title ? `${title} ${fullName}` : fullName;

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="flex h-14 md:h-16 items-center px-2 sm:px-4 md:px-6">
        {/* Mobile Sidebar Trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <MobileSidebar onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Search Bar */}
        <div className="md:flex-1 flex items-center">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[180px] lg:w-[280px] pl-8 bg-background"
            />
          </div>
          <Button variant="outline" size="icon" className="md:hidden">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {/* Right-aligned Actions */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <ThemeToggle />

          {/* Notifications Icon */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 hidden sm:flex"
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Settings Icon - Hidden on small screens */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 hidden sm:flex"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-full h-8 px-2 ml-1"
              >
                {/* Display combined title + full name */}
                <span className="font-medium text-sm hidden lg:inline-block">
                  {displayName}
                </span>

                {/* Avatar with profile image or initials */}
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarSrc} alt={fullName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            {/* Dropdown menu content */}
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  logout(); // Clear tokens
                  router.push("/login"); // Safe navigation
                }}
                className="text-red-600 focus:text-red-700 cursor-pointer"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Optional children (e.g., sync indicator) */}
        {children && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
