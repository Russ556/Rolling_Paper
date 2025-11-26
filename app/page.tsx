"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { EmptyState } from "@/components/empty-state"
import { FloatingActionButton } from "@/components/floating-action-button"
import { CreateCabinetSheet } from "@/components/create-cabinet-sheet"
import { CabinetList } from "@/components/cabinet-list"
import { RoleSelectionDialog } from "@/components/role-selection-dialog"
import { getCabinets, createCabinet, verifyCabinetPassword, deleteCabinet } from "@/lib/api/cabinets"
import type { CabinetWithMessageCount } from "@/lib/database.types"

export type Cabinet = {
  id: string
  ownerName: string
  password: string
  messageCount: number
  createdAt: string
}

export default function Home() {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
  const [cabinets, setCabinets] = useState<Cabinet[]>([])
  const [selectedCabinet, setSelectedCabinet] = useState<Cabinet | null>(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load cabinets from Supabase on mount
  useEffect(() => {
    loadCabinets()
  }, [])

  const loadCabinets = async () => {
    setIsLoading(true)
    const data = await getCabinets()

    // Transform database format to UI format
    const transformedCabinets: Cabinet[] = data.map((cabinet) => ({
      id: cabinet.id,
      ownerName: cabinet.owner_name,
      password: cabinet.password,
      messageCount: cabinet.messageCount,
      createdAt: cabinet.created_at,
    }))

    setCabinets(transformedCabinets)
    setIsLoading(false)
  }

  const handleCreateCabinet = async (cabinetData: { ownerName: string; password: string }) => {
    const newCabinet = await createCabinet(cabinetData.ownerName, cabinetData.password)

    if (newCabinet) {
      // Reload cabinets to get updated list
      await loadCabinets()
    }
  }

  const handleCabinetClick = (cabinet: Cabinet) => {
    setSelectedCabinet(cabinet)
    setIsRoleDialogOpen(true)
  }

  const handleDeleteCabinet = async (cabinetId: string, password: string) => {
    // Verify password
    const isValid = await verifyCabinetPassword(cabinetId, password)

    if (!isValid) {
      throw new Error("비밀번호가 일치하지 않습니다")
    }

    // Delete cabinet
    const success = await deleteCabinet(cabinetId)

    if (!success) {
      throw new Error("캐비넷 삭제에 실패했습니다")
    }

    // Reload cabinets
    await loadCabinets()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 p-4">
        {cabinets.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <EmptyState onCreateClick={() => setIsCreateSheetOpen(true)} />
          </div>
        ) : (
          <CabinetList cabinets={cabinets} onCabinetClick={handleCabinetClick} onDelete={handleDeleteCabinet} />
        )}
      </main>
      <FloatingActionButton onClick={() => setIsCreateSheetOpen(true)} />

      <CreateCabinetSheet
        open={isCreateSheetOpen}
        onOpenChange={setIsCreateSheetOpen}
        onCreateCabinet={handleCreateCabinet}
      />

      {selectedCabinet && (
        <RoleSelectionDialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen} cabinet={selectedCabinet} />
      )}
    </div>
  )
}
