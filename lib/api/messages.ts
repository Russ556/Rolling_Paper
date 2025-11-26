import { supabase } from '../supabase'
import type { Message } from '../database.types'

export async function createMessage(
    cabinetId: number,
    authorName: string,
    content: string
): Promise<Message | null> {
    const { data, error } = await supabase
        .from('Rolling_Paper')
        .insert([{ cabinet_id: cabinetId, author: authorName, message: content }])
        .select()
        .single()

    if (error) {
        console.error('Error creating message:', error)
        return null
    }

    return data
}

export async function getMessagesByCabinetId(cabinetId: number): Promise<Message[]> {
    const { data, error } = await supabase
        .from('Rolling_Paper')
        .select('*')
        .eq('cabinet_id', cabinetId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching messages:', error)
        return []
    }

    return data || []
}

export async function getMessageCount(cabinetId: number): Promise<number> {
    const { count, error } = await supabase
        .from('Rolling_Paper')
        .select('*', { count: 'exact', head: true })
        .eq('cabinet_id', cabinetId)

    if (error) {
        console.error('Error counting messages:', error)
        return 0
    }

    return count || 0
}
