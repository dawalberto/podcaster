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
