// js/yearly-forecast.js

function getYearlyForecast(birthDate, targetYear = new Date().getFullYear()) {
  const lifePath = getLifePathNumber(birthDate);
  const day = parseInt(birthDate.split(/[.-]/)[0]);
  const month = parseInt(birthDate.split(/[.-]/)[1]);
  const year = parseInt(birthDate.split(/[.-]/)[2]);

  // Личный год
  const personalYear = reduceNumber(day + month + targetYear);

  // Возрастной цикл
  const age = targetYear - year;
  const ageCycle = Math.floor(age / 9) + 1; // 9-летние циклы

  // Универсальный год
  const universalYear = reduceNumber(targetYear);

  // Прогноз по личному году
  const forecast = getPersonalYearForecast(personalYear);

  // Ключевые периоды в году
  const keyPeriods = getKeyPeriods(month, personalYear);

  return {
    personalYear,
    universalYear,
    ageCycle,
    forecast,
    keyPeriods,
    detailed: {
      "Ваш личный год": `Число ${personalYear}`,
      "Главный фокус": forecast.focus,
      "Энергия года": forecast.energy,
      "Благоприятные периоды": keyPeriods.join(", "),
      "Совет года": forecast.advice,
    },
  };
}

function getPersonalYearForecast(year) {
  const forecasts = {
    1: {
      focus: "Новое начало, старт проектов, переезд",
      energy: "Активная, творческая, вдохновляющая",
      advice: "Смело начинайте новое. Сейте семена для будущих лет.",
    },
    2: {
      focus: "Отношения, партнёрство, дипломатия, ожидание",
      energy: "Спокойная, чувствительная, терпеливая",
      advice: "Будьте терпеливы. Всё идёт своим чередом. Укрепляйте связи.",
    },
    3: {
      focus: "Творчество, общение, развлечения, самовыражение",
      energy: "Весёлая, социальная, лёгкая",
      advice: "Наслаждайтесь жизнью. Делитесь радостью и вдохновением.",
    },
    4: {
      focus: "Работа, порядок, финансы, строительство",
      energy: "Серьёзная, структурированная, продуктивная",
      advice: "Трудитесь усердно. Закладывайте прочный фундамент.",
    },
    5: {
      focus: "Перемены, путешествия, свобода, приключения",
      energy: "Нестабильная, возбуждённая, ищущая",
      advice: "Будьте готовы к переменам. Используйте любую возможность.",
    },
    6: {
      focus: "Семья, любовь, дом, ответственность, забота",
      energy: "Тёплая, гармоничная, ответственная",
      advice: "Уделите время близким. Создавайте уют и гармонию.",
    },
    7: {
      focus: "Самоанализ, мудрость, отдых, духовность",
      energy: "Глубокая, созерцательная, уединённая",
      advice: "Уйдите в себя, чтобы найти ответы. Время для внутренней работы.",
    },
    8: {
      focus: "Успех, власть, деньги, результаты, признание",
      energy: "Амбициозная, сильная, результативная",
      advice: "Действуйте решительно. Ваше время пришло.",
    },
    9: {
      focus: "Завершение, отпускание, служение, трансформация",
      energy: "Завершающая, очищающая, жертвенная",
      advice: "Отпускайте старое, чтобы освободить место для нового.",
    },
  };
  return forecasts[year] || forecasts[1];
}

function getKeyPeriods(birthMonth, personalYear) {
  const periods = [];

  // День рождения и +- месяц
  const bdayMonth = birthMonth;
  const bdayPlus = birthMonth + 1 > 12 ? 1 : birthMonth + 1;
  const bdayMinus = birthMonth - 1 < 1 ? 12 : birthMonth - 1;

  periods.push(`Месяц рождения (${bdayMonth}) — важный личный старт`);
  periods.push(
    `Через месяц после дня рождения (${bdayPlus}) — развитие событий`,
  );
  periods.push(`За месяц до дня рождения (${bdayMinus}) — подведение итогов`);

  // Сезонные точки
  if (personalYear % 3 === 0) periods.push("Весна — время активности");
  if (personalYear % 3 === 1) periods.push("Осень — время завершений");
  if (personalYear % 3 === 2) periods.push("Лето — время результатов");

  return periods.slice(0, 4);
}

export { getYearlyForecast };
