"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Plus } from "lucide-react";
import { apiClient, extractProblemMessage } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type CourseResponse = components["schemas"]["CourseResponse"];

export default function HomePage() {
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data } = await apiClient.GET("/api/v1/courses");
      setCourses(data ?? []);
    } catch (err) {
      setErrorMsg(extractProblemMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  async function handleCreateCourse(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!code.trim() || !name.trim()) {
      setFormError("Vui lòng nhập mã môn học và tên môn học.");
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await apiClient.POST("/api/v1/courses", {
        body: {
          code: code.trim(),
          name: name.trim(),
          description: description.trim() || undefined,
        },
      });
      if (data) {
        setCourses((prev) => [data, ...prev]);
      } else {
        await loadCourses();
      }
      setCode("");
      setName("");
      setDescription("");
      setOpen(false);
    } catch (err) {
      setFormError(extractProblemMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Danh sách môn học</h1>
          <p className="text-sm text-muted-foreground">
            Tạo không gian môn học để tải lên Slide bài giảng (PRIMARY) và Giáo trình tiếng Anh (SECONDARY).
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Tạo môn học
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Tạo môn học mới</DialogTitle>
                <DialogDescription>
                  Mỗi môn học quản lý riêng tập tài liệu PRIMARY và SECONDARY để tránh nhiễu ngữ cảnh.
                </DialogDescription>
              </DialogHeader>

              {formError && (
                <Alert variant="destructive">
                  <AlertTitle>Không thể tạo môn học</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="course-code" className="text-sm font-medium">
                    Mã môn học
                  </label>
                  <Input
                    id="course-code"
                    placeholder="VD: CS301"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="course-name" className="text-sm font-medium">
                    Tên môn học
                  </label>
                  <Input
                    id="course-name"
                    placeholder="VD: Operating Systems"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="course-desc" className="text-sm font-medium">
                    Mô tả đề cương (tùy chọn)
                  </label>
                  <Input
                    id="course-desc"
                    placeholder="VD: Process scheduling, Deadlocks, Virtual Memory..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={submitting}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
                  Hủy
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Đang tạo..." : "Lưu môn học"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {errorMsg && (
        <Alert variant="destructive">
          <AlertTitle>Không thể tải danh sách môn học</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>{errorMsg}</span>
            <Button size="sm" variant="outline" onClick={loadCourses}>
              Thử lại
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-3/4 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-14 text-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold">Chưa có môn học nào</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Bắt đầu bằng cách tạo môn học đầu tiên, sau đó tải lên Slide bài giảng và Sách giáo trình tiếng Anh để đối chiếu.
            </p>
            <Button className="mt-5" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" />
              Tạo môn học đầu tiên
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary">{course.code}</Badge>
                </div>
                <CardTitle className="text-lg pt-2">{course.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description || "Chưa có mô tả đề cương."}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/courses/${course.id}`}>
                    Mở không gian đối chiếu
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
