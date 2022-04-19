const fetch = require('node-fetch');
const cliProgress = require('cli-progress');

const SECTIONS_NAMES = `["Скалолазный центр Rock and Wall","Академия единоборств РМК","CrossFit Ekb","Удар","Идущие к солнцу","Локомотив-Изумруд","Альфа","АкроРитм","ВИН Чун","МБУ СШОР Горных видов спорта","Урал Панчер","Унибос","Спортивный клуб академия гимнастики","Русь","Ратиборец","Clinch","Клуб настольного тенниса УГМК","Автомобилист","NoName - клуб дуэльного исторического фехтования","Школа бокса Интеллект","Скалодром Level up","Спарта","Высшая школа Карате Панда","Armada","Край света","Центр изучения единоборств и оздоровительных практик Восточный стиль","Фитнес-клуб","God Hand","Футбольный клуб Урал, офис","Футболика","Samingpri","Dojo № 1","Falcon","ФК ЦСКА-Екатеринбург","Академия Ушу","Синара","Академия единоборств MaS","Футболика","Областная федерация Ушу","Скалодром Восьмерка","Чемпион","Урал Панчер","БК Византийский","Вверх","I'm Крепыш","Extreme Fitness Athletics","Тактика","Ролека","Футболика","Морская Екатеринбургская школа ДОСААФ","Фитнес-клуб","Скейт-парк Brkls Park","Студия Растяжки Lady Stretch","Ярый Мир","Фитнес-клуб","Фитнес-клуб","Включи Логику!","ССК Ястреб","Академия единоборств MaS","Панама","Академия гимнастики","Свердловская городская спелеосекция","Академия Гимнастики","PingWinClub","Футбольный манеж Урал","Стрелковое Общество Евразия","Рекорд","Русь","Олимпика","Спортивное объединение","ФК Заречье - тренировки по футболу для взрослых","Футболика","33 шпагата, Студия Эффективной Растяжки","Урал","Свердловская областная федерация Тхэквондо МФТ","СОФ Киокушин каратэ-до","Уральские Воины","МАУ Физкультурно-оздоровительный комплекс Айс","МБУ СШ № 8 Локомотив, отделение самбо и дзюдо","Школа футбола для детей Футболика","Территория сквоша","Футболика","Спортивный клуб, секция","Академия гимнастики","Русь","Trutko школа хоккейной ходготовки","Fight & Fitness Club","Скейтпарк AirSkill Park","МАУ Физкультурно-оздоровительный комплекс Соболь","Нептуняшки","Александр Невский","Спортивный клуб академия гимнастики","Playmaker","Школа единоборств Чемпион","Авиационно-спортивный клуб ДОСААФ России","Патриот","Эстетическая гимнастика СК Легенда","Вымпел","Фитнес-клуб","Школа тхэквондо","Football United","Плыви","Sbs","Синие камни","Футболика","Футболика","Центр функционального развития","Луч","Наставник Рукопашный бой","МБУ СШ № 8 Локомотив, отделение тенниса","Уральская футбольная академия","Отделение туризма и краеведения, Дворец молодежи","Русь","Мультиболл","Рекорд","Футболика","Высота","Рекорд","Honey Volley Park","Uralvolley","УШУ Цигун","Урал Панчер","Центр боевых искусств","Со Евразия","Мир бокса","Школа черлидинга Огонь","БМБУК ГКДЦ ДК Современник","РОО Федерация каратэ Киокусинкай по Свердловской области","Скалодром Восьмерка","Колибри","Iron Gym","Школа Капоэйра","Рекорд","Русь","ДС Уггу","ТимСтори","Вшк Панда","Спортивный клуб, секция","ДЮСШ Урал","Свердловская Областная Федерация Тхэквондо МФТ","Федерация полноконтактного каратэ","Рекорд","Runtime","Gadzhiev school","ДЮСШ Дети России","Школа акробатики Прорыв","Либерти","Фитнес-клуб","Тритон","Центр Гимнастики Олимпийской Чемпионки Юлии Барсуковой","Спортивный клуб, секция","Фитнес-клуб","ФК Заречье","Fight","Спарта","Свердловская областная федерация Айкидо-Айкикай","КСП Спутник","Diamond","Академия гимнастики","Golden Gym","Восточный стиль","Футболика","Женская школа футбола","Клуб Каратэ Юго-Запад","Метеор","Боец","Русь","Спортивный клуб, секция","Русь","Золотой Дракон","Динамо-Хоккей на траве","Скорпион","Футболист","Академия Единоборств Феникс","Прайд","ДЮСШ Дети России","Федерация шахмат","Чемпионика","Академия гимнастики","Центр скандинавской ходьбы","Метеор","Ural Boxing Academy, боксерский клуб","Детский клуб Уралец","Спортивный клуб, секция","Футболист","Центр футбольной подготовки Барса","Спортивный клуб, секция","Эдельвейс","Клуб Истина","Gracie Barra","Русь","Спортивный клуб, секция","Тайпинг","Свердловская Областная Федерация Тхэквондо МФТ","Федерация армейского рукопашного боя","Zal","Clinch","Студия воздушной гимнастики","Уральский медведь","Вертикаль","Дети России, Детская Спортивная школа","Карате Киокушинкай СК Питбуль","Синкен","Росс","Детская футбольная школа Чемпионика","Мир тенниса","Олимпика","Gracie Barra","Бадминтон","Прайм, клуб прикладного айкидо","ДЮСШ Дети России","Рекорд","Метеор","Спортивный клуб, секция","Школа паркура акробатики и трикинга X - movement","Свердловская Областная Федерация Тхэквондо МФТ","Школа художественной гимнастики","Федерация полноконтактного каратэ","Рекорд","Спортивный клуб, секция","СК Медведь","Спортивный клуб, секция","Детская футбольная школа Чемпионика","Метеор","Honey Volley Park","Русь","Gracie Barra","Спортивный клуб Исеть по футболу","Гимнастика для детей","Бадминтон","Русь","ДЮСШ Дети России","Спортивный клуб, секция","Спортивный клуб, секция","Gadzhiev school","Спортивный клуб, секция","Футболика","Школа паркура акробатики и трикинга X - movement","Детская футбольная школа Чемпионика","Метеор","Honey Volley Park","Русь","Профспорт Менеджмент","Gracie Barra","Спортивный клуб Исеть по футболу","Гимнастика для детей","Бадминтон","Русь","ДЮСШ Дети России","Свердловская Областная Федерация Тхэквондо МФТ","Школа Традиционного Тхэквондо","Свердловская Областная Федерация Тхэквондо ГТФ","Спортивный клуб, секция","Спортивный клуб, секция","Gadzhiev school","Спортивный клуб, секция","Спортивный клуб, секция","Футболика","Школа паркура акробатики и трикинга X - movement","Tiger","Дзюдо Урал","Крепыш","Свердловская Областная Федерация Тхэквондо МФТ","Кэндо и Иайдо Кюмэйкан","Бадминтон","Русь","Здоровое поколение","ДЮСШ Дети России","Спортивный клуб, секция","Свердловская Областная Федерация Тхэквондо МФТ","Школа Традиционного Тхэквондо","Свердловская Областная Федерация Тхэквондо ГТФ","Спортивный клуб, секция","Спортивный клуб, секция","Gadzhiev school","Спортивный клуб, секция","Спортивный клуб, секция","Футболика","Школа паркура акробатики и трикинга X - movement","Клуб развивающей гимнастики для детей Ласточка","Tiger","Дзюдо Урал","Надежда","Спортивный клуб, секция","Русь","Здоровое поколение","ДЮСШ Дети России","Чемпион","Спортивный клуб, секция","Свердловская Областная Федерация Тхэквондо МФТ","Школа Традиционного Тхэквондо","Свердловская Областная Федерация Тхэквондо ГТФ","Спортивный клуб, секция","Спортивный клуб, секция","Gadzhiev school","Специализированная детско-юношеская спортивная школа олимпийского резерва по греко-римской борьбе","Спортивный клуб, секция","Спортивный клуб, секция","Спортивный клуб, секция","Футболика","Школа паркура акробатики и трикинга X - movement","Спортивный клуб, секция","Клуб развивающей гимнастики для детей Ласточка","Tiger","Дзюдо Урал","Надежда","Спортивный клуб, секция","Sparta","Ратиборец","Свердловская Областная Федерация Тхэквондо ГТФ","Иппон","Спортивный клуб, секция","Поколение","Спортивный клуб, секция","Gadzhiev school","Специализированная детско-юношеская спортивная школа олимпийского резерва по греко-римской борьбе","Спортивный клуб, секция","Спортивный клуб, секция","Спортивный клуб, секция","Футболика","Школа паркура акробатики и трикинга X - movement","Спортивный клуб, секция","Спортивный клуб, секция","Клуб развивающей гимнастики для детей Ласточка","Tiger","Ранг-Е","Дзюдо Урал","Надежда","Спортивный клуб, секция","Спортивный клуб, секция","Октагон","Sparta","Black Bear","Спортивный клуб, секция","Спортивный клуб, секция","Футболика","Лидер","ММА Екатеринбург. Смешанные единоборства","Школа паркура акробатики и трикинга X - movement","Спортивный клуб, секция","Спортивный клуб, секция","Клуб развивающей гимнастики для детей Ласточка","Tiger","Ранг-Е","Дзюдо Урал","Надежда","Спортивный клуб, секция","Спортивный клуб, секция","Октагон","Вшк Панда","Школа Единоборств Чемпион","Спортивный клуб, секция","Чемпион","Sparta","ММА Екатеринбург. Смешанные единоборства","Свердловская Областная Федерация Тхэквондо ГТФ","Школа паркура акробатики и трикинга X - movement","Спортивный клуб, секция","Спортивный клуб, секция","Клуб развивающей гимнастики для детей Ласточка","Tiger","Ранг-Е","Рукопашный бой- Мягкий стиль","Дзюдо Урал","Надежда","Спортивный клуб, секция","Спортивный клуб, секция","Школа детского кикбоксинга","Октагон","Вшк Панда","Школа Единоборств Чемпион","Спортивный клуб, секция","Чемпион","Спортивный клуб, секция","Sparta","Лидер Урал","Спортивный клуб, секция","Клуб развивающей гимнастики для детей Ласточка","Спортивный клуб, секция","Tiger","Ранг-Е","Рукопашный бой- Мягкий стиль","Дзюдо Урал","Надежда","Спортивный клуб, секция","Спортивный клуб, секция","Школа детского кикбоксинга","Октагон","Вшк Панда","Школа Единоборств Чемпион","Спортивный клуб, секция","Mironov's sport studio","Чемпион","Спортивный клуб, секция","Sparta","Ранг-Е","Рукопашный бой- Мягкий стиль","Дзюдо Урал","Diamond","Надежда","Спортивный клуб, секция","Спортивный клуб, секция","Школа детского кикбоксинга","Октагон","Вшк Панда","Школа Единоборств Чемпион","Спортивный клуб, секция","Титан","Mironov's sport studio","Спортивный клуб, секция","Чемпион","Спортивный клуб, секция","Sparta","Спортивный клуб № 17","Diamond","Спортивный клуб, секция","Надежда","Спортивный клуб, секция","Спортивный клуб, секция","Школа детского кикбоксинга","Иппон","Октагон","Вшк Панда","Школа Единоборств Чемпион","Спортивный клуб, секция","Титан","Mironov's sport studio","Спортивный клуб, секция","Чемпион","ДЮСШ Дети России","Детская футбольная школа Чемпионика","Спортивный клуб, секция","Sparta","Спортивный клуб № 17","GroSport","Надежда","Спортивный клуб, секция","Спортивный клуб, секция","Школа детского кикбоксинга","Иппон","Октагон","Вшк Панда","Школа Единоборств Чемпион","Спортивный клуб, секция","Титан","Mironov's sport studio","Спортивный клуб Катюша","Академия Бокса Кости Цзю","Спортивный клуб, секция","Чемпион","ДЮСШ Дети России","Детская футбольная школа Чемпионика","Спортивный клуб, секция","Sparta","Спортивный клуб № 17","GroSport","Школа детского кикбоксинга","Иппон","Октагон","Вшк Панда","Школа Единоборств Чемпион","Спортивный клуб, секция","Титан","Mironov's sport studio","Спортивный клуб Катюша","Академия Бокса Кости Цзю","Спортивный клуб, секция","Чемпион","ДЮСШ Дети России","Спортивный клуб, секция","Спортивный клуб Катюша","Детская футбольная школа Чемпионика","Спортивный клуб, секция","Спортивный клуб, секция","Sparta","Спортивный клуб № 17","GroSport","Спортивный клуб, секция","Спортивный клуб, секция","Титан","Mironov's sport studio","Спортивный клуб Катюша","Академия Бокса Кости Цзю","Спортивный клуб, секция","Чемпион","ДЮСШ Дети России","Спортивный клуб, секция","ДЮСШ Дети России","Спортивный клуб Катюша","Детская футбольная школа Чемпионика","Спортивный клуб, секция","Спортивный клуб, секция","Sparta","Спортивный клуб, секция","Федерация Всестилевого Каратэ Свердловской области","Юнион","Спортивный клуб № 17","GroSport","МОУ дополнительного образования детей Детско-юношеский центр Созвездие ДЮК Темп","Спортивный клуб, секция","Чемпион","ДЮСШ Дети России","Спортивный клуб, секция","Чемпион","ДЮСШ Дети России","Спортивный клуб Катюша","Детская футбольная школа Чемпионика","Спортивный клуб, секция","Спортивный клуб, секция","Sparta","Спортивный клуб, секция","Кодокан","Русь","Спортивный клуб, секция","Федерация Всестилевого Каратэ Свердловской области","Спортивный клуб, секция","Юнион","Спортивный клуб № 17","GroSport","Стадион","Спортивный клуб, секция","Чемпион","ДЮСШ Дети России","Спортивный клуб Катюша","Детская футбольная школа Чемпионика","Лидер","Спортивный клуб, секция","Спортивный клуб, секция","Патриот","Sparta","Спортивный клуб, секция","Кодокан","Русь","Спортивный клуб, секция","Прайм","Федерация Всестилевого Каратэ Свердловской области","Спортивный клуб, секция","Юнион","Спортивный клуб № 17","GroSport","Конный клуб Апрель","Стадион","Спортивный клуб, секция","Патриот","Центр Художественной Гимнастики Diamond","Sparta","Спортивный клуб, секция","Кодокан","Секция Айкидо","Русь","Спортивный клуб, секция","Прайм","Федерация Всестилевого Каратэ Свердловской области","Шахматы","СОФ Киокушин каратэ-до","СОФ Киокушин каратэ-до","Спортивный клуб, секция","ДЮСШ Дети России","Юнион","Спортивный клуб № 17","Diamond","GroSport","Конный клуб Апрель","Стадион","Спортивный клуб, секция","Кодокан","Секция Айкидо","Русь","Спортивный клуб, секция","Прайм","Федерация Всестилевого Каратэ Свердловской области","Шахматы","СОФ Киокушин каратэ-до","СОФ Киокушин каратэ-до","Спортивный клуб, секция","ДЮСШ Дети России","Спортивный клуб, секция","Юнион","АкроДети","Спортивный клуб № 17","Diamond","Спортивная школа","Спортивно-развлекательный центр","GroSport","Конный клуб Апрель","ДЮСШ Дети России","Стадион","Русь","Спортивный клуб, секция","Прайм","Федерация Всестилевого Каратэ Свердловской области","Шахматы","СОФ Киокушин каратэ-до","СОФ Киокушин каратэ-до","Спортивный клуб, секция","ДЮСШ Дети России","Спортивный клуб, секция","Юнион","АкроДети","Спортивный клуб № 17","Diamond","Спортивная школа","Спортивный клуб, секция","Спортивно-развлекательный центр","GroSport","Конный клуб Апрель","Спортивный, тренажёрный зал","ДЮСШ Дети России","Стадион","Спортивный клуб, секция","Юнион","АкроДети","Спортивный клуб № 17","Diamond","Урал Айкидо","Спортивная школа","Спортивный клуб, секция","Спортивный клуб, секция","Спортивный клуб, секция","Спортивно-развлекательный центр","GroSport","Конный клуб Апрель","Спортивный, тренажёрный зал","ДЮСШ Дети России","Художественная гимнастика Diamond","Мидгард","Центр Художественной Гимнастики Diamond","Стадион","Спортивный клуб, секция","Екатеринбургская Городская Федерация Киокусинкай","ДЮСШ Дети России","Клуб карате киокусинкай","Спортивная школа","Спортивно-развлекательный центр","GroSport","Федерация тхэквондо инвалидов Свердловской области с поражением опорно-двигательного аппарата","Конный клуб Апрель","Спортивный клуб, секция","Спортивный, тренажёрный зал","Спортивный клуб, секция","ДЮСШ Дети России","Художественная гимнастика Diamond","Мидгард","Центр Художественной Гимнастики Diamond","Морской пехотинец","Уральская Федерация Каратэ Кёкусинкай Самурай","Спортивный клуб, секция","Стадион","Спортивный клуб, секция","Спортивный клуб, секция","Спортивный, тренажёрный зал","Екатеринбургская Городская Федерация Киокусинкай","ДЮСШ Дети России","Футбольный клуб Лео","Морской пехотинец","Спортивный клуб, секция","Спортивный клуб, секция","Уральская Федерация Каратэ Кёкусинкай Самурай","СК Созвездие","Рекорд","Спортивный клуб, секция","Юность","Спортивный клуб, секция","Спортивный клуб, секция","Стадион","Спортивный клуб, секция","Спортивный клуб, секция","Спортивный, тренажёрный зал","Екатеринбургская Городская Федерация Киокусинкай","ДЮСШ Дети России","Karate","Малахит","Отделение лыжных гонок","Прорыв","Футбольный клуб Лео","Каратэ Фудокан для детей","Школа большого тенниса","Спарта","Уральский Медведь","Спортивный клуб, секция","Спортивный клуб, секция","Малахит","Отделение лыжных гонок","Прорыв","Футбольный клуб Лео","ОрхИДЕЯ","Каратэ Фудокан для детей","God Hand","Школа большого тенниса","Спортивный клуб, секция","Спарта","Берёзовский клуб дзюдо","Пересвет"]`;

const CLUBS = JSON.parse(SECTIONS_NAMES);

const API_KEY = 'de65efc5-3ca3-48d2-9703-d45bba8486e7';
const AUTH_KEY = '5917d8b48b31467356db0d70072ad1b26a432b75';

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

bar1.start(CLUBS.length, 0);

CLUBS.forEach(async (i, num) => {
	await fetch(`https://search-maps.yandex.ru/v1/?text=${encodeURI(i)}&ll=56.838011,60.597474&results=1&type=biz&lang=ru_RU&apikey=${API_KEY}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json())
		.then(async (res) => {
			if(res.features && res.features.length) {
				let timetables = [];
				res.features[0].properties.CompanyMetaData.Hours.Availabilities.forEach((i) => {
					if(i.Interval) {
						i.Intervals.forEach((j) => {
							if(i.Monday) {
								timetables.push({
									start_time: j.from.slice(0, 5),
									end_time: j.to.slice(0, 5),
									day_of_the_week: 1,
								});
							}
							if(i.Tuesday) {
								timetables.push({
									start_time: j.from.slice(0, 5),
									end_time: j.to.slice(0, 5),
									day_of_the_week: 2,
								});
							}
							if(i.Wednesday) {
								timetables.push({
									start_time: j.from.slice(0, 5),
									end_time: j.to.slice(0, 5),
									day_of_the_week: 3,
								});
							}
							if(i.Thursday) {
								timetables.push({
									start_time: j.from.slice(0, 5),
									end_time: j.to.slice(0, 5),
									day_of_the_week: 4,
								});
							}
							if(i.Friday) {
								timetables.push({
									start_time: j.from.slice(0, 5),
									end_time: j.to.slice(0, 5),
									day_of_the_week: 5,
								});
							}
							if(i.Saturday) {
								timetables.push({
									start_time: j.from.slice(0, 5),
									end_time: j.to.slice(0, 5),
									day_of_the_week: 6,
								});
							}
							if(i.Sunday) {
								timetables.push({
									start_time: j.from.slice(0, 5),
									end_time: j.to.slice(0, 5),
									day_of_the_week: 7,
								});
							}
						});
					}
				});

				const DEFAULT_TIMETABLE = [
					{
						start_time: '00:00',
						end_time: '23:00',
						day_of_the_week: 1,
					},
					{
						start_time: '00:00',
						end_time: '23:00',
						day_of_the_week: 2,
					},
					{
						start_time: '00:00',
						end_time: '23:00',
						day_of_the_week: 3,
					},
					{
						start_time: '00:00',
						end_time: '23:00',
						day_of_the_week: 4,
					},
					{
						start_time: '00:00',
						end_time: '23:00',
						day_of_the_week: 5,
					},
					{
						start_time: '00:00',
						end_time: '23:00',
						day_of_the_week: 6,
					},
					{
						start_time: '00:00',
						end_time: '23:00',
						day_of_the_week: 7,
					},
				];

				await fetch('https://api.skillactive.ru/clubs/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Token ' + AUTH_KEY, 
					},
					body: JSON.stringify({
						title: i,
						address: res.features[0].properties.CompanyMetaData.address,
						description: res.features[0].properties.CompanyMetaData.Categories.map((i) => i.name).join(';\n'),
						min_age: 1,
						max_age: 17,
						latitude: res.features[0].properties.boundedBy[0][1].toString(),
						longitude: res.features[0].properties.boundedBy[0][0].toString(),
						tutors: [],
						price: [],
						opened: true,
						contacts: [...res.features[0].properties.CompanyMetaData.Phones.map((i) => ({
							value: i.formatted,
							type: 'PHONE',
						})), {
							value: res.features[0].properties.CompanyMetaData.url,
							type: 'SITE',
						}],
						timetable: timetables.length ? timetables : DEFAULT_TIMETABLE,
					}),
				}).then((res) => {
					if(res.status !== 201) {
						console.log({
							title: i,
							address: res.features[0].properties.CompanyMetaData.address,
							description: res.features[0].properties.CompanyMetaData.Categories.map((i) => i.name).join(';\n'),
							min_age: 1,
							max_age: 17,
							latitude: res.features[0].properties.boundedBy[0][1].toString(),
							longitude: res.features[0].properties.boundedBy[0][0].toString(),
							tutors: [],
							price: [],
							opened: true,
							contacts: [...res.features[0].properties.CompanyMetaData.Phones.map((i) => ({
								value: i.formatted,
								type: 'PHONE',
							})), {
								value: res.features[0].properties.CompanyMetaData.url,
								type: 'SITE',
							}],
							timetable: timetables.length ? timetables : DEFAULT_TIMETABLE,
						});
					}
				});
			}
		})
		.then(() => bar1.update(num + 1))
		.catch(() => bar1.update(num + 1));
});