export type CreateShortURLData = {
  url: string;
  createdBy: string;
}

export type ShortURL = {
  id: string;
  shortenedUrl: string;
  originalUrl: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}