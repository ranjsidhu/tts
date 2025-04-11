import { motion } from "framer-motion";

interface MenuButtonProps {
  toggleMenu: () => void;
  isMobileMenuOpen: boolean;
  "data-testid": string;
}

const MenuButton = ({
  toggleMenu,
  isMobileMenuOpen,
  "data-testid": dataTestId,
}: MenuButtonProps) => {
  return (
    <button
      data-testid={dataTestId}
      onClick={toggleMenu}
      className="sm:hidden p-2 -mr-2 flex flex-col justify-center items-center w-12 h-12 group"
      aria-label="Toggle menu"
    >
      <motion.div className="flex flex-col justify-center items-center gap-1.5 w-6">
        {/* Top line */}
        <motion.span
          animate={{
            rotate: isMobileMenuOpen ? 45 : 0,
            translateY: isMobileMenuOpen ? 10 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-6 h-0.5 bg-black origin-center transform-gpu"
        />

        {/* Middle line */}
        <motion.span
          animate={{
            scale: isMobileMenuOpen ? 0 : 1,
            opacity: isMobileMenuOpen ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-6 h-0.5 bg-black transform-gpu"
        />

        {/* Bottom line */}
        <motion.span
          animate={{
            rotate: isMobileMenuOpen ? -45 : 0,
            translateY: isMobileMenuOpen ? -10 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-6 h-0.5 bg-black origin-center transform-gpu"
        />
      </motion.div>
    </button>
  );
};

export default MenuButton;
