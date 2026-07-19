// ===== БАЗОВЫЕ ФУНКЦИИ =====

// 1. Свёртка числа (редукция до 1-9, 11, 22, 33)
function reduceNumber(num) {
  if (num === 0) return 0;
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num)
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

// 2. Числовое значение букв (для русского алфавита)
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

// ===== РАСЧЁТЫ =====

// 3. Число Жизненного Пути (по дате рождения)
function getLifePathNumber(birthDate) {
  // birthDate: '1995-03-14' или '14.03.1995'
  const digits = birthDate
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceNumber(sum);
}

// 4. Число Судьбы (по полному имени)
function getDestinyNumber(fullName) {
  const clean = fullName.toLowerCase().replace(/[^а-яё]/g, "");
  const sum = clean
    .split("")
    .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  return reduceNumber(sum);
}

// 5. Число Души (гласные в имени)
function getSoulNumber(fullName) {
  const clean = fullName.toLowerCase().replace(/[^а-яё]/g, "");
  const sum = clean
    .split("")
    .filter((letter) => vowels.includes(letter))
    .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  return reduceNumber(sum);
}

// 6. Число Личности (согласные в имени)
function getPersonalityNumber(fullName) {
  const clean = fullName.toLowerCase().replace(/[^а-яё]/g, "");
  const sum = clean
    .split("")
    .filter((letter) => !vowels.includes(letter))
    .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  return reduceNumber(sum);
}

// 7. Число Дня Рождения (сам день)
function getBirthDayNumber(birthDate) {
  const parts = birthDate.split(/[.-]/);
  const day = parseInt(parts[0]);
  return day; // Не сворачиваем, так как это число от 1 до 31
}

// ===== ЭКСПОРТ =====
export {
  reduceNumber,
  getLifePathNumber,
  getDestinyNumber,
  getSoulNumber,
  getPersonalityNumber,
  getBirthDayNumber,
};
