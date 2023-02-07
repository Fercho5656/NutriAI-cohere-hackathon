const router = useRouter()
const client = useSupabaseAuthClient().auth

export const login = async (provider: 'github' | 'google') => {
  const { error } = await client.signInWithOAuth({ provider })
  if (error) return error.message
  router.push('/home')
}

export const logout = async () => {
  const { error } = await client.signOut()
  if (error) return error.message
  router.push('/')
}