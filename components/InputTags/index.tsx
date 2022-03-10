import { useState } from 'react';
import Props from './InputTags.props';

const InputTags = ({ className = '', tagsValue, setTagsValue, ...props }: Props): JSX.Element => {
	const [inputValue, setInputValue] = useState('');

	const onPushTag = () => {
		if(inputValue !== '') {
			setTagsValue(tagsValue.concat(inputValue));
			setInputValue('');
		}
	};

	return (
		<div className={className + ' grid grid-cols-[1fr_auto] rounded-2.5xl bg-veryLightGrey'} {...props}>
			<div className='py-3.5 px-5'>
				<input
					className='h-full w-full bg-transparent outline-none'
					placeholder='Теги'
					value={inputValue ? '#' + inputValue : ''}
					onChange={(e) => setInputValue(e.target.value.replaceAll('#', ''))}
					onKeyDown={(e) => {
						if(e.code === 'Enter')
							onPushTag();
					}} />
			</div>
			<button
				className='bg-primary rounded-r-2xl py-5 px-10'
				onClick={(e) => {
					e.preventDefault();
					onPushTag();
				}}
			>
				<p className='text-white font-semibold text-sm'>
					Добавить
				</p>
			</button>
		</div>
	);
};

export default InputTags;
