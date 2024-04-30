import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PodcastCard } from '../components/PodcastCard'
import { PodcastEntry } from '../types/podcast-list'

describe('PodcastCard', () => {
	const podcast = {
		'im:name': { label: 'Podcast Title' },
		'im:image': [{ label: 'image.jpg', attributes: { height: '100' } }],
		'im:artist': { label: 'Podcast Author' },
		id: { attributes: { 'im:id': '123' } },
	} as PodcastEntry

	test('renders podcast card correctly', () => {
		render(
			<BrowserRouter>
				<PodcastCard podcast={podcast} />
			</BrowserRouter>
		)

		const titleElement = screen.getByText('Podcast Title')
		const authorElement = screen.getByText('Author: Podcast Author')

		expect(titleElement).toBeInTheDocument()
		expect(authorElement).toBeInTheDocument()
	})

	test('navigates to podcast detail page on click', () => {
		render(
			<BrowserRouter>
				<PodcastCard podcast={podcast} />
			</BrowserRouter>
		)

		const cardElement = screen.getByRole('link')
		fireEvent.click(cardElement)

		expect(window.location.pathname).toBe('/podcast/123')
	})
})
