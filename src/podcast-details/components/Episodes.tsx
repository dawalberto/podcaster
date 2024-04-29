import { Link } from 'react-router-dom'
import { formatDate, formatTrackTime } from '../../shared'
import { PodcastDetails, PodcastEpisode } from '../types/podcast-details'

export const Episodes = ({
	episodes,
	trackCount,
}: {
	episodes: PodcastEpisode[]
	trackCount: Pick<PodcastDetails, 'trackCount'>['trackCount']
}) => {
	return (
		<div className='flex grow flex-col gap-3'>
			<div className='rounded-md border border-neutral-200 px-3 py-2 shadow'>
				<span className='text-2xl font-semibold'>Episodes: {trackCount}</span>
			</div>
			<div className='w-full rounded-md border border-neutral-200 p-3 shadow'>
				<table className='w-full table-auto'>
					<thead className='text-left'>
						<tr>
							<th className='px-2 py-2'>Title</th>
							<th className='px-6 py-2'>Date</th>
							<th className='px-2 py-2'>Duration</th>
						</tr>
					</thead>
					<tbody>
						{episodes.map(
							({ trackName, releaseDate, trackTimeMillis, trackId }, index) => (
								<tr
									key={trackId}
									className={`border-t border-neutral-300 ${index % 2 === 0 && 'bg-neutral-100/95'}`}
								>
									<td className='line-clamp-1 px-2 py-6 text-sky-700/80 hover:text-sky-900 active:text-sky-600 md:line-clamp-none md:py-3'>
										<Link to={`episode/${trackId}`}>{trackName}</Link>
									</td>
									<td className='px-6 py-6 text-neutral-500 md:py-3'>
										{formatDate(releaseDate)}
									</td>
									<td className='px-2 py-6 text-neutral-500 md:py-3'>
										{formatTrackTime(trackTimeMillis)}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
