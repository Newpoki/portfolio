const baseURL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL != null
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : import.meta.env.VITE_BASE_URL;

type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  signal?: AbortSignal;
};

async function request<T>(
  method: string,
  url: string,
  config: RequestConfig = {},
  body?: unknown,
): Promise<{ data: T }> {
  const { headers, params, signal } = config;

  console.log({url, baseURL, env: import.meta.env.VITE_BASE_URL})
  const fullURL = new URL(url, baseURL);


  if (params) {
    Object.entries(params).forEach(([k, v]) => fullURL.searchParams.set(k, v));
  }

  const response = await fetch(fullURL.toString(), {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body != null ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  const data = (await response.json()) as T;

  return { data };
}

export const fetchClient = {
  get: <T>(url: string, config?: RequestConfig) =>
    request<T>("GET", url, config),
  post: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    request<T>("POST", url, config, body),
  put: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    request<T>("PUT", url, config, body),
  patch: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    request<T>("PATCH", url, config, body),
  delete: <T>(url: string, config?: RequestConfig) =>
    request<T>("DELETE", url, config),
};
