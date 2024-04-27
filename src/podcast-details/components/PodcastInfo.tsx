import { PodcastDetails } from '../types/podcast-details'

export const PodcastInfo = ({ details }: { details: PodcastDetails }) => {
	const {
		artworkUrl30,
		artworkUrl60,
		artworkUrl100,
		artworkUrl600,
		trackName,
		artistName,
		description,
	} = details

	const srcSet = `${artworkUrl30} 30w,
                    ${artworkUrl60} 60w,
                    ${artworkUrl100} 100w,
                    ${artworkUrl600} 600w
                    `
	return (
		<div className='flex h-fit w-full flex-col gap-4 rounded-md border border-neutral-200 p-4 text-neutral-800 shadow md:w-1/4'>
			{details && (
				<>
					<div className='mx-auto w-1/2 md:w-4/5'>
						<img
							className='w-full rounded-md'
							loading='lazy'
							srcSet={srcSet}
							sizes='(max-width: 600px) 30px,
                                    (max-width: 900px) 60px,
                                    (max-width: 1200px) 100px,
                                    600px'
							src={artworkUrl600}
							alt='Podcast cover'
						/>
					</div>
					<hr className='border-gray-200' />
					<div>
						<h1 className='text-base font-semibold'>{trackName}</h1>
						<h2 className='mt-1 text-sm'>by {artistName}</h2>
					</div>
					{description && (
						<>
							<hr className='border-gray-200' />
							<div>
								<span className='text-sm font-semibold'>Description:</span>
								<p className='mt-1 text-sm italic'>{description}</p>
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}
