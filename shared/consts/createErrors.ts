const CREATE_SECTION_ERRORS = {
	images: 'Загрузите хотя бы одно изображение',
	name: 'Напишите имя секции',
	category: 'Выберите хотя бы одну категорию секции',
	description: 'Напишите описание секции',
	district: 'Выберите микрорайон',
	teachers: 'Укажите информацию хотя бы об одном преподавателе',
	prices: 'Укажите хотя бы один вариант цены',
};

const ADD_TEACHER_ERRORS = {
	image: 'Загрузите фотографию преподавателя',
	name: 'Укажите ФИО преподавателя',
	description: 'Укажите компетенцию преподавателя',
	phone: 'Укажите телефон преподавателя',
};

const ADD_PRICE_ERRORS = {
	name: 'Укажите наименование цены',
	count: 'Укажите цену в рублях или 0',
};

const CREATE_ARTICLE_ERRORS = {
	images: 'Загрузите хотя бы одно изображение',
	title: 'Укажите название статьи',
	content: 'Укажите содержимое статьи',
	date: 'Укажите дату окончания действия рекламы',
};

export {
	CREATE_SECTION_ERRORS,
	ADD_TEACHER_ERRORS,
	ADD_PRICE_ERRORS,
	CREATE_ARTICLE_ERRORS,
};

