import MainLayout from "@/components/layouts/Main";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { LoadingContext } from "@/contexts/loading/loading.context";
import { UserContext } from "@/contexts/user/user.context";
import { useCreateShortUrl } from "@/hooks/api/url-shortener/use-create-short-url.hook";
import { Link, Copy } from "lucide-react";
import { useContext, useRef, useState } from "react";

export default function Home() {
  console.log("Home")
  const { id } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [shortened, setShortened] = useState<string>('');
  const urlRef = useRef<HTMLInputElement>(null);
  const { mutation } = useCreateShortUrl({
    onSuccess: (data) => {
      setShortened(data?.shortenedUrl ?? "")
    },
    onError: (error) => {
      console.log('Error shortening URL:', error.message);
    },
    onFinally: () => {
      setIsLoading(false);
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const url = urlRef?.current?.value || "";
    mutation({ url, createdBy: id });
  };
  return (
    <MainLayout>
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Link className="text-blue-600" size={28} />
            UrlShortener
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="url"
                placeholder="Paste your long URL here..."
                className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                required
                ref={urlRef}
              />
              <Link className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Shorten URL
            </button>
          </form>

          {shortened && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-900">{shortened}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(shortened)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  )
}