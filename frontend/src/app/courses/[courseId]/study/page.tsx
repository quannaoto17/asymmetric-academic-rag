"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MessageSquare, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseStudyPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const [question, setQuestion] = useState("");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-3 mb-1">
          <Link href={`/courses/${courseId}`}>
            <ArrowLeft className="h-4 w-4" />
            Quay lại không gian đối chiếu
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Hỏi đáp song ngữ Anh–Việt & Quiz</h1>
        <p className="text-sm text-muted-foreground">
          Giải thích tiếng Việt nhưng khóa thuật ngữ chuyên ngành gốc tiếng Anh, bám sát phạm vi Slide bài giảng.
        </p>
      </div>

      <Tabs defaultValue="qa" className="space-y-4">
        <TabsList>
          <TabsTrigger value="qa">Hỏi đáp song ngữ (EN–VI)</TabsTrigger>
          <TabsTrigger value="quiz">Quiz bám sát Slide</TabsTrigger>
        </TabsList>

        <TabsContent value="qa">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Hỏi đáp trong phạm vi bài giảng</CardTitle>
                <Badge variant="secondary">Locked English Terms</Badge>
              </div>
              <CardDescription>
                Hệ thống truy xuất Hybrid Search trên cả nguồn PRIMARY và SECONDARY trước khi tổng hợp bằng Gemini 2.5 Flash.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ví dụ: Điều kiện cần và đủ để xảy ra Deadlock là gì?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Button type="button" disabled={!question.trim()}>
                  <MessageSquare className="h-4 w-4" />
                  Hỏi
                </Button>
              </div>

              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Chế độ khung (Scaffolding)</AlertTitle>
                <AlertDescription>
                  API hỏi đáp song ngữ (`/qa`) sẽ trả về câu trả lời kèm danh sách thuật ngữ gốc được khóa (ví dụ: `Mutual Exclusion`, `Circular Wait`) và trích dẫn từng nguồn.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Sinh bộ câu hỏi ôn tập theo phạm vi Slide</CardTitle>
                <Badge>PRIMARY Scoped</Badge>
              </div>
              <CardDescription>
                Không sinh câu hỏi vượt quá nội dung giảng dạy trên Slide và Đề cương môn học.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button type="button" variant="outline" disabled>
                <Sparkles className="h-4 w-4" />
                Sinh 5 câu hỏi trắc nghiệm từ Slide
              </Button>
              <p className="text-sm text-muted-foreground">
                Chưa có tài liệu PRIMARY được ingest cho môn học này.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
