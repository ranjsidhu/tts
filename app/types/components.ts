type NavbarProps = {
  onNavbarOpen: Function;
};

type MenuButtonProps = {
  toggleMenu: () => void;
  isMobileMenuOpen: boolean;
  "data-testid": string;
};

export type { NavbarProps, MenuButtonProps };
