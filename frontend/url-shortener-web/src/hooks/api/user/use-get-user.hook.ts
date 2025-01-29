import { useEffect, useState } from "react";
import { User } from "./user.type";
import { getDataFromStorage } from "@/lib/utils/get-data-from-storage.util";
import { UseGetOptions } from "@/hooks/utils/types/base-hook.type";

export function useGetUser(options?: UseGetOptions<User | null>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    (async () => {
      try {
        const userString = await getDataFromStorage('user');
        const _user = userString ? JSON.parse(userString) : null;
        setUser(_user);
        options?.onSuccess?.(_user);
      } catch (error: any) {
        setError(error.message);
        options?.onError?.(error);
      }
      setLoading(false);
      options?.onFinally?.();
    })();
  }, [])

  return { loading, error, user };
}