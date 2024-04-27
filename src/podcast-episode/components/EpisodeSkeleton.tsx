import clsx from 'clsx'
import { skeletonStyles } from '../../shared/styles'

export const PodcastEpisodeSkeleton = () => {
	return (
		<section className='flex flex-col gap-10 md:flex-row'>
			<div className={clsx('flex h-96 w-full md:w-1/4', skeletonStyles)} />
			<div className='flex grow flex-col gap-3'>
				<div className={clsx('h-[800px]', skeletonStyles)} />
			</div>
		</section>
	)
}
