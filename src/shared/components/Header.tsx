import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<header className='sticky top-0 z-20 my-2 bg-white'>
			<Link
				to='/'
				className='text-lg font-semibold text-sky-700 hover:text-sky-900 active:text-sky-600'
			>
				Podcaster
			</Link>
			<hr className='mt-2 border-gray-300' />
		</header>
	)
}
