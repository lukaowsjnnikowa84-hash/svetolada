import { getLifePathNumber } from "./numerology.js";
import { getZodiacSign } from "./astrology.js";

// Совместимость по числу жизненного пути
function getLifePathCompatibility(num1, num2) {
  // Шкала от 0 до 10
  const compatibilityMatrix = {
    "1,1": 7,
    "1,2": 6,
    "1,3": 9,
    "1,4": 5,
    "1,5": 8,
    "1,6": 9,
    "1,7": 6,
    "1,8": 7,
    "1,9": 8,
    "1,11": 8,
    "1,22": 7,
    "2,2": 8,
    "2,3": 7,
    "2,4": 6,
    "2,5": 7,
    "2,6": 9,
    "2,7": 5,
    "2,8": 6,
    "2,9": 7,
    "2,11": 8,
    "2,22": 6,
    "3,3": 7,
    "3,4": 6,
    "3,5": 9,
    "3,6": 8,
    "3,7": 7,
    "3,8": 6,
    "3,9": 9,
    "3,11": 8,
    "3,22": 7,
    "4,4": 8,
    "4,5": 6,
    "4,6": 7,
    "4,7": 8,
    "4,8": 9,
    "4,9": 6,
    "4,11": 7,
    "4,22": 8,
    "5,5": 7,
    "5,6": 8,
    "5,7": 9,
    "5,8": 6,
    "5,9": 8,
    "5,11": 9,
    "5,22": 7,
    "6,6": 9,
    "6,7": 6,
    "6,8": 7,
    "6,9": 8,
    "6,11": 9,
    "6,22": 8,
    "7,7": 8,
    "7,8": 6,
    "7,9": 7,
    "7,11": 9,
    "7,22": 7,
    "8,8": 7,
    "8,9": 6,
    "8,11": 8,
    "8,22": 9,
    "9,9": 8,
    "9,11": 9,
    "9,22": 8,
    "11,11": 9,
    "11,22": 8,
    "22,22": 9,
  };

  const key = [num1, num2].sort((a, b) => a - b).join(",");
  return compatibilityMatrix[key] || 5; // По умолчанию 5
}

// Совместимость по знакам зодиака
function getZodiacCompatibility(date1, date2) {
  const sign1 = getZodiacSign(date1);
  const sign2 = getZodiacSign(date2);

  // Стихии
  const elementCompatibility = {
    "Огонь-Огонь": 8,
    "Огонь-Земля": 5,
    "Огонь-Воздух": 9,
    "Огонь-Вода": 6,
    "Земля-Земля": 9,
    "Земля-Воздух": 5,
    "Земля-Вода": 8,
    "Воздух-Воздух": 7,
    "Воздух-Вода": 6,
    "Вода-Вода": 9,
  };

  const key = [sign1.element, sign2.element].sort().join("-");
  return elementCompatibility[key] || 5;
}

// Идеальный партнёр для пользователя
function getIdealPartner(birthDate) {
  const userNumber = getLifePathNumber(birthDate);

  // Какие числа лучше всего подходят
  const idealNumbers = {
    1: [3, 5, 6, 9],
    2: [2, 6, 8, 9],
    3: [1, 3, 5, 6, 9],
    4: [4, 6, 7, 8],
    5: [1, 3, 5, 7, 9],
    6: [1, 2, 3, 6, 9],
    7: [4, 5, 7, 9],
    8: [2, 4, 8, 9],
    9: [1, 2, 3, 6, 9],
    11: [2, 6, 9, 11],
    22: [4, 6, 8, 22],
  };

  const ideals = idealNumbers[userNumber] || [3, 5, 6];
  const idealSign = getZodiacSign(birthDate);

  return {
    idealLifePathNumbers: ideals,
    description:
      `Ваш идеальный партнёр — человек с числом жизненного пути ${ideals.join(", ")}, ` +
      `который дополнит вашу энергию и будет разделять ваши ценности. ` +
      `Хорошая совместимость с ${idealSign.element} стихией.`,
  };
}

export { getLifePathCompatibility, getZodiacCompatibility, getIdealPartner };
