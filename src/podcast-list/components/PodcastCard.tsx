import { Link } from 'react-router-dom'
import { PodcastEntry } from '../types/podcast-list'

export const PodcastCard = ({ podcast }: { podcast: PodcastEntry }) => {
	const id = podcast.id.attributes['im:id']
	const srcSet = podcast['im:image']
		.map(({ label, attributes }) => `${label} ${attributes.height}w`)
		.join(',')
	const name = podcast['im:name'].label
	const author = podcast['im:artist'].label

	return (
		<Link
			to={`podcast/${id}`}
			className='group relative flex cursor-pointer items-center justify-start gap-4 rounded-md border border-neutral-300 p-3 shadow-lg drop-shadow-lg hover:shadow-2xl md:flex-col md:text-center'
		>
			<div className='w-20 flex-none duration-300 md:absolute md:left-1/2 md:top-0 md:size-32 md:-translate-x-1/2 md:-translate-y-1/2 md:group-hover:scale-105'>
				<img
					className='rounded-full group-hover:saturate-150'
					loading='lazy'
					srcSet={srcSet}
					sizes='(max-width: 550px) 55vw, (max-width: 600px) 60vw, 100vw'
					alt='Podcast cover'
				/>
			</div>

			<div>
				<h1 className='text font-semibold uppercase text-neutral-700 md:mt-16'>{name}</h1>
				<h2 className='text-neutral-500'>Author: {author}</h2>
			</div>
		</Link>
	)
}
