import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { PodcastDetails } from '../types/podcast-details'

export const PodcastInfo = ({ details }: { details: PodcastDetails }) => {
	const { episodeId } = useParams()
	const {
		artworkUrl60,
		artworkUrl100,
		artworkUrl600,
		trackName,
		trackId,
		artistName,
		description,
	} = details
	const srcSet = `${artworkUrl60} 60w,
                    ${artworkUrl100} 100w,
                    ${artworkUrl600} 600w
                    `
	return (
		<div className='flex h-fit w-full flex-none flex-col gap-4 rounded-md border border-neutral-200 p-4 text-neutral-800 shadow md:w-1/4'>
			{details && (
				<>
					<div className='mx-auto w-1/2 md:w-4/5'>
						<Link to={`/podcaster/podcast/${trackId}`}>
							<img
								className={clsx(
									'w-full rounded-md',
									episodeId
										? 'cursor-pointer hover:-rotate-6 hover:scale-105 hover:saturate-150'
										: 'cursor-default'
								)}
								loading='lazy'
								srcSet={srcSet}
								sizes='(max-width: 900px) 60px, 600px'
								src={artworkUrl600}
								alt='Podcast cover'
							/>
						</Link>
					</div>
					<hr className='border-gray-200' />
					<div>
						<Link to={`/podcaster/podcast/${trackId}`}>
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
									'mt-1 text-sm',
									episodeId ? linkStyle : 'cursor-default'
								)}
							>
								by {artistName}
							</h2>
						</Link>
					</div>
					{description && (
						<>
							<hr className='border-gray-200' />
							<div>
								<span className='text-sm font-semibold'>Description:</span>
								<p className='mt-1 text-pretty break-words text-sm italic'>
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

const linkStyle = 'hover:text-sky-700 active:text-sky-600'
