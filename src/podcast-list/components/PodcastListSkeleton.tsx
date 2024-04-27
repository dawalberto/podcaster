import clsx from 'clsx'
import { skeletonStyles } from '../../shared/styles'

export const PodcastListSkeleton = () => {
	return (
		<>
			<div className='flex items-center justify-end gap-2'>
				<div className={clsx('h-7 w-12', skeletonStyles)} />
				<div className={clsx('h-10 w-full md:w-80', skeletonStyles)} />
			</div>
			<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:mt-24 md:grid-cols-3 md:gap-y-32 lg:grid-cols-4'>
				{new Array(12).fill(
					<div className={clsx('relative h-40', skeletonStyles)}>
						<div
							className={clsx(
								'w-20 flex-none rounded-full bg-slate-300 md:absolute md:left-1/2 md:top-0 md:size-28 md:-translate-x-1/2 md:-translate-y-1/2'
							)}
						/>
					</div>
				)}
			</div>
		</>
	)
}
