import { useEffect, useState } from "react";
import { isElectron } from "@/lib/electron";

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

    const clearExistingServiceWorkers = async () => {
      if (!isSupported) return;
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map((registration) => registration.unregister()),
        );

        if ("caches" in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map((name) => caches.delete(name)));
        }
      } catch (error) {
        console.error("[SW] Cleanup failed:", error);
      }
    };

    void clearExistingServiceWorkers();
    setState({ isSupported: false, isRegistered: false, updateAvailable: false });
  }, []);

  return state;
}
