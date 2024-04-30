import { PodcastEntry } from '../../podcast-list/types/podcast-list'
import { isPodcastDetails, isPodcastEntry } from '../../shared'
import { PodcastDetails } from '../types/podcast-details'
import { useGetPodcastDescription } from './useGetPodcastDescription'

export default function useGetPodcastInfo({ podcast }: { podcast: PodcastDetails | PodcastEntry }) {
	const podcastDescription = useGetPodcastDescription()

	if (isPodcastDetails(podcast)) {
		const { artworkUrl60, artworkUrl100, artworkUrl600, trackName, trackId, artistName } =
			podcast
		const srcSet = `${artworkUrl60} 60w, ${artworkUrl100} 100w, ${artworkUrl600} 600w`

		return {
			trackId,
			trackName,
			artistName,
			description: podcastDescription,
			srcImage: artworkUrl600,
			srcSet,
		}
	} else if (isPodcastEntry(podcast)) {
		const trackId = podcast.id.attributes['im:id']
		const srcSet = podcast['im:image']
			.map(({ label, attributes }) => `${label} ${attributes.height}w`)
			.join(',')
		const trackName = podcast['im:name'].label
		const artistName = podcast['im:artist'].label
		const description = podcast.summary.label
		const srcImage = podcast['im:image'][podcast['im:image'].length - 1].label

		return {
			trackId,
			trackName,
			artistName,
			description,
			srcImage,
			srcSet,
		}
	}

	return {}
}
