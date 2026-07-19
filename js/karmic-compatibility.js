// js/karmic-compatibility.js

import {
  getFullKarmicDebtAnalysis,
  getDebtInterpretation,
} from "./karmic-debt.js";

/**
 * РАСЧЁТ КАРМИЧЕСКОЙ СОВМЕСТИМОСТИ
 * Анализ кармических долгов в паре
 */

// ===== 1. ОСНОВНАЯ ФУНКЦИЯ =====

function getKarmicCompatibility(
  userBirthDate,
  userName,
  partnerBirthDate,
  partnerName,
) {
  // Получаем кармические долги каждого
  const userDebt = getFullKarmicDebtAnalysis(userBirthDate, userName);
  const partnerDebt = getFullKarmicDebtAnalysis(partnerBirthDate, partnerName);

  // Анализируем совместимость долгов
  const compatibility = analyzeDebtCompatibility(userDebt, partnerDebt);

  // Получаем общий прогноз
  const forecast = getKarmicForecast(userDebt, partnerDebt);

  // Советы для пары
  const advice = getKarmicAdvice(userDebt, partnerDebt, compatibility);

  return {
    userDebt,
    partnerDebt,
    compatibility,
    forecast,
    advice,
    // Для отчёта
    detailed: {
      "Кармический долг пользователя": userDebt.hasDebt
        ? userDebt.debts.join(", ")
        : "Нет",
      "Кармический долг партнёра": partnerDebt.hasDebt
        ? partnerDebt.debts.join(", ")
        : "Нет",
      "Тип совместимости": compatibility.type,
      Оценка: compatibility.score + "/10",
      Прогноз: forecast,
      Совет: advice,
    },
  };
}

// ===== 2. АНАЛИЗ СОВМЕСТИМОСТИ =====

function analyzeDebtCompatibility(userDebt, partnerDebt) {
  const userHas = userDebt.hasDebt;
  const partnerHas = partnerDebt.hasDebt;

  // Если у обоих нет долгов — идеально
  if (!userHas && !partnerHas) {
    return {
      type: "Свободный союз",
      score: 10,
      description:
        "У вас нет кармических долгов, поэтому ваши отношения строятся на свободе и любви. " +
        "Нет кармических узлов из прошлого, вы можете строить будущее без груза прошлых жизней.",
      challenges:
        "Нет кармических вызовов — это благословение. Но не забывайте работать над отношениями здесь и сейчас.",
      strengths: "Лёгкость, свобода, отсутствие кармических программ",
    };
  }

  // Если у обоих есть долги
  if (userHas && partnerHas) {
    const commonDebts = userDebt.debts.filter((d) =>
      partnerDebt.debts.includes(d),
    );
    const allDebts = [...new Set([...userDebt.debts, ...partnerDebt.debts])];

    // Считаем кармическую нагрузку
    const debtCount = allDebts.length;
    const commonCount = commonDebts.length;

    let score = 7;
    let type = "Кармический союз";
    let description = "";
    let challenges = [];
    let strengths = [];

    // Если есть одинаковые долги
    if (commonCount > 0) {
      score = 4;
      type = "Зеркальный кармический союз";
      description =
        `У вас есть общие кармические долги: ${commonDebts.join(", ")}. ` +
        `Это означает, что вы притянулись друг к другу, чтобы отработать схожие уроки. ` +
        `Вы будете "зеркалить" друг другу слабости, что может быть очень болезненно, но эффективно.`;
      challenges.push(
        "Вы будете видеть свои недостатки в партнёре — это может вызывать раздражение",
      );
      challenges.push(
        "Будет сложно выйти из кармического круга, если не осознавать процессы",
      );
      strengths.push("Мощный совместный рост и трансформация");
      strengths.push("Глубокое понимание друг друга на уровне души");
    }

    // Если долги дополняют друг друга
    const complementPairs = [
      [13, 14],
      [13, 16],
      [13, 19],
      [14, 16],
      [14, 19],
      [16, 19],
    ];

    let isComplement = false;
    for (let pair of complementPairs) {
      if (
        (userDebt.debts.includes(pair[0]) &&
          partnerDebt.debts.includes(pair[1])) ||
        (userDebt.debts.includes(pair[1]) &&
          partnerDebt.debts.includes(pair[0]))
      ) {
        isComplement = true;
        break;
      }
    }

    if (isComplement && commonCount === 0) {
      score = 6;
      type = "Дополняющий кармический союз";
      description =
        `Ваши кармические долги дополняют друг друга. ` +
        `Вы пришли в этот мир, чтобы помочь друг другу отработать разные уроки. ` +
        `Один учится дисциплине, другой — любви. Один — ответственности, другой — смирению.`;
      challenges.push("Разные уроки могут создавать недопонимание");
      challenges.push("Потребуется много терпения и принятия");
      strengths.push("Гармоничное дополнение друг друга");
      strengths.push("Каждый помогает другому расти");
    }

    // Если долги конфликтуют
    const conflictPairs = [
      [13, 19], // Долг лени и долг власти
      [14, 16], // Долг свободы и долг эгоизма
      [13, 16], // Долг лени и долг эгоизма
      [14, 19], // Долг свободы и долг власти
    ];

    let isConflict = false;
    for (let pair of conflictPairs) {
      if (
        (userDebt.debts.includes(pair[0]) &&
          partnerDebt.debts.includes(pair[1])) ||
        (userDebt.debts.includes(pair[1]) &&
          partnerDebt.debts.includes(pair[0]))
      ) {
        isConflict = true;
        break;
      }
    }

    if (isConflict && commonCount === 0 && !isComplement) {
      score = 3;
      type = "Конфликтный кармический союз";
      description =
        `Ваши кармические долги вступают в конфликт. ` +
        `Вы будете постоянно сталкиваться с непониманием и борьбой. ` +
        `Этот союз требует огромной осознанности, чтобы не разрушить друг друга.`;
      challenges.push("Постоянные конфликты и недопонимание");
      challenges.push("Риск разрушить отношения, не отработав уроки");
      strengths.push(
        "Возможность глубокой трансформации, если пройти через трудности",
      );
    }

    // Если долги просто разные (без конфликта и без дополнения)
    if (!isConflict && !isComplement && commonCount === 0) {
      score = 5;
      type = "Нейтральный кармический союз";
      description =
        `У вас разные кармические долги, которые не пересекаются. ` +
        `Вы будете жить параллельными жизнями, каждый со своим уроком. ` +
        `Отношения могут быть стабильными, но неглубокими.`;
      challenges.push("Эмоциональная отстранённость");
      challenges.push("Каждый замыкается в своих проблемах");
      strengths.push("Стабильность и предсказуемость");
    }

    return {
      type,
      score,
      description,
      challenges: challenges.join(" "),
      strengths: strengths.join(" "),
      details: {
        commonDebts,
        allDebts,
        debtCount,
        commonCount,
      },
    };
  }

  // Если долг только у одного
  if (userHas && !partnerHas) {
    const userDebtList = userDebt.debts.join(", ");
    return {
      type: "Союз с кармическим грузом",
      score: 6,
      description:
        `У пользователя есть кармические долги (${userDebtList}), а у партнёра их нет. ` +
        `Партнёр будет для вас "учителем" или "спасателем". ` +
        `Важно не перекладывать свои уроки на партнёра и не делать его ответственным за ваш рост.`,
      challenges:
        'Дисбаланс в отношениях. Партнёр может устать быть "спасателем".',
      strengths: "Партнёр может помочь вам осознать и отработать свои долги.",
      details: {
        whoHasDebt: "user",
        debtList: userDebt.debts,
      },
    };
  }

  if (!userHas && partnerHas) {
    const partnerDebtList = partnerDebt.debts.join(", ");
    return {
      type: "Союз с кармическим грузом",
      score: 6,
      description:
        `У партнёра есть кармические долги (${partnerDebtList}), а у пользователя их нет. ` +
        `Пользователь будет для партнёра "учителем" или "спасателем". ` +
        `Важно не брать на себя ответственность за уроки партнёра и позволить ему проходить их самостоятельно.`,
      challenges:
        'Дисбаланс в отношениях. Пользователь может устать быть "спасателем".',
      strengths:
        "Пользователь может помочь партнёру осознать и отработать свои долги.",
      details: {
        whoHasDebt: "partner",
        debtList: partnerDebt.debts,
      },
    };
  }
}

// ===== 3. КАРМИЧЕСКИЙ ПРОГНОЗ ДЛЯ ПАРЫ =====

function getKarmicForecast(userDebt, partnerDebt) {
  const userHas = userDebt.hasDebt;
  const partnerHas = partnerDebt.hasDebt;
  const userDebts = userDebt.debts || [];
  const partnerDebts = partnerDebt.debts || [];

  let forecast = "";

  // Оба без долгов
  if (!userHas && !partnerHas) {
    forecast =
      "✨ Ваш союз свободен от кармических узлов. " +
      "Вы можете строить отношения с чистого листа. " +
      "Главное — не создавать новые кармические долги в этой жизни.";
  }

  // Оба с долгами
  if (userHas && partnerHas) {
    const common = userDebts.filter((d) => partnerDebts.includes(d));

    if (common.length > 0) {
      forecast =
        "🔥 Ваш союз — это зеркало. Вы будете видеть свои недостатки в партнёре. " +
        "Это болезненно, но даёт шанс на глубокую трансформацию. " +
        "Если вы пройдёте этот путь осознанно, вы выйдете на новый уровень духовного развития.";
    } else {
      const all = [...userDebts, ...partnerDebts];
      if (all.length >= 3) {
        forecast =
          "⚡ Ваш союз несёт высокую кармическую нагрузку. " +
          "Вас свела судьба, чтобы вы помогли друг другу. " +
          "Будет много испытаний, но результат стоит того.";
      } else {
        forecast =
          "🌊 Ваши долги не пересекаются, но вы всё равно притянулись. " +
          "Вероятно, вы помогаете друг другу в других аспектах. " +
          "Отношения будут стабильными, но каждый будет идти своим путём.";
      }
    }
  }

  // Долг только у одного
  if (userHas && !partnerHas) {
    forecast =
      "💫 Партнёр без долгов будет вашим учителем. " +
      "Он поможет вам осознать свои кармические уроки. " +
      "Не перекладывайте на него свою ответственность — это ваш путь.";
  }

  if (!userHas && partnerHas) {
    forecast =
      "💫 Вы будете учителем для партнёра. " +
      "Помогите ему осознать свои кармические уроки, но не берите их на себя. " +
      "Это его путь, вы лишь проводник.";
  }

  return forecast;
}

// ===== 4. СОВЕТЫ ДЛЯ ПАРЫ =====

function getKarmicAdvice(userDebt, partnerDebt, compatibility) {
  const userHas = userDebt.hasDebt;
  const partnerHas = partnerDebt.hasDebt;
  const userDebts = userDebt.debts || [];
  const partnerDebts = partnerDebt.debts || [];

  let advice = [];

  // Общие советы
  advice.push(
    "🔮 Будьте осознанны в отношениях. Наблюдайте за своими реакциями.",
  );
  advice.push("🙏 Практикуйте принятие — и себя, и партнёра.");
  advice.push("💬 Открыто говорите о своих чувствах и переживаниях.");

  // Специфические советы по долгам
  if (userHas && partnerHas) {
    const common = userDebts.filter((d) => partnerDebts.includes(d));

    if (common.length > 0) {
      advice.push(
        '🪞 Когда вы злитесь на партнёра, спросите себя: "Что во мне это отражает?"',
      );
      advice.push("🌱 Используйте конфликты как возможность для роста.");
      advice.push("💪 Работайте над своими долгами вместе — это укрепит союз.");
    } else {
      advice.push("🤝 Уважайте путь друг друга. Каждый проходит свои уроки.");
      advice.push(
        "📚 Учитесь друг у друга — ваши разные долги могут быть ценным опытом.",
      );
      advice.push("🌊 Принимайте разницу — она может быть вашей силой.");
    }
  }

  if (userHas && !partnerHas) {
    const userDebtInterp = getDebtInterpretation(userDebts[0]);
    advice.push(`🎯 Ваш главный урок: ${userDebtInterp.lesson}`);
    advice.push("🛤️ Не ждите, что партнёр решит ваши проблемы. Это ваш путь.");
    advice.push(
      "🙏 Благодарите партнёра за поддержку, но не делайте его ответственным за ваш рост.",
    );
  }

  if (!userHas && partnerHas) {
    const partnerDebtInterp = getDebtInterpretation(partnerDebts[0]);
    advice.push(`🎯 Урок партнёра: ${partnerDebtInterp.lesson}`);
    advice.push(
      "🤲 Поддерживайте партнёра, но не решайте его проблемы за него.",
    );
    advice.push("💡 Вдохновляйте своим примером, но не учите насильно.");
  }

  // Советы по типу совместимости
  if (compatibility.score <= 4) {
    advice.push(
      "⚠️ Ваш союз требует особого внимания. Рассмотрите работу с психологом.",
    );
    advice.push(
      "🕯️ Медитируйте вместе — это поможет синхронизировать энергии.",
    );
    advice.push("✍️ Ведите дневник отношений, чтобы отслеживать динамику.");
  }

  if (compatibility.score >= 8) {
    advice.push("🌟 Ваш союз благословен. Берегите и развивайте его.");
    advice.push("🎁 Вы пришли в жизнь друг друга не случайно — цените это.");
    advice.push(
      "🚀 Используйте свою гармонию для совместных проектов и творчества.",
    );
  }

  return advice;
}

// ===== 5. ЭКСПОРТ =====

export { getKarmicCompatibility };
