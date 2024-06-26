import '@testing-library/jest-dom'

const localStorageMock = (function () {
	let store: Record<string, unknown> = {}

	return {
		getItem: function (key: string) {
			return store[key] || null
		},
		setItem: function (key: string, value: unknown) {
			store[key] = value
		},
		removeItem: function (key: string) {
			delete store[key]
		},
		clear: function () {
			store = {}
		},
	}
})()

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
})
