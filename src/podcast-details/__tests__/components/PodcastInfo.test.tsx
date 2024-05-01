import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { podcastListResponseMock } from '../../../shared/__test__/mocks'
import { PodcastInfo } from '../../components/PodcastInfo'

describe('PodcastInfo', () => {
	const podcastDetails = podcastListResponseMock.feed.entry[0]

	test('renders podcast information correctly', () => {
		render(
			<BrowserRouter>
				<PodcastInfo details={podcastDetails} />
			</BrowserRouter>
		)

		const titleElement = screen.getByText('Podcast 1')
		const authorElement = screen.getByText('by Artist 1')
		const descriptionElement = screen.getByText('Description:')
		const descriptionTextElement = screen.getByText('Podcast 1 description')

		expect(titleElement).toBeInTheDocument()
		expect(authorElement).toBeInTheDocument()
		expect(descriptionElement).toBeInTheDocument()
		expect(descriptionTextElement).toBeInTheDocument()
	})

	test('renders podcast image correctly', () => {
		render(
			<BrowserRouter>
				<PodcastInfo details={podcastDetails} />
			</BrowserRouter>
		)

		const imageElement = screen.getByAltText('Podcast cover')
		expect(imageElement).toBeInTheDocument()
		expect(imageElement).toHaveAttribute('src', 'image3')
	})

	test('navigates to podcast detail page on click', () => {
		render(
			<BrowserRouter>
				<PodcastInfo details={podcastDetails} />
			</BrowserRouter>
		)

		const titleElement = screen.getByText('Podcast 1')
		fireEvent.click(titleElement)

		expect(window.location.pathname).toBe('/podcaster/podcast/8771')
	})
})
