import clsx from 'clsx'
import { skeletonStyles } from '../../shared/styles'

export const PodcastInfoSkeleton = () => {
	return <div className={clsx('flex h-[600px] w-full md:w-1/4', skeletonStyles)} />
}
