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
			className='w-3/5 rounded-md border border-gray-300 px-2 py-1 md:min-w-64 md:max-w-72'
			value={searchTerm}
			onChange={handleInputChange}
		/>
	)
}
