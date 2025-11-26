"use client"

import { Lock, MessageSquare, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { DeleteCabinetDialog } from "@/components/delete-cabinet-dialog"
import type { Cabinet } from "@/app/page"

interface CabinetListProps {
  cabinets: Cabinet[]
  onCabinetClick: (cabinet: Cabinet) => void
  onDelete: (cabinetId: string, password: string) => Promise<void>
}

export function CabinetList({ cabinets, onCabinetClick, onDelete }: CabinetListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 pb-24">
      {cabinets.map((cabinet) => (
        <Card
          key={cabinet.id}
          className="relative overflow-hidden cursor-pointer transition-all hover:shadow-lg active:scale-95 border-2"
          onClick={() => onCabinetClick(cabinet)}
        >
          {/* Delete button - top right */}
          <div className="absolute top-2 right-2 z-10">
            <DeleteCabinetDialog cabinet={cabinet} onDelete={onDelete} />
          </div>

          <div className="p-4 space-y-3">
            {/* Owner icon */}
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>

            {/* Owner name */}
            <h3 className="font-semibold text-lg line-clamp-1">{cabinet.ownerName}님의</h3>
            <p className="text-sm text-muted-foreground">롤링페이퍼</p>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{cabinet.messageCount}개의 메시지</span>
              </div>
              <Lock className="h-4 w-4" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
