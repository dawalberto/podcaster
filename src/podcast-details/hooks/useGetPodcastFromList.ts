import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { PodcastEntry } from '../../podcast-list/types/podcast-list'
import { PODCAST_LIST_LOCAL_STORAGE_KEY, PodcastListLocalStorage } from '../../shared'

export default function useGetPodcastFromList() {
	const { podcastId } = useParams<{ podcastId: string }>()
	const [podcastListValueInLocaleStorage] = useLocalStorage<PodcastListLocalStorage | null>(
		PODCAST_LIST_LOCAL_STORAGE_KEY,
		null
	)
	const [podcastFromList, setPodcastFromList] = useState<PodcastEntry | null>(null)

	useEffect(() => {
		if (podcastListValueInLocaleStorage) {
			const podcast = podcastListValueInLocaleStorage.list.find(
				({ id }) => id.attributes['im:id'] === podcastId
			)
			if (podcast) {
				setPodcastFromList(podcast)
			}
		}
	}, [podcastId, podcastListValueInLocaleStorage])

	return {
		podcastFromList,
	}
}
