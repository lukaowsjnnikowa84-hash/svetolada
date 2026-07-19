import {
  getLifePathNumber,
  getDestinyNumber,
  getSoulNumber,
  getPersonalityNumber,
  getBirthDayNumber,
} from "./numerology.js";

import { getZodiacSign, getRulingPlanet, getElement } from "./astrology.js";
import {
  getLifePathCompatibility,
  getZodiacCompatibility,
  getIdealPartner,
} from "./compatibility.js";

// Основная функция генерации отчёта
function generateReport(userData, partnerData = null) {
  const { name, birthDate, birthTime, birthPlace } = userData;

  // Расчёты для пользователя
  const lifePath = getLifePathNumber(birthDate);
  const destiny = getDestinyNumber(name);
  const soul = getSoulNumber(name);
  const personality = getPersonalityNumber(name);
  const birthDay = getBirthDayNumber(birthDate);
  const zodiac = getZodiacSign(birthDate);
  const planet = getRulingPlanet(birthDate);
  const element = getElement(birthDate);

  // Базовый отчёт
  const report = {
    user: {
      name,
      birthDate,
      birthTime,
      birthPlace,
      numbers: {
        lifePath,
        destiny,
        soul,
        personality,
        birthDay,
      },
      astrology: {
        zodiac: zodiac.name,
        planet,
        element,
        rulingPlanet: planet,
      },
    },
    compatibility: null,
    idealPartner: null,
  };

  // Если есть партнёр — считаем совместимость
  if (partnerData && partnerData.birthDate) {
    const partnerLifePath = getLifePathNumber(partnerData.birthDate);
    const partnerZodiac = getZodiacSign(partnerData.birthDate);

    const lifePathCompat = getLifePathCompatibility(lifePath, partnerLifePath);
    const zodiacCompat = getZodiacCompatibility(
      birthDate,
      partnerData.birthDate,
    );

    report.compatibility = {
      partnerName: partnerData.name || "Партнёр",
      partnerLifePath,
      partnerZodiac: partnerZodiac.name,
      lifePathScore: lifePathCompat,
      zodiacScore: zodiacCompat,
      overallScore: Math.round((lifePathCompat + zodiacCompat) / 2),
      description: getCompatibilityDescription(lifePathCompat, zodiacCompat),
    };
  } else {
    // Если партнёра нет — показываем идеального
    report.idealPartner = getIdealPartner(birthDate);
  }

  return report;
}

// Описание совместимости
function getCompatibilityDescription(lifePathScore, zodiacScore) {
  const avg = (lifePathScore + zodiacScore) / 2;

  if (avg >= 8)
    return "🔥 Отличная совместимость! Вы дополняете друг друга и создаёте гармоничный союз.";
  if (avg >= 6)
    return "💛 Хорошая совместимость. Есть потенциал для роста и взаимопонимания.";
  if (avg >= 4)
    return "📊 Средняя совместимость. Потребуется работа над отношениями.";
  return "🌊 Сложная совместимость. Но любые отношения — это вызов и возможность роста.";
}

export { generateReport };
