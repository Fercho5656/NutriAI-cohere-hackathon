import IPlan from "~~/interfaces/IPlan";
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery";

export const getAllPlans = async (): Promise<ISupabaseQuery<IPlan[]>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from('plan')
    .select('*')
  if (data == null) return { data: [], error }
  return { data, error }
}