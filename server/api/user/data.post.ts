import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import { IUserStats } from "~~/interfaces/IUserStats"
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery"
import IPlan from "~~/interfaces/IPlan"

export default defineEventHandler(async (event): Promise<ISupabaseQuery<IPlan>> => {
  const body = await readBody(event)
  const user = await serverSupabaseUser(event)
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .from('user_stats')
    .insert({ ...body, user_id: user?.id })
    .select()
    .single()
  console.log({ data, error })
  if (error) return { data: {} as IPlan, error }
  return { data, error: undefined }
})
