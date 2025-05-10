"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/auth";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          dispatch(setUser(userData));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch(setUser(null));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
}
