import { useCallback, useEffect, useState } from "react";

export function useIsMounted(): () => boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return useCallback(() => isMounted, [isMounted]);
}
