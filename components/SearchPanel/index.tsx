import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoupeIcon from '../../assets/loupe.svg';
import Props from './SearchPanel.props';

const SearchPanel = ({ className = '', ...props }: Props): JSX.Element => {
	const router = useRouter();
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if(router.query.query)
			setInputValue(router.query.query as string);
	}, [router]);

	const onSubmit = () => {
		router.push({
			pathname: '/search',
			query: {
				query: inputValue,
			},
		});
	};

	return (
		<div className={className + ' lg:grid grid-cols-[1fr_auto]'}>
			<div className='flex items-center gap-1.5 bg-veryLightGrey rounded-2.5xl lg:rounded-r-none py-4.5 px-5'>
				<LoupeIcon />
				<input
					className='w-full bg-transparent outline-none'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => {
						if(e.key === 'Enter')
							onSubmit();
					}}
					{...props} />
			</div>
			<button className='hidden lg:block bg-primary py-5 px-16 rounded-r-2.5xl text-white font-semibold' onClick={onSubmit}>
				Найти
			</button>
		</div>
	);
};

export default SearchPanel;
