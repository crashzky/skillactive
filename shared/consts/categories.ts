const CATEGORIES = [
	{
		title: ' Искусство и дизайн ',
		items: [
			{
				title: 'Архитектура',
				link: '/search?query=&category=',
			},
			{
				title: 'Граффити',
				link: '/search?query=&category=',
			},
			{
				title: 'Дизайн',
				link: '/search?query=&category=',
			},
			{
				title: 'Живопись',
				link: '/search?query=&category=',
			},
			{
				title: 'Рисование (графика)',
				link: '/search?query=&category=',
			},
			{
				title: 'Скульптура',
				link: '/search?query=&category=',
			},
			{
				title: 'Фотография',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' ДПИ и ремесла ',
		items: [
			{
				title: 'Бумагопластика, оригами',
				link: '/search?query=&category=',
			},
			{
				title: 'Керамика и гончарное дело',
				link: '/search?query=&category=',
			},
			{
				title: 'Кожевенное дело',
				link: '/search?query=&category=',
			},
			{
				title: 'Кулинария',
				link: '/search?query=&category=',
			},
			{
				title: 'Лепка',
				link: '/search?query=&category=',
			},
			{
				title: 'Мозаика, витраж',
				link: '/search?query=&category=',
			},
			{
				title: 'Обработка дерева',
				link: '/search?query=&category=',
			},
			{
				title: 'Плетение',
				link: '/search?query=&category=',
			},
			{
				title: 'Резьба по дереву, камню, кости',
				link: '/search?query=&category=',
			},
			{
				title: 'Роспись',
				link: '/search?query=&category=',
			},
			{
				title: 'Рукоделие',
				link: '/search?query=&category=',
			},
			{
				title: 'Флористика',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Техническое конструирование ',
		items: [
			{
				title: 'Авиамодельный спорт',
				link: '/search?query=&category=',
			},
			{
				title: 'Автодело',
				link: '/search?query=&category=',
			},
			{
				title: 'Начальное техническое моделирование',
				link: '/search?query=&category=',
			},
			{
				title: 'Прототипирование',
				link: '/search?query=&category=',
			},
			{
				title: 'Радиотехника',
				link: '/search?query=&category=',
			},
			{
				title: 'Ракетно-космическое моделирование',
				link: '/search?query=&category=',
			},
			{
				title: 'Робототехника',
				link: '/search?query=&category=',
			},
			{
				title: 'Судомодельный спорт',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Словесность ',
		items: [
			{
				title: 'Журналистика',
				link: '/search?query=&category=',
			},
			{
				title: 'Каллиграфия',
				link: '/search?query=&category=',
			},
			{
				title: 'Литература, поэзия',
				link: '/search?query=&category=',
			},
			{
				title: 'Русский язык',
				link: '/search?query=&category=',
			},
			{
				title: 'Скорочтение',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Иностранные языки ',
		items: [
			{
				title: 'Английский язык',
				link: '/search?query=&category=',
			},
			{
				title: 'Китайский язык',
				link: '/search?query=&category=',
			},
			{
				title: 'Немецкий язык',
				link: '/search?query=&category=',
			},
			{
				title: 'Французский язык',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Развитие интеллекта ',
		items: [
			{
				title: 'Интеллектуальные игры',
				link: '/search?query=&category=',
			},
			{
				title: 'Математика',
				link: '/search?query=&category=',
			},
			{
				title: 'Обществознание',
				link: '/search?query=&category=',
			},
			{
				title: 'Ораторское мастерство',
				link: '/search?query=&category=',
			},
			{
				title: 'Основы права',
				link: '/search?query=&category=',
			},
			{
				title: 'Психология',
				link: '/search?query=&category=',
			},
			{
				title: 'Шахматы',
				link: '/search?query=&category=',
			},
			{
				title: 'Экономика и бизнес',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Информационные технологии ',
		items: [
			{
				title: 'Информатика',
				link: '/search?query=&category=',
			},
			{
				title: 'Компьютерная графика',
				link: '/search?query=&category=',
			},
			{
				title: 'Основы компьютерной грамотности',
				link: '/search?query=&category=',
			},
			{
				title: 'Программирование',
				link: '/search?query=&category=',
			},
			{
				title: 'Разработка сайтов',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' История и традиции ',
		items: [
			{
				title: 'История',
				link: '/search?query=&category=',
			},
			{
				title: 'Краеведение',
				link: '/search?query=&category=',
			},
			{
				title: 'Традиционная культура',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Педагогика ',
		items: [
			{
				title: 'Вожатское мастерство',
				link: '/search?query=&category=',
			},
			{
				title: 'Группы продленного дня',
				link: '/search?query=&category=',
			},
			{
				title: 'Дети особой заботы',
				link: '/search?query=&category=',
			},
			{
				title: 'Духовное воспитание',
				link: '/search?query=&category=',
			},
			{
				title: 'Музыка (общее развитие)',
				link: '/search?query=&category=',
			},
			{
				title: 'Патриотическое воспитание',
				link: '/search?query=&category=',
			},
			{
				title: 'Подготовка к ЕГЭ и ОГЭ',
				link: '/search?query=&category=',
			},
			{
				title: 'Подготовка к школе',
				link: '/search?query=&category=',
			},
			{
				title: 'Предпрофессиональная подготовка',
				link: '/search?query=&category=',
			},
			{
				title: 'Профориентация',
				link: '/search?query=&category=',
			},
			{
				title: 'Развитие речи, логопедия',
				link: '/search?query=&category=',
			},
			{
				title: 'Раннее развитие малышей',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Музыка и звук ',
		items: [
			{
				title: 'Гитара',
				link: '/search?query=&category=',
			},
			{
				title: 'Диджеинг',
				link: '/search?query=&category=',
			},
			{
				title: 'Духовые инструменты',
				link: '/search?query=&category=',
			},
			{
				title: 'Народные инструменты',
				link: '/search?query=&category=',
			},
			{
				title: 'Скрипка',
				link: '/search?query=&category=',
			},
			{
				title: 'Струнные инструменты',
				link: '/search?query=&category=',
			},
			{
				title: 'Ударные инструменты',
				link: '/search?query=&category=',
			},
			{
				title: 'Фортепиано (пианино)',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Пение ',
		items: [
			{
				title: 'Авторская песня',
				link: '/search?query=&category=',
			},
			{
				title: 'Академический вокал',
				link: '/search?query=&category=',
			},
			{
				title: 'Народная песня',
				link: '/search?query=&category=',
			},
			{
				title: 'Хоровое пение',
				link: '/search?query=&category=',
			},
			{
				title: 'Эстрадный вокал',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Хореография (танцы) ',
		items: [
			{
				title: 'Балет',
				link: '/search?query=&category=',
			},
			{
				title: 'Бальные танцы',
				link: '/search?query=&category=',
			},
			{
				title: 'Классические танцы',
				link: '/search?query=&category=',
			},
			{
				title: 'Ритмика',
				link: '/search?query=&category=',
			},
			{
				title: 'Современные танцы',
				link: '/search?query=&category=',
			},
			{
				title: 'Спортивные танцы',
				link: '/search?query=&category=',
			},
			{
				title: 'Танцы народов мира',
				link: '/search?query=&category=',
			},
			{
				title: 'Эстрадные танцы',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Зрелищные искусства ',
		items: [
			{
				title: 'Актерское мастерство (театр)',
				link: '/search?query=&category=',
			},
			{
				title: 'Кино- и видеосъемка',
				link: '/search?query=&category=',
			},
			{
				title: 'Кукольное искусство эстрады',
				link: '/search?query=&category=',
			},
			{
				title: 'Мультипликация',
				link: '/search?query=&category=',
			},
			{
				title: 'Цирковое искусство',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Мода и стиль ',
		items: [
			{
				title: 'Кройка и шитье',
				link: '/search?query=&category=',
			},
			{
				title: 'Создание имиджа',
				link: '/search?query=&category=',
			},
			{
				title: 'Школы моделей',
				link: '/search?query=&category=',
			},
			{
				title: 'Этикет',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Познавательные развлечения ',
		items: [
			{
				title: 'Выставки',
				link: '/search?query=&category=',
			},
			{
				title: 'Игротеки',
				link: '/search?query=&category=',
			},
			{
				title: 'Квесты',
				link: '/search?query=&category=',
			},
			{
				title: 'Летние лагеря',
				link: '/search?query=&category=',
			},
			{
				title: 'Новый год',
				link: '/search?query=&category=',
			},
			{
				title: 'Репертуарные спектакли',
				link: '/search?query=&category=',
			},
			{
				title: 'Экскурсии',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Туризм ',
		items: [
			{
				title: 'Безопасность жизнедеятельности',
				link: '/search?query=&category=',
			},
			{
				title: 'Скалолазание, альпинизм',
				link: '/search?query=&category=',
			},
			{
				title: 'Спортивное ориентирование',
				link: '/search?query=&category=',
			},
			{
				title: 'Спортивный туризм',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Естественные науки ',
		items: [
			{
				title: 'Астрономия',
				link: '/search?query=&category=',
			},
			{
				title: 'Биология',
				link: '/search?query=&category=',
			},
			{
				title: 'География',
				link: '/search?query=&category=',
			},
			{
				title: 'Геология',
				link: '/search?query=&category=',
			},
			{
				title: 'Медицина',
				link: '/search?query=&category=',
			},
			{
				title: 'Природоведение',
				link: '/search?query=&category=',
			},
			{
				title: 'Физика',
				link: '/search?query=&category=',
			},
			{
				title: 'Химия',
				link: '/search?query=&category=',
			},
			{
				title: 'Экология',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Люди и животные ',
		items: [
			{
				title: 'Зоопарки',
				link: '/search?query=&category=',
			},
			{
				title: 'Конный спорт',
				link: '/search?query=&category=',
			},
			{
				title: 'Практическая зоология',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Эстетические виды спорта ',
		items: [
			{
				title: 'Акробатика',
				link: '/search?query=&category=',
			},
			{
				title: 'Прыжки на батуте',
				link: '/search?query=&category=',
			},
			{
				title: 'Спортивная аэробика',
				link: '/search?query=&category=',
			},
			{
				title: 'Спортивная гимнастика',
				link: '/search?query=&category=',
			},
			{
				title: 'Фигурное катание',
				link: '/search?query=&category=',
			},
			{
				title: 'Художественная гимнастика',
				link: '/search?query=&category=',
			},
			{
				title: 'Черлидинг, чир-спорт',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Технические виды спорта ',
		items: [
			{
				title: 'Автоспорт',
				link: '/search?query=&category=',
			},
			{
				title: 'Велоспорт',
				link: '/search?query=&category=',
			},
			{
				title: 'Картинг',
				link: '/search?query=&category=',
			},
			{
				title: 'Лыжные гонки',
				link: '/search?query=&category=',
			},
			{
				title: 'Роллер-спорт',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Единоборства ',
		items: [
			{
				title: 'Айкидо',
				link: '/search?query=&category=',
			},
			{
				title: 'Бокс',
				link: '/search?query=&category=',
			},
			{
				title: 'Греко-римская борьба',
				link: '/search?query=&category=',
			},
			{
				title: 'Джиу-джитсу',
				link: '/search?query=&category=',
			},
			{
				title: 'Дзюдо',
				link: '/search?query=&category=',
			},
			{
				title: 'Капоэйра',
				link: '/search?query=&category=',
			},
			{
				title: 'Карате',
				link: '/search?query=&category=',
			},
			{
				title: 'Кикбоксинг',
				link: '/search?query=&category=',
			},
			{
				title: 'Кунг-фу (ушу)',
				link: '/search?query=&category=',
			},
			{
				title: 'Рукопашный бой',
				link: '/search?query=&category=',
			},
			{
				title: 'Самбо',
				link: '/search?query=&category=',
			},
			{
				title: 'Тайский бокс',
				link: '/search?query=&category=',
			},
			{
				title: 'Тхэквондо',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Командно-игровой спорт ',
		items: [
			{
				title: 'Баскетбол',
				link: '/search?query=&category=',
			},
			{
				title: 'Волейбол',
				link: '/search?query=&category=',
			},
			{
				title: 'Флорбол',
				link: '/search?query=&category=',
			},
			{
				title: 'Футбол',
				link: '/search?query=&category=',
			},
			{
				title: 'Хоккей',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Индивидуально-игровой спорт ',
		items: [
			{
				title: 'Бильярд',
				link: '/search?query=&category=',
			},
			{
				title: 'Настольный теннис',
				link: '/search?query=&category=',
			},
			{
				title: 'Теннис',
				link: '/search?query=&category=',
			},
			{
				title: 'Фехтование',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Водные виды спорта ',
		items: [
			{
				title: 'Аквааэробика',
				link: '/search?query=&category=',
			},
			{
				title: 'Гребля',
				link: '/search?query=&category=',
			},
			{
				title: 'Парусный спорт',
				link: '/search?query=&category=',
			},
			{
				title: 'Плавание',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Легкая атлетика и гимнастика ',
		items: [
			{
				title: 'Бег',
				link: '/search?query=&category=',
			},
			{
				title: 'Фитнес',
				link: '/search?query=&category=',
			},
		],
	},
	{
		title: ' Физкультура ',
		items: [
			{
				title: 'Адаптивная физкультура',
				link: '/search?query=&category=',
			},
			{
				title: 'Йога',
				link: '/search?query=&category=',
			},
			{
				title: 'Общая физическая подготовка',
				link: '/search?query=&category=',
			},
			{
				title: 'Тренажерные залы',
				link: '/search?query=&category=',
			},
		],
	},
];

export default CATEGORIES;
