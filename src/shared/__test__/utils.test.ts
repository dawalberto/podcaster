import { PodcastDetails } from '../../podcast-details/types/podcast-details'
import { PodcastEntry } from '../../podcast-list/types/podcast-list'
import {
	formatDate,
	formatTrackTime,
	hasMoreTimePassedSinceThisDate,
	isPodcastDetails,
	isPodcastEntry,
	transformToHtml,
} from '../utils'

describe('hasMoreTimePassedSinceThisDate', () => {
	it('returns true if more than the specified time has passed since the given date (in minutes)', () => {
		const date = new Date()
		date.setMinutes(date.getMinutes() - 6)

		// Test if more than 5 minutes have passed
		expect(
			hasMoreTimePassedSinceThisDate({
				date: date.toString(),
				passedTime: 5,
				converter: 'minutes',
			})
		).toBe(true)
	})

	it('returns false if less than the specified time has passed since the given date (in days)', () => {
		const date = new Date()
		date.setDate(date.getDate() - 1)

		// Test if less than 2 days have passed
		expect(
			hasMoreTimePassedSinceThisDate({
				date: date.toString(),
				passedTime: 2,
				converter: 'days',
			})
		).toBe(false)
	})
})

describe('formatDate', () => {
	it('formats a date string correctly', () => {
		const inputDate = '2024-04-25T12:00:00Z'

		expect(formatDate(inputDate)).toBe('25/04/2024')
	})
})

describe('formatTrackTime', () => {
	it('formats track time in milliseconds correctly', () => {
		const trackTimeMillis = 125000 // 2 minutes and 5 seconds

		expect(formatTrackTime(trackTimeMillis)).toBe('02:05')
	})

	it('returns "-" if trackTimeMillis is not provided', () => {
		expect(formatTrackTime(undefined)).toBe('-')
	})
})

describe('transformToHtml', () => {
	it('transforms plain text to HTML with links for URLs', () => {
		const input = 'Check out this website: https://example.com'
		const expectedOutput =
			'<p class="my-2 text-pretty">Check out this website: <a href="https://example.com" target="_blank" class="text-sky-700/80 hover:text-sky-700">https://example.com</a></p>'
		expect(transformToHtml(input)).toEqual(expectedOutput)
	})

	it('does not transform empty lines', () => {
		const input = '\n\n'
		const expectedOutput = ''
		expect(transformToHtml(input)).toEqual(expectedOutput)
	})

	it('does not transform lines without URLs', () => {
		const input = 'This is a plain text line.'
		const expectedOutput = '<p class="my-2 text-pretty">This is a plain text line.</p>'
		expect(transformToHtml(input)).toEqual(expectedOutput)
	})

	it('transforms multiple lines with URLs to HTML with links', () => {
		const input =
			'Check out these websites:\nhttps://example.com\nhttps://another-example.com\nAnd this one too: www.example.net'
		const expectedOutput =
			'<p class="my-2 text-pretty">Check out these websites:</p><p class="my-2 text-pretty"><a href="https://example.com" target="_blank" class="text-sky-700/80 hover:text-sky-700">https://example.com</a></p><p class="my-2 text-pretty"><a href="https://another-example.com" target="_blank" class="text-sky-700/80 hover:text-sky-700">https://another-example.com</a></p><p class="my-2 text-pretty">And this one too: <a href="https://www.example.net" target="_blank" class="text-sky-700/80 hover:text-sky-700">www.example.net</a></p>'
		expect(transformToHtml(input)).toEqual(expectedOutput)
	})
})

describe('isPodcastEntry', () => {
	it('returns true if the item is a PodcastEntry', () => {
		const podcastEntry = {
			'im:name': { label: 'Podcast Name' },
			'im:image': [{ label: 'Image URL', attributes: { height: '100' } }],
		} as PodcastEntry

		expect(isPodcastEntry(podcastEntry)).toBe(true)
	})

	it('returns false if the item is not a PodcastEntry', () => {
		const podcastDetails = {
			wrapperType: 'track',
			collectionId: 123456789,
			collectionName: 'Podcast Collection',
		} as PodcastDetails

		expect(isPodcastEntry(podcastDetails)).toBe(false)
	})
})

describe('isPodcastDetails', () => {
	it('returns true if the item is a PodcastDetails', () => {
		const podcastDetails = {
			wrapperType: 'track',
			collectionId: 123456789,
			collectionName: 'Podcast Collection',
		} as PodcastDetails

		expect(isPodcastDetails(podcastDetails)).toBe(true)
	})

	it('returns false if the item is not a PodcastDetails', () => {
		const podcastEntry = {
			'im:name': { label: 'Podcast Name' },
			'im:image': [{ label: 'Image URL', attributes: { height: '100' } }],
		} as PodcastEntry

		expect(isPodcastDetails(podcastEntry)).toBe(false)
	})
})
