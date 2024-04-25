import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<header className='my-2'>
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
