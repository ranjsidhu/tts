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

export type {
  MenuButtonProps,
  LoadingSpinnerProps,
  LayoutProps,
  FormData,
  FormErrors,
  MobileMenuProps,
};
