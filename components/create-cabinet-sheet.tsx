"use client"

import { useState } from "react"
import { Lock, BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface CreateCabinetSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateCabinet: (data: { ownerName: string; password: string }) => void
}

const validatePassword = (password: string): boolean => {
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const isNumberOnly = /^[0-9]+$/.test(password)

  // Allow: (letters + numbers) OR (numbers only), minimum 4 characters
  return ((hasLetter && hasNumber) || isNumberOnly) && password.length >= 4
}

export function CreateCabinetSheet({ open, onOpenChange, onCreateCabinet }: CreateCabinetSheetProps) {
  const [ownerName, setOwnerName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleCreate = () => {
    if (!ownerName.trim() || !password.trim()) {
      return
    }

    if (!validatePassword(password)) {
      setPasswordError("영문+숫자 조합 또는 숫자만 4자리 이상 입력해주세요")
      return
    }

    onCreateCabinet({
      ownerName: ownerName,
      password: password,
    })

    // Reset form
    setOwnerName("")
    setPassword("")
    setPasswordError("")
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />새 롤링페이퍼 만들기
          </SheetTitle>
          <SheetDescription className="text-base">
            자신의 이름과 비밀번호를 입력하여 롤링페이퍼를 만들어보세요
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="owner-name" className="text-base font-medium">
              당신의 이름
            </Label>
            <Input
              id="owner-name"
              type="text"
              placeholder="예: 홍길동"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="h-12 text-base"
            />
            <p className="text-sm text-muted-foreground">롤링페이퍼 주인의 이름입니다</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cabinet-password" className="text-base font-medium flex items-center gap-2">
              <Lock className="h-4 w-4" />
              비밀번호 설정
            </Label>
            <Input
              id="cabinet-password"
              type="password"
              placeholder="영문+숫자 또는 숫자만 (4자리 이상)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError("")
              }}
              className={`h-12 text-base ${passwordError ? "border-red-500" : ""}`}
            />
            {passwordError ? (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span>{passwordError}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">주인만 메시지를 확인할 수 있는 비밀번호입니다</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12 bg-transparent" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button className="flex-1 h-12" onClick={handleCreate} disabled={!ownerName.trim() || !password.trim()}>
              만들기
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
