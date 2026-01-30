// Usando allorigins.win para evitar problemas de CORS en producción.
// - /get?url= devuelve JSON con el contenido en `contents` (string)
// - /raw?url= devuelve la respuesta “tal cual” (útil para JSON directo)
export const BASE_URL = 'https://api.allorigins.win/get?url='
export const BASE_RAW_URL = 'https://api.allorigins.win/raw?url='
export const PODCAST_LIST_URL =
	'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
export const PODCAST_DETAILS_URL = 'https://itunes.apple.com/lookup'
