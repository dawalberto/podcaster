import { renderHook, waitFor } from '@testing-library/react'
import { podcastListResponseMock } from '../../../shared/__test__/mocks'
import { GlobalFetch } from '../../../shared/__test__/test-types'
import { usePodcastList } from '../../hooks/usePodcastList'

describe('usePodcastList', () => {
	const mockFetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(podcastListResponseMock as unknown as Response),
		})
	) as unknown as GlobalFetch

	beforeEach(() => {
		global.fetch = mockFetch
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('returns podcast list data', async () => {
		const { result } = renderHook(() => usePodcastList())

		await waitFor(() => {
			expect(result.current.podcastList).toEqual(podcastListResponseMock.feed.entry)
			expect(result.current.isLoading).toBe(false)
			expect(result.current.error).toBe(null)
		})
	})

	it('filters podcast list by podcast title based on search term', async () => {
		const { result } = renderHook(() => usePodcastList())
		const searchTerm = 'Podcast 1'
		await waitFor(() => {
			result.current.handleOnSearch(searchTerm)
			const filteredResult = result.current.podcastList

			expect(filteredResult?.length).toBe(1)
			if (filteredResult?.length) {
				expect(filteredResult[0]['im:name'].label).toContain(searchTerm)
			}
		})
	})

	it('filters podcast list by podcast author based on search term', async () => {
		const { result } = renderHook(() => usePodcastList())
		const searchTerm = 'Podcast 2'
		await waitFor(() => {
			result.current.handleOnSearch(searchTerm)
			expect(result.current.podcastList).toEqual([podcastListResponseMock.feed.entry.at(-1)])
		})
	})

	it('podcast list should be empty if the search term is not in the title nor the author', async () => {
		const { result } = renderHook(() => usePodcastList())
		await waitFor(() => {
			result.current.handleOnSearch('Unknown')
			expect(result.current.podcastList).toEqual([])
		})
	})
})
