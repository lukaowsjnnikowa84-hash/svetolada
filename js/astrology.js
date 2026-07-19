// Знаки Зодиака
const zodiacSigns = [
  {
    name: "Овен",
    start: "03-21",
    end: "04-19",
    planet: "Марс",
    element: "Огонь",
  },
  {
    name: "Телец",
    start: "04-20",
    end: "05-20",
    planet: "Венера",
    element: "Земля",
  },
  {
    name: "Близнецы",
    start: "05-21",
    end: "06-20",
    planet: "Меркурий",
    element: "Воздух",
  },
  {
    name: "Рак",
    start: "06-21",
    end: "07-22",
    planet: "Луна",
    element: "Вода",
  },
  {
    name: "Лев",
    start: "07-23",
    end: "08-22",
    planet: "Солнце",
    element: "Огонь",
  },
  {
    name: "Дева",
    start: "08-23",
    end: "09-22",
    planet: "Меркурий",
    element: "Земля",
  },
  {
    name: "Весы",
    start: "09-23",
    end: "10-22",
    planet: "Венера",
    element: "Воздух",
  },
  {
    name: "Скорпион",
    start: "10-23",
    end: "11-21",
    planet: "Плутон",
    element: "Вода",
  },
  {
    name: "Стрелец",
    start: "11-22",
    end: "12-21",
    planet: "Юпитер",
    element: "Огонь",
  },
  {
    name: "Козерог",
    start: "12-22",
    end: "01-19",
    planet: "Сатурн",
    element: "Земля",
  },
  {
    name: "Водолей",
    start: "01-20",
    end: "02-18",
    planet: "Уран",
    element: "Воздух",
  },
  {
    name: "Рыбы",
    start: "02-19",
    end: "03-20",
    planet: "Нептун",
    element: "Вода",
  },
];

// Определение знака зодиака по дате
function getZodiacSign(birthDate) {
  // birthDate: '1995-03-14' или '14.03.1995'
  const parts = birthDate.split(/[.-]/);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[0]);

  const dateStr =
    String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");

  // Корректировка для Козерога (переход через новый год)
  if (dateStr >= "12-22" || dateStr <= "01-19") return zodiacSigns[9];

  for (let sign of zodiacSigns) {
    if (dateStr >= sign.start && dateStr <= sign.end) {
      return sign;
    }
  }
  return zodiacSigns[0]; // fallback
}

// Получение планеты-управителя
function getRulingPlanet(birthDate) {
  const sign = getZodiacSign(birthDate);
  return sign.planet;
}

// Получение стихии
function getElement(birthDate) {
  const sign = getZodiacSign(birthDate);
  return sign.element;
}

export { getZodiacSign, getRulingPlanet, getElement };
