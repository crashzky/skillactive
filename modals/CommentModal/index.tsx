import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Props from './CommentModal.props';
import { useFormik } from 'formik';
import useModal from '../../hooks/useModal';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../../components/Button';
import { useState } from 'react';

import CrossIcon from '../../assets/cross.svg';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';

const CommentModal = ({ className = '', ...props }: Props): JSX.Element => {
	const toggleShowModal = useModal((state) => state.toggleShowModal);
	const [captchaSubmited, setCaptchaSubmited] = useState(false);
	const [errorsList, setErrorsList] = useState([]);

	const formik = useFormik({
		initialValues: {
			username: '',
			message: '',
		},
		onSubmit: (values) => {
			let _errorsList = [];
			if(!values.username)
				_errorsList.push('username');
			if(!values.message)
				_errorsList.push('message');
			if(!captchaSubmited)
				_errorsList.push('recaptcha');

			setErrorsList(_errorsList);

			if(!_errorsList.length)
				toggleShowModal();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className={className + ' relative h-full pb-20'} {...props}>
			<div className='mt-4 mb-8 grid items-center grid-cols-[1fr_auto]'>
				<h2 className='font-bold text-xl text-center'>
					Комменирование
				</h2>
				<button className='hidden p-1 bg-veryLightGrey rounded-xl md:block' onClick={toggleShowModal}>
					<CrossIcon className='fill-primary' />
				</button>
			</div>
			<Input
				isDanger={errorsList.includes('username')}
				name='username'
				value={formik.values.username}
				onChange={(e) => {
					removeItemFromErrorsList(setErrorsList, 'username');
					formik.handleChange(e);
				}}
				placeholder='Ваше имя' />
			<Textarea
				name='message'
				isDanger={errorsList.includes('message')}
				value={formik.values.message}
				onChange={(e) => {
					removeItemFromErrorsList(setErrorsList, 'message');
					formik.handleChange(e);
				}}
				className='mt-5'
				placeholder='Текст комментария' />
			<ReCAPTCHA
				className='recapcha mt-5'
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
				onChange={() => {
					removeItemFromErrorsList(setErrorsList, 'recaptcha');
					setCaptchaSubmited(true);
				}} />
			{errorsList.includes('recaptcha') && (
				<p className='font-semibold font-sm text-red text-center mt-5'>
					Пожалуйста, заполните капчу
				</p>
			)}
			<Button type='submit' className='absolute bottom-6 md:bottom-0' variant='primary' label='Отправить' />
		</form>
	);
};

export default CommentModal;
