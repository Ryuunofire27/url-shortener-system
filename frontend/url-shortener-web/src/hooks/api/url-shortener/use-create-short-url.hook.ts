import { UsePostOptions } from "@/hooks/utils/types/base-hook.type";
import { CreateShortURLData, ShortURL } from "./type";
import { useCallback, useMemo, useState } from "react";
import { env } from "@/data/env";


export function useCreateShortUrl(options?: UsePostOptions<ShortURL>){
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<ShortURL | null>(null);

  const url = useMemo(() => env.URL_SHORTENER_API || "/api", [env]);

  const mutation = useCallback(async (data: CreateShortURLData) => {
    try {
      console.log(data)
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(!response.ok){
        throw new Error("Response " + response.status);
      }
      const jsonResponse = await response.json();
      setShortUrl(jsonResponse);
      options?.onSuccess?.(jsonResponse);
    } catch (error: any) {
      setError(error.message);
      options?.onError?.(error);
    } finally{
      setLoading(false);
      options?.onFinally?.();
    }
  }, [url])

  return { loading, error, data: shortUrl, mutation };
}