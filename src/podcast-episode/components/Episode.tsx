import { PodcastEpisode } from '../../podcast-details/types/podcast-details'
import { transformToHtml } from '../../shared'

export const Episode = ({ episode }: { episode: PodcastEpisode }) => {
	const { trackName, description, episodeUrl } = episode

	return (
		<div className='h-fit grow rounded-md border border-neutral-200 p-3 shadow'>
			<h1 className='text-lg font-bold'>{trackName}</h1>
			<div
				className='inserted-html mt-2 text-pretty'
				dangerouslySetInnerHTML={{
					__html: transformToHtml(description),
				}}
			/>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
			<audio controls className='mt-8 w-full'>
				<source src={episodeUrl} type='audio/mp3' />
				Your browser does not support the audio element.
			</audio>
		</div>
	)
}
