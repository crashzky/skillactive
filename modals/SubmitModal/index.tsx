import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import useModal from '../../hooks/useModal';
import Props from './SubmitModal.props';

const SubmitModal = ({ className = '', ...props }: Props): JSX.Element => {
	const router = useRouter();

	const toggleShowModal = useModal((state) => state.toggleShowModal);
	const [captchaSubmited, setCaptchaSubmited] = useState(false);
	const [errorsList, setErrorsList] = useState([]);

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
				router.push('/success');
			}
		},
	});

	function removeItemFromErrorsList(item: string) {
		setErrorsList((prev) => {
			let _prev = prev;

			if(_prev.includes(item))
				_prev.splice(_prev.indexOf(item), 1);
			
			return _prev;
		});
	}

	return (
		<form onSubmit={formik.handleSubmit} className={className + ' '} {...props}>
			<p className='font-bold text-3.5xl mt-14'>
				Запись ребенка на секция
				{' '}
				<span className='text-primary'>
					Футболика
				</span>
			</p>
			<Input
				name='name'
				value={formik.values.name}
				onChange={(e) => {
					removeItemFromErrorsList('name');
					formik.handleChange(e);
				}}
				isDanger={errorsList.includes('name')}
				className='mt-6'
				placeholder='Имя' />
			<Input
				name='phone'
				value={formik.values.phone}
				onChange={(e) => {
					removeItemFromErrorsList('phone');
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
					removeItemFromErrorsList('recaptcha');
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
