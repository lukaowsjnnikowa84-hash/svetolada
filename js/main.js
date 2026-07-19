// main.js — ИСПРАВЛЕННАЯ ВЕРСИЯ

document.addEventListener("DOMContentLoaded", function () {
  // ===== ЭЛЕМЕНТЫ =====
  const steps = document.querySelectorAll(".form-step");
  const progressSteps = document.querySelectorAll(".progress-step");
  const progressLines = document.querySelectorAll(".progress-line");
  const prevBtn = document.getElementById("prevStep");
  const nextBtn = document.getElementById("nextStep");
  const hasPartnerCheckbox = document.getElementById("hasPartner");
  const partnerFields = document.getElementById("partnerFields");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const formWrapper = document.querySelector(".form-wrapper");
  const resultBlock = document.getElementById("resultBlock");
  const resultContent = document.getElementById("resultContent");

  let currentStep = 1;
  const totalSteps = steps.length;

  // ===== ФУНКЦИИ РАСЧЁТА =====
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

  // ===== АСТРОЛОГИЯ =====
  function getZodiacSign(birthDate) {
    const parts = birthDate.split(/[.-]/);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    console.log("📅 main.js: день=" + day + ", месяц=" + month);

    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return {
        name: "Козерог",
        emoji: "♑",
        element: "Земля",
        planet: "Сатурн",
      };
    }
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return {
        name: "Водолей",
        emoji: "♒",
        element: "Воздух",
        planet: "Уран",
      };
    }
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return { name: "Рыбы", emoji: "♓", element: "Вода", planet: "Нептун" };
    }
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return { name: "Овен", emoji: "♈", element: "Огонь", planet: "Марс" };
    }
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return { name: "Телец", emoji: "♉", element: "Земля", planet: "Венера" };
    }
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return {
        name: "Близнецы",
        emoji: "♊",
        element: "Воздух",
        planet: "Меркурий",
      };
    }
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return { name: "Рак", emoji: "♋", element: "Вода", planet: "Луна" };
    }
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return { name: "Лев", emoji: "♌", element: "Огонь", planet: "Солнце" };
    }
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return {
        name: "Дева",
        emoji: "♍",
        element: "Земля",
        planet: "Меркурий",
      };
    }
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return { name: "Весы", emoji: "♎", element: "Воздух", planet: "Венера" };
    }
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return {
        name: "Скорпион",
        emoji: "♏",
        element: "Вода",
        planet: "Плутон",
      };
    }
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return {
        name: "Стрелец",
        emoji: "♐",
        element: "Огонь",
        planet: "Юпитер",
      };
    }
    return { name: "Неизвестно", emoji: "❓", element: "—", planet: "—" };
  }

  // ===== ОБНОВЛЕНИЕ ШАГОВ =====
  function updateStep(step) {
    steps.forEach((s, i) => {
      s.classList.toggle("active", i === step - 1);
    });

    progressSteps.forEach((ps, i) => {
      ps.classList.toggle("active", i < step);
    });

    progressLines.forEach((pl, i) => {
      pl.classList.toggle("active", i < step - 1);
    });

    if (step === 1) {
      prevBtn.classList.remove("visible");
    } else {
      prevBtn.classList.add("visible");
    }

    if (step === totalSteps) {
      nextBtn.innerHTML =
        '✨ Получить портрет <i class="fas fa-arrow-right"></i>';
    } else {
      nextBtn.innerHTML = 'Далее <i class="fas fa-arrow-right"></i>';
    }

    currentStep = step;
  }

  // ===== СВОДКА =====
  function updateSummary() {
    const name = document.getElementById("userName").value.trim() || "—";
    const date = document.getElementById("userBirthDate").value || "—";
    const place = document.getElementById("userBirthPlace").value.trim() || "—";
    const hasPartner = hasPartnerCheckbox.checked;
    const partnerName = document.getElementById("partnerName").value.trim();

    const summaryName = document.querySelector("#summaryName .summary-value");
    const summaryBirth = document.querySelector("#summaryBirth .summary-value");
    const summaryPlace = document.querySelector("#summaryPlace .summary-value");
    const summaryPartner = document.querySelector(
      "#summaryPartner .summary-value",
    );

    if (summaryName) summaryName.textContent = name;
    if (summaryBirth) summaryBirth.textContent = date;
    if (summaryPlace) summaryPlace.textContent = place;
    if (summaryPartner) {
      summaryPartner.textContent = hasPartner
        ? partnerName || "Указан"
        : "Не указан";
    }
  }

  // ===== ПОКАЗ РЕЗУЛЬТАТА =====
  function showResult(userData, partnerData) {
    console.log("🔮 ПОКАЗЫВАЕМ РЕЗУЛЬТАТ!", userData);

    // Скрываем форму
    if (formWrapper) {
      formWrapper.style.display = "none";
    }

    // Показываем контейнер отчёта
    if (resultBlock) {
      resultBlock.style.display = "block";
    }

    // Рассчитываем все числа
    const lifePath = getLifePathNumber(userData.birthDate);
    const destiny = getDestinyNumber(userData.name);
    const soul = getSoulNumber(userData.name);
    const personality = getPersonalityNumber(userData.name);
    const zodiac = getZodiacSign(userData.birthDate);

    // Формируем полный отчёт
    const reportHTML = `
      <div class="report-container">
        <!-- Шапка -->
        <div class="report-header">
          <h1>✦ КОСМИЧЕСКИЙ ПОРТРЕТ</h1>
          <div class="name">${userData.name}</div>
          <div class="birth-data">${userData.birthDate} • ${userData.birthPlace}</div>
        </div>

        <!-- ЧИСЛОВОЙ КОД -->
        <div class="report-section no-break">
          <h2>✦ ЧИСЛОВОЙ КОД</h2>
          <div class="numbers-grid">
            <div class="number-card">
              <span class="number">${lifePath}</span>
              <span class="label">Жизненный путь</span>
              <span class="desc">${
                lifePath === 1
                  ? "Лидер и Первопроходец"
                  : lifePath === 2
                    ? "Миротворец и Дипломат"
                    : lifePath === 3
                      ? "Творец и Оптимист"
                      : lifePath === 4
                        ? "Строитель и Хранитель"
                        : lifePath === 5
                          ? "Свободный Искатель"
                          : lifePath === 6
                            ? "Заботливый Хранитель"
                            : lifePath === 7
                              ? "Исследователь и Мудрец"
                              : lifePath === 8
                                ? "Стратег и Мастер"
                                : lifePath === 9
                                  ? "Наставник и Гуманист"
                                  : lifePath === 11
                                    ? "Учитель и Вдохновитель"
                                    : lifePath === 22
                                      ? "Мастер-Строитель"
                                      : lifePath === 33
                                        ? "Мастер-Наставник"
                                        : "Уникальная личность"
              }</span>
            </div>
            <div class="number-card">
              <span class="number">${destiny}</span>
              <span class="label">Число судьбы</span>
            </div>
            <div class="number-card">
              <span class="number">${soul}</span>
              <span class="label">Число души</span>
            </div>
            <div class="number-card">
              <span class="number">${personality}</span>
              <span class="label">Число личности</span>
            </div>
          </div>
        </div>

        <!-- АСТРОЛОГИЯ -->
        <div class="report-section no-break">
          <h2>✦ АСТРОЛОГИЧЕСКИЙ ПРОФИЛЬ</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
            <div><span style="font-size: 2.5em;">${zodiac.emoji}</span><br><span style="color: #a8a4c8;">Знак</span><br><strong style="color: #ffd700;">${zodiac.name}</strong></div>
            <div><span style="font-size: 2.5em;">${zodiac.element === "Огонь" ? "🔥" : zodiac.element === "Земля" ? "🌍" : zodiac.element === "Воздух" ? "💨" : "💧"}</span><br><span style="color: #a8a4c8;">Стихия</span><br><strong style="color: #ffd700;">${zodiac.element}</strong></div>
            <div><span style="font-size: 2.5em;">🌌</span><br><span style="color: #a8a4c8;">Управитель</span><br><strong style="color: #ffd700;">${zodiac.planet || "—"}</strong></div>
          </div>
          <div style="margin-top: 10px; text-align: center; color: #a8a4c8;">
            ${
              zodiac.element === "Огонь"
                ? "🔥 Страстный, энергичный, вдохновляющий."
                : zodiac.element === "Земля"
                  ? "🌍 Практичный, надёжный, стабильный."
                  : zodiac.element === "Воздух"
                    ? "💨 Коммуникабельный, интеллектуальный, свободный."
                    : "💧 Эмоциональный, интуитивный, глубокий."
            }
          </div>
        </div>

        <!-- АЮРВЕДА -->
        <div class="report-section no-break">
          <h2>✦ АЮРВЕДИЧЕСКИЙ ПРОФИЛЬ</h2>
          <p style="color: #d0cce8; font-size: 1.1rem;">Ваша конституция — <strong style="color: #ffd700;">Капха</strong></p>
          <p style="color: #a8a4c8;">Водная природа с заботой о других. Вы сердечны и надёжны.</p>
          <div style="margin-top: 15px;">
            <h4 style="color: #ffd700;">🍽 Рекомендации по питанию:</h4>
            <p style="color: #d0cce8;">Лёгкая, тёплая, острая пища. Избегайте сладкого и жирного.</p>
            <h4 style="color: #ffd700;">🧘 Совет по образу жизни:</h4>
            <p style="color: #d0cce8;">Учитесь отдавать и принимать: йога, дыхательные практики.</p>
          </div>
        </div>

        <!-- НАКШАТРА -->
        <div class="report-section no-break">
          <h2>✦ НАКШАТРА</h2>
          <h3 style="color: #ffd700;">Ардра</h3>
          <p style="color: #a8a4c8;">Божество: Рудра (гневный Шива) • Символ: Слеза</p>
          <p style="color: #d0cce8; margin-top: 10px;">Свойства: Трансформация, разрушение и созидание.</p>
          <p style="color: #d0cce8;">Вы — разрушитель старого. Очищайте пространство для нового. Ваша сила — в способности видеть, что отжило своё, и отпускать.</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
            <div style="background: rgba(52, 211, 153, 0.05); padding: 15px; border-radius: 10px; border-left: 3px solid #34d399;">
              <h4 style="color: #34d399;">✅ Сильные стороны</h4>
              <p style="color: #d0cce8;">Способность к трансформации, глубина, сила.</p>
            </div>
            <div style="background: rgba(248, 113, 113, 0.05); padding: 15px; border-radius: 10px; border-left: 3px solid #f87171;">
              <h4 style="color: #f87171;">⚠️ Слабые стороны</h4>
              <p style="color: #d0cce8;">Склонность к гневу, депрессии, саморазрушению.</p>
            </div>
          </div>
        </div>

        <!-- ТЕНИ -->
        <div class="report-section no-break shadow-section">
          <h2>✦ ТЕНИ ЛИЧНОСТИ</h2>
          <p class="shadow-intro" style="color: #a8a4c8; font-style: italic;">
            Этот раздел — не для того, чтобы вас напугать. Он для того, чтобы вы увидели себя честно.
          </p>
          <div class="shadow-item" style="background: rgba(248, 113, 113, 0.05); border: 1px solid rgba(248, 113, 113, 0.1); border-radius: 10px; padding: 15px; margin: 15px 0;">
            <h4 style="color: #f87171;">Ваша тень</h4>
            <p style="color: #d0cce8;">Вы — сильный, глубокий человек. Но эта глубина может стать вашей тюрьмой. Вы боитесь быть слабым — и это отдаляет вас от близких.</p>
          </div>
          <div class="shadow-item warning" style="background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.1); border-radius: 10px; padding: 15px; margin: 10px 0;">
            <h4 style="color: #fbbf24;">Как это проявляется</h4>
            <p style="color: #d0cce8;">Вы замыкаетесь, не доверяете миру, берёте на себя слишком много, но не просите о помощи.</p>
          </div>
          <div class="recommendations" style="background: rgba(52, 211, 153, 0.05); border-left: 3px solid #34d399; padding: 15px; border-radius: 8px; margin-top: 10px;">
            <h4 style="color: #34d399;">Путь трансформации</h4>
            <p style="color: #d0cce8;">Учитесь доверять. Разрешите себе быть не только сильным, но и уязвимым. Это — не слабость. Это — мудрость.</p>
          </div>
        </div>

        <!-- ТАЛАНТЫ -->
        <div class="report-section no-break">
          <h2>✦ ВАШИ ТАЛАНТЫ</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 10px;">
            <div style="background: rgba(255,215,0,0.03); border: 1px solid rgba(255,215,0,0.05); border-radius: 10px; padding: 15px; text-align: center;">
              <div style="font-size: 2em;">🔄</div>
              <h4 style="color: #ffd700; margin: 10px 0 5px;">Трансформатор</h4>
              <p style="color: #d0cce8; font-size: 0.9rem;">Вы умеете разрушать старое и создавать новое.</p>
            </div>
            <div style="background: rgba(255,215,0,0.03); border: 1px solid rgba(255,215,0,0.05); border-radius: 10px; padding: 15px; text-align: center;">
              <div style="font-size: 2em;">🧠</div>
              <h4 style="color: #ffd700; margin: 10px 0 5px;">Интуит</h4>
              <p style="color: #d0cce8; font-size: 0.9rem;">Вы чувствуете людей и ситуации на глубине.</p>
            </div>
            <div style="background: rgba(255,215,0,0.03); border: 1px solid rgba(255,215,0,0.05); border-radius: 10px; padding: 15px; text-align: center;">
              <div style="font-size: 2em;">🛡️</div>
              <h4 style="color: #ffd700; margin: 10px 0 5px;">Защитник</h4>
              <p style="color: #d0cce8; font-size: 0.9rem;">Вы — опора для тех, кто рядом.</p>
            </div>
          </div>
        </div>

        <!-- ПРИЗВАНИЕ И ПРОФЕССИЯ -->
        <div class="report-section no-break">
          <h2>✦ ПРИЗВАНИЕ И ПРОФЕССИЯ</h2>
          <p style="color: #d0cce8; font-size: 1.05rem; line-height: 1.6;">
            <strong style="color: #ffd700;">Ваше призвание — служить.</strong> Не в смысле «быть прислугой», а в смысле «быть опорой». Вы можете быть учителем, наставником, врачом, психологом, священником, социальным работником. Ваша профессия должна давать вам возможность помогать, вдохновлять, исцелять. Если ваша работа не приносит пользы другим — вы будете чувствовать пустоту. Если приносит — вы будете наполнены смыслом.
          </p>
          <div style="margin-top: 15px; background: rgba(255,215,0,0.03); border-radius: 10px; padding: 15px; border-left: 3px solid #ffd700;">
            <p style="color: #ffd700; font-weight: 600;">✨ Ваш путь:</p>
            <p style="color: #d0cce8;">«Не искать славы, а служить. И в этом служении найти себя.»</p>
          </div>
        </div>

         // === ИТОГОВЫЙ РАЗДЕЛ ===
         
         <div class="report-section no-break conclusion-section">
              <h2>✦ ИТОГ</h2>
              <p><strong>Светолада — не предсказание. Это — зеркало.</strong></p>
              <p>Ты посмотрел(а) на себя через 5 систем. Увидел(а) свой дар, свои тени, свой путь. Это — не приговор. Это — возможность увидеть, куда идти.</p>
              <p style='font-style: italic; color: #ffd700; margin-top: 15px;'>
                  &laquo;Ты уже есть. Остальное — просто дорога.&raquo;
              </p>
              <div style='margin-top: 20px; padding: 15px; background: rgba(255,215,0,0.03); border-left: 2px solid #ffd700; border-radius: 8px;'>
                  <p style='font-size: 0.9rem; color: #a8a4c8;'>
                      Проект создан <strong>Людмилой и ИИ DeepSeek</strong>, 2026
                  </p>
              </div>
         </div>
       `;

    document.getElementById("reportInner").innerHTML = reportHTML;
    document.getElementById("reportContent").style.display = "block";

    // Вставляем отчёт в контейнер
    if (resultContent) {
      resultContent.innerHTML = reportHTML;
    }

    // Показываем контейнер отчёта
    if (resultBlock) {
      resultBlock.style.display = "block";
    }

    // Прокручиваем к отчёту
    setTimeout(function () {
      if (resultBlock) {
        resultBlock.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);

    console.log("✅ ПОЛНЫЙ ОТЧЁТ ПОКАЗАН!");
  }

  // ===== АВТООБНОВЛЕНИЕ =====
  document.querySelectorAll("#mainForm input").forEach(function (input) {
    input.addEventListener("input", updateSummary);
    input.addEventListener("change", updateSummary);
  });

  // ===== КНОПКА "ДАЛЕЕ" =====
  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (currentStep === 1) {
      const name = document.getElementById("userName").value.trim();
      const date = document.getElementById("userBirthDate").value;
      const place = document.getElementById("userBirthPlace").value.trim();

      if (!name || !date || !place) {
        alert("Пожалуйста, заполните имя, дату и место рождения!");
        return;
      }
    }

    if (currentStep === 2) {
      const hasPartner = hasPartnerCheckbox.checked;
      if (hasPartner) {
        const pName = document.getElementById("partnerName").value.trim();
        const pDate = document.getElementById("partnerBirthDate").value;
        if (!pName || !pDate) {
          alert("Заполните имя и дату рождения партнёра!");
          return;
        }
      }
    }

    if (currentStep < totalSteps) {
      updateStep(currentStep + 1);
      updateSummary();
    } else {
      // === ПОКАЗ РЕЗУЛЬТАТА С ЗАЩИТОЙ ОТ ПОВТОРНЫХ НАЖАТИЙ ===

      // 1. Блокируем кнопку
      const btn = nextBtn;
      btn.disabled = true;
      btn.innerHTML =
        '⏳ Идёт расчёт... <i class="fas fa-spinner fa-spin"></i>';
      btn.style.opacity = "0.6";
      btn.style.cursor = "not-allowed";

      // 2. Собираем данные
      const userData = {
        name: document.getElementById("userName").value.trim(),
        birthDate: document.getElementById("userBirthDate").value,
        birthTime: document.getElementById("userBirthTime").value || "12:00",
        birthPlace: document.getElementById("userBirthPlace").value.trim(),
      };

      let partnerData = null;
      if (hasPartnerCheckbox.checked) {
        partnerData = {
          name: document.getElementById("partnerName").value.trim(),
          birthDate: document.getElementById("partnerBirthDate").value,
          birthTime:
            document.getElementById("partnerBirthTime").value || "12:00",
          birthPlace: document.getElementById("partnerBirthPlace").value.trim(),
        };
      }

      console.log("🚀 Отправка данных:", { userData, partnerData });

      // 3. Показываем оверлей загрузки
      if (loadingOverlay) {
        loadingOverlay.classList.add("active");
      }

      // 4. Этапы для прогресса
      const steps = [
        "🔮 Анализируем числа...",
        "🌙 Вычисляем астрологию...",
        "🌀 Просчитываем карму...",
        "🌿 Определяем конституцию...",
        "📄 Формируем отчёт...",
      ];
      let stepIndex = 0;
      const progressSteps = document.getElementById("progressSteps");

      if (progressSteps) {
        progressSteps.textContent = steps[0];
      }

      const progressInterval = setInterval(function () {
        stepIndex++;
        if (progressSteps && stepIndex < steps.length) {
          progressSteps.textContent = steps[stepIndex];
        }

        if (stepIndex >= steps.length) {
          clearInterval(progressInterval);
          setTimeout(function () {
            // Разблокируем кнопку
            btn.disabled = false;
            btn.innerHTML =
              '✨ Получить портрет <i class="fas fa-arrow-right"></i>';
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";

            if (loadingOverlay) {
              loadingOverlay.classList.remove("active");
            }
            localStorage.setItem(
              "cosmicReport",
              JSON.stringify({ user: userData, partner: partnerData }),
            );
            window.location.href = "result.html";
          }, 400);
        }
      }, 500);
    }
  }); // ← Закрытие nextBtn.addEventListener

  // ===== КНОПКА "НАЗАД" =====
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentStep > 1) {
      updateStep(currentStep - 1);
    }
  });

  // ===== ТОГГЛ ПАРТНЁРА =====
  if (hasPartnerCheckbox) {
    hasPartnerCheckbox.addEventListener("change", function () {
      partnerFields.style.display = this.checked ? "block" : "none";
      updateSummary();
    });
  }

  // ===== СТАРТ =====
  updateStep(1);
  updateSummary();

  // ===== НОВАЯ ЛОГИКА ДЛЯ КНОПКИ =====
  const generateBtn = document.getElementById("generateBtn");
  const btnText = document.getElementById("btnText");
  let isProcessing = false;

  if (generateBtn) {
    generateBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (isProcessing) return; // Защита от повторных нажатий

      // Проверяем, заполнены ли поля
      const name = document.getElementById("userName").value.trim();
      const date = document.getElementById("userBirthDate").value;
      const place = document.getElementById("userBirthPlace").value.trim();

      if (!name || !date || !place) {
        alert("Пожалуйста, заполните все обязательные поля!");
        return;
      }

      // Запускаем процесс
      isProcessing = true;
      generateBtn.disabled = true;
      btnText.innerHTML =
        '⏳ Подготовка отчёта... <i class="fas fa-spinner fa-spin"></i>';
      generateBtn.style.opacity = "0.7";

      // Собираем данные
      const userData = {
        name: name,
        birthDate: date,
        birthTime: document.getElementById("userBirthTime").value || "12:00",
        birthPlace: place,
      };

      let partnerData = null;
      if (hasPartnerCheckbox.checked) {
        partnerData = {
          name: document.getElementById("partnerName").value.trim(),
          birthDate: document.getElementById("partnerBirthDate").value,
          birthTime:
            document.getElementById("partnerBirthTime").value || "12:00",
          birthPlace: document.getElementById("partnerBirthPlace").value.trim(),
        };
      }

      // Сохраняем в localStorage
      localStorage.setItem(
        "cosmicReport",
        JSON.stringify({ user: userData, partner: partnerData }),
      );

      // Имитация подготовки
      setTimeout(function () {
        // Меняем текст кнопки
        btnText.innerHTML = "✨ Портрет готов! Нажмите, чтобы увидеть";
        generateBtn.style.opacity = "1";
        generateBtn.style.borderColor = "#ffd700";

        // После нажатия — переход на result.html
        generateBtn.onclick = function () {
          window.location.href = "result.html";
        };

        isProcessing = false;
        generateBtn.disabled = false;

        // Добавляем подсветку
        generateBtn.style.boxShadow = "0 0 40px rgba(255, 215, 0, 0.3)";

        console.log(
          "✅ Отчёт подготовлен! Нажмите кнопку, чтобы увидеть портрет.",
        );
      }, 2000); // 2 секунды на подготовку
    });
  }

  console.log("🌟 Cosmic Portrait запущен! (v7 - с астрологией)");
}); // ← Закрытие DOMContentLoaded

// ============================================================
// УТРЕННЯЯ ПРАКТИКА (по знаку Зодиака)
// ============================================================

// Проверяем, есть ли элементы утренней практики на странице
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("zodiacSelect");
  const btn = document.getElementById("newIntentBtn");

  // Если селекта нет — выходим (значит, мы не на странице утренней практики)
  if (!select) return;

  // Функция для получения намерения
  function getZodiacIntent(signName) {
    const intents = zodiacIntents[signName] || zodiacIntents["Овен"];
    return intents[Math.floor(Math.random() * intents.length)];
  }

  function updateMorningIntent(sign) {
    const intentEl = document.getElementById("intentText");
    if (!intentEl) return;

    if (!sign) {
      intentEl.textContent = "✨ Выберите свой знак, чтобы получить намерение";
      return;
    }

    const intent = getZodiacIntent(sign);
    intentEl.textContent = `✨ ${intent}`;
  }

  const savedSign = localStorage.getItem("zodiacSign");

  if (savedSign) {
    select.value = savedSign;
  }

  updateMorningIntent(savedSign);

  // Смена знака
  select.addEventListener("change", function () {
    const sign = this.value;
    localStorage.setItem("zodiacSign", sign);
    updateMorningIntent(sign);
  });

  // Кнопка "Другое намерение"
  if (btn) {
    btn.addEventListener("click", function () {
      const sign = select.value;
      if (sign) {
        const intentEl = document.getElementById("intentText");
        if (intentEl) {
          intentEl.style.opacity = "0.5";
          setTimeout(() => {
            updateMorningIntent(sign);
            intentEl.style.opacity = "1";
          }, 200);
        }
      }
    });
  }
});

// БАЗА НАМЕРЕНИЙ (10 на каждый знак)
const zodiacIntents = {
  Овен: [
    "Сегодня — день для смелых шагов. Твоя сила — в действии.",
    "Не бойся быть первым. Ты создан для того, чтобы начинать.",
    "Твой огонь может согреть или обжечь. Направляй его с мудростью.",
    "Ты — лидер. Но лидерство начинается с умения слушать себя.",
    "Сегодня твой энтузиазм — твой главный ресурс. Используй его с умом.",
    "Ты можешь всё. Но не всё сразу. Выбери одно и сделай его хорошо.",
    "Будь смелым, но не безрассудным. Разница — в паузе.",
    "Ты — тот, кто зажигает других. Убедись, что твой огонь не гаснет.",
    "Сегодня — день действовать, но не торопиться. Один шаг — и ты уже в пути.",
    "Ты — первопроходец. Но даже первопроходцы берут с собой карту.",
  ],
  Телец: [
    "Сегодня — день стабильности. Найди радость в том, что у тебя есть.",
    "Твоя сила — в терпении. Не торопись.",
    "Сделай что-то, что принесёт тебе покой и уют.",
    "Ты — опора. Но опора начинается с заботы о себе.",
    "Сегодня — день маленьких радостей. Заметь их.",
    "Твоя надёжность — это дар. Но не забывай, что ты тоже имеешь право на отдых.",
    "Стабильность — это не скука. Это фундамент для роста.",
    "Ты умеешь ждать. Но иногда ждать — значит упускать. Действуй мягко.",
    "Сегодня — день простых удовольствий. Ты заслуживаешь их.",
    "Ты — как дерево с глубокими корнями. Но даже дерево тянется к свету.",
  ],
  Близнецы: [
    "Сегодня — день общения. Скажи кому-то то, что давно хотел.",
    "Выбери одну мысль и оставайся с ней подольше.",
    "Позволь себе быть любопытным, но не разбрасывайся.",
    "Ты — мост между людьми. Сегодня твой голос может изменить чей-то день.",
    "Твой ум — твой главный инструмент. Но иногда лучшее решение — это пауза.",
    "Сегодня — день слушать, а не говорить. Ты узнаешь много нового.",
    "Ты — тот, кто видит много путей. Выбери один на сегодня.",
    "Твоя лёгкость — это дар. Но иногда глубина важнее скорости.",
    "Сегодня — день, чтобы задать один важный вопрос. И услышать ответ.",
    "Ты — как ветер. Но даже ветер иногда останавливается, чтобы почувствовать землю.",
  ],
  Рак: [
    "Сегодня — день заботы о себе. Ты имеешь право на отдых.",
    "Твоя чувствительность — это дар. Прими его.",
    "Твоя глубина — это твоя сила, а не слабость.",
    "Позволь себе быть нежным с собой. Ты этого заслуживаешь.",
    "Ты — как море. Спокойное снаружи, но глубокое внутри.",
    "Сегодня — день, чтобы сказать себе: «Я справлюсь».",
    "Твоя забота о других — это красиво. Но помни: ты тоже нуждаешься в заботе.",
    "Сегодня — день доверия. Доверься своему сердцу.",
    "Ты — хранительница тепла. Но чтобы согревать других, нужно быть в тепле самой.",
    "Твоя интуиция — твой компас. Сегодня она ведёт тебя.",
  ],
  Лев: [
    "Сегодня — день быть собой. Не бойся светить.",
    "Ты — не просто лидер, ты — вдохновение.",
    "Будь щедрым на доброту, но не требуй аплодисментов.",
    "Твой свет нужен миру. Но не забывай, что ты — тоже часть этого мира.",
    "Сегодня — день, чтобы заметить, как ты вдохновляешь других.",
    "Ты — как солнце. Даже когда за облаками, ты всё равно светишь.",
    "Твоя харизма — это дар. Используй его, чтобы поднимать других.",
    "Сегодня — день смелости быть уязвимым. Это не слабость, это сила.",
    "Ты — лидер, но лидерство — это не одиночество. Позволь другим быть рядом.",
    "Твой свет не требует доказательств. Просто будь.",
  ],
  Дева: [
    "Сегодня — день заботы о теле. Сделай маленькое доброе дело для себя.",
    "Совершенство — в принятии несовершенства.",
    "Порядок начинается с тишины внутри.",
    "Ты не должен быть идеальным. Ты должен быть настоящим.",
    "Сегодня — день, чтобы отпустить контроль над тем, что не подвластно тебе.",
    "Ты — как садовник. Заботься о себе, как о самом важном растении.",
    "Твоя внимательность — это дар. Но иногда лучше видеть общую картину.",
    "Сегодня — день, чтобы сказать себе: «Я делаю достаточно».",
    "Порядок — это хорошо. Но жизнь — это не только порядок.",
    "Ты — тот, кто делает мир лучше. Начни с малого, но начни.",
  ],
  Весы: [
    "Сегодня — день гармонии. Найди баланс между давать и брать.",
    "Твоя красота — в твоей доброте.",
    "Выбери мир, даже если хочется спорить.",
    "Ты — тот, кто создаёт гармонию вокруг. Начни с себя.",
    "Сегодня — день, чтобы услышать обе стороны.",
    "Ты — как чаша весов. Иногда достаточно просто быть в равновесии.",
    "Твоя дипломатичность — это дар. Используй его, чтобы объединять.",
    "Сегодня — день красоты. Найди её в себе и вокруг.",
    "Гармония — это не отсутствие конфликтов, а умение их разрешать.",
    "Ты — тот, кто видит обе стороны. Но не забывай про свою.",
  ],
  Скорпион: [
    "Сегодня — день глубины. Не бойся чувствовать.",
    "Твоя сила — в способности трансформироваться.",
    "Иногда отпустить — это не слабость, а мудрость.",
    "Ты способен на большее, чем думаешь. Просто доверься себе.",
    "Сегодня — день, чтобы заглянуть в себя и увидеть истину.",
    "Ты — как феникс. Каждый раз ты восстаёшь сильнее.",
    "Твоя страсть — это дар. Направляй её в созидание.",
    "Сегодня — день, чтобы простить себя и других.",
    "Твоя глубина — это твоя сила. Не бойся её.",
    "Ты — тот, кто видит то, что скрыто. Используй это с мудростью.",
  ],
  Стрелец: [
    "Сегодня — день искать смысл. Пусть твой взгляд будет устремлён вперёд.",
    "Оптимизм — это твой компас.",
    "Не бойся искать приключения, но не забывай возвращаться.",
    "Ты — тот, кто видит горизонт. Напомни другим, что он существует.",
    "Сегодня — день, чтобы сделать шаг в неизведанное.",
    "Ты — как стрела. Твоя цель важна, но и сам полёт — тоже.",
    "Твоя свобода — это дар. Но свобода начинается с ответственности.",
    "Сегодня — день, чтобы верить в лучшее. Это не наивность, это сила.",
    "Ты — искатель. Но иногда то, что ты ищешь, уже есть внутри.",
    "Твой оптимизм заражает. Используй его, чтобы поднимать других.",
  ],
  Козерог: [
    "Сегодня — день ответственности. Но помни, что ты не один.",
    "Твоя дисциплина — это твой путь к свободе.",
    "Будь строгим к себе, но добрым к другим.",
    "Ты строишь не только карьеру, но и свою жизнь. Дай себе время.",
    "Сегодня — день, чтобы увидеть, как далеко ты уже пришёл.",
    "Ты — как скала. Твоя устойчивость — это твоя сила.",
    "Твоя целеустремлённость — это дар. Но иногда цель — это путь, а не точка.",
    "Сегодня — день, чтобы довериться процессу.",
    "Ты — тот, кто достигает высот. Но не забывай наслаждаться видом.",
    "Твоя дисциплина — это не наказание, а забота о себе.",
  ],
  Водолей: [
    "Сегодня — день твоей уникальности. Не бойся быть другим.",
    "Твоя свобода — это твой дар. Делитесь им.",
    "Смотри в будущее, но живи настоящим.",
    "Ты — тот, кто видит то, чего не видят другие. Доверяй своему видению.",
    "Сегодня — день, чтобы предложить миру что-то новое.",
    "Ты — как ветер перемен. Но перемены начинаются с тебя.",
    "Твоя оригинальность — это дар. Не прячь её.",
    "Сегодня — день, чтобы соединить несоединимое.",
    "Ты — тот, кто идёт своим путём. Это твоя сила.",
    "Твоя свобода не требует доказательств. Просто будь.",
  ],
  Рыбы: [
    "Сегодня — день слушать своё сердце. Оно знает путь.",
    "Твоя глубина — это твоя сила.",
    "Мечтай смело, но делай маленькие шаги.",
    "Ты — проводник между мирами. Напомни себе, что мир начинается с тебя.",
    "Сегодня — день, чтобы довериться потоку.",
    "Ты — как океан. Твоя глубина — это твоя сила.",
    "Твоя интуиция — это дар. Следуй за ней.",
    "Сегодня — день, чтобы отпустить страх и плыть по течению.",
    "Ты — тот, кто чувствует больше других. Это не слабость, это дар.",
    "Твоя мечта — это компас. Следуй за ней.",
  ],
};
