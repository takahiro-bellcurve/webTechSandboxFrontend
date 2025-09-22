import TiptapMarkdownEditor from "@/components/features/tiptap/TiptapMarkdownEditor";

export const TiptapPage = () => {
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
};
