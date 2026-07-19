// js/psychomatrix.js

function calculatePsychomatrix(birthDate) {
  // birthDate: '1995-03-14'
  const digits = birthDate
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);

  // Первое число: сумма всех цифр
  const num1 = digits.reduce((a, b) => a + b, 0);

  // Второе число: сумма цифр первого числа
  const num2 = String(num1)
    .split("")
    .reduce((a, b) => a + parseInt(b), 0);

  // Третье число: первое число - 2 * первая цифра дня рождения
  const num3 = num1 - 2 * digits[0];

  // Четвёртое число: сумма цифр третьего числа
  const num4 = String(Math.abs(num3))
    .split("")
    .reduce((a, b) => a + parseInt(b), 0);

  // Все числа для матрицы
  const allNumbers = [...digits, num1, num2, num3, num4];
  const counts = {};

  for (let i = 0; i <= 9; i++) {
    counts[i] = allNumbers.filter((n) => n === i).length;
  }

  // Анализ ячеек матрицы
  return {
    counts,
    analysis: {
      // Характер (1)
      character: interpretCount(counts[1], [
        "Слабый, безвольный",
        "Эгоистичный, но управляемый",
        "Амбициозный, лидер",
        "Сильный характер, деспот",
        "Железная воля, тиран",
      ]),
      // Энергия (2)
      energy: interpretCount(counts[2], [
        "Вампир, нуждается в подпитке",
        "Средний уровень",
        "Хорошая энергетика",
        "Целитель, энергодар",
        "Мощный энергопоток",
      ]),
      // Интерес к науке (3)
      science: interpretCount(counts[3], [
        "Нет интереса",
        "Бытовой уровень",
        "Хороший потенциал",
        "Точные науки",
        "Гениальность",
      ]),
      // Здоровье (4)
      health: interpretCount(counts[4], [
        "Слабое здоровье",
        "Среднее",
        "Хорошее",
        "Отличное",
        "Богатырское",
      ]),
      // Логика (5)
      logic: interpretCount(counts[5], [
        "Нет логики",
        "Средняя",
        "Хорошая",
        "Превосходная",
        "Гениальная",
      ]),
      // Труд (6)
      labor: interpretCount(counts[6], [
        "Ленивый",
        "Работает по настроению",
        "Трудолюбивый",
        "Золотые руки",
        "Мастер",
      ]),
      // Удача (7)
      luck: interpretCount(counts[7], [
        "Невезучий",
        "Средняя удача",
        "Везунчик",
        "Фаворит судьбы",
        "Кармический везунчик",
      ]),
      // Долг (8)
      duty: interpretCount(counts[8], [
        "Нет чувства долга",
        "Среднее",
        "Ответственный",
        "Совестливый",
        "Гиперответственный",
      ]),
      // Память (9)
      memory: interpretCount(counts[9], [
        "Плохая память",
        "Средняя",
        "Хорошая",
        "Фотографическая",
        "Все помнит",
      ]),
    },
  };
}

function interpretCount(count, levels) {
  if (count === 0) return levels[0];
  if (count === 1) return levels[1];
  if (count === 2) return levels[2];
  if (count === 3) return levels[3];
  if (count >= 4) return levels[4];
}

export { calculatePsychomatrix };
