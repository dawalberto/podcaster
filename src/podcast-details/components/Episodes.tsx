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
			<div className='rounded-xl border border-white/10 bg-slate-900/35 px-4 py-3 shadow-lg backdrop-blur-md'>
				<span className='text-2xl font-semibold text-slate-100'>
					Episodes: {trackCount}
				</span>
			</div>
			<div className='w-full rounded-xl border border-white/10 bg-slate-900/35 p-3 shadow-lg backdrop-blur-md'>
				<table className='w-full table-auto'>
					<thead className='text-left text-slate-200'>
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
									className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} hover:bg-white/5`}
								>
									<td className='line-clamp-1 px-2 py-6 text-slate-100 hover:text-white active:text-slate-200 md:line-clamp-none md:py-3'>
										<Link to={`episode/${trackId}`} className='episode'>
											{trackName}
										</Link>
									</td>
									<td className='px-6 py-6 text-slate-300 md:py-3'>
										{formatDate(releaseDate)}
									</td>
									<td className='px-2 py-6 text-slate-300 md:py-3'>
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
