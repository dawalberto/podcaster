import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { PodcastPage } from './podcast-details/pages/PodcastPage'
import { EpisodePage } from './podcast-episode/pages/EpisodePage'
import { PodcastListPage } from './podcast-list/pages/PodcastListPage'
import { RootLayout } from './shared/layouts/RootLayout'
import { ErrorPage } from './shared/pages/ErrorPage'

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
