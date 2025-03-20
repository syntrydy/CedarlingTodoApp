import { useState, useCallback } from "react";
import { cedarlingClient } from "../CedarlingClient";
import type { AuthorizeResult } from "@janssenproject/cedarling_wasm";

export function useCedarling() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const authorize = useCallback(
    async (request: any): Promise<AuthorizeResult | boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const enforce = import.meta.env.VITE_APP_ENFORCE_WITH_CEDARLING;
        if (enforce && enforce === "true") {
          return await cedarlingClient.authorize(request);
        }
        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Authorization failed");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  return { authorize, isLoading, error };
}
