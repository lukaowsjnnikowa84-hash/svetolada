// js/karmic-nodes-full.js

function getDetailedKarmicNodes(birthDate, birthTime, birthPlace) {
  const day = parseInt(birthDate.split(/[.-]/)[0]);
  const month = parseInt(birthDate.split(/[.-]/)[1]);
  const year = parseInt(birthDate.split(/[.-]/)[2]);
  const lifePath = getLifePathNumber(birthDate);

  // Расчёт кармических узлов (упрощённый астрологический метод)
  // В реальности нужны эфемериды, здесь даём символьный подход

  // Южный узел (Кету) — прошлое, привычки, зона комфорта
  const southNode = {
    sign: getPastLifeSign(day, month),
    house: ((day + month + year) % 12) + 1,
    traits: getSouthNodeTraits(day, month),
    lesson: "Эти качества вам знакомы, но они мешают развитию. Отпустите их.",
    shadow: getSouthShadow(day, month),
  };

  // Северный узел (Раху) — будущее, цель развития
  const northNode = {
    sign: getFutureLifeSign(day, month),
    house: ((day + month + year) % 12) + 1,
    traits: getNorthNodeTraits(day, month),
    lesson: "В этом направлении лежит ваше развитие. Примите вызов.",
    shadow: getNorthShadow(day, month),
  };

  return {
    southNode,
    northNode,
    // Толкование для отчёта
    interpretation: getNodeInterpretation(southNode, northNode, lifePath),
  };
}

function getSouthShadow(day, month) {
  const shadows = [
    "Импульсивность и гнев",
    "Упрямство и жадность",
    "Поверхностность и болтливость",
    "Эмоциональная зависимость",
    "Гордыня и высокомерие",
    "Перфекционизм и критика",
    "Нерешительность и зависимость",
    "Ревность и манипуляции",
    "Безответственность и фанатизм",
    "Пессимизм и жёсткость",
    "Хаотичность и бунтарство",
    "Иллюзорность и пассивность",
  ];
  return shadows[(day + month) % 12];
}

function getNorthShadow(day, month) {
  const shadows = [
    "Излишняя осторожность",
    "Неуверенность в новом",
    "Страх глубины",
    "Излишняя независимость",
    "Эгоистичное лидерство",
    "Чрезмерная забота",
    "Излишняя рациональность",
    "Недоверие и подозрительность",
    "Жёсткость и консерватизм",
    "Слепой оптимизм",
    "Излишняя структура",
    "Отрыв от реальности",
  ];
  return shadows[(day + month) % 12];
}

function getNodeInterpretation(south, north, lifePath) {
  return {
    past: `В прошлом вы были склонны к ${south.traits}. Это ваша зона комфорта, но она ограничивает рост.`,
    future: `Ваша цель — развивать ${north.traits}. Это вызов, но он приведёт вас к истинному предназначению.`,
    advice: `Балансируйте между прошлым и будущим. Не отрицайте свой опыт, но и не застревайте в нём.`,
    lifePathTask: getLifePathKarma(lifePath),
  };
}

function getLifePathKarma(lifePath) {
  const tasks = {
    1: "Научиться вести за собой, но не подавлять других.",
    2: "Учиться сотрудничеству и чувствовать других людей.",
    3: "Раскрыть творческий потенциал и вдохновлять мир.",
    4: "Строить стабильность и порядок через дисциплину.",
    5: "Познать свободу через ответственность.",
    6: "Служить любви и гармонии через заботу о других.",
    7: "Искать истину и передавать знание.",
    8: "Научиться управлять материей для блага всех.",
    9: "Служить человечеству и отпустить эго.",
    11: "Быть проводником света и вдохновения.",
    22: "Создавать великое на благо всех.",
  };
  return tasks[lifePath] || "Познать себя и помочь другим.";
}

export { getDetailedKarmicNodes };
