import { supabase } from '../supabase'
import type { Cabinet, CabinetWithMessageCount } from '../database.types'

export async function createCabinet(ownerName: string, password: string): Promise<Cabinet | null> {
    const { data, error } = await supabase
        .from('cabinets')
        .insert([{ owner_name: ownerName, password }])
        .select()
        .single()

    if (error) {
        console.error('Error creating cabinet:', error)
        return null
    }

    return data
}

export async function getCabinets(): Promise<CabinetWithMessageCount[]> {
    const { data: cabinets, error } = await supabase
        .from('cabinets')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching cabinets:', error)
        return []
    }

    // Get message counts for each cabinet
    const cabinetsWithCounts = await Promise.all(
        cabinets.map(async (cabinet) => {
            const { count } = await supabase
                .from('Rolling_Paper')
                .select('*', { count: 'exact', head: true })
                .eq('cabinet_id', cabinet.id)

            return {
                ...cabinet,
                messageCount: count || 0,
            }
        })
    )

    return cabinetsWithCounts
}

export async function getCabinetById(id: string): Promise<Cabinet | null> {
    const { data, error } = await supabase
        .from('cabinets')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching cabinet:', error)
        return null
    }

    return data
}

export async function verifyCabinetPassword(id: string, password: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('cabinets')
        .select('password')
        .eq('id', id)
        .single()

    if (error || !data) {
        return false
    }

    return data.password === password
}

export async function deleteCabinet(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('cabinets')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting cabinet:', error)
        return false
    }

    return true
}
