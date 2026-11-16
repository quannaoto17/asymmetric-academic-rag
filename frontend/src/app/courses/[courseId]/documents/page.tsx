"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, FileUp, Upload } from "lucide-react";
import { apiClient, extractProblemMessage } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DocumentResponse = components["schemas"]["DocumentResponse"];

export default function CourseDocumentsPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;

  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data } = await apiClient.GET("/api/v1/courses/{courseId}/documents", {
        params: { path: { courseId } },
      });
      setDocuments(data ?? []);
    } catch (err) {
      setErrorMsg(extractProblemMessage(err));
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const primaryDocs = documents.filter((doc) => doc.role === "PRIMARY");
  const secondaryDocs = documents.filter((doc) => doc.role === "SECONDARY");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-1">
            <Link href={`/courses/${courseId}`}>
              <ArrowLeft className="h-4 w-4" />
              Quay lại không gian đối chiếu
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý tài liệu môn học</h1>
          <p className="text-sm text-muted-foreground">
            Phân tách rõ nguồn CHÍNH (Slide, Đề cương) và nguồn PHỤ (Giáo trình tiếng Anh tham khảo).
          </p>
        </div>
      </div>

      {errorMsg && (
        <Alert variant="destructive">
          <AlertTitle>Không thể tải danh sách tài liệu</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* PRIMARY Upload Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Nguồn CHÍNH (PRIMARY)</CardTitle>
              <Badge>Slide / Đề cương</Badge>
            </div>
            <CardDescription>Hỗ trợ định dạng `.pptx` và `.pdf`.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
              <FileUp className="h-7 w-7 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Tải lên Slide bài giảng hoặc Đề cương</p>
              <p className="text-xs text-muted-foreground mt-1">
                Endpoint ingest sẽ được kết nối ở phase tiếp theo.
              </p>
              <Button variant="outline" size="sm" className="mt-3" disabled>
                <Upload className="h-4 w-4" />
                Chọn file PRIMARY (.pptx / .pdf)
              </Button>
            </div>

            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : primaryDocs.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">
                Chưa có tài liệu PRIMARY nào.
              </p>
            ) : (
              <ul className="space-y-2">
                {primaryDocs.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.fileName}</p>
                    </div>
                    <Badge variant="outline">{doc.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* SECONDARY Upload Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Nguồn PHỤ (SECONDARY)</CardTitle>
              <Badge variant="secondary">Giáo trình tiếng Anh</Badge>
            </div>
            <CardDescription>Hỗ trợ định dạng `.pdf` (tùy chọn Docling OCR).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
              <FileUp className="h-7 w-7 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Tải lên Sách giáo trình tiếng Anh</p>
              <p className="text-xs text-muted-foreground mt-1">
                Endpoint ingest sẽ được kết nối ở phase tiếp theo.
              </p>
              <Button variant="outline" size="sm" className="mt-3" disabled>
                <Upload className="h-4 w-4" />
                Chọn file SECONDARY (.pdf)
              </Button>
            </div>

            {loading ? (
              <Skeleton className="h-16 w-full" />
            ) : secondaryDocs.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">
                Chưa có tài liệu SECONDARY nào.
              </p>
            ) : (
              <ul className="space-y-2">
                {secondaryDocs.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.fileName}</p>
                    </div>
                    <Badge variant="outline">{doc.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
