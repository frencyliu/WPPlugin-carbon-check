function removeTrailingSlash(url: string) {
  if (url.endsWith('/')) {
    return url.slice(0, -1)
  }
  return url
}

export const renderId = import.meta.env.VITE_RENDER_ID || 'my-app'
export const apiUrl = removeTrailingSlash(wpApiSettings?.root) || '/wp-json'
export const apiTimeout = import.meta.env.VITE_API_TIMEOUT || '30000'
export const locale = window.appData.locale || 'zh_TW'
