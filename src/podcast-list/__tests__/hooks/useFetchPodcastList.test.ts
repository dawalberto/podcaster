import { renderHook, waitFor } from '@testing-library/react'
import { useFetchPodcastList } from '../../hooks/useFetchPodcastList'

describe('useFetchPodcastList error', () => {
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
		const { result } = renderHook(() => useFetchPodcastList())

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(result.current.error).toBe('could not fetch the data for that resource')
			expect(result.current.data).toBe(null)
		})
	})
})

describe('useFetchPodcastList', () => {
	const mockFetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () =>
				Promise.resolve({
					feed: { entry: [{ id: { attributes: { 'im:id': '123' } } }] },
				} as unknown as Response),
		})
	) as unknown as GlobalFetch

	beforeEach(() => {
		global.fetch = mockFetch
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('fetches podcast list successfully', async () => {
		const { result } = renderHook(() => useFetchPodcastList())

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false)
			expect(result.current.error).toBe(null)
			expect(result.current.data).toEqual([{ id: { attributes: { 'im:id': '123' } } }])
		})
	})

	it('uses localStorage getItem to see if data available', async () => {
		const spyLoStoGet = jest.spyOn(localStorage, 'getItem')

		renderHook(() => useFetchPodcastList())

		await waitFor(() => expect(spyLoStoGet).toHaveBeenCalled())
	})
})

type GlobalFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
