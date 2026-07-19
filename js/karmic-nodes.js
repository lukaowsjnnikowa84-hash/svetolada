// js/karmic-nodes.js

function getKarmicNodes(birthDate) {
  const lifePath = getLifePathNumber(birthDate);
  const day = parseInt(birthDate.split(/[.-]/)[0]);
  const month = parseInt(birthDate.split(/[.-]/)[1]);
  const year = parseInt(birthDate.split(/[.-]/)[2]);

  // Кармический долг (числа 13, 14, 16, 19)
  const karmicDebt = getKarmicDebt(birthDate);

  // Кармическое число (сумма дня и месяца)
  const karmicNumber = reduceNumber(day + month);

  // Кармические задачи по числу жизненного пути
  const tasks = {
    1: "Научиться лидерству без эгоизма. Служить другим через свою силу.",
    2: "Учиться дипломатии и сотрудничеству. Не подавлять свою чувствительность.",
    3: "Раскрыть творческий потенциал. Научиться радоваться и вдохновлять других.",
    4: "Создать стабильность и порядок. Преодолеть ограничения и страхи.",
    5: "Научиться свободе и ответственности. Не бояться перемен.",
    6: "Служить семье и близким. Учиться безусловной любви.",
    7: "Искать мудрость и истину. Преодолеть одиночество через знание.",
    8: "Научиться управлять материей. Балансировать между духом и деньгами.",
    9: "Служить человечеству. Отпустить эго и личные привязанности.",
    11: "Развивать интуицию и духовное лидерство. Нести свет людям.",
    22: "Строить великие дела на благо мира. Преодолеть ограничения.",
  };

  // Кармические узлы (Северный и Южный)
  const nodes = getNodesByDate(day, month, year);

  return {
    karmicDebt,
    karmicNumber,
    task: tasks[lifePath] || "Познать себя и своё предназначение.",
    southNode: nodes.south, // Тенденции из прошлого
    northNode: nodes.north, // Направление развития
    description: generateKarmicDescription(lifePath, karmicDebt, nodes),
  };
}

function getKarmicDebt(birthDate) {
  const digits = birthDate
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  const reduced = reduceNumber(sum);

  // Кармические долги: 13, 14, 16, 19
  const debtNumbers = [13, 14, 16, 19];
  if (debtNumbers.includes(sum)) return sum;
  if (debtNumbers.includes(reduced)) return reduced;
  return null;
}

function getNodesByDate(day, month, year) {
  // Упрощённый расчёт кармических узлов
  // В реальной астрологии это сложные точки, тут даём приблизительные значения

  const nodes = {
    south: {
      sign: getPastLifeSign(day, month),
      traits: getSouthNodeTraits(day, month),
      lesson: "Преодолеть привычные паттерны и выйти из зоны комфорта.",
    },
    north: {
      sign: getFutureLifeSign(day, month),
      traits: getNorthNodeTraits(day, month),
      lesson: "Развивать новые качества и идти к своей цели.",
    },
  };

  return nodes;
}

function getPastLifeSign(day, month) {
  const signs = [
    "Овен",
    "Телец",
    "Близнецы",
    "Рак",
    "Лев",
    "Дева",
    "Весы",
    "Скорпион",
    "Стрелец",
    "Козерог",
    "Водолей",
    "Рыбы",
  ];
  const index = (day + month) % 12;
  return signs[index];
}

function getFutureLifeSign(day, month) {
  const signs = [
    "Рыбы",
    "Водолей",
    "Козерог",
    "Стрелец",
    "Скорпион",
    "Весы",
    "Дева",
    "Лев",
    "Рак",
    "Близнецы",
    "Телец",
    "Овен",
  ];
  const index = (day + month) % 12;
  return signs[index];
}

function getSouthNodeTraits(day, month) {
  const traits = [
    "Импульсивность, нетерпение, доминирование",
    "Жадность, консерватизм, упрямство",
    "Поверхностность, непостоянство, болтливость",
    "Эмоциональная нестабильность, зависимость",
    "Гордыня, властность, эгоцентризм",
    "Критичность, перфекционизм, тревожность",
    "Нерешительность, зависимость от других",
    "Ревность, манипуляции, мстительность",
    "Безответственность, фанатизм, экстремизм",
    "Пессимизм, жёсткость, подавление чувств",
    "Хаотичность, непредсказуемость, бунтарство",
    "Иллюзорность, жертвенность, пассивность",
  ];
  const index = (day + month) % 12;
  return traits[index];
}

function getNorthNodeTraits(day, month) {
  const traits = [
    "Терпение, дипломатия, сотрудничество",
    "Щедрость, гибкость, открытость новому",
    "Глубина, стабильность, преданность",
    "Независимость, уверенность, лидерство",
    "Смирение, эмпатия, бескорыстие",
    "Забота, терпимость, принятие несовершенства",
    "Решительность, автономность, прямота",
    "Доверие, прощение, лёгкость",
    "Ответственность, дисциплина, завершение дел",
    "Оптимизм, открытость, доверие жизни",
    "Структура, последовательность, реализм",
    "Интуиция, духовность, сострадание",
  ];
  const index = (day + month) % 12;
  return traits[index];
}

function generateKarmicDescription(lifePath, debt, nodes) {
  let text = `Ваша главная кармическая задача — ${nodes.north.lesson} `;

  if (debt) {
    text += `\n\n⚠️ Кармический долг: число ${debt}. Это значит, что в прошлых жизнях вы `;
    const debtDescriptions = {
      13: "не использовали свой потенциал, ленились или избегали ответственности.",
      14: "злоупотребляли свободой, манипулировали людьми или нарушали правила.",
      16: "были эгоистичны, разрушали отношения или использовали людей.",
      19: "злоупотребляли властью, подавляли других или были тираном.",
    };
    text += debtDescriptions[debt] || "имели неотработанные кармические уроки.";
  }

  return text;
}

export { getKarmicNodes };
