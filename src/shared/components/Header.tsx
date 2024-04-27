import { Link, useNavigation } from 'react-router-dom'

export const Header = () => {
	const navigation = useNavigation()
	return (
		<>
			<header className='sticky top-0 z-20 my-2 bg-white'>
				<div className='flex items-center justify-between px-1'>
					<Link
						to='/podcaster'
						className='text-xl font-semibold text-sky-700/80 hover:text-sky-900 active:text-sky-600'
					>
						Podcaster
					</Link>
					{navigation.state !== 'idle' && (
						<div className='size-6 animate-pulse rounded-full bg-sky-700/80' />
					)}
				</div>
				<hr className='mt-2 border-gray-200 shadow' />
			</header>
		</>
	)
}
