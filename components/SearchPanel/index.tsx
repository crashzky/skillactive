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

	return (
		<div className={className + ' flex gap-1.5 bg-veryLightGrey rounded-2.5xl py-4.5 px-5'}>
			<LoupeIcon />
			<input
				className='w-full bg-transparent outline-none'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => {
					if(e.key === 'Enter') {
						router.push({
							pathname: '/search',
							query: {
								query: inputValue,
							},
						});
					}
				}}
				{...props} />
		</div>
	);
};

export default SearchPanel;
