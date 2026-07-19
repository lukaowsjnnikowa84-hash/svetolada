// js/karmic-debt.js

/**
 * РАСЧЁТ КАРМИЧЕСКИХ ДОЛГОВ
 * Полная версия с анализом по всем 4 числам
 */

// ===== 1. БАЗОВАЯ ФУНКЦИЯ ПРОВЕРКИ =====

function isKarmicDebt(number) {
  return [13, 14, 16, 19].includes(number);
}

// ===== 2. КАРМИЧЕСКИЙ ДОЛГ ПО ДАТЕ РОЖДЕНИЯ =====

function getKarmicDebtFromBirthDate(birthDate) {
  // birthDate: '1995-03-14' или '14.03.1995'
  const parts = birthDate.split(/[.-]/);
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  // Проверяем день рождения
  const dayDebt = isKarmicDebt(day) ? day : null;

  // Проверяем сумму всех цифр
  const digits = birthDate
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  const intermediateSum = sum; // Например, 31 или 14

  // Проверяем промежуточную сумму
  const sumDebt = isKarmicDebt(intermediateSum) ? intermediateSum : null;

  // Проверяем сумму дня и месяца
  const dayMonthSum = day + month;
  const dayMonthDebt = isKarmicDebt(dayMonthSum) ? dayMonthSum : null;

  // Проверяем сумму месяца и года
  const monthYearSum = month + year;
  const monthYearDebt = isKarmicDebt(monthYearSum) ? monthYearSum : null;

  // Собираем все найденные долги
  const debts = [dayDebt, sumDebt, dayMonthDebt, monthYearDebt].filter(
    (d) => d !== null,
  );

  // Уникальные долги
  const uniqueDebts = [...new Set(debts)];

  return {
    hasDebt: uniqueDebts.length > 0,
    debts: uniqueDebts,
    primaryDebt: uniqueDebts.length > 0 ? uniqueDebts[0] : null,
    sources: {
      day: dayDebt,
      sum: sumDebt,
      dayMonth: dayMonthDebt,
      monthYear: monthYearDebt,
    },
  };
}

// ===== 3. КАРМИЧЕСКИЙ ДОЛГ ПО ИМЕНИ (ЧИСЛО СУДЬБЫ) =====

function getKarmicDebtFromName(fullName) {
  // Числовые значения букв (русский алфавит)
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
  let sum = 0;
  let intermediateSums = [];
  let runningSum = 0;

  // Считаем пошагово, чтобы отследить промежуточные суммы
  for (let letter of clean) {
    const val = letterValues[letter] || 0;
    runningSum += val;
    // Запоминаем промежуточную сумму, если она >= 10
    if (runningSum >= 10) {
      intermediateSums.push(runningSum);
    }
  }

  // Финальная сумма
  const finalSum = runningSum;

  // Проверяем все промежуточные суммы на кармические долги
  let foundDebts = [];
  for (let sum of intermediateSums) {
    if (isKarmicDebt(sum)) {
      foundDebts.push(sum);
    }
  }

  // Проверяем финальную сумму (если она не свернута до однозначного)
  if (isKarmicDebt(finalSum)) {
    foundDebts.push(finalSum);
  }

  // Уникальные долги
  const uniqueDebts = [...new Set(foundDebts)];

  return {
    hasDebt: uniqueDebts.length > 0,
    debts: uniqueDebts,
    primaryDebt: uniqueDebts.length > 0 ? uniqueDebts[0] : null,
    finalSum: finalSum,
    intermediateSums: intermediateSums,
  };
}

// ===== 4. ПОЛНЫЙ АНАЛИЗ КАРМИЧЕСКИХ ДОЛГОВ =====

function getFullKarmicDebtAnalysis(birthDate, fullName) {
  const birthDebt = getKarmicDebtFromBirthDate(birthDate);
  const nameDebt = getKarmicDebtFromName(fullName);

  // Объединяем все долги
  const allDebts = [...new Set([...birthDebt.debts, ...nameDebt.debts])];

  // Первичный долг (самый важный)
  const primaryDebt = allDebts.length > 0 ? allDebts[0] : null;

  // Расшифровка каждого долга
  const debtInterpretations = allDebts.map((debt) =>
    getDebtInterpretation(debt),
  );

  // Рекомендации по отработке
  const recommendations = allDebts.map((debt) => getDebtRecommendation(debt));

  return {
    hasDebt: allDebts.length > 0,
    debts: allDebts,
    primaryDebt: primaryDebt,
    sources: {
      birthDate: birthDebt.sources,
      name: nameDebt,
    },
    interpretations: debtInterpretations,
    recommendations: recommendations,
    summary: getDebtSummary(allDebts, primaryDebt),
    // Для отчёта
    detailed: {
      "Наличие долга":
        allDebts.length > 0
          ? "⚠️ Есть кармические долги"
          : "✅ Кармических долгов нет",
      "Числа долгов": allDebts.length > 0 ? allDebts.join(", ") : "—",
      "Главный долг": primaryDebt ? `Число ${primaryDebt}` : "—",
      "Что делать":
        allDebts.length > 0
          ? recommendations.join("; ")
          : "Продолжайте развиваться",
    },
  };
}

// ===== 5. РАСШИФРОВКА КАЖДОГО ДОЛГА =====

function getDebtInterpretation(debtNumber) {
  const interpretations = {
    13: {
      title: "Долг лени и неиспользованного потенциала",
      short: "Вы не реализовали свои таланты в прошлой жизни",
      description: `В прошлом воплощении вы обладали большим потенциалом, но не использовали его. 
                          Вы могли быть талантливы, но ленились, искали лёгкие пути или боялись ответственности. 
                          В этой жизни вам нужно научиться доводить дела до конца и не бояться трудностей.`,
      lesson: "Учитесь дисциплине, упорству и реализации своих идей.",
      manifestation: [
        "Прокрастинация и откладывание дел",
        "Страх больших проектов",
        "Чувство нереализованности",
        "Постоянный поиск лёгких путей",
      ],
      cure: "Начните с малого, но доводите каждое дело до конца. Берите ответственность за свои проекты.",
    },
    14: {
      title: "Долг злоупотребления свободой",
      short: "Вы манипулировали и нарушали правила в прошлой жизни",
      description: `В прошлой жизни вы злоупотребляли своей свободой и властью. 
                          Могли манипулировать людьми, нарушать законы или использовать других в своих целях. 
                          В этой жизни вам нужно научиться ответственности и уважению к другим.`,
      lesson: "Учитесь умеренности, дисциплине и уважению к чужим границам.",
      manifestation: [
        "Тяга к запретному и риску",
        "Проблемы с законом или правилами",
        "Манипуляции в отношениях",
        "Неумение остановиться",
      ],
      cure: "Развивайте самодисциплину. Учитесь уважать правила и чужие границы.",
    },
    16: {
      title: "Долг эгоизма и разрушения отношений",
      short: "Вы разрушали отношения и были эгоистичны",
      description: `В прошлой жизни вы ставили себя выше других, разрушали отношения, 
                          могли предавать или использовать близких. Ваш эгоизм приносил боль другим. 
                          В этой жизни вам нужно научиться любви, смирению и заботе о других.`,
      lesson: "Учитесь безусловной любви, эмпатии и принятию других людей.",
      manifestation: [
        "Проблемы в личных отношениях",
        "Одиночество или изоляция",
        "Эгоцентризм и гордыня",
        "Трудности с доверием",
      ],
      cure: "Работайте над смирением, развивайте эмпатию и учитесь прощать.",
    },
    19: {
      title: "Долг злоупотребления властью",
      short: "Вы подавляли других и злоупотребляли властью",
      description: `В прошлой жизни вы имели власть и использовали её во вред другим. 
                          Могли быть тираном, деспотом или манипулятором. Ваша сила подавляла слабых. 
                          В этой жизни вам нужно научиться использовать свою силу для блага других.`,
      lesson: "Учитесь мудрости, смирению и служению другим через свою силу.",
      manifestation: [
        "Конфликты с авторитетами",
        "Склонность к диктаторству",
        "Проблемы с контролем гнева",
        "Желание доминировать",
      ],
      cure: "Используйте свою силу для помощи другим. Развивайте мудрость и смирение.",
    },
  };

  return (
    interpretations[debtNumber] || {
      title: "Неизвестный кармический долг",
      short: "Требует глубокого анализа",
      description: "Этот долг требует личного исследования и работы над собой.",
      lesson: "Самоанализ и осознанность.",
      manifestation: ["Требует индивидуального изучения"],
      cure: "Обратитесь к профессиональному нумерологу.",
    }
  );
}

// ===== 6. РЕКОМЕНДАЦИИ ПО ОТРАБОТКЕ =====

function getDebtRecommendation(debtNumber) {
  const recommendations = {
    13:
      "Начните с маленьких проектов и доводите их до конца. Ведите дневник достижений. " +
      "Учитесь концентрироваться на одной задаче. Не бойтесь трудностей — они ваш путь к росту.",
    14:
      "Учитесь самодисциплине. Составьте чёткий режим дня и следуйте ему. " +
      "Избегайте искушений и рискованных ситуаций. Развивайте умеренность во всём.",
    16:
      "Развивайте эмпатию. Учитесь слушать других и принимать их такими, какие они есть. " +
      "Практикуйте прощение — и себя, и других. Работайте над смирением.",
    19:
      "Используйте свою силу для помощи другим. Будьте лидером-слугой. " +
      "Развивайте мудрость и учитесь слышать других. Практикуйте терпение.",
  };
  return recommendations[debtNumber] || "Самоанализ и работа с психологом.";
}

// ===== 7. ИТОГОВОЕ РЕЗЮМЕ =====

function getDebtSummary(debts, primaryDebt) {
  if (debts.length === 0) {
    return "У вас нет кармических долгов. Ваша задача — продолжать развиваться и реализовывать свой потенциал.";
  }

  const debtNames = debts
    .map((d) => {
      const interp = getDebtInterpretation(d);
      return `${d} (${interp.short})`;
    })
    .join(", ");

  const primary = getDebtInterpretation(primaryDebt);

  return `У вас обнаружены кармические долги: ${debtNames}. 
            Главный долг — ${primaryDebt} (${primary.title}). 
            ${primary.description.slice(0, 150)}... 
            Ключевой урок: ${primary.lesson}`;
}

// ===== 8. ЭКСПОРТ =====

export {
  isKarmicDebt,
  getKarmicDebtFromBirthDate,
  getKarmicDebtFromName,
  getFullKarmicDebtAnalysis,
  getDebtInterpretation,
  getDebtRecommendation,
  getDebtSummary,
};
