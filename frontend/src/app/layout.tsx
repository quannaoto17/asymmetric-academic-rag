import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Asymmetric Academic RAG Platform",
  description:
    "Đối chiếu slide bài giảng (PRIMARY) với sách giáo trình tiếng Anh (SECONDARY), phát hiện sai lệch và ôn tập song ngữ Anh–Việt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
