import { useCallback, useEffect, useState } from 'react'
import { PodcastEntry } from '../types/podcast-list'
import { useFetchPodcastList } from './useFetchPodcastList'

export const usePodcastList = () => {
	const { data: podcastList, isLoading, error } = useFetchPodcastList()
	const [filteredPodcastList, setFilteredPodcastList] = useState<PodcastEntry[] | null>(
		podcastList
	)

	useEffect(() => {
		setFilteredPodcastList(podcastList)
	}, [podcastList])

	const handleOnSearch = useCallback(
		(searchTerm: string) => {
			if (podcastList) {
				setFilteredPodcastList(
					podcastList.filter(
						(podcast) =>
							podcast['im:name'].label
								.toLowerCase()
								.includes(searchTerm.toLowerCase()) ||
							podcast['im:artist'].label
								.toLowerCase()
								.includes(searchTerm.toLowerCase())
					)
				)
			}
		},
		[podcastList]
	)

	return {
		podcastList: filteredPodcastList,
		isLoading,
		error,
		handleOnSearch,
	}
}
