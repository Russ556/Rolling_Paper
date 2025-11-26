"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingActionButtonProps {
  onClick: () => void
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      aria-label="새 롤링페이퍼 만들기"
    >
      <Plus className="h-6 w-6" strokeWidth={2} />
    </Button>
  )
}
