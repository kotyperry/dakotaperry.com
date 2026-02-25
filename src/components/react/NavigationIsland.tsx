import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Menu from "./Menu";
import Navigation from "./Navigation";

export default function NavigationIsland() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navigation onMenuClick={() => setMenuOpen(true)} />
      <AnimatePresence>
        {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
