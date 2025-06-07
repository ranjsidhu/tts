import { Role } from "@/generated/prisma";
import type { Session } from "next-auth";

type MenuButtonProps = {
  toggleMenu: () => void;
  isMobileMenuOpen: boolean;
  "data-testid": string;
};

type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large";
};

type LayoutProps = {
  children: React.ReactNode;
};

type FormData = {
  studentName: string;
  parentName: string;
  parentPhone: string;
  message: string;
};

type FormErrors = {
  studentName?: string;
  parentName?: string;
  parentPhone?: string;
  message?: string;
};

type MobileMenuProps = {
  toggleMenu: () => void;
};

type NavbarProps = {
  session: Session | null;
};

type AuthWrapperProps = Readonly<{
  children: React.ReactNode;
  role?: Role | Role[];
}>;

type User = Readonly<{
  id: number;
  name: string;
  email: string;
  first_line_address: string | null;
  town: string | null;
  city: string | null;
  postcode: string | null;
  dob: Date | null;
  phone: string | null;
  role: Role;
}>;

export type {
  MenuButtonProps,
  LoadingSpinnerProps,
  LayoutProps,
  FormData,
  FormErrors,
  MobileMenuProps,
  NavbarProps,
  AuthWrapperProps,
  Role,
  User,
};
