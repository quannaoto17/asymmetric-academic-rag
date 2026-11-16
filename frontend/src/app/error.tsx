"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle className="text-lg">Đã xảy ra sự cố</CardTitle>
          </div>
          <CardDescription>
            Ứng dụng gặp lỗi không mong muốn khi xử lý yêu cầu của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground break-words">
            {error.message || "Unknown application error"}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Thử lại
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
