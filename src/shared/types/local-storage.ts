import { PodcastDetails, PodcastEpisode } from './podcastDetails'
import { PodcastEntry } from './podcastList'

export type PodcastListLocalStorage = {
	lastFetch: string
	list: PodcastEntry[]
}

export type PodcastDetailsLocalStorageKey<N extends number> = `podcast${N}Details`

export type PodcastDetailsLocalStorage = {
	lastFetch: string
	details: PodcastDetails
	episodes: PodcastEpisode[]
}
