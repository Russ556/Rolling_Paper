export type Cabinet = {
    id: string
    owner_name: string
    password: string
    created_at: string
}

export type Message = {
    id: string
    cabinet_id: string
    author: string
    message: string
    created_at: string
}

export type CabinetWithMessageCount = Cabinet & {
    messageCount: number
}
