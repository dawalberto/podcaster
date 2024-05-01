describe('Full flow', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173/podcaster/')
		cy.intercept(
			'GET',
			'https://api.allorigins.win/raw?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
		).as('fetchData')
		cy.wait('@fetchData')
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
				const podcastId = href.split('/').at(-1)
				cy.intercept(
					'GET',
					`https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D${podcastId}%26media%3Dpodcast%26entity%3DpodcastEpisode%26limit%3D20`
				).as('fetchDataDetails')
				cy.wait('@fetchDataDetails')
				cy.get('.episode')
					.first()
					.invoke('attr', 'href')
					.then((href) => {
						cy.get('.episode').first().click()
						cy.url().should('include', href)
						cy.get('[data-testid="episode-audio"]').should('exist')
					})
			})
	})
})
