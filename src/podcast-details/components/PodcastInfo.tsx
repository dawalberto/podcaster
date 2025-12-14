import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { PodcastEntry } from '../../podcast-list/types/podcast-list'
import useGetPodcastInfo from '../hooks/useGetPodcastInfo'
import { PodcastDetails } from '../types/podcast-details'

export const PodcastInfo = ({ details }: { details: PodcastDetails | PodcastEntry }) => {
	const { episodeId } = useParams()
	const { trackId, trackName, artistName, description, srcImage, srcSet } = useGetPodcastInfo({
		podcast: details,
	})

	return (
		<div className='flex h-fit w-full flex-none flex-col gap-4 rounded-xl border border-white/10 bg-slate-900/35 p-4 text-slate-100 shadow-lg backdrop-blur-md md:w-1/4'>
			{details && (
				<>
					<div className='mx-auto w-1/2 md:w-4/5'>
						<Link to={`/podcaster/podcast/${trackId}`}>
							<img
								className={clsx(
									'w-full rounded-lg ring-1 ring-white/10',
									episodeId
										? 'hover:saturate-125 cursor-pointer hover:-rotate-6 hover:scale-105 hover:ring-white/20'
										: 'cursor-default'
								)}
								loading='lazy'
								srcSet={srcSet}
								sizes='(max-width: 600px) 60px, 600px'
								src={srcImage}
								alt='Podcast cover'
							/>
						</Link>
					</div>
					<hr className='border-white/10' />
					<div>
						<Link to={`/podcaster/podcast/${trackId}`} data-testid='podcast-title'>
							<h1
								className={clsx(
									'text-base font-semibold',
									episodeId ? linkStyle : 'cursor-default'
								)}
							>
								{trackName}
							</h1>
						</Link>
						<Link to={`/podcaster/podcast/${trackId}`}>
							<h2
								className={clsx(
									'mt-1 text-sm text-slate-300',
									episodeId ? linkStyle : 'cursor-default'
								)}
							>
								by {artistName}
							</h2>
						</Link>
					</div>
					{description && (
						<>
							<hr className='border-white/10' />
							<div>
								<span className='text-sm font-semibold text-slate-200'>
									Description:
								</span>
								<p className='mt-1 text-pretty break-words text-sm text-slate-300'>
									{description}
								</p>
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}

const linkStyle = 'hover:text-white active:text-slate-200'
