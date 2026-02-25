"use client";

import { useEffect, useState, useRef } from "react";
import { fetchCarAvailability } from "@/lib/car-availability";

export function useCarAvailabilityPolling(
  initial: Record<string, "on" | "off">,
  intervalMs: number = 10000,
) {
  const [availability, setAvailability] = useState(initial);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Pause polling saat tab tidak aktif
    const handleVisibility = () =>
      setIsPolling(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!isPolling) return;

    const poll = async () => {
      const data = await fetchCarAvailability();
      if (Object.keys(data).length > 0) {
        setAvailability(data);
        setLastUpdate(new Date());
      }
    };

    const timeout = setTimeout(poll, 5000); // poll pertama setelah 5 detik
    intervalRef.current = setInterval(poll, intervalMs);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intervalMs, isPolling]);

  return { availability, lastUpdate, isPolling };
}
