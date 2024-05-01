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
			className='podcast-item group relative flex cursor-pointer items-center justify-start gap-4 rounded-md border border-neutral-200 bg-sky-50/20 p-3 shadow hover:shadow-lg md:flex-col md:text-center'
		>
			<div className='w-20 flex-none drop-shadow group-hover:drop-shadow-md md:absolute md:left-1/2 md:top-0 md:size-28 md:-translate-x-1/2 md:-translate-y-1/2 md:group-hover:scale-105'>
				<img
					className='rounded-full group-hover:-rotate-12 group-hover:saturate-150'
					loading='lazy'
					srcSet={srcSet}
					sizes='(max-width: 550px) 55vw, (max-width: 600px) 60vw, 100vw'
					alt='Podcast cover'
				/>
			</div>

			<div>
				<h1 className='text font-semibold uppercase leading-4 text-neutral-800 md:mt-14'>
					{name}
				</h1>
				<h2 className='mt-1 text-neutral-600'>Author: {author}</h2>
			</div>
		</Link>
	)
}
