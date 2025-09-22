import CubeAnimation from "@/components/features/topPage/CubeAnimation";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <CubeAnimation />
      <div className="relative z-10 font-sans flex flex-col items-center justify-center min-h-screen p-8">
        <main className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-gray-800">
            Web Tech Sandbox
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            気ままにいろいろ検証するためのサンドボックス
          </p>
          <div className="flex gap-4 justify-center">
            <a
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              href="#"
            >
              Get Started
            </a>
            <a
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              href="#"
            >
              Learn More
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
