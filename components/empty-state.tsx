"use client"

import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onCreateClick: () => void
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto">
      <div className="rounded-full bg-muted p-6 mb-6">
        <BookOpen className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
      </div>

      <h2 className="text-xl font-semibold text-foreground mb-2 text-balance">아직 롤링페이퍼가 없어요</h2>

      <p className="text-sm text-muted-foreground mb-8 leading-relaxed text-balance">
        {"새로운 롤링페이퍼를 만들어 소중한 메시지를 받아보세요"}
      </p>

      <Button onClick={onCreateClick} size="lg" className="w-full max-w-xs">
        새 롤링페이퍼 만들기
      </Button>
    </div>
  )
}
