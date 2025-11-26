"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Cabinet } from "@/app/page"

type DeleteCabinetDialogProps = {
    cabinet: Cabinet
    onDelete: (cabinetId: number, password: string) => Promise<void>
}

export function DeleteCabinetDialog({ cabinet, onDelete }: DeleteCabinetDialogProps) {
    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState("")

    const handleDelete = async () => {
        if (!password.trim()) {
            setError("비밀번호를 입력해주세요")
            return
        }

        setIsDeleting(true)
        setError("")

        try {
            await onDelete(cabinet.id, password)
            setOpen(false)
            setPassword("")
        } catch (err) {
            setError(err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!isDeleting) {
            setOpen(newOpen)
            if (!newOpen) {
                setPassword("")
                setError("")
            }
        }
    }

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                }}
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <AlertDialog open={open} onOpenChange={handleOpenChange}>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>캐비넷 삭제</AlertDialogTitle>
                        <AlertDialogDescription>
                            "{cabinet.ownerName}"님의 캐비넷을 삭제하시겠습니까?
                            <br />
                            이 작업은 되돌릴 수 없으며, 모든 메시지도 함께 삭제됩니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-2 py-4">
                        <Label htmlFor="delete-password">비밀번호 확인</Label>
                        <Input
                            id="delete-password"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError("")
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleDelete()
                                }
                            }}
                            disabled={isDeleting}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete()
                            }}
                            disabled={isDeleting}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {isDeleting ? "삭제 중..." : "삭제"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
