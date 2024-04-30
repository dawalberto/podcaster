import { PodcastEntry, PodcastListResponse } from '../../podcast-list/types/podcast-list'

export const podcastListResponseMock: PodcastListResponse = {
	feed: {
		entry: [
			{
				'im:name': { label: 'Podcast 1' },
				'im:artist': { label: 'Artist 1' },
			},
			{
				'im:name': { label: 'Podcast 2' },
				'im:artist': { label: 'Artist 2' },
			},
		] as PodcastEntry[],
	},
} as PodcastListResponse
