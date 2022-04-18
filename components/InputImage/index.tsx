import { useEffect, useState } from 'react';
import Props from './InputImage.props';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { uploadFile } from '../../shared/api/file';

import GalleryIcon from '../../assets/gallery.svg';
import CrossIcon from '../../assets/cross.svg';
import LoaderIcon from '../../assets/loader.svg';
import normalizeImageUrl from '../../utils/normalizeImgeUrl';

const InputImage = ({ className = '', label, imageIds, setImageIds, isSingleImage, htmlId, ...props }: Props): JSX.Element => {
	const [key, setKey] = useState(false);

	const isLoading = false;

	const { data, mutate, isSuccess } = useMutation(uploadFile);

	useEffect(() => {
		if(isSuccess)
			setImageIds(imageIds.concat(process.env.NEXT_PUBLIC_API_MEDIA_URL + normalizeImageUrl(data.path)));
	}, [isSuccess]);

	return (
		<div
			key={key.toString()}
			className={className + ' grid grid-flow-col gap-4 overflow-x-scroll overflow-y-hidden'}
			{...props}
		>
			{imageIds.map((i, num) => (
				<div key={num} className='relative h-[218px] w-[218px] rounded-2.5xl'>
					<button
						type='button'
						className='absolute z-20 top-3 right-3 bg-veryLightGrey rounded-xl p-3'
						onClick={() => {
							let _imageIds = imageIds;
							_imageIds.splice(num, 1);

							setImageIds(_imageIds);
							setKey(!key);
						}}
					>
						<CrossIcon className='fill-primary' />
					</button>
					{isLoading && (
						<>
							<div className='absolute z-20 w-full h-full flex justify-center items-center'>
								<LoaderIcon />
							</div>
							<div className='absolute z-10 w-full h-full bg-black opacity-40 rounded-2.5xl'>
							</div>
						</>
					)}
					<Image
						src={i}
						width={218}
						height={218}
						className='h-full w-full object-cover rounded-2.5xl'
						alt='section' />
				</div>
			))}
			{(!isSingleImage || !imageIds.length) && (
				<div className='w-full rounded-[10px] bg-veryLightGrey p-[10px]'>
					<p className='font-bold text-xs text-center text-darkGrey mt-14 mb-14 whitespace-nowrap'>
						{label} 
					</p>
					<input
						id={htmlId}
						type='file'
						className='hidden'
						accept='image/*;capture=camera'
						onChange={(e) => {
							const name = 'image.'
							+ e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];

							mutate({
								filename: name,
								file: e.target.files[0],
							});
						}} />
					<label htmlFor={htmlId} className='flex justify-center items-center w-full py-4 px-5 rounded-2xl bg-white'>
						<GalleryIcon className='mr-2' />
						<p className='font-bold text-sm'>
							Из галлереи
						</p>
					</label>
				</div>
			)}
		</div>
	);
};

export default InputImage;
