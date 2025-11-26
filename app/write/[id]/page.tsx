"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { createMessage } from "@/lib/api/messages"

export default function WritePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()

  const [authorName, setAuthorName] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const STORAGE_KEY_AUTHOR = `rolling_paper_${id}_author`
  const STORAGE_KEY_CONTENT = `rolling_paper_${id}_content`

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedAuthor = localStorage.getItem(STORAGE_KEY_AUTHOR)
    const savedContent = localStorage.getItem(STORAGE_KEY_CONTENT)

    if (savedAuthor) setAuthorName(savedAuthor)
    if (savedContent) setContent(savedContent)
  }, [id])

  // Auto-save author name to localStorage
  useEffect(() => {
    if (authorName) {
      localStorage.setItem(STORAGE_KEY_AUTHOR, authorName)
    }
  }, [authorName, STORAGE_KEY_AUTHOR])

  // Auto-save content to localStorage
  useEffect(() => {
    if (content) {
      localStorage.setItem(STORAGE_KEY_CONTENT, content)
    }
  }, [content, STORAGE_KEY_CONTENT])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authorName.trim() || !content.trim()) {
      toast({
        title: "입력 오류",
        description: "작성자 이름과 내용을 모두 입력해주세요",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Save message to Supabase
    const cabinetId = parseInt(id, 10)
    const message = await createMessage(cabinetId, authorName, content)

    if (message) {
      // Clear localStorage after successful submission
      localStorage.removeItem(STORAGE_KEY_AUTHOR)
      localStorage.removeItem(STORAGE_KEY_CONTENT)

      toast({
        title: "메시지 전송 완료",
        description: "롤링페이퍼에 소중한 메시지가 담겼습니다",
      })

      // Navigate back to main page
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } else {
      toast({
        title: "전송 실패",
        description: "메시지 전송 중 오류가 발생했습니다",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">롤링페이퍼 작성</h1>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="author" className="text-base">
              작성자 이름
            </Label>
            <Input
              id="author"
              type="text"
              placeholder="이름을 입력하세요"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="h-12 text-base"
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-base">
              메시지 내용
            </Label>
            <Textarea
              id="content"
              placeholder="전하고 싶은 마음을 자유롭게 작성하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[320px] resize-none text-base leading-relaxed"
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground">작성 중인 내용은 자동으로 저장됩니다</p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-base"
            disabled={isSubmitting || !authorName.trim() || !content.trim()}
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                전송 중...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                메시지 남기기
              </>
            )}
          </Button>
        </form>
      </main>
    </div>
  )
}
