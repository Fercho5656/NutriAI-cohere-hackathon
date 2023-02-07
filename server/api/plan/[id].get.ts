import { serverSupabaseClient } from "#supabase/server"
import IPlan from "~~/interfaces/IPlan"
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery"

export default defineEventHandler(async (event): Promise<ISupabaseQuery<IPlan>> => {
  const client = serverSupabaseClient(event)
  const id = parseInt(event.context.params?.id!) as number
  console.log(id)
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    })
  }
  const { data, error } = await client
    .from('plan')
    .select('*')
    .eq('id', id)
    .single()
  if (data == null) return { data: {} as IPlan, error }
  return { data, error: undefined }
})