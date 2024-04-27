import clsx from 'clsx'
import { skeletonStyles } from '../../shared/styles'

export const PodcastDetailsSkeleton = () => {
	return (
		<section className='flex flex-col gap-10 md:flex-row'>
			<div className={clsx('flex h-96 w-full md:w-1/4', skeletonStyles)} />
			<div className='flex grow flex-col gap-3'>
				<span className={clsx('h-12', skeletonStyles)} />
				<div className={clsx('h-[1000px]', skeletonStyles)} />
			</div>
		</section>
	)
}
