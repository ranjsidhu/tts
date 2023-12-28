"use client";

import { useEffect } from "react";
import { usePathname, notFound } from "next/navigation";
import routes from "../static/routes";

export default function PathnameHook() {
  const pathname = usePathname();
  const mappedRoutes = routes.map((route) => route.route);

  useEffect(() => {
    if (!mappedRoutes.includes(pathname)) notFound();
  }, [pathname, mappedRoutes]);

  return <></>;
}
