"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BookOpen, FileText, GitCompare, GraduationCap, LayoutDashboard } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type HealthState = {
  status: "LOADING" | "UP" | "DOWN";
  database?: string;
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams<{ courseId?: string }>();
  const courseId = params?.courseId;

  const [health, setHealth] = useState<HealthState>({ status: "LOADING" });

  useEffect(() => {
    let active = true;

    async function fetchHealth() {
      try {
        const { data } = await apiClient.GET("/api/v1/health");
        if (!active) return;
        if (data?.status === "UP") {
          setHealth({ status: "UP", database: data.database ?? "CONNECTED" });
        } else {
          setHealth({ status: "DOWN", database: data?.database ?? "DISCONNECTED" });
        }
      } catch {
        if (active) {
          setHealth({ status: "DOWN", database: "OFFLINE" });
        }
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    {
      label: "Môn học",
      href: "/",
      icon: LayoutDashboard,
      active: pathname === "/",
    },
    ...(courseId
      ? [
          {
            label: "Đối chiếu Slide ↔ Sách",
            href: `/courses/${courseId}`,
            icon: GitCompare,
            active: pathname === `/courses/${courseId}`,
          },
          {
            label: "Tài liệu PRIMARY / SECONDARY",
            href: `/courses/${courseId}/documents`,
            icon: FileText,
            active: pathname === `/courses/${courseId}/documents`,
          },
          {
            label: "Hỏi đáp & Quiz",
            href: `/courses/${courseId}/study`,
            icon: GraduationCap,
            active: pathname === `/courses/${courseId}/study`,
          },
        ]
      : []),
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Left Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
        <div className="flex h-14 items-center gap-2 border-b px-5">
          <BookOpen className="h-5 w-5 text-primary" />
          <Link href="/" className="font-semibold tracking-tight text-sm">
            Asymmetric Academic RAG
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <Separator className="mb-3" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ưu tiên tuyệt đối nguồn <span className="font-semibold text-foreground">PRIMARY</span> (Slide/Đề cương)
            khi đối chiếu giáo trình <span className="font-semibold text-foreground">SECONDARY</span>.
          </p>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <header className="flex h-14 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center gap-3 md:hidden">
            <BookOpen className="h-5 w-5 text-primary" />
            <Link href="/" className="font-semibold text-sm">
              Academic RAG
            </Link>
          </div>
          <div className="hidden md:block text-sm text-muted-foreground">
            Không gian học thuật bất đối xứng Anh–Việt
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Backend API:</span>
            {health.status === "LOADING" && (
              <Badge variant="secondary">Đang kiểm tra...</Badge>
            )}
            {health.status === "UP" && (
              <Badge className="bg-emerald-600 hover:bg-emerald-700">
                UP • DB {health.database}
              </Badge>
            )}
            {health.status === "DOWN" && (
              <Badge variant="destructive">
                DOWN • {health.database ?? "OFFLINE"}
              </Badge>
            )}
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
