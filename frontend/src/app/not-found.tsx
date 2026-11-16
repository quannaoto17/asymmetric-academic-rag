import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-2 rounded-full bg-muted p-3">
            <FileQuestion className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">404 — Không tìm thấy trang</CardTitle>
          <CardDescription>
            Đường dẫn bạn truy cập không tồn tại hoặc môn học đã bị xóa.
          </CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter className="justify-center">
          <Button asChild>
            <Link href="/">Quay về danh sách môn học</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
