import { useCallback, useEffect, useState } from 'react'
import { useFetchPodcastList } from '../hooks/useFetchPodcastList'
import { PodcastEntry } from '../shared'

export const usePodcastList = () => {
	const { data: fetchedPodcastList, isLoading, error } = useFetchPodcastList()
	const [filteredPodcastList, setFilteredPodcastList] = useState<PodcastEntry[] | null>(
		fetchedPodcastList
	)

	useEffect(() => {
		setFilteredPodcastList(fetchedPodcastList)
	}, [fetchedPodcastList])

	const handleOnSearch = useCallback(
		(searchTerm: string) => {
			if (fetchedPodcastList) {
				setFilteredPodcastList(
					fetchedPodcastList.filter(
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
		[fetchedPodcastList]
	)

	return {
		podcastList: filteredPodcastList,
		isLoading,
		error,
		handleOnSearch,
	}
}
