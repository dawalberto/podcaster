import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Episodes } from '../../components/Episodes'
import { PodcastEpisode } from '../../types/podcast-details'

describe('Episodes', () => {
	const episodes = [
		{
			trackName: 'Episode 1',
			releaseDate: '2024-04-30',
			trackTimeMillis: 3600000,
			trackId: 1,
		},
		{
			trackName: 'Episode 2',
			releaseDate: '2024-05-01',
			trackTimeMillis: 1800000,
			trackId: 2,
		},
	] as PodcastEpisode[]

	test('renders episodes correctly', () => {
		render(
			<BrowserRouter>
				<Episodes episodes={episodes} trackCount={2} />
			</BrowserRouter>
		)

		const episode1Title = screen.getByText('Episode 1')
		const episode2Title = screen.getByText('Episode 2')
		const episode1Date = screen.getByText('30/04/2024')
		const episode2Date = screen.getByText('01/05/2024')
		const episode1Duration = screen.getByText('01:00:00')
		const episode2Duration = screen.getByText('30:00')

		expect(episode1Title).toBeInTheDocument()
		expect(episode2Title).toBeInTheDocument()
		expect(episode1Date).toBeInTheDocument()
		expect(episode2Date).toBeInTheDocument()
		expect(episode1Duration).toBeInTheDocument()
		expect(episode2Duration).toBeInTheDocument()
	})

	test('renders correct number of episodes', () => {
		render(
			<BrowserRouter>
				<Episodes episodes={episodes} trackCount={2} />
			</BrowserRouter>
		)

		const episodeCountText = screen.getByText('Episodes: 2')
		expect(episodeCountText).toBeInTheDocument()
	})

	test('navigates to episode detail page on click episode title', () => {
		render(
			<BrowserRouter>
				<Episodes episodes={episodes} trackCount={2} />
			</BrowserRouter>
		)

		const titleElement = screen.getByText('Episode 1')
		fireEvent.click(titleElement)

		expect(window.location.pathname).toBe('/episode/1')
	})
})
