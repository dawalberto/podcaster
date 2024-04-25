import { Link, Outlet } from 'react-router-dom'

export const RootLayout = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
			</ul>
			<Outlet />
		</div>
	)
}
