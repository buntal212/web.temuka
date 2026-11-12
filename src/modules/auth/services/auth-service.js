export async function register(api, payload) {
  const response = await api.post('/api/v1/auth/register', payload)
  return response.data.data
}

export async function login(api, credentials) {
  const response = await api.post('/api/v1/auth/login', credentials)
  return response.data.data
}

export async function fetchCurrentUser(api, token) {
  const response = await api.get('/api/v1/auth/me', bearerConfig(token))
  return response.data.data
}

export async function logout(api, token) {
  await api.post('/api/v1/auth/logout', null, bearerConfig(token))
}

function bearerConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}
