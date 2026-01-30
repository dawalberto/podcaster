describe('Full flow', () => {
	beforeEach(() => {
		const podcastList = {
			feed: {
				entry: [
					{
						id: {
							attributes: { 'im:id': '123' },
							label: 'https://example.com/podcast/123',
						},
						'im:name': { label: 'Test Podcast' },
						'im:artist': { label: 'Test Artist' },
						'im:image': [
							{ label: 'https://example.com/60.jpg', attributes: { height: '60' } },
							{
								label: 'https://example.com/100.jpg',
								attributes: { height: '100' },
							},
							{
								label: 'https://example.com/600.jpg',
								attributes: { height: '600' },
							},
						],
						summary: { label: 'Test summary' },
					},
				],
			},
		}

		const podcastDetails = {
			resultCount: 3,
			results: [
				{
					wrapperType: 'track',
					kind: 'podcast',
					trackId: 123,
					artistName: 'Test Artist',
					collectionName: 'Test Collection',
					trackName: 'Test Podcast',
					releaseDate: '2024-04-23T23:30:00Z',
					trackCount: 2,
					artworkUrl30: 'https://example.com/30.jpg',
					artworkUrl60: 'https://example.com/60.jpg',
					artworkUrl100: 'https://example.com/100.jpg',
					artworkUrl600: 'https://example.com/600.jpg',
					description: 'Podcast description',
				},
				{
					wrapperType: 'podcastEpisode',
					trackId: 1,
					trackName: 'Episode 1',
					releaseDate: '2024-04-30',
					trackTimeMillis: 60000,
					episodeUrl: 'https://example.com/ep1.mp3',
					description: 'Episode 1 description',
				},
				{
					wrapperType: 'podcastEpisode',
					trackId: 2,
					trackName: 'Episode 2',
					releaseDate: '2024-05-01',
					trackTimeMillis: 120000,
					episodeUrl: 'https://example.com/ep2.mp3',
					description: 'Episode 2 description',
				},
			],
		}

		cy.intercept('GET', /https:\/\/api\.allorigins\.win\/get\?url=.*toppodcasts.*json/i, {
			statusCode: 200,
			body: { contents: JSON.stringify(podcastList) },
		}).as('fetchData')

		cy.intercept(
			'GET',
			/https:\/\/api\.allorigins\.win\/get\?url=.*itunes\.apple\.com.*lookup.*/i,
			{
				statusCode: 200,
				body: { contents: JSON.stringify(podcastDetails) },
			}
		).as('fetchDataDetails')

		cy.visit('http://localhost:5173/podcaster/', {
			onBeforeLoad(win) {
				win.localStorage.clear()
				win.sessionStorage.clear()
			},
		})
		cy.wait('@fetchData', { timeout: 20000 })
	})

	it('loads successfully', () => {
		cy.contains('Podcaster')
	})

	it('displays podcast list', () => {
		cy.reload()
		cy.get('.podcast-item').should('exist')
	})

	it('navigates to podcast details page on podcast click', () => {
		cy.get('.podcast-item')
			.first()
			.invoke('attr', 'href')
			.then((href) => {
				cy.get('.podcast-item').first().click()
				cy.url().should('include', href)
				cy.get('[data-testid="podcast-title"]').should('exist')
			})
	})

	it('from podcast details page to episode page on episode title click', () => {
		cy.get('.podcast-item')
			.first()
			.invoke('attr', 'href')
			.then((href) => {
				cy.get('.podcast-item').first().click()
				cy.url().should('include', href)
				cy.wait('@fetchDataDetails')
				cy.get('.episode')
					.first()
					.invoke('attr', 'href')
					.then((episodeHref) => {
						cy.get('.episode').first().click()
						cy.url().should('include', episodeHref)
						cy.get('[data-testid="episode-audio"]').should('exist')
					})
			})
	})
})
