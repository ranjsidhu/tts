type NavbarProps = {
  onNavbarOpen: Function;
};

type MenuButtonProps = {
  toggleMenu: () => void;
  isMobileMenuOpen: boolean;
  "data-testid": string;
};

type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large";
};

export type { NavbarProps, MenuButtonProps, LoadingSpinnerProps };
