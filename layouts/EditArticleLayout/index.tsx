import MainLayout from '../MainLayout';
import Props from './EditArticleLayout.props';
import TrashIcon from '../../assets/trash_red.svg';
import { useState } from 'react';
import { useFormik } from 'formik';
import InputImage from '../../components/InputImage';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import InputTags from '../../components/InputTags';
import Button from '../../components/Button';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';
import { CREATE_ARTICLE_ERRORS } from '../../shared/consts/createErrors';
import LoaderIcon from '../../assets/loader.svg';

const EditArticleLayout = ({ images, title, content, tags, isAds, endAdsDate, onSubmit, onDelete, isDanger, isLoading,
}: Props): JSX.Element => {
	const isNewArticle = !images || !title || !content;

	const [isSubmit, setIsSubmit] = useState(false);
	const [errorsList, setErrorsList] = useState([]);
	const [imageValues, setImageValues] = useState(images ? images : []);
	const [tagsValue, setTagsValue] = useState(tags ? tags : []);

	const [isAdsValue, setIsAdsValue] = useState(isAds);
	const [endAdsDateValue, setEndAdsDateValue] = useState<Date>(endAdsDate ? endAdsDate : null);

	const formik = useFormik({
		initialValues: {
			title: title,
			content: content,
		},
		onSubmit: (values) => {
			if(isSubmit) {
				setIsSubmit(false);
				let _erors = [];
			
				if(!values.title)
					_erors.push('title');
				if(!values.content)
					_erors.push('content');
				if(isAdsValue && !endAdsDateValue)
					_erors.push('date');
				
				setErrorsList(_erors);

				if(!_erors.length) {
					onSubmit({
						images: imageValues,
						title: values.title,
						content: values.content,
						tags: tagsValue,
						isAds: isAdsValue,
						...(isAdsValue && {
							endAdsDate: endAdsDateValue,
						}),
					});
				}
			}
		},
	});

	return (
		<MainLayout showFooter={false} errorMessage={isDanger && 'Ой, что-то пошло не так. Попробуйте ещё раз позже'}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-3xl'>
					{isNewArticle ? 'Создание статьи' : 'Редактирование статьи'}
				</h1>
				{!isNewArticle && (
					<button className='rounded-2xl bg-veryLightGrey p-3' onClick={onDelete}>
						<TrashIcon />
					</button>
				)}
			</div>
			<form onSubmit={formik.handleSubmit} className='mt-4'>
				<InputImage
					htmlId='images'
					label='Загрузите фотографии обложки'
					imageIds={imageValues}
					setImageIds={(newValue) => {
						removeItemFromErrorsList(setErrorsList, 'images');
						setImageValues(newValue);
					}} />
				<Input
					className='mt-4'
					placeholder='Заголовок'
					name='title'
					isDanger={errorsList.includes('title')}
					value={formik.values.title}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'title');
						formik.handleChange(e);
					}} />
				<Textarea
					className='mt-4'
					placeholder='Текст статьи'
					isDanger={errorsList.includes('content')}
					name='content'
					value={formik.values.content}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'content');
						formik.handleChange(e);
					}} />
				<InputTags
					className='mt-4'
					tagsValue={tagsValue}
					setTagsValue={setTagsValue} />
				<div className='mt-3 flex gap-2 flex-wrap'>
					{tagsValue.map((i, num) => (
						<button
							key={num}
							onClick={() => {
								let _tags = tagsValue;
								_tags.splice(_tags.indexOf(i), 1);

								setTagsValue(_tags);
							}}
							className='bg-veryLightGrey rounded-md p-1 px-3 text-primary font-semibold cursor-pointer'
						>
							#
							{i}
						</button>
					))}
				</div>
				<Input
					id='isAds'
					name='isAds'
					checked={isAdsValue}
					onChange={(e) => setIsAdsValue(e.target.checked)}
					variant='checkbox'
					className='my-4'
					placeholder='Пост рекламный' />

				{isAdsValue && (
					<Input
						value={endAdsDateValue as any}
						onChange={(e) => setEndAdsDateValue(new Date(e.target.value as any))}
						className='mb-4'
						variant='date' />
				)}
				{errorsList.map((i, num) => (
					<p key={num} className='text-red text-sm text-center font-semibold mb-2'>
						{CREATE_ARTICLE_ERRORS[i]}
					</p>
				))}
				{isLoading ? (
					<LoaderIcon className='float-right h-16 mr-24 my-7' />
				) : (
					<Button
						onClick={() => setIsSubmit(true)}
						type='submit'
						variant='primary'
						className='my-7 lg:w-fit lg:px-28 lg:float-right'
						label='Сохранить' />
				)}
			</form>
		</MainLayout>
	);
};

export default EditArticleLayout;
