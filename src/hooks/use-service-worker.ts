import { useEffect, useState } from "react";
import { isElectron } from "@/lib/electron";
import { getBasePath } from "@/lib/base-path";

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  updateAvailable: boolean;
}

export function useServiceWorker(): ServiceWorkerState {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    updateAvailable: false,
  });

  useEffect(() => {
    const isSupported =
      "serviceWorker" in navigator && !isElectron() && import.meta.env.PROD;

    setState((prev) => ({ ...prev, isSupported }));

    const registerServiceWorker = async () => {
      if (!isSupported) return;
      try {
        const registration = await navigator.serviceWorker.register(
          `${getBasePath()}/sw.js`,
          { updateViaCache: "none" },
        );
        await registration.update();

        setState({
          isSupported: true,
          isRegistered: true,
          updateAvailable: false,
        });
      } catch (error) {
        console.error("[SW] Registration failed:", error);
        setState({
          isSupported: true,
          isRegistered: false,
          updateAvailable: false,
        });
      }
    };

    if (document.readyState === "complete") {
      void registerServiceWorker();
    } else {
      window.addEventListener("load", registerServiceWorker);
    }

    return () => {
      window.removeEventListener("load", registerServiceWorker);
    };
  }, []);

  return state;
}
