"use client";

import { useTheme } from "next-themes";
import {
  CircleUserRound,
  Gift,
  HelpCircle,
  LogOut,
  Mail,
  Plane,
  LogIn,
  UserPlus,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DarkModeToggle } from "./dark-mode-toggle";

export default function NavBar() {
  const { theme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <Image
        src={theme === "dark" ? "/images/brand/logo-dark.png" : "/images/brand/logo-light.png"}
        alt="Logo"
        width={100}
        height={100}
        className="cursor-pointer"
      />
      <div className="flex items-center space-x-2">
        <Link href="/doctor-signup" passHref>
          {!isLoggedIn && (
            <Button variant="outline" className="mr-2">
              <Stethoscope className="mr-2 h-4 w-4" />
              Doctor Sign Up
            </Button>
          )}
        </Link>
        <DarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <CircleUserRound style={{ width: "24px", height: "24px" }} strokeWidth={1.5} />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
              {!isLoggedIn ? (
                <>
                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Log in</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log In</DialogTitle>
                        <DialogDescription>
                          Enter your credentials to access your account.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Enter your password" />
                        </div>
                        <Button type="submit" className="w-full">
                          Log In
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Sign up</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sign Up</DialogTitle>
                        <DialogDescription>
                          Create an account to start your medical tourism journey.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter your full name" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Create a password" />
                        </div>
                        <Button type="submit" className="w-full">
                          Sign Up
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              ) : null}
              {isLoggedIn && (
                <>
                  <DropdownMenuItem>
                    <CircleUserRound className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Plane className="mr-2 h-4 w-4" />
                    <span>Trips</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Gift className="mr-2 h-4 w-4" />
              <span>Gift cards</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </DropdownMenuItem>
            {isLoggedIn && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
