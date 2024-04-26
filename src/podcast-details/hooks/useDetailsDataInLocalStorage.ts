import { useParams } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { PodcastDetailsLocalStorage, PodcastDetailsLocalStorageKey } from '../../shared/types'

export const useDetailsDataInLocalStorage = () => {
	const { podcastId } = useParams<{ podcastId: string }>()
	const id = Number(podcastId)
	const localStorageDetailsKey: PodcastDetailsLocalStorageKey<typeof id> = `podcast${id}Details`
	const [data, setData] = useLocalStorage<PodcastDetailsLocalStorage | null>(
		localStorageDetailsKey,
		null
	)

	return {
		data,
		setData,
	}
}
