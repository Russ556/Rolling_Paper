"use client"

import { useState } from "react"
import { Lock, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Cabinet } from "@/app/page"

interface PasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cabinet: Cabinet
}

export function PasswordDialog({ open, onOpenChange, cabinet }: PasswordDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleVerify = () => {
    if (password === cabinet.password) {
      setError(false)
      setPassword("")
      onOpenChange(false)

      // Navigate to owner's message list view
      router.push(`/messages/${cabinet.id}`)
    } else {
      setError(true)
    }
  }

  const handleClose = () => {
    setPassword("")
    setError(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lock className="h-5 w-5" />
            주인 확인
          </DialogTitle>
          <DialogDescription>{cabinet.ownerName}님의 롤링페이퍼에 접근하려면 비밀번호를 입력해주세요</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleVerify()
                }
              }}
              className={`h-12 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              autoFocus
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span>비밀번호가 일치하지 않습니다</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={handleClose}>
            취소
          </Button>
          <Button className="flex-1" onClick={handleVerify} disabled={!password.trim()}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
