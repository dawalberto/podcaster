import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { RootLayout } from './layouts'
import { EpisodePage, ErrorPage, PodcastListPage, PodcastPage } from './pages'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <PodcastListPage />,
			},
			{
				path: 'podcast/:podcastId',
				element: <PodcastPage />,
			},
			{
				path: 'podcast/:podcastId/episode/:episodeId',
				element: <EpisodePage />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
