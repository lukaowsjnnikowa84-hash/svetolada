// js/relationships.js

function getRelationshipProfile(birthDate, name, partnerData = null) {
  const lifePath = getLifePathNumber(birthDate);
  const soul = getSoulNumber(name);
  const day = parseInt(birthDate.split(/[.-]/)[0]);

  // Ваш тип в отношениях
  const relationshipType = getRelationshipType(lifePath);

  // Ваши потребности в любви
  const loveNeeds = getLoveNeeds(soul);

  // Семейный архетип
  const familyArchetype = getFamilyArchetype(day, lifePath);

  // Если есть партнёр
  let compatibility = null;
  if (partnerData && partnerData.birthDate) {
    const partnerLifePath = getLifePathNumber(partnerData.birthDate);
    const partnerSoul = getSoulNumber(partnerData.name || "");

    compatibility = {
      lifePathMatch: getLifePathCompatibility(lifePath, partnerLifePath),
      soulMatch: getSoulCompatibility(soul, partnerSoul),
      overall: Math.round(
        (getLifePathCompatibility(lifePath, partnerLifePath) +
          getSoulCompatibility(soul, partnerSoul)) /
          2,
      ),
      strengths: getRelationshipStrengths(lifePath, partnerLifePath),
      challenges: getRelationshipChallenges(lifePath, partnerLifePath),
      advice: getRelationshipAdvice(lifePath, partnerLifePath),
    };
  }

  return {
    relationshipType,
    loveNeeds,
    familyArchetype,
    compatibility,
    // Для отчёта
    detailed: {
      "Тип в отношениях": relationshipType,
      "Потребности в любви": loveNeeds.join(", "),
      "Семейный архетип": familyArchetype,
      "Идеальный партнёр": getIdealPartnerDescription(lifePath, soul),
    },
  };
}

function getRelationshipType(lifePath) {
  const types = {
    1: "Лидер-защитник. Вы берёте инициативу в отношениях.",
    2: "Чувствительный дипломат. Вам важна гармония и партнёрство.",
    3: "Вдохновитель-оптимист. Вы приносите радость и творчество.",
    4: "Надёжный строитель. Вы создаёте стабильность и порядок.",
    5: "Свободный искатель. Вам важна независимость и приключения.",
    6: "Заботливый хранитель. Вы отдаёте любовь и заботу.",
    7: "Мудрый наблюдатель. Вы ищете глубину и понимание.",
    8: "Стратег-защитник. Вы строите отношения как бизнес-проект.",
    9: "Идеалист-романтик. Вы ищете идеальную любовь.",
    11: "Духовный наставник. Вы ведёте партнёра к развитию.",
    22: "Строитель империи. Семья — это ваш главный проект.",
  };
  return types[lifePath] || "Индивидуальный подход к отношениям.";
}

function getLoveNeeds(soul) {
  const needs = {
    1: ["Признание", "Восхищение", "Независимость", "Лидерство"],
    2: ["Внимание", "Понимание", "Забота", "Эмпатия"],
    3: ["Вдохновение", "Развлечения", "Приключения", "Творчество"],
    4: ["Стабильность", "Надёжность", "Порядок", "Безопасность"],
    5: ["Свобода", "Новизна", "Путешествия", "Перемены"],
    6: ["Гармония", "Красота", "Забота", "Тепло"],
    7: ["Глубина", "Правда", "Интеллект", "Одиночество"],
    8: ["Власть", "Результаты", "Статус", "Контроль"],
    9: ["Идеалы", "Гуманизм", "Жертвенность", "Безусловность"],
    11: ["Духовность", "Интуиция", "Вдохновение", "Смысл"],
    22: ["Масштаб", "Реализация", "Служение", "Сила"],
  };
  return needs[soul] || ["Любовь", "Понимание", "Уважение"];
}

function getFamilyArchetype(day, lifePath) {
  const base = [
    "Глава клана",
    "Хранительница очага",
    "Мудрый советник",
    "Вдохновитель",
    "Свободный дух",
    "Заботливый родитель",
    "Философ",
    "Стратег",
    "Идеалист",
  ];
  const index = (day + lifePath) % base.length;
  return base[index];
}

function getSoulCompatibility(soul1, soul2) {
  const matrix = {
    "1,1": 5,
    "1,2": 6,
    "1,3": 8,
    "1,4": 4,
    "1,5": 7,
    "1,6": 9,
    "1,7": 5,
    "1,8": 6,
    "1,9": 7,
    "1,11": 8,
    "2,2": 9,
    "2,3": 6,
    "2,4": 5,
    "2,5": 6,
    "2,6": 8,
    "2,7": 4,
    "2,8": 6,
    "2,9": 7,
    "2,11": 9,
    "3,3": 7,
    "3,4": 5,
    "3,5": 8,
    "3,6": 7,
    "3,7": 6,
    "3,8": 5,
    "3,9": 8,
    "3,11": 8,
    "4,4": 8,
    "4,5": 5,
    "4,6": 7,
    "4,7": 7,
    "4,8": 8,
    "4,9": 6,
    "4,11": 6,
    "5,5": 7,
    "5,6": 7,
    "5,7": 8,
    "5,8": 5,
    "5,9": 7,
    "5,11": 8,
    "6,6": 9,
    "6,7": 5,
    "6,8": 7,
    "6,9": 8,
    "6,11": 9,
    "7,7": 7,
    "7,8": 5,
    "7,9": 6,
    "7,11": 8,
    "8,8": 7,
    "8,9": 6,
    "8,11": 7,
    "9,9": 9,
    "9,11": 8,
    "11,11": 9,
  };
  const key = [soul1, soul2].sort((a, b) => a - b).join(",");
  return matrix[key] || 5;
}

function getRelationshipStrengths(lp1, lp2) {
  const strengths = [];
  const sum = lp1 + lp2;

  if (sum % 2 === 0) strengths.push("Понимание и гармония");
  if (Math.abs(lp1 - lp2) <= 2) strengths.push("Близкие ценности");
  if (lp1 + lp2 > 12) strengths.push("Взаимное вдохновение");
  if (lp1 % 2 === lp2 % 2) strengths.push("Схожий ритм жизни");

  return strengths.length > 0
    ? strengths
    : ["Разные взгляды, которые дополняют друг друга"];
}

function getRelationshipChallenges(lp1, lp2) {
  const challenges = [];
  const diff = Math.abs(lp1 - lp2);

  if (diff > 5) challenges.push("Разные темпы жизни");
  if (lp1 === 1 && lp2 === 7) challenges.push("Конфликт лидера и одиночки");
  if (lp1 === 2 && lp2 === 8) challenges.push("Борьба за контроль");
  if (lp1 === 3 && lp2 === 4) challenges.push("Креативность vs Порядок");
  if (lp1 === 5 && lp2 === 9) challenges.push("Свобода vs Ответственность");

  return challenges.length > 0
    ? challenges
    : ["Потребуется работа над взаимопониманием"];
}

function getRelationshipAdvice(lp1, lp2) {
  const diff = Math.abs(lp1 - lp2);

  if (diff <= 2)
    return "Вы очень похожи — это даёт понимание, но может привести к скуке. Вносите новизну.";
  if (diff <= 4)
    return "Хороший баланс — вы дополняете друг друга. Главное — уважать отличия.";
  if (diff <= 6)
    return "Вы очень разные — это вызов и рост. Учитесь принимать непохожесть.";
  return "Ваша связь — кармическая. Она принесёт вам обоим важные уроки.";
}

function getIdealPartnerDescription(lifePath, soul) {
  const ideals = {
    1: "Сильный, но уважающий вашу независимость. Партнёр, который не боится вашей силы.",
    2: "Чуткий и внимательный. Кто-то, кто чувствует ваши потребности без слов.",
    3: "Жизнерадостный и креативный. Тот, кто разделяет вашу любовь к жизни.",
    4: "Надёжный и стабильный. Кто-то, кто строит будущее вместе с вами.",
    5: "Свободный и открытый. Тот, кто готов к приключениям и переменам.",
    6: "Заботливый и семейный. Кто-то, кто ценит дом и гармонию.",
    7: "Глубокий и мудрый. Тот, кто понимает вашу потребность в одиночестве.",
    8: "Амбициозный и успешный. Партнёр, который разделяет ваши цели.",
    9: "Идеалист и гуманист. Кто-то, кто верит в лучшее и служит другим.",
    11: "Духовный и вдохновляющий. Тот, кто видит свет в вашей душе.",
    22: "Масштабный и реализованный. Кто-то, кто строит великое вместе с вами.",
  };
  return ideals[lifePath] || "Тот, кто принимает вас таким, какой вы есть.";
}

export { getRelationshipProfile };
