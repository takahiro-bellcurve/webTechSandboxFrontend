import { ArrowRight, Edit, MessageCircle, Table } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProjectStatus = {
  TODO: "未着手",
  IN_PROGRESS: "進行中",
  DONE: "完成",
} as const;

const pages = [
  {
    title: "Tiptap Markdown Editor",
    description: "Tiptapを使ったマークダウンエディター",
    href: "/tiptap",
    icon: Edit,
    tags: ["Tiptap", "Markdown", "WYSIWYG", "Editor"],
    status: ProjectStatus.IN_PROGRESS,
    textColor: "text-green-800",
    bgColor: "bg-green-100",
  },
  {
    title: "Tanstack Table",
    description: "Tanstack Tableを使ったテーブル",
    href: "/tanstack-table",
    icon: Table,
    tags: ["Tanstack Table", "Table", "React", "Typescript"],
    status: ProjectStatus.TODO,
    textColor: "text-yellow-800",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Socket Messaging",
    description: "socket通信を使ったチャット機能",
    href: "/socket-messaging",
    icon: MessageCircle,
    tags: ["Socket", "Messaging", "React", "Typescript"],
    status: ProjectStatus.TODO,
    textColor: "text-yellow-800",
    bgColor: "bg-yellow-100",
  },
];

export const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Card
                key={page.href}
                className="group hover:shadow-lg transition-all duration-300 border-border"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span
                      className={`text-xs ${page.bgColor} ${page.textColor} px-2 py-1 rounded-full`}
                    >
                      {page.status}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {page.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {page.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    disabled={page.status === ProjectStatus.TODO}
                  >
                    <Link href={page.href} className="flex items-center">
                      確認する
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
