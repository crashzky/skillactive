const fetch = require('node-fetch');
const cliProgress = require('cli-progress');
const fs = require('fs');

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const CATEGORIES = JSON.parse('["Архитектура","Граффити","Дизайн","Живопись","Рисование (графика)","Скульптура","Фотография","Бумагопластика, оригами","Керамика и гончарное дело","Кожевенное дело","Кулинария","Лепка","Мозаика, витраж","Обработка дерева","Плетение","Резьба по дереву, камню, кости","Роспись","Рукоделие","Флористика","Авиамодельный спорт","Автодело","Начальное техническое моделирование","Прототипирование","Радиотехника","Ракетно-космическое моделирование","Робототехника","Судомодельный спорт","Журналистика","Каллиграфия","Литература, поэзия","Русский язык","Скорочтение","Английский язык","Китайский язык","Немецкий язык","Французский язык","Интеллектуальные игры","Математика","Обществознание","Ораторское мастерство","Основы права","Психология","Шахматы","Экономика и бизнес","Информатика","Компьютерная графика","Основы компьютерной грамотности","Программирование","Разработка сайтов","История","Краеведение","Традиционная культура","Вожатское мастерство","Группы продленного дня","Дети особой заботы","Духовное воспитание","Музыка (общее развитие)","Патриотическое воспитание","Подготовка к ЕГЭ и ОГЭ","Подготовка к школе","Предпрофессиональная подготовка","Профориентация","Развитие речи, логопедия","Раннее развитие малышей","Гитара","Диджеинг","Духовые инструменты","Народные инструменты","Скрипка","Струнные инструменты","Ударные инструменты","Фортепиано (пианино)","Авторская песня","Академический вокал","Народная песня","Хоровое пение","Эстрадный вокал","Балет","Бальные танцы","Классические танцы","Ритмика","Современные танцы","Спортивные танцы","Танцы народов мира","Эстрадные танцы","Актерское мастерство (театр)","Кино- и видеосъемка","Кукольное искусство эстрады","Мультипликация","Цирковое искусство","Кройка и шитье","Создание имиджа","Школы моделей","Этикет","Выставки","Игротеки","Квесты","Летние лагеря","Новый год","Репертуарные спектакли","Экскурсии","Безопасность жизнедеятельности","Скалолазание, альпинизм","Спортивное ориентирование","Спортивный туризм","Астрономия","Биология","География","Геология","Медицина","Природоведение","Физика","Химия","Экология","Зоопарки","Конный спорт","Практическая зоология","Акробатика","Прыжки на батуте","Спортивная аэробика","Спортивная гимнастика","Фигурное катание","Художественная гимнастика","Черлидинг, чир-спорт","Автоспорт","Велоспорт","Картинг","Лыжные гонки","Роллер-спорт","Айкидо","Бокс","Греко-римская борьба","Джиу-джитсу","Дзюдо","Капоэйра","Карате","Кикбоксинг","Кунг-фу (ушу)","Рукопашный бой","Самбо","Тайский бокс","Тхэквондо","Баскетбол","Волейбол","Флорбол","Футбол","Хоккей","Бильярд","Настольный теннис","Теннис","Фехтование","Аквааэробика","Гребля","Парусный спорт","Плавание","Бег","Фитнес","Адаптивная физкультура","Йога","Общая физическая подготовка","Тренажерные залы"]');
const YEKATERINBURG_DISTRICTS = [
	'Академический',
	'Верх-Исетский',
	'Железнодорожный',
	'Кировский',
	'Ленинский',
	'Октябрьский',
	'Орджоникидзевский',
	'Чкаловский',
];

readline.question('Please enter admin token: ', (value) => {
	console.log('Initing categories');
	bar1.start(CATEGORIES.length, 0);
	CATEGORIES.forEach((i, num) => {
		setTimeout(() => {
			fetch('http://localhost:8000/categories/', {
				method: 'POST',
				body: JSON.stringify({
					name: i,
				}),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Token ' + value,
				},
			}).then(() => bar1.update(num + 1));
		}, num * 100);
	});	

	setTimeout(() => {
		console.log('Initing districts');
		bar2.start(YEKATERINBURG_DISTRICTS.length, 0);
		YEKATERINBURG_DISTRICTS.forEach((i, num) => {
			setTimeout(() => {
				fetch('http://localhost:8000/districts/', {
					method: 'POST',
					body: JSON.stringify({
						name: i,
					}),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Token ' + value,
					},
				}).then(() => bar2.update(num + 1));
			}, num * 100);
		});
	}, CATEGORIES.length * 110);

	readline.close();
});
