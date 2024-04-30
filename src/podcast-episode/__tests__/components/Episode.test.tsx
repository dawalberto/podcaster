import { render, screen } from '@testing-library/react'
import { PodcastEpisode } from '../../../podcast-details/types/podcast-details'
import { Episode } from '../../components/Episode'

describe('Episode', () => {
	const episode = {
		trackName: 'Episode 1',
		description: 'This is the episode description.',
		episodeUrl: 'episode.mp3',
	} as PodcastEpisode

	test('renders episode correctly', () => {
		render(<Episode episode={episode} />)

		const episodeTitle = screen.getByText('Episode 1')
		const episodeDescription = screen.getByText('This is the episode description.')
		const audioElement = screen.getByTestId('episode-audio')

		expect(episodeTitle).toBeInTheDocument()
		expect(episodeDescription).toBeInTheDocument()
		expect(audioElement).toBeInTheDocument()
	})

	test('renders audio element with correct source', () => {
		render(<Episode episode={episode} />)

		const audioElement = screen.getByTestId('episode-audio')
		const sourceElement = screen.getByTestId('episode-audio-src')

		expect(audioElement).toContainElement(sourceElement)
		expect(sourceElement).toHaveAttribute('src', 'episode.mp3')
		expect(sourceElement).toHaveAttribute('type', 'audio/mp3')
	})
})
