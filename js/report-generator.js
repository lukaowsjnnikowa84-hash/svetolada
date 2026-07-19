// report_generator.js — ИСПРАВЛЕННАЯ ВЕРСИЯ (без ошибок)

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function reduceNumber(num) {
  if (num === 0) return 0;
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num)
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

function getLifePathNumber(birthDate) {
  const digits = birthDate
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceNumber(sum);
}

function getDestinyNumber(fullName) {
  const letterValues = {
    а: 1,
    б: 2,
    в: 3,
    г: 4,
    д: 5,
    е: 6,
    ё: 7,
    ж: 8,
    з: 9,
    и: 1,
    й: 2,
    к: 3,
    л: 4,
    м: 5,
    н: 6,
    о: 7,
    п: 8,
    р: 9,
    с: 1,
    т: 2,
    у: 3,
    ф: 4,
    х: 5,
    ц: 6,
    ч: 7,
    ш: 8,
    щ: 9,
    ъ: 1,
    ы: 2,
    ь: 3,
    э: 4,
    ю: 5,
    я: 6,
  };
  const clean = fullName.toLowerCase().replace(/[^а-яё]/g, "");
  const sum = clean
    .split("")
    .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  return reduceNumber(sum);
}

function getSoulNumber(fullName) {
  const letterValues = {
    а: 1,
    б: 2,
    в: 3,
    г: 4,
    д: 5,
    е: 6,
    ё: 7,
    ж: 8,
    з: 9,
    и: 1,
    й: 2,
    к: 3,
    л: 4,
    м: 5,
    н: 6,
    о: 7,
    п: 8,
    р: 9,
    с: 1,
    т: 2,
    у: 3,
    ф: 4,
    х: 5,
    ц: 6,
    ч: 7,
    ш: 8,
    щ: 9,
    ъ: 1,
    ы: 2,
    ь: 3,
    э: 4,
    ю: 5,
    я: 6,
  };
  const vowels = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];
  const clean = fullName.toLowerCase().replace(/[^а-яё]/g, "");
  const sum = clean
    .split("")
    .filter((letter) => vowels.includes(letter))
    .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  return reduceNumber(sum);
}

function getPersonalityNumber(fullName) {
  const letterValues = {
    а: 1,
    б: 2,
    в: 3,
    г: 4,
    д: 5,
    е: 6,
    ё: 7,
    ж: 8,
    з: 9,
    и: 1,
    й: 2,
    к: 3,
    л: 4,
    м: 5,
    н: 6,
    о: 7,
    п: 8,
    р: 9,
    с: 1,
    т: 2,
    у: 3,
    ф: 4,
    х: 5,
    ц: 6,
    ч: 7,
    ш: 8,
    щ: 9,
    ъ: 1,
    ы: 2,
    ь: 3,
    э: 4,
    ю: 5,
    я: 6,
  };
  const vowels = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];
  const clean = fullName.toLowerCase().replace(/[^а-яё]/g, "");
  const sum = clean
    .split("")
    .filter((letter) => !vowels.includes(letter))
    .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  return reduceNumber(sum);
}

function getBirthDayNumber(birthDate) {
  const parts = birthDate.split(/[.-]/);
  return parseInt(parts[0]);
}

// ===== ЗАГЛУШКА ДЛЯ ОТНОШЕНИЙ (чтобы не было ошибки) =====
function getRelationshipProfile(birthDate, name, partnerData) {
  return {
    relationshipType: "Гармоничный союз",
    loveNeeds: ["Понимание", "Забота", "Уважение"],
    familyArchetype: "Хранитель очага",
    detailed: {
      "Тип в отношениях": "Заботливый партнёр",
      "Потребности в любви": "Внимание, понимание, поддержка",
      "Семейный архетип": "Хранитель домашнего очага",
      "Идеальный партнёр": "Человек, который ценит вашу душу",
    },
  };
}

// ===== ОСНОВНАЯ ФУНКЦИЯ =====
function generateFullReport(userData, partnerData) {
  const { name, birthDate, birthTime, birthPlace } = userData;

  const lifePath = getLifePathNumber(birthDate);
  const destiny = getDestinyNumber(name);
  const soul = getSoulNumber(name);
  const personality = getPersonalityNumber(name);
  const birthDay = getBirthDayNumber(birthDate);

  const numberDescriptions = {
    1: "Лидер, новатор, независимая личность",
    2: "Дипломат, миротворец, чувствительная душа",
    3: "Творец, коммуникатор, оптимист",
    4: "Строитель, организатор, надёжный человек",
    5: "Свободный искатель, авантюрист, любитель перемен",
    6: "Хранитель, заботливый, семейный человек",
    7: "Мудрец, исследователь, философ",
    8: "Властелин, стратег, материализатор",
    9: "Гуманист, идеалист, учитель",
    11: "Проводник, вдохновитель, духовный лидер",
    22: "Мастер-строитель, творец реальности",
  };

  const report = {
    user: {
      name,
      birthDate,
      birthTime: birthTime || "12:00",
      birthPlace,
    },
    numbers: {
      lifePath,
      destiny,
      soul,
      personality,
      birthDay,
      description: {
        lifePath: numberDescriptions[lifePath] || "Уникальная личность",
        destiny: numberDescriptions[destiny] || "Уникальная личность",
        soul: numberDescriptions[soul] || "Уникальная личность",
        personality: numberDescriptions[personality] || "Уникальная личность",
        birthDay: "Человек с сильным характером и яркой индивидуальностью",
      },
    },
    relationships: getRelationshipProfile(birthDate, name, partnerData),
    partner: partnerData || null,
    generatedAt: new Date().toISOString(),
  };

  return report;
}
