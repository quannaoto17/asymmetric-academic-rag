"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle, BookOpen, FileText, GraduationCap } from "lucide-react";
import { apiClient, extractProblemMessage } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type CourseResponse = components["schemas"]["CourseResponse"];

export default function CourseComparisonWorkspacePage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;

  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadCourse() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const { data } = await apiClient.GET("/api/v1/courses/{courseId}", {
          params: { path: { courseId } },
        });
        if (active && data) {
          setCourse(data);
        }
      } catch (err) {
        if (active) {
          setErrorMsg(extractProblemMessage(err));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadCourse();
    return () => {
      active = false;
    };
  }, [courseId]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {loading ? (
            <Skeleton className="h-8 w-64" />
          ) : (
            <div className="flex items-center gap-2.5">
              <Badge>{course?.code ?? "COURSE"}</Badge>
              <h1 className="text-2xl font-bold tracking-tight">
                {course?.name ?? "Không gian đối chiếu Slide ↔ Sách"}
              </h1>
            </div>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            {course?.description ||
              "Cột trái giữ nguồn CHÍNH (PRIMARY), cột phải hiển thị mục sách PHỤ (SECONDARY) được ánh xạ và cảnh báo sai lệch."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/courses/${courseId}/documents`}>
              <FileText className="h-4 w-4" />
              Quản lý tài liệu
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/courses/${courseId}/study`}>
              <GraduationCap className="h-4 w-4" />
              Hỏi đáp & Quiz
            </Link>
          </Button>
        </div>
      </div>

      {errorMsg && (
        <Alert variant="destructive">
          <AlertTitle>Không tải được thông tin môn học</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      {/* Split Asymmetric Comparison Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: PRIMARY Lecture Slides */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Tài liệu CHÍNH (PRIMARY)</CardTitle>
              <Badge>Slide / Đề cương</Badge>
            </div>
            <CardDescription>
              Danh sách các mục và trang Slide được chọn làm chuẩn phạm vi học tập.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ScrollArea className="h-[460px] p-6">
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                <FileText className="h-8 w-8 mb-3 opacity-60" />
                <p className="text-sm font-medium text-foreground">Chưa có Slide PRIMARY nào được bóc tách</p>
                <p className="mt-1 max-w-sm text-xs">
                  Tải lên file `.pptx` hoặc `.pdf` bài giảng tại trang Quản lý tài liệu để bắt đầu ánh xạ.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href={`/courses/${courseId}/documents`}>Tải tài liệu lên</Link>
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Column: SECONDARY Textbook & Discrepancy Alerts */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Sách giáo trình PHỤ (SECONDARY)</CardTitle>
              <Badge variant="secondary">English Textbook</Badge>
            </div>
            <CardDescription>
              Mục giáo trình tiếng Anh tương ứng và cảnh báo lược bỏ điều kiện biên / lệch khái niệm.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ScrollArea className="h-[460px] p-6">
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Cảnh báo đối chiếu bất đối xứng</AlertTitle>
                  <AlertDescription>
                    Khi phát hiện Slide giảng viên rút gọn điều kiện biên hoặc khác ký hiệu so với giáo trình, hệ thống sẽ gắn cờ tại đây nhưng vẫn ưu tiên chuẩn Slide khi ôn thi.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <BookOpen className="h-8 w-8 mb-3 opacity-60" />
                  <p className="text-sm font-medium text-foreground">Chưa có mục sách SECONDARY được ánh xạ</p>
                  <p className="mt-1 max-w-sm text-xs">
                    Hãy nạp cả Slide PRIMARY và Giáo trình SECONDARY để chạy đối chiếu tự động.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
