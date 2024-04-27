export const hasMoreTimePassedSinceThisDate = ({
	date,
	converter = 'minutes',
	passedTime,
}: {
	date: string
	converter?: 'days' | 'minutes'
	passedTime: number
}) => {
	const timeConverter = converter === 'days' ? 1000 * 60 * 60 * 24 : 1000 * 60
	const dateToCompareWith = new Date(date)
	const currentDate = new Date()
	const timeDifference = currentDate.getTime() - dateToCompareWith.getTime()
	const convertedDifference = timeDifference / timeConverter

	if (convertedDifference >= passedTime) {
		console.log(`🦊 More than ${passedTime} ${converter} have passed.`)
		return true
	} else {
		console.log(`🦊 Less than ${passedTime} ${converter} have passed.`)
		return false
	}
}

export const formatDate = (inputDate: string): string => {
	const date = new Date(inputDate)
	const day = date.getUTCDate()
	const month = date.getUTCMonth() + 1
	const year = date.getUTCFullYear()

	return `${padZero(day)}/${padZero(month)}/${year}`
}

export const formatTrackTime = (trackTimeMillis: number): string => {
	const seconds = Math.floor(trackTimeMillis / 1000)
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	const hours = Math.floor(minutes / 60)

	if (hours > 0) {
		const remainingMinutes = minutes % 60
		return `${padZero(hours)}:${padZero(remainingMinutes)}:${padZero(remainingSeconds)}`
	} else {
		return `${padZero(minutes)}:${padZero(remainingSeconds)}`
	}
}

const padZero = (num: number): string => {
	return num < 10 ? `0${num}` : `${num}`
}

export function transformToHtml(input: string): string {
	const paragraphs = input.split('\n')
	let html = ''

	for (const paragraph of paragraphs) {
		if (paragraph.trim() === '') {
			continue
		}

		const paragraphWithLinks = paragraph.replace(/((https?:\/\/|www\.)\S+)/g, (match) => {
			if (match.startsWith('www.')) {
				return `<a href="https://${match}" target="_blank" class="text-sky-700/80 hover:text-sky-700">${match}</a>`
			}
			return `<a href="${match}" target="_blank" class="text-sky-700/80 hover:text-sky-700">${match}</a>`
		})

		html += `<p class="my-2 text-pretty">${paragraphWithLinks}</p>`
	}

	return html
}
