import { serverSupabaseClient } from "#supabase/server"
import IPlan from "~~/interfaces/IPlan"
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery"

export default defineEventHandler(async (event): Promise<ISupabaseQuery<IPlan[]>> => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .from('plan')
    .select('*')
    .order('created_at', { ascending: false })
  if (data == null) return { data: [], error }
  return { data, error: undefined }
})
