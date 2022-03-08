import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import useModal from '../../hooks/useModal';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';
import Props from './SubmitModal.props';

import CrossIcon from '../../assets/cross.svg';
import { useMutation } from 'react-query';
import { postApplication } from '../../shared/api/applications';

const SubmitModal = ({ className = '', ...props }: Props): JSX.Element => {
	const router = useRouter();

	const toggleShowModal = useModal((state) => state.toggleShowModal);
	const [captchaSubmited, setCaptchaSubmited] = useState(false);
	const [errorsList, setErrorsList] = useState([]);

	const { mutate, isSuccess } = useMutation(postApplication);

	useEffect(() => {
		if(isSuccess)
			router.push('/success');
	}, [isSuccess, router]);

	const formik = useFormik({
		initialValues: {
			name: '',
			phone: '',
			comment: '',
		},
		onSubmit: (values) => {
			let _errorsList = [];
			if(!values.name)
				_errorsList.push('name');
			if(!values.phone)
				_errorsList.push('phone');
			if(!captchaSubmited)
				_errorsList.push('recaptcha');

			setErrorsList(_errorsList);

			if(!_errorsList.length) {
				toggleShowModal();
				mutate({
					club: +router.query.id,
					status: 'NEW',
					name: values.name,
					text: values.comment,
					phone: values.phone,
				});
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className={className + ' relative h-full pb-20'} {...props}>
			<div className='mt-4 mb-8 grid items-center grid-cols-[1fr_auto] gap-5'>
				<p className='font-bold text-3.5xl'>
					Запись ребенка на секция
					{' '}
					<span className='text-primary'>
						Футболика
					</span>
				</p>
				<button className='hidden p-1 bg-veryLightGrey rounded-xl md:block' onClick={toggleShowModal}>
					<CrossIcon className='fill-primary' />
				</button>
			</div>
			<Input
				name='name'
				value={formik.values.name}
				onChange={(e) => {
					removeItemFromErrorsList(setErrorsList, 'name');
					formik.handleChange(e);
				}}
				isDanger={errorsList.includes('name')}
				className='mt-6'
				placeholder='Имя' />
			<Input
				name='phone'
				value={formik.values.phone}
				onChange={(e) => {
					removeItemFromErrorsList(setErrorsList, 'phone');
					formik.handleChange(e);
				}}
				isDanger={errorsList.includes('phone')}
				className='mt-5'
				placeholder='Телефон' />
			<Textarea
				name='comment'
				value={formik.values.comment}
				onChange={formik.handleChange}
				className='mt-5'
				placeholder='Комментарий' />
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

export default SubmitModal;
