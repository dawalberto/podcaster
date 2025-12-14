import { Link, useNavigation } from 'react-router-dom'
import { useLoadingStore } from '../store/store'

export const Header = () => {
	const navigation = useNavigation()
	const dataIsLoading = useLoadingStore(({ dataIsLoading }) => dataIsLoading)
	const loading = navigation.state !== 'idle' || dataIsLoading

	return (
		<header className='sticky top-0 z-20 pt-3'>
			<div className='relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md'>
				{/* Glow background */}
				<div aria-hidden className='pointer-events-none absolute inset-0'>
					<div className='via-white/12 absolute -top-10 left-1/2 h-24 w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent to-transparent blur-3xl' />
					<div className='via-white/8 absolute -bottom-12 left-1/2 h-28 w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent to-transparent blur-3xl' />
					<div className='from-white/6 absolute inset-0 bg-gradient-to-b via-transparent to-transparent' />
				</div>
				<div className='flex items-center justify-between px-4 py-3'>
					<Link
						to='/podcaster/'
						className='text-lg font-semibold tracking-wide text-slate-100 hover:text-white active:text-slate-200'
					>
						<span className='bg-gradient-to-r from-slate-100 via-white to-slate-300 bg-clip-text font-bold uppercase tracking-widest text-transparent'>
							Podcaster
						</span>
					</Link>
					{loading && (
						<div className='relative'>
							<div className='size-6 animate-pulse rounded-full bg-white/10 ring-1 ring-white/15' />
							<div className='absolute inset-1 rounded-full bg-white/60' />
						</div>
					)}
				</div>
				<div className='h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent' />
			</div>
		</header>
	)
}
