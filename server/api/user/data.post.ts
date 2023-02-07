import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import { IUserStats } from "~~/interfaces/IUserStats"
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await serverSupabaseUser(event)
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .from('user_stats')
    .insert({ ...body, user_id: user?.id })
    .select()
  console.log({ data, error })
  if (error) return error
  return data
})
