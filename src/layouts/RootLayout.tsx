import { Outlet } from 'react-router-dom'
import { Header } from '../components'

export const RootLayout = () => {
	return (
		<div className='mx-auto max-w-screen-xl px-2'>
			<Header />
			<Outlet />
		</div>
	)
}
