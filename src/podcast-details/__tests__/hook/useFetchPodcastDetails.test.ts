import { renderHook, waitFor } from '@testing-library/react'
import { podcastDetailsMock, podcastDetailsResponseMock } from '../../../shared/__test__/mocks'
import { GlobalFetch } from '../../../shared/__test__/test-types'
import { useFetchPodcastDetails } from '../../hooks/useFetchPodcastDetails'

describe('useFetchPodcastDetails error', () => {
	const mockFetch = jest.fn(() =>
		Promise.resolve({
			ok: false,
			status: 404,
			json: () => Promise.resolve({ message: 'Not found' }),
		})
	) as unknown as GlobalFetch

	beforeEach(() => {
		global.fetch = mockFetch
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('handles fetch error', async () => {
		const { result } = renderHook(() => useFetchPodcastDetails())

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(result.current.error).toBe('could not fetch the data for that resource')
			expect(result.current.data).toBe(null)
		})
	})
})

describe('useFetchPodcastDetails', () => {
	const mockFetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(podcastDetailsResponseMock as unknown as Response),
		})
	) as unknown as GlobalFetch

	beforeEach(() => {
		global.fetch = mockFetch
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('fetches podcast details successfully', async () => {
		const { result } = renderHook(() => useFetchPodcastDetails())

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(result.current.error).toBe(null)
			expect(result.current.data).toEqual(podcastDetailsMock)
		})
	})

	it('uses localStorage getItem to see if data available', async () => {
		const spyLoStoGet = jest.spyOn(localStorage, 'getItem')

		renderHook(() => useFetchPodcastDetails())

		await waitFor(() => expect(spyLoStoGet).toHaveBeenCalled())
	})
})
