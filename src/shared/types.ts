export type PodcastListResponse = {
	feed: {
		author: {
			name: {
				label: string
			}
			uri: {
				label: string
			}
		}
		updated: {
			label: string
		}
		rights: {
			label: string
		}
		title: {
			label: string
		}
		icon: {
			label: string
		}
		link: {
			attributes: {
				rel: string
				type?: string
				href: string
			}
		}[]
		entry: PodcastEntry[]
		id: {
			label: string
		}
	}
}

export type PodcastEntry = {
	'im:name': {
		label: string
	}
	'im:image': {
		label: string
		attributes: {
			height: string
		}
	}[]
	summary: {
		label: string
	}
	'im:price': {
		label: string
		attributes: {
			amount: string
			currency: string
		}
	}
	'im:contentType': {
		attributes: {
			term: string
			label: string
		}
	}
	rights?: {
		label: string
	}
	title: {
		label: string
	}
	link: {
		attributes: {
			rel: string
			type: string
			href: string
		}
	}
	id: {
		label: string
		attributes: {
			'im:id': string
		}
	}
	'im:artist': {
		label: string
		attributes?: {
			href: string
		}
	}
	category: {
		attributes: {
			'im:id': string
			term: string
			scheme: string
			label: string
		}
	}
	'im:releaseDate': {
		label: string
		attributes: {
			label: string
		}
	}
}

export type PodcastListLocalStorage = {
	lastFetch: string
	podcastList: PodcastEntry[]
}

export type PodcastDetailsResponse = {
	contents: string
	status: {
		url: string
		content_type: string
		http_code: number
		response_time: number
		content_length: number
	}
}

export type PodcastDetailsData = {
	resultCount: number
	results: PodcastAndEpisodes
}

export type PodcastDetails = {
	wrapperType: 'track'
	kind: string
	artistId: number
	collectionId: number
	trackId: number
	artistName: string
	collectionName: string
	trackName: string
	collectionCensoredName: string
	trackCensoredName: string
	artistViewUrl: string
	collectionViewUrl: string
	feedUrl: string
	trackViewUrl: string
	artworkUrl30: string
	artworkUrl60: string
	artworkUrl100: string
	collectionPrice: number
	trackPrice: number
	collectionHdPrice: number
	releaseDate: string
	collectionExplicitness: string
	trackExplicitness: string
	trackCount: number
	trackTimeMillis: number
	country: string
	currency: string
	primaryGenreName: string
	contentAdvisoryRating: string
	artworkUrl600: string
	genreIds: string[]
	genres: string[]
}

export type PodcastEpisode = {
	country: string
	artworkUrl600: string
	feedUrl: string
	closedCaptioning: string
	collectionId: number
	collectionName: string
	artistIds: number[]
	shortDescription: string
	releaseDate: string
	trackId: number
	trackName: string
	genres: {
		name: string
		id: string
	}[]
	episodeGuid: string
	description: string
	artworkUrl160: string
	episodeFileExtension: string
	episodeContentType: string
	previewUrl: string
	trackTimeMillis: number
	collectionViewUrl: string
	episodeUrl: string
	artistViewUrl: string
	trackViewUrl: string
	artworkUrl60: string
	contentAdvisoryRating: string
	kind: string
	wrapperType: 'podcastEpisode'
}

export type PodcastAndEpisodes = [PodcastDetails, ...PodcastEpisode[]]
