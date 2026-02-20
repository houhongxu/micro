const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

/** 最短请求时间（毫秒），避免 loading 闪屏 */
const MIN_REQUEST_MS = 300

interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, any>
  body?: RequestInit['body'] | Record<string, any>
}

async function request<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const start = Date.now()
  const { params, body, ...fetchOptions } = options

  // 处理查询参数
  let finalUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      finalUrl += `?${queryString}`
    }
  }

  // 设置默认 headers
  const headers = new Headers(fetchOptions.headers)
  let requestBody: RequestInit['body']

  if (body) {
    // 如果是普通对象，转换为 JSON 字符串
    if (
      typeof body === 'object' &&
      !(body instanceof FormData) &&
      !(body instanceof Blob) &&
      !(body instanceof ArrayBuffer) &&
      !ArrayBuffer.isView(body)
    ) {
      requestBody = JSON.stringify(body)
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
      }
    } else {
      requestBody = body as RequestInit['body']
    }
  }

  const ensureMinDuration = async () => {
    const remaining = Math.max(0, MIN_REQUEST_MS - (Date.now() - start))
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining))
  }

  try {
    const response = await fetch(finalUrl, {
      ...fetchOptions,
      headers,
      body: requestBody,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }))
      throw new Error(error.message || '请求失败')
    }

    const responseData = await response.json()

    // 后端使用 FormatResponseInterceptor 包装响应，格式为 { statusCode, message, data }
    // 如果响应包含 data 字段，则提取 data，否则返回整个响应
    let result: T
    if (
      responseData &&
      typeof responseData === 'object' &&
      'data' in responseData
    ) {
      result = responseData.data as T
    } else {
      result = responseData as T
    }

    await ensureMinDuration()
    return result
  } catch (err) {
    await ensureMinDuration()
    throw err
  }
}

export default request
