module.exports = {
	content: [
	  './pages/**/*.{js,ts,jsx,tsx}',
	  './components/**/*.{js,ts,jsx,tsx}',
	  './layouts/**/*.{js,ts,jsx,tsx}',
	  './modals/**/*.{js,ts,jsx,tsx}',
	  './shared/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				black: '#272727',
				primary: '#FEA300',
				white: '#FFFFFF',
				veryLightGrey: '#F8F8F8',
				grey: '#DBDBDB',
				darkGrey: '#9F9F9F',
				red: '#FF5151',
				lightGrey: '#F1F1F1',
				green: '#00C868',
			},
			spacing: {
				'4.5': '1.125rem',
				'6.5': '1.625rem',
				'7.5': '1.875rem',
				'23': '5.75rem',
				'25': '6.25rem',
			},
			fontSize: {
				'3.5xl': '2rem',
			},
			borderRadius: {
				'2.5xl': '1.25rem',
			},
			boxShadow: {
				main: '5px 5px 25px rgba(121, 121, 121, 0.15)',
			},
		},
	},
	plugins: [],
};
