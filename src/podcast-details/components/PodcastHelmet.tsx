import { Helmet } from 'react-helmet'
import { PodcastDetails } from '../types/podcast-details'

export const PodcastHelmet = ({ details }: { details: PodcastDetails }) => {
	return (
		<Helmet>
			<title>Podcaster | {details.trackName}</title>
			<meta name='description' content={details.description} />
		</Helmet>
	)
}
