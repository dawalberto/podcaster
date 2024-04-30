import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PodcastEntry } from '../../../podcast-list/types/podcast-list'
import { PodcastInfo } from '../../components/PodcastInfo'

describe('PodcastInfo', () => {
	const podcastDetails = {
		id: {
			label: 'https://...',
			attributes: {
				'im:id': '123',
			},
		},
		'im:name': {
			label: 'Podcast Title',
		},
		'im:artist': {
			label: 'Podcast Author',
			attributes: {
				href: 'https://...',
			},
		},
		'im:image': [
			{
				label: 'image55.jpg',
				attributes: {
					height: '55',
				},
			},
			{
				label: 'image60.jpg',
				attributes: {
					height: '60',
				},
			},
			{
				label: 'image170.jpg',
				attributes: {
					height: '170',
				},
			},
		],
		summary: {
			label: 'Podcast description',
		},
	} as PodcastEntry

	test('renders podcast information correctly', () => {
		render(
			<BrowserRouter>
				<PodcastInfo details={podcastDetails} />
			</BrowserRouter>
		)

		const titleElement = screen.getByText('Podcast Title')
		const authorElement = screen.getByText('by Podcast Author')
		const descriptionElement = screen.getByText('Description:')
		const descriptionTextElement = screen.getByText('Podcast description')

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
		expect(imageElement).toHaveAttribute('src', 'image170.jpg')
	})
})
