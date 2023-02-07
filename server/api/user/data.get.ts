import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import { IUserStats } from "~~/interfaces/IUserStats"
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery"

export default defineEventHandler(async (event): Promise<ISupabaseQuery<IUserStats>> => {
  const user = await serverSupabaseUser(event)
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .from('user_stats')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  if (data == null) return { data: {} as IUserStats, error }
  return { data, error }
})
