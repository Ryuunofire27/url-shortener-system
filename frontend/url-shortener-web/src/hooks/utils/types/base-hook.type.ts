export type UseBaseOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
}

export type UseGetOptions<T> = UseBaseOptions<T>;

export type UsePostOptions<T> = UseBaseOptions<T> & {
  onSuccess?: (data?: T) => void;
}