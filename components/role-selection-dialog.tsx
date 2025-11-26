"use client"

import { useState } from "react"
import { User, PenLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PasswordDialog } from "@/components/password-dialog"
import type { Cabinet } from "@/app/page"

interface RoleSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cabinet: Cabinet
}

export function RoleSelectionDialog({ open, onOpenChange, cabinet }: RoleSelectionDialogProps) {
  const router = useRouter()
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)

  const handleOwnerSelect = () => {
    onOpenChange(false)
    setShowPasswordDialog(true)
  }

  const handleWriterSelect = () => {
    onOpenChange(false)
    router.push(`/write/${cabinet.id}`)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">{cabinet.ownerName}님의 롤링페이퍼</DialogTitle>
            <DialogDescription className="text-center">어떤 역할로 입장하시겠습니까?</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Owner Button */}
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 border-2 hover:border-primary hover:bg-primary/5 bg-transparent"
              onClick={handleOwnerSelect}
            >
              <User className="h-8 w-8" />
              <div>
                <div className="font-semibold">주인으로 입장</div>
                <div className="text-xs text-muted-foreground">메시지 목록 확인</div>
              </div>
            </Button>

            {/* Writer Button */}
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 border-2 hover:border-primary hover:bg-primary/5 bg-transparent"
              onClick={handleWriterSelect}
            >
              <PenLine className="h-8 w-8" />
              <div>
                <div className="font-semibold">메시지 작성하기</div>
                <div className="text-xs text-muted-foreground">롤링페이퍼에 메시지 남기기</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Dialog for Owner */}
      <PasswordDialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog} cabinet={cabinet} />
    </>
  )
}
