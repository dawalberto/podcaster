import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export const RootLayout = () => {
	return (
		<div className='relative mx-auto max-w-screen-2xl px-2'>
			<Header />
			<main className='mx-4 mt-4'>
				<Outlet />
			</main>
		</div>
	)
}
