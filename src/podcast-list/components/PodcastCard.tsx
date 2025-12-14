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
			className='podcast-item group relative flex cursor-pointer items-center justify-start gap-4 rounded-xl border border-white/10 bg-slate-900/35 p-3 shadow-lg backdrop-blur-md hover:border-white/20 hover:bg-slate-900/45 hover:shadow-xl md:flex-col md:text-center'
		>
			<div className='w-20 flex-none drop-shadow-sm md:absolute md:left-1/2 md:top-0 md:size-28 md:-translate-x-1/2 md:-translate-y-1/2 md:group-hover:scale-105'>
				<img
					className='group-hover:saturate-125 rounded-full ring-1 ring-white/10 transition-transform duration-200 group-hover:-rotate-12 group-hover:ring-white/20'
					loading='lazy'
					srcSet={srcSet}
					sizes='(max-width: 550px) 55vw, (max-width: 600px) 60vw, 100vw'
					alt='Podcast cover'
				/>
			</div>

			<div>
				<h1 className='text font-semibold uppercase leading-4 text-slate-100 md:mt-14'>
					{name}
				</h1>
				<h2 className='mt-1 text-slate-400'>Author: {author}</h2>
			</div>
		</Link>
	)
}
