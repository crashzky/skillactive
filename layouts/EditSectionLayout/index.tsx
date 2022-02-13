import MainLayout from '../MainLayout';
import Props from './EditSectionLayout.props';
import TrashIcon from '../../assets/trash_red.svg';
import InputImage from '../../components/InputImage';
import { useState } from 'react';
import { useFormik } from 'formik';
import Input from '../../components/Input';
import HorizontalMenu from '../../components/HorizontalMenu';
import InputSelect from '../../components/InputSelect';
import Textarea from '../../components/Textarea';
import { getTrackBackground, Range } from 'react-range';
import InputTimetable from '../../components/InputTimetable';

import PlusIcon from '../../assets/plus.svg';
import TeacherCard from '../../components/TeacherCard';

const EditSectionLayout = ({ images, name, recordingIsOpen, category, description, district, minAge,
	maxAge, timetables, teachers, prices, onSubmit, onDelete }: Props): JSX.Element => {
	const isNewManager = !images && !name && !category && !description && !district
		&& !timetables && !teachers && !prices; 

	const [timetablesKey, setTimetablesKey] = useState(false);
	const [teacherKey, setTeacherKey] = useState(false);

	const [imageIds, setImageIds] = useState(images ? images : []);
	const [recordingIsOpenValue, setRecordingIsOpenValue] = useState(+!recordingIsOpen);
	const [categoryValue, setCategoryValue] = useState(category);
	const [nameValue, setNameValue] = useState(name);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [districtValue, setDistrictValue] = useState(district);
	const [ageValues, setAgeValues] = useState(minAge && maxAge ? [minAge, maxAge] : [7, 13]);
	const [timetableValues, setTimetableValues] = useState(timetables ? timetables : [
		{	
			days: [0],
			minTime: 10,
			maxTime: 16,
		},
	]);
	const [teacherValues, setTeacherValues] = useState(teachers ? teachers : [
		{
			image: '/DEV_ONLY.jpg',
			name: 'Артём Пивко Павлович',
			description: 'Тренер по футоболу',
			phone: '+7 (922) 123-20-74',
		},
	]);

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
	
	return (
		<MainLayout showFooter={false}>
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
				className='mt-3.5'
				label='Загрузите фотографии вашего кружка/секции'
				imageIds={imageIds}
				setImageIds={setImageIds} />
			<Input
				className='mt-6'
				value={nameValue}
				onChange={(e) => setNameValue(e.target.value)}
				placeholder='Название секции/кружка' />
			<HorizontalMenu
				className='mt-6'
				value={recordingIsOpenValue}
				onItemChange={setRecordingIsOpenValue}
				items={['Запись идёт', 'Запись закрыта']} />
			<InputSelect
				className='mt-6'
				id='category'
				instanceId='category'
				value={categoryValue}
				onChange={setCategoryValue}
				placeholder='Выберите категорию'
				isSearchable
				options={[
					{ value: 'Футбол', label: 'Футбол' },
					{ value: 'Баскетбол', label: 'Баскетбол' },
					{ value: 'Волейбол', label: 'Волейбол' },
				]} />
			<Textarea
				className='mt-6'
				placeholder='Описание'
				value={descriptionValue}
				onChange={(e) => setDescriptionValue(e.target.value)} />
			<InputSelect
				className='mt-6'
				id='district'
				instanceId='district'
				value={districtValue}
				onChange={setDistrictValue}
				placeholder='Выберите микрорайон'
				isSearchable
				options={[
					{ value: 'Пионерский', label: 'Пионерский' },
					{ value: 'Центр', label: 'Центр' },
					{ value: 'Уралмаш', label: 'Уралмаш' },
				]} />
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
					7 лет
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
			<div className='flex justify-between items-center mt-10'>
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
					onClick={() => {
						let _prev = teacherValues;
						_prev.push({
							image: '/DEV_ONLY.jpg',
							name: teacherFormik.values.name,
							description: teacherFormik.values.description,
							phone: teacherFormik.values.phone,
						});

						setTeacherImage(_prev);
						setTeacherKey(!teacherKey);
					}}
				>
					<PlusIcon />
				</button>
			</div>
			<section key={teacherKey.toString() + '_teachers'}>
				{teacherValues.map((i, num) => (
					<TeacherCard
						key={num}
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
			<InputImage
				label='Загрузите фотографию преподавателя'
				imageIds={teacherImage}
				setImageIds={setTeacherImage} />
			<form onSubmit={teacherFormik.handleSubmit}>
				<Input
					className='mt-5'
					name='name'
					placeholder='ФИО'
					value={teacherFormik.values.name}
					onChange={teacherFormik.handleChange} />
				<Input
					className='mt-5'
					name='description'
					placeholder='Компетенция'
					value={teacherFormik.values.description}
					onChange={teacherFormik.handleChange} />
				<Input
					className='mt-5'
					name='phone'
					placeholder='Номер телефона'
					value={teacherFormik.values.phone}
					onChange={teacherFormik.handleChange} />
			</form>
		</MainLayout>
	);
};

export default EditSectionLayout;
