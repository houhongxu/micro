const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, unknown>
  body?: RequestInit['body'] | Record<string, unknown>
}

async function request<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, body, ...fetchOptions } = options

  let finalUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) finalUrl += `?${queryString}`
  }

  const headers = new Headers(fetchOptions.headers)
  let requestBody: RequestInit['body']
  if (
    body &&
    typeof body === 'object' &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer)
  ) {
    requestBody = JSON.stringify(body)
    if (!headers.has('Content-Type'))
      headers.set('Content-Type', 'application/json')
  } else {
    requestBody = body as RequestInit['body']
  }

  const response = await fetch(finalUrl, {
    ...fetchOptions,
    headers,
    body: requestBody,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP ${response.status}: ${response.statusText}`,
    }))
    throw new Error((error as { message?: string }).message || '请求失败')
  }

  const responseData = await response.json()
  if (
    responseData &&
    typeof responseData === 'object' &&
    'data' in responseData
  ) {
    return (responseData as { data: T }).data
  }
  return responseData as T
}

export default request
