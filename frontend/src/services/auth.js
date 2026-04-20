const API_BASE_URL = 'http://localhost:3000/api/auth'

async function request(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error ?? 'Request failed.')
  }

  return data
}

export function registerUser(payload) {
  return request('/register', payload)
}

export function loginUser(payload) {
  return request('/login', payload)
}
