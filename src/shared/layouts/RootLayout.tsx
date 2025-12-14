import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export const RootLayout = () => {
	return (
		<div className='relative min-h-screen overflow-hidden'>
			<div className='pointer-events-none fixed inset-0 z-0'>
				<div className='bg-cyan-400/22 absolute -top-32 left-1/2 h-96 w-[980px] -translate-x-1/2 rounded-full blur-3xl' />
				<div className='bg-cyan-400/18 absolute -top-16 right-[-180px] h-96 w-96 rounded-full blur-3xl' />
				<div className='bg-cyan-400/16 absolute -bottom-44 right-[-200px] h-[680px] w-[680px] rounded-full blur-3xl' />
				<div className='bg-cyan-400/12 absolute -bottom-56 left-[-240px] h-[720px] w-[720px] rounded-full blur-3xl' />
				<div className='absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,theme(colors.white)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.white)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]' />
				<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/75 to-transparent' />
			</div>
			<div className='relative z-10 mx-auto max-w-screen-2xl px-3 pb-10'>
				<Header />
				<main className='mx-1 mt-6 md:mx-4'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
