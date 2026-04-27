// iTunes endpoints serve `Access-Control-Allow-Origin: *`, so the browser can
// call them directly — no CORS proxy needed.
export const PODCAST_LIST_URL =
	'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
export const PODCAST_DETAILS_URL = 'https://itunes.apple.com/lookup'
