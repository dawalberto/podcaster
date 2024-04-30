import { renderHook } from '@testing-library/react'
import { podcastDetailsMock, podcastListResponseMock } from '../../../shared/__test__/mocks'
import useGetPodcastInfo from '../../hooks/useGetPodcastInfo'

describe('useGetPodcastInfo', () => {
	const mockPodcastDetails = podcastDetailsMock.details
	const mockPodcastEntry = podcastListResponseMock.feed.entry[0]

	it('returns correct info for PodcastDetails', () => {
		const { result } = renderHook(() => useGetPodcastInfo({ podcast: mockPodcastDetails }))

		expect(result.current).toEqual({
			trackId: mockPodcastDetails.trackId,
			trackName: mockPodcastDetails.trackName,
			artistName: mockPodcastDetails.artistName,
			srcImage: mockPodcastDetails.artworkUrl600,
			srcSet: `${mockPodcastDetails.artworkUrl60} 60w, ${mockPodcastDetails.artworkUrl100} 100w, ${mockPodcastDetails.artworkUrl600} 600w`,
		})
	})

	it('returns correct info for PodcastEntry', () => {
		const { result } = renderHook(() => useGetPodcastInfo({ podcast: mockPodcastEntry }))

		expect(result.current).toEqual({
			trackId: mockPodcastEntry.id.attributes['im:id'],
			trackName: mockPodcastEntry['im:name'].label,
			artistName: mockPodcastEntry['im:artist'].label,
			description: mockPodcastEntry.summary.label,
			srcImage: mockPodcastEntry['im:image'].at(-1)?.label,
			srcSet: mockPodcastEntry['im:image']
				.map(({ label, attributes }) => `${label} ${attributes.height}w`)
				.join(','),
		})
	})
})
