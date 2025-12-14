import { useCallback, useState } from 'react'

export const SearchInput = ({ onSearch }: { onSearch: (searchingTerm: string) => void }) => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newSearchTerm: string = event.target.value
			setSearchTerm(newSearchTerm)
			onSearch(newSearchTerm)
		},
		[onSearch]
	)

	return (
		<input
			type='text'
			placeholder='Filter podcasts...'
			className='w-full rounded-lg border border-white/10 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none backdrop-blur-md placeholder:text-slate-400 focus:border-white/20 focus:ring-2 focus:ring-white/10 md:min-w-64 md:max-w-72'
			value={searchTerm}
			onChange={handleInputChange}
		/>
	)
}
