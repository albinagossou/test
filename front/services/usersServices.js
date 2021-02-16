let apiClient

export function setClient(
  globalApiClient,
  onRequest = null,
  onResponse = null,
  onError = null
) {
  apiClient = globalApiClient.create()
  apiClient.setBaseURL(apiClient.defaults.baseURL + '/users')
  if (onRequest) clientOnRequest(onRequest)
  if (onResponse) clientOnResponse(onResponse)
  if (onError) clientOnError(onError)
}

export function clientOnRequest(onRequest) {
  if (!apiClient) throw new Error('Api client not installed.')
  apiClient.onRequest(onRequest)
}

export function clientOnResponse(onResponse) {
  if (!apiClient) throw new Error('Api client not installed.')
  apiClient.onResponse(onResponse)
}

export function clientOnError(onError) {
  if (!apiClient) throw new Error('Api client not installed.')
  apiClient.onError(onError)
}

export default {
  getAllUsers() {
    if (!apiClient) throw new Error('Api client not installed.')
    return apiClient.get()
  },
}
