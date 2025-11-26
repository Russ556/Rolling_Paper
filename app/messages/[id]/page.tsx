"use client"

import { use, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MessageSquare, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import useEmblaCarousel from "embla-carousel-react"
import { getMessagesByCabinetId } from "@/lib/api/messages"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  authorName: string
  content: string
  createdAt: string
}

export default function MessagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carousel state for the modal
  const [isOpen, setIsOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  // emblaRef and emblaApi will be defined inside the DialogContent
  // currentIndex will be managed by the modal's carousel

  // Load messages from Supabase
  useEffect(() => {
    loadMessages()
  }, [id])

  // Sync start index when opening
  useEffect(() => {
    // This useEffect is for when the dialog opens and the emblaApi is initialized
    // The actual emblaApi and its state are managed within the DialogContent
  }, [isOpen, startIndex])

  const loadMessages = async () => {
    setIsLoading(true)
    const cabinetId = parseInt(id, 10)
    const data = await getMessagesByCabinetId(cabinetId)

    // Transform database format to UI format
    const transformedMessages: Message[] = data.map((msg) => ({
      id: msg.id,
      authorName: msg.author,
      content: msg.message,
      createdAt: msg.created_at,
    }))

    setMessages(transformedMessages)
    setIsLoading(false)
  }

  const openCarousel = (index: number) => {
    setStartIndex(index)
    setIsOpen(true)
  }

  // scrollPrev and scrollNext will be defined within the DialogContent,
  // operating on the emblaApi instance specific to the modal.

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">받은 메시지</h1>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-6 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">받은 메시지</h1>
            <p className="text-xs text-muted-foreground">{messages.length}개의 메시지</p>
          </div>
        </div>
      </header>

      {/* Messages Grid (Preview) */}
      <main className="flex-1 px-4 py-6 mx-auto w-full max-w-5xl">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <MessageSquare className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold mb-2">아직 받은 메시지가 없어요</h2>
            <p className="text-sm text-muted-foreground">친구들이 메시지를 남기면 여기에 표시됩니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {messages.map((message, index) => (
              <Card
                key={message.id}
                className="p-4 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 group"
                onClick={() => openCarousel(index)}
              >
                <div className="flex flex-col h-full gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base truncate pr-2">{message.authorName}</h3>
                    <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1 break-words">
                    {message.content}
                  </p>
                  <p className="text-xs text-muted-foreground/50 pt-2 border-t mt-1">
                    {new Date(message.createdAt).toLocaleDateString("ko-KR", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Carousel Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 gap-0 bg-transparent border-none shadow-none sm:bg-transparent sm:shadow-none">
          <DialogTitle className="sr-only">메시지 상세 보기</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Close Button */}
            <DialogClose className="absolute right-0 top-0 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors -translate-y-12 sm:-translate-y-12 sm:translate-x-0 translate-x-2">
              <X className="h-6 w-6" />
              <span className="sr-only">닫기</span>
            </DialogClose>

            {/* Carousel Container */}
            <CarouselModalContent messages={messages} startIndex={startIndex} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Separate component for the modal content to manage its own Embla Carousel state
function CarouselModalContent({ messages, startIndex }: { messages: Message[]; startIndex: number }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center", startIndex })
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  // Update current index when carousel scrolls
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect) // Re-initialize on reInit (e.g., when dialog opens)
    onSelect() // Set initial index

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  // Scroll to the correct start index when the modal is opened/re-rendered
  useEffect(() => {
    if (emblaApi && startIndex !== currentIndex) {
      emblaApi.scrollTo(startIndex, false) // false for instant scroll
      setCurrentIndex(startIndex)
    }
  }, [emblaApi, startIndex, currentIndex]);


  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="w-full h-full max-h-[80vh] bg-background rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {messages.map((message) => (
            <div key={message.id} className="flex-[0_0_100%] min-w-0 h-full relative">
              <div className="h-full flex flex-col p-6 sm:p-10 overflow-hidden">
                {/* Header */}
                <div className="mb-6 pb-4 border-b flex-shrink-0">
                  <h3 className="text-2xl font-bold">{message.authorName}님의 메시지</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(message.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="h-16 border-t bg-muted/10 flex items-center justify-between px-6 flex-shrink-0">
        <div className="text-sm font-medium text-muted-foreground">
          {currentIndex + 1} / {messages.length}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={currentIndex === 0}
            className="h-9 w-9 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={currentIndex === messages.length - 1}
            className="h-9 w-9 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
