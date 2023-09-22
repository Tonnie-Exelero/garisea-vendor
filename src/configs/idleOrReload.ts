// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Context
import { useAuth } from "src/hooks/useAuth";

const whitelist = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];

const events = [
  "mousedown",
  "mousemove",
  "wheel",
  "keydown",
  "touchstart",
  "scroll",
];

export const idleTimer = () => {
  const router = useRouter();
  const { logout } = useAuth();

  let timeout: NodeJS.Timeout | null = null;

  const goBackToLogin = () => {
    window.localStorage.setItem(
      "iT",
      "You have been logged out because you refreshed the page or have been inactive."
    );
    logout();
  };

  const restartAutoReset = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      goBackToLogin();
    }, 1000 * 600); // Logout after 10 minutes of inactivity or reload.
  };

  const onEventStart = () => {
    restartAutoReset();
  };

  useEffect(() => {
    // Whitelist certain pages
    let preventReset = false;
    for (const path of whitelist) {
      if (path === router.pathname) {
        preventReset = true;
      }
    }
    if (preventReset) {
      return;
    }

    // Initiate timeout
    restartAutoReset();

    // Listen for events
    events.forEach((event) => window.addEventListener(event, onEventStart));

    // If page is reloaded, logout user and redirect to login
    window.addEventListener(
      "beforeunload",
      (event) => {
        goBackToLogin();
      },
      { capture: true }
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "beforeunload",
        (event) => {
          goBackToLogin();
        },
        { capture: true }
      );

      if (timeout) {
        clearTimeout(timeout);
        events.forEach((event) =>
          window.removeEventListener(event, onEventStart)
        );
      }
    };
  }, [router.pathname]);
};
