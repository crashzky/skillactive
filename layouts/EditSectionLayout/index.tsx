import MainLayout from '../MainLayout';
import Props from './EditSectionLayout.props';
import TrashIcon from '../../assets/trash_red.svg';
import InputImage from '../../components/InputImage';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Input from '../../components/Input';
import HorizontalMenu from '../../components/HorizontalMenu';
import InputSelect from '../../components/InputSelect';
import Textarea from '../../components/Textarea';
import { getTrackBackground, Range } from 'react-range';
import InputTimetable from '../../components/InputTimetable';
import TeacherCard from '../../components/TeacherCard';
import PriceCard from '../../components/PriceCard';
import Button from '../../components/Button';
import { CREATE_SECTION_ERRORS, ADD_PRICE_ERRORS, ADD_CONTACT_ERRORS } from '../../shared/consts/createErrors';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';
import InputAddress from '../../components/InputAddress';
import { GenderType } from '../../shared/types/clubs';
import { useQuery } from 'react-query';
import { getCategories } from '../../shared/api/categories';
import ContactCard from '../../components/ContactCard';
import useAddress from '../../hooks/useAddress';
import { getDistricts } from '../../shared/api/districts';

import PlusIcon from '../../assets/plus.svg';
import LoaderIcon from '../../assets/loader.svg';

const EditSectionLayout = ({ images, name, recordingIsOpen, category, description, district, minAge, address,
	maxAge, timetables, teachers, prices, gender, onSubmit, onDelete, isLoading, isError, contacts,
	latitude, longitude }: Props): JSX.Element => {
	const [errorsList, setErrorsList] = useState([]);

	const isNewManager = !images && !name && !category && !description && !district
		&& !timetables && !teachers && !prices; 

	const GENDERS: GenderType[] = ['MALE', 'FEMALE', 'BOTH'];

	const setLatitude = useAddress((state) => state.setLatitude);
	const setLongitude = useAddress((state) => state.setLongitude);

	const [timetablesKey, setTimetablesKey] = useState(false);
	const [teacherKey, setTeacherKey] = useState(false);
	const [priceKey, setPriceKey] = useState(false);
	const [contactsKey, setContactsKey] = useState(false);

	const [imageIds, setImageIds] = useState(images ? images : []);
	const [recordingIsOpenValue, setRecordingIsOpenValue] = useState(+!recordingIsOpen);
	const [categoryValue, setCategoryValue] = useState(category && { label: '', value: '' });
	const [nameValue, setNameValue] = useState(name);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [districtValue, setDistrictValue] = useState(district && { label: '', value: '' });
	const [ageValues, setAgeValues] = useState(minAge && maxAge ? [minAge, maxAge] : [7, 13]);
	const [addressValue, setAddressValue] = useState(address && { label: address, value: address });
	const [genderValue, setGenderValue] = useState(gender && GENDERS.indexOf(gender));
	const [timetableValues, setTimetableValues] = useState(timetables ? timetables : [
		{	
			days: [0, 1, 2, 3, 4, 5, 6],
			minTime: 0,
			maxTime: 23,
		},
	]);

	const [teacherErrors, setTeacherErrors] = useState([]);
	const [teacherValues, setTeacherValues] = useState(teachers ? teachers : []);
	const [teacherImage, setTeacherImage] = useState([]);
	const teacherFormik = useFormik({
		initialValues: {
			image: '/',
			name: '',
			description: '',
			phone: '',
		},
		onSubmit: () => {},
	});

	const [priceErrors, setPriceErrors] = useState([]);
	const [priceValues, setPriceValues] = useState(prices ? prices : []);
	const priceFormik = useFormik({
		initialValues: {
			name: '',
			count: null,
		},
		onSubmit: () => {},
	});

	const [contactsErrors, setContactsErrors] = useState([]);
	const [contactsValues, setContactsValues] = useState(contacts ? contacts : []);
	const [contactsType, setContactsType] = useState();
	const contactsFormik = useFormik({
		initialValues: {
			value: null,
		},
		onSubmit: () => {},
	});

	const categoiesQuery = useQuery('categories', getCategories);
	const districtsQuery = useQuery('districts', getDistricts);

	useEffect(() => {
		if(latitude && longitude) {
			setLatitude(latitude);
			setLongitude(longitude);
		}
	}, []);

	useEffect(() => {
		if(categoiesQuery.data && category) {
			const currentCategory = categoiesQuery.data.find((i) => i.id == category);
			setCategoryValue({ label: currentCategory.name, value: category.toString() });
		}
	}, [categoiesQuery.data, setCategoryValue, category]);

	useEffect(() => {
		if(districtsQuery.data && district) {
			const currentDistrcit = districtsQuery.data.find((i) => i.id == district);
			setDistrictValue({ label: currentDistrcit.name, value: currentDistrcit.id.toString() });
		}
	}, [districtsQuery.data, setDistrictValue, district]);

	const submitForm = () => {
		const _errors = [];

		if(!imageIds.length)
			_errors.push('images');
		if(!nameValue)
			_errors.push('name');
		if(!categoryValue)
			_errors.push('category');
		if(!descriptionValue)
			_errors.push('description');
		if(!districtValue)
			_errors.push('district');
		if(!teacherValues.length)
			_errors.push('teachers');
		if(!priceValues.length)
			_errors.push('prices');
		if(!addressValue)
			_errors.push('address');
		
		setErrorsList(_errors);

		if(!_errors.length) {
			onSubmit({
				images: imageIds,
				name: nameValue,
				description: descriptionValue,
				recordingIsOpen: !recordingIsOpenValue,
				category: +categoryValue.value,
				district: +districtValue.value,
				minAge: ageValues[0],
				maxAge: ageValues[1],
				timetables: timetableValues,
				teachers: teacherValues,
				prices: priceValues,
				address: addressValue.value,
				gender: GENDERS[genderValue],
				contacts: contactsValues,
			});
		}
	};

	const addTeacher = () => {
		let _errors = [];

		if(!teacherImage.length)
			_errors.push('image');
		if(!teacherFormik.values.name)
			_errors.push('name');
		if(!teacherFormik.values.description)
			_errors.push('description');
		if(!teacherFormik.values.phone)
			_errors.push('phone');

		setTeacherErrors(_errors);

		if(!_errors.length) {
			let _prev = teacherValues;
			_prev.push({
				image: teacherImage[0],
				name: teacherFormik.values.name,
				description: teacherFormik.values.description,
				phone: teacherFormik.values.phone,
			});
	
			setTeacherImage(_prev);
			setTeacherKey(!teacherKey);
			teacherFormik.resetForm();
			setTeacherImage([]);
			removeItemFromErrorsList(setErrorsList, 'teachers');
		}
	};

	const addPrice = () => {
		let _errorsList = [];

		setPriceErrors(_errorsList);

		if(!priceFormik.values.name)
			_errorsList.push('name');
		if(!priceFormik.values.count && priceFormik.values.count !== 0)
			_errorsList.push('count');
		
		if(!_errorsList.length) {
			let _prev = priceValues;

			_prev.push({
				name: priceFormik.values.name,
				count: priceFormik.values.count,
			});
	
			setPriceValues(_prev);
			setPriceKey(!priceKey);
			priceFormik.resetForm();
			removeItemFromErrorsList(setErrorsList, 'prices');
		}
	};

	const addContact = () => {
		let _errorsList = [];

		setContactsErrors(_errorsList);

		if(!contactsFormik.values.value)
			_errorsList.push('value');
		if(!contactsType)
			_errorsList.push('type');
		
		if(!_errorsList.length) {
			let _prev = contactsValues;

			_prev.push({
				type: (contactsType as any).value,
				value: contactsFormik.values.value,
			});
	
			setContactsValues(_prev);
			setContactsKey(!priceKey);
			contactsFormik.resetForm();
			setContactsType(null);
		}
	};
	
	return (
		<MainLayout showFooter={false} errorMessage={isError && 'Ой, что-то пошло не так. Попробуйте ещё раз позже'}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-3xl'>
					{isNewManager ? 'Добавление секции' : 'Редактирование секции'}
				</h1>
				{!isNewManager && (
					<button className='rounded-2xl bg-veryLightGrey p-3' onClick={onDelete}>
						<TrashIcon />
					</button>
				)}
			</div>
			<InputImage
				htmlId='sectionId'
				className='mt-3.5'
				label='Загрузите фотографии вашего кружка/секции'
				imageIds={imageIds}
				setImageIds={(newValue) => {
					removeItemFromErrorsList(setErrorsList, 'images');
					setImageIds(newValue);
				}} />
			<Input
				className='mt-6'
				value={nameValue}
				isDanger={errorsList.includes('name')}
				onChange={(e) => {
					removeItemFromErrorsList(setErrorsList, 'name');
					setNameValue(e.target.value);
				}}
				placeholder='Название секции/кружка' />
			<HorizontalMenu
				className='mt-6 lg:w-[345px]'
				value={recordingIsOpenValue}
				onItemChange={setRecordingIsOpenValue}
				items={['Запись идёт', 'Запись закрыта']} />
			<InputSelect
				className='mt-6'
				id='category'
				instanceId='category'
				value={categoryValue}
				isDanger={errorsList.includes('category')}
				onChange={(newValue) => {
					removeItemFromErrorsList(setErrorsList, 'category');
					setCategoryValue(newValue as any);
				}}
				placeholder='Выберите категорию'
				noOptionsMessage={() => 'Ничего не найдено :('}
				isSearchable
				options={categoiesQuery.data ? categoiesQuery.data.map((i) => ({ value: i.id, label: i.name })) : []} />
			<Textarea
				className='mt-6'
				placeholder='Описание'
				value={descriptionValue}
				isDanger={errorsList.includes('description')}
				onChange={(e) => {
					removeItemFromErrorsList(setErrorsList, 'description');
					setDescriptionValue(e.target.value);
				}} />
			<InputSelect
				className='mt-6'
				id='district'
				instanceId='district'
				value={districtValue}
				isDanger={errorsList.includes('district')}
				onChange={(newValue) => {
					removeItemFromErrorsList(setErrorsList, 'district');
					setDistrictValue(newValue as any);
				}}
				placeholder='Выберите микрорайон'
				isSearchable
				noOptionsMessage={() => 'Ничего не найдено :('}
				options={districtsQuery.data && districtsQuery.data.map((i) => ({ label: i.name, value: i.id }))} />
			<InputAddress
				className='mt-6'
				id='address'
				isDanger={errorsList.includes('address')}
				instanceId='address'
				value={addressValue}
				onChange={(newValue) => {
					removeItemFromErrorsList(setErrorsList, 'address');
					setAddressValue(newValue as any);
				}}
				placeholder='Адрес располажения секции/кружка' />
			<p className='text-xl font-semibold mt-6'>
				Пол детей
			</p>
			<HorizontalMenu
				className='mt-6 lg:w-[345px]'
				value={genderValue}
				onItemChange={setGenderValue}
				items={['Мужской', 'Женский', 'Любой']} />
			<div className='mt-6 mb-4 flex justify-between items-center font-semibold'>
				<p className='text-xl'>
					Возраст детей
				</p>
				<p className='text-primary'>
					{ageValues[0]}
					{' - '}
					{ageValues[1]}
					{' '}
					лет
				</p>
			</div>
			<Range
				values={ageValues}
				onChange={setAgeValues}
				min={1}
				max={17}
				step={1}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						className='h-[30px] flex w-full outline-none'
					>
						<div
							ref={props.ref}
							className='h-3 w-full rounded-full self-center'
							style={{
								background: getTrackBackground({
									values: ageValues,
									colors: ['#F8F8F8', '#FEA300', '#F8F8F8'],
									min: 1,
									max: 17,
								}),
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props }) => (
					<div
						{...props}
						className={'h-[30px] w-[30px] bg-[url(/input_range_thumb.svg)] outline-none'}
					>
					</div>
				)} />
			<div className='flex justify-between font-semibold'>
				<p>
					1 лет
				</p>
				<p>
					17 лет
				</p>
			</div>
			<div className='flex justify-between items-center mt-10'>
				<h2 className='font-bold text-2xl'>
					Расписания
					{' '}
					<span className='text-primary'>
						(
						{timetableValues.length}
						)
					</span>
				</h2>
				<button
					className='p-3 bg-veryLightGrey rounded-xl'
					onClick={() => {
						let _prev = timetableValues;
						_prev.push({	
							days: [0],
							minTime: 14,
							maxTime: 16,
						});

						setTimetableValues(_prev);
						setTimetablesKey(!timetablesKey);
					}}
				>
					<PlusIcon />
				</button>
			</div>
			<section key={timetablesKey.toString() + '_timetables'} className='mt-5'>
				{timetableValues.map((i, num) => (
					<InputTimetable
						className='mb-7'
						key={num}
						weeks={i.days}
						weeksOnChange={(newValue) => {
							let _prev = timetableValues;
							_prev[num].days = newValue;

							setTimetableValues(_prev);
						}}
						hours={[i.minTime, i.maxTime]}
						hourseOnChange={(newValue) => {
							let _prev = timetableValues;
							_prev[num].minTime = newValue[0];
							_prev[num].maxTime = newValue[1];

							setTimetableValues(_prev);
						}}
						onDelete={timetableValues.length !== 1 && (() => {
							let _prev = timetableValues;
							_prev.splice(num, 1);

							setTimetableValues(_prev);
							setTimetablesKey(!timetablesKey);
						})} />
				))}
			</section>
			<div className='flex justify-between items-center mt-10 mb-4'>
				<h2 className='font-bold text-2xl'>
					Преподаватели
					{' '}
					<span className='text-primary'>
						(
						{teacherValues.length}
						)
					</span>
				</h2>
				<button
					className='p-3 bg-veryLightGrey rounded-xl'
					onClick={addTeacher}
				>
					<PlusIcon />
				</button>
			</div>
			<section key={teacherKey.toString() + '_teachers'}>
				{teacherValues.map((i, num) => (
					<TeacherCard
						key={num}
						isShortIcon
						title={i.name}
						imageSrc={i.image}
						description={i.description}
						phone={i.phone}
						onDelete={() => {
							let _prev = teacherValues;
							_prev.splice(num, 1);

							setTeacherValues(_prev);
							setTeacherKey(!teacherKey);
						}} />
				))}
			</section>
			{teacherErrors.map((i, num) => (
				<p key={num} className='text-red font-semibold text-center mb-2'>
					{ADD_PRICE_ERRORS[i]}
				</p>
			))}
			<InputImage
				htmlId='teacherImg'
				label='Загрузите фотографию преподавателя'
				isSingleImage
				imageIds={teacherImage}
				setImageIds={(newValue) => {
					removeItemFromErrorsList(setTeacherErrors, 'image');
					setTeacherImage(newValue);
				}} />
			<form onSubmit={teacherFormik.handleSubmit}>
				<Input
					className='mt-5'
					name='name'
					placeholder='ФИО'
					isDanger={teacherErrors.includes('name')}
					value={teacherFormik.values.name}
					onChange={(e) => {
						removeItemFromErrorsList(setTeacherErrors, 'name');
						teacherFormik.handleChange(e);
					}} />
				<Input
					className='mt-5'
					name='description'
					placeholder='Компетенция'
					isDanger={teacherErrors.includes('description')}
					value={teacherFormik.values.description}
					onChange={(e) => {
						removeItemFromErrorsList(setTeacherErrors, 'description');
						teacherFormik.handleChange(e);
					}} />
				<Input
					className='mt-5'
					name='phone'
					placeholder='Номер телефона'
					isDanger={teacherErrors.includes('phone')}
					value={teacherFormik.values.phone}
					onChange={(e) => {
						removeItemFromErrorsList(setTeacherErrors, 'phone');
						teacherFormik.handleChange(e);
					}} />
			</form>
			<div className='flex justify-between items-center mt-10 mb-5'>
				<h2 className='font-bold text-2xl'>
					Цены
					{' '}
					<span className='text-primary'>
						(
						{priceValues.length}
						)
					</span>
				</h2>
				<button
					className='p-3 bg-veryLightGrey rounded-xl'
					onClick={addPrice}
				>
					<PlusIcon />
				</button>
			</div>
			{priceErrors.map((i, num) => (
				<p key={num} className='text-red font-semibold text-center mb-3'>
					{ADD_PRICE_ERRORS[i]}
				</p>
			))}
			<section key={priceKey.toString() + '_price'}>
				{priceValues.map((i, num) => (
					<PriceCard
						key={num}
						isShortCard
						title={i.name}
						price={i.count}
						onDelete={() => {
							let _prev = priceValues;
							_prev.splice(num, 1);

							setPriceValues(_prev);
							setPriceKey(!priceKey);
						}} />
				))}
			</section>
			<form onSubmit={priceFormik.handleSubmit} className='mb-5'>
				<Input
					className='mt-5'
					name='name'
					placeholder='Наименование'
					isDanger={priceErrors.includes('name')}
					value={priceFormik.values.name}
					onChange={(e) => {
						removeItemFromErrorsList(setPriceErrors, 'name');
						priceFormik.handleChange(e);
					}} />
				<Input
					className='mt-5'
					type='number'
					name='count'
					placeholder='Цена (₽)'
					isDanger={priceErrors.includes('count')}
					value={priceFormik.values.count}
					onChange={(e) => {
						removeItemFromErrorsList(setPriceErrors, 'count');
						priceFormik.handleChange(e);
					}} />
			</form>
			<div className='flex justify-between items-center mt-10 mb-5'>
				<h2 className='font-bold text-2xl'>
					Контакты
					{' '}
					<span className='text-primary'>
						(
						{contactsValues.length}
						)
					</span>
				</h2>
				<button
					className='p-3 bg-veryLightGrey rounded-xl'
					onClick={addContact}
				>
					<PlusIcon />
				</button>
			</div>
			{contactsErrors.map((i, num) => (
				<p key={num} className='text-red font-semibold text-center mb-3'>
					{ADD_CONTACT_ERRORS[i]}
				</p>
			))}
			<section key={contactsKey.toString() + '_contacts'}>
				{contactsValues.map((i, num) => (
					<ContactCard
						key={num}
						isShortCard
						contactType={i.type}
						title={i.value}
						onDelete={() => {
							let _prev = contactsValues;
							_prev.splice(num, 1);

							setContactsValues(_prev);
							setContactsKey(!priceKey);
						}} />
				))}
			</section>
			<form onSubmit={contactsFormik.handleSubmit} className='mb-5'>
				<InputSelect
					id='contacts'
					instanceId='contacts'
					value={contactsType}
					isDanger={contactsErrors.includes('type')}
					onChange={(newValue) => {
						removeItemFromErrorsList(setContactsErrors, 'type');
						setContactsType(newValue as any);
					}}
					options={[
						{ value: 'EMAIL', label: 'Email' },
						{ value: 'INSTAGRAM', label: 'Instagram' },
						{ value: 'PHONE', label: 'Телефон' },
						{ value: 'VK', label: 'Вконтакте' },
						{ value: 'SITE', label: 'Сайт' },
					]}
					placeholder='Тип'
					noOptionsMessage={() => 'Ничего не найдено :('} />
				<Input
					className='mt-5'
					name='value'
					placeholder='Наименование'
					isDanger={contactsErrors.includes('value')}
					value={contactsFormik.values.value}
					onChange={(e) => {
						removeItemFromErrorsList(setContactsErrors, 'value');
						contactsFormik.handleChange(e);
					}} />
			</form>
			<div className='mb-24'>
				{errorsList.map((i, num) => (
					<p key={num} className='font-semibold text-red text-sm text-center mb-3'>
						{CREATE_SECTION_ERRORS[i]}
					</p>
				))}
			</div>
			{isLoading ? (
				<LoaderIcon className='float-right h-16 mr-24 my-7' />
			) : (
				<div className='fixed bottom-5 left-0 lg:static lg:mb-5 lg:w-[345px] lg:float-right w-full px-4'>
					<Button variant='primary' label='Сохранить' onClick={submitForm} />
				</div>
			)}
		</MainLayout>
	);
};

export default EditSectionLayout;
