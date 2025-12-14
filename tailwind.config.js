/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
				display: ['Orbitron', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}
