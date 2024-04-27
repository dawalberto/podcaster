import { Helmet } from 'react-helmet'
import { PodcastDetails, PodcastEpisode } from '../../podcast-details/types/podcast-details'

export const EpisodeHelmet = ({
	details,
	episode,
}: {
	details: PodcastDetails
	episode: PodcastEpisode
}) => {
	return (
		<Helmet>
			<title>
				Podcaster | {details.trackName} | {episode.trackName}
			</title>
		</Helmet>
	)
}
