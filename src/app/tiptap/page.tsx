"use client";

import dynamic from "next/dynamic";

const TiptapMarkdownEditor = dynamic(
  () => import("@/components/features/tiptap/TiptapMarkdownEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    ),
  },
);

export default function TiptapPage() {
  return (
    <div className="bg-card rounded-lg shadow-sm border">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Markdown Editor
        </h2>
        <p className="text-muted-foreground mb-6">
          Tiptapを使用したリッチテキストエディターです。Markdown記法をサポートしています。
        </p>
        <TiptapMarkdownEditor />
      </div>
    </div>
  );
}
