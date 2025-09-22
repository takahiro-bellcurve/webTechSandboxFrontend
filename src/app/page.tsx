import CubeAnimation from "@/components/features/topPage/CubeAnimation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <CubeAnimation key="top-page-animation" />
      <div className="relative z-10 font-sans flex flex-col items-center justify-center min-h-screen p-8">
        <main className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-foreground">
            Web Tech Sandbox
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            気ままにいろいろ検証するためのサンドボックス
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="default">
              <a href="/index">一覧を見る</a>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
