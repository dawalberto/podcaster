import { PodcastEpisode } from '../../podcast-details/types/podcast-details'
import { transformToHtml } from '../../shared'

export const Episode = ({ episode }: { episode: PodcastEpisode }) => {
	const { trackName, description, episodeUrl } = episode

	return (
		<div className='h-fit grow rounded-xl border border-white/10 bg-slate-900/35 p-4 shadow-lg backdrop-blur-md'>
			<h1 className='text-xl font-bold text-slate-100'>{trackName}</h1>
			<div
				className='inserted-html mt-3 text-slate-300'
				dangerouslySetInnerHTML={{
					__html: transformToHtml(description),
				}}
			/>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
			<audio data-testid='episode-audio' controls className='mt-8 w-full'>
				<source data-testid='episode-audio-src' src={episodeUrl} type='audio/mp3' />
				Your browser does not support the audio element.
			</audio>
		</div>
	)
}
