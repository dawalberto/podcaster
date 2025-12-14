// Usando corsproxy.io para la lista (funciona bien con JSON directo)
// y allorigins.win para detalles (funciona mejor con query params)
export const BASE_URL = 'https://api.allorigins.win/get?url='
export const BASE_RAW_URL = 'https://corsproxy.io/?'
export const PODCAST_LIST_URL =
	'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
export const PODCAST_DETAILS_URL = 'https://itunes.apple.com/lookup'
