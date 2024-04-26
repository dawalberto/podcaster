import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
	const error = useRouteError()
	const isRouteError = isRouteErrorResponse(error)

	return (
		<div>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred 🤷‍♂️</p>
			<p>
				<i>{isRouteError && error.statusText}</i>
			</p>
		</div>
	)
}
