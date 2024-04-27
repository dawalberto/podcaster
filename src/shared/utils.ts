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
