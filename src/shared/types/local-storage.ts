import { PodcastDetails, PodcastEpisode } from '../../podcast-details/types/podcast-details'
import { PodcastEntry } from '../../podcast-list/types/podcast-list'

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
