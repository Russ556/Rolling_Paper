export type Cabinet = {
    id: number
    owner_name: string
    password: string
    created_at: string
}

export type Message = {
    id: number
    cabinet_id: number
    author: string
    message: string
    created_at: string
}

export type CabinetWithMessageCount = Cabinet & {
    messageCount: number
}
