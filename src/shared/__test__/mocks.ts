import {
	PodcastDetails,
	PodcastDetailsResponse,
	PodcastEpisode,
} from '../../podcast-details/types/podcast-details'
import { PodcastEntry, PodcastListResponse } from '../../podcast-list/types/podcast-list'
import { PodcastDetailsLocalStorage } from '../types/local-storage'

export const podcastListResponseMock: PodcastListResponse = {
	feed: {
		entry: [
			{
				id: {
					label: 'https...',
					attributes: {
						'im:id': '8771',
					},
				},
				'im:name': { label: 'Podcast 1' },
				'im:artist': { label: 'Artist 1' },
				'im:image': [
					{ label: 'image1', attributes: { height: '60' } },
					{ label: 'image2', attributes: { height: '100' } },
					{ label: 'image3', attributes: { height: '600' } },
				],
				summary: { label: 'Podcast 1 description' },
			},
			{
				id: {
					label: 'https...',
					attributes: {
						'im:id': '9118',
					},
				},
				'im:name': { label: 'Podcast 2' },
				'im:artist': { label: 'Artist 2' },
				'im:image': [
					{ label: 'image1', attributes: { height: '60' } },
					{ label: 'image2', attributes: { height: '100' } },
					{ label: 'image3', attributes: { height: '600' } },
				],
				summary: { label: 'Podcast 2 description' },
			},
		] as PodcastEntry[],
	},
} as PodcastListResponse

export const podcastDetailsMock: Omit<PodcastDetailsLocalStorage, 'lastFetch'> = {
	details: {
		wrapperType: 'track',
		kind: 'podcast',
		artistId: 123,
		collectionId: 1234,
		trackId: 12345,
		artistName: 'Artist name',
		collectionName: 'Collection name',
		trackName: 'Track name',
		artistViewUrl: 'Artist view',
		artworkUrl30: 'image30.jpg',
		artworkUrl60: 'image60.jpg',
		artworkUrl100: 'image100.jpg',
		releaseDate: '2024-04-23T23:30:00Z',
		trackCount: 287,
		trackTimeMillis: 603,
		artworkUrl600: 'image600.jpg',
		description: 'Podcast description',
	} as PodcastDetails,
	episodes: [
		{
			trackName: 'Episode 1',
			releaseDate: '2024-04-30',
			trackTimeMillis: 3600000,
			trackId: 1,
			wrapperType: 'podcastEpisode',
		},
		{
			trackName: 'Episode 2',
			releaseDate: '2024-05-01',
			trackTimeMillis: 1800000,
			trackId: 2,
			wrapperType: 'podcastEpisode',
		},
	] as PodcastEpisode[],
}

export const podcastDetailsResponseMock: PodcastDetailsResponse = {
	contents:
		'\n\n\n{\n "resultCount":1,\n "results": [\n{"wrapperType":"track","kind":"podcast","artistId":123,"collectionId":1234,"trackId":12345,"artistName":"Artist name","collectionName":"Collection name","trackName":"Track name","artistViewUrl":"Artist view","artworkUrl30":"image30.jpg","artworkUrl60":"image60.jpg","artworkUrl100":"image100.jpg","releaseDate":"2024-04-23T23:30:00Z","trackCount":287,"trackTimeMillis":603,"artworkUrl600":"image600.jpg"}\n,\n{"wrapperType":"podcastEpisode","trackName":"Episode 1","releaseDate":"2024-04-30","trackTimeMillis":3600000,"trackId":1},\n{"wrapperType":"podcastEpisode","trackName":"Episode 2","releaseDate":"2024-05-01","trackTimeMillis":1800000,"trackId":2}\n]\n}',
	status: {
		url: 'https...',
		content_type: 'text/javascript; charset=utf-8',
		http_code: 200,
		response_time: 173,
		content_length: 2151,
	},
}
