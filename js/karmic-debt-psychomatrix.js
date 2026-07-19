// js/karmic-debt-psychomatrix.js

function getKarmicDebtFromPsychomatrix(birthDate) {
  const digits = birthDate
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const counts = {};

  for (let i = 0; i <= 9; i++) {
    counts[i] = digits.filter((n) => n === i).length;
  }

  // Проверяем наличие "пустых" ячеек
  const emptyCells = [];
  for (let i = 1; i <= 9; i++) {
    if (counts[i] === 0) emptyCells.push(i);
  }

  // Кармические долги по психоматрице
  const debtIndicators = [];

  // Нет цифры 1 — долг лидерства
  if (counts[1] === 0)
    debtIndicators.push({
      type: "Долг самореализации",
      description:
        "В прошлой жизни вы были ведомым и избегали ответственности.",
      advice: "Учитесь принимать решения и брать на себя ответственность.",
    });

  // Нет цифры 2 — долг сотрудничества
  if (counts[2] === 0)
    debtIndicators.push({
      type: "Долг сотрудничества",
      description:
        "В прошлой жизни вы были одиночкой и не умели работать в команде.",
      advice: "Учитесь доверять людям и работать в паре.",
    });

  // Нет цифры 4 — долг здоровья и порядка
  if (counts[4] === 0)
    debtIndicators.push({
      type: "Долг здоровья",
      description: "В прошлой жизни вы пренебрегали своим телом и здоровьем.",
      advice: "Следите за здоровьем, занимайтесь спортом и соблюдайте режим.",
    });

  // Нет цифры 6 — долг семьи
  if (counts[6] === 0)
    debtIndicators.push({
      type: "Долг семьи",
      description: "В прошлой жизни вы пренебрегали семьёй и близкими.",
      advice: "Учитесь заботиться о близких и создавать гармонию в семье.",
    });

  // Нет цифры 8 — долг ответственности
  if (counts[8] === 0)
    debtIndicators.push({
      type: "Долг ответственности",
      description:
        "В прошлой жизни вы избегали ответственности и обязательств.",
      advice: "Учитесь быть ответственным и держать слово.",
    });

  return {
    hasDebt: debtIndicators.length > 0,
    indicators: debtIndicators,
    summary:
      debtIndicators.length > 0
        ? `Обнаружены кармические уроки: ${debtIndicators.map((d) => d.type).join(", ")}`
        : "Ваша психоматрица гармонична, кармических долгов нет.",
  };
}
