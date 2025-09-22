"use client";

import { ArrowRight, Box, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IndexPage() {
  const pages = [
    {
      title: "Three.js 3Dアニメーション",
      description: "Three.jsを使った3Dアニメーション",
      href: "/",
      icon: Box,
      tags: ["Three.js", "WebGL", "3D", "Animation"],
      status: "完成",
    },
    {
      title: "Tiptap エディター",
      description: "Tiptapを使ったマークダウンエディター",
      href: "/tiptap",
      icon: Edit,
      tags: ["Tiptap", "Markdown", "WYSIWYG", "Editor"],
      status: "完成",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            技術検証サンドボックス
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            気ままにいろいろ検証するためのサンドボックス
          </p>
        </div>

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
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
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
                  <Link href={page.href}>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      確認する
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
