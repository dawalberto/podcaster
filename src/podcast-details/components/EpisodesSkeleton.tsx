import clsx from 'clsx'
import { skeletonStyles } from '../../shared/styles'

export const EpisodesSkeleton = () => {
	return (
		<div className='flex grow flex-col gap-3'>
			<span className={clsx('h-12', skeletonStyles)} />
			<div className={clsx('h-[1000px]', skeletonStyles)} />
		</div>
	)
}
