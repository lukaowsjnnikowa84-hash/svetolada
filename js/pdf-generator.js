// js/pdf-generator.js

/**
 * ГЕНЕРАЦИЯ PDF-ОТЧЁТА
 * Использует html2canvas + jsPDF
 * С поддержкой умной разбивки на страницы
 */

class PDFGenerator {
  constructor() {
    this.html2canvas = window.html2canvas;
    this.jspdf = window.jspdf;
  }

  /**
   * Генерация PDF из HTML-элемента
   */
  async generatePDF(
    element,
    filename = "космический_портрет.pdf",
    options = {},
  ) {
    const el =
      typeof element === "string" ? document.getElementById(element) : element;

    if (!el) {
      console.error("❌ Элемент для PDF не найден");
      return;
    }

    const defaultOptions = {
      margin: [15, 15, 15, 15],
      scale: 2,
      quality: 0.95,
      format: "a4",
      orientation: "portrait",
      ...options,
    };

    try {
      this.showLoading();

      // Клонируем контент
      const content = el.cloneNode(true);

      // Добавляем стили
      const style = document.createElement("style");
      style.textContent = this.getPDFStyles();
      content.prepend(style);

      // Вставляем в контейнер для рендера
      const container = document.createElement("div");
      container.style.cssText = `
                position: fixed;
                left: -9999px;
                top: 0;
                width: ${this.getPDFWidth(defaultOptions)}px;
                background: #0a0a1a;
                padding: 40px;
                z-index: -1;
            `;
      container.appendChild(content);
      document.body.appendChild(container);

      // Ждём рендеринга
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Собираем страницы с учётом разбивки
      const pages = await this.renderPages(container, defaultOptions);

      // Создаём PDF
      const pdf = await this.createPDF(pages, defaultOptions);

      pdf.save(filename);

      document.body.removeChild(container);
      this.hideLoading();

      return pdf;
    } catch (error) {
      console.error("❌ Ошибка генерации PDF:", error);
      this.hideLoading();
      alert("Произошла ошибка при генерации PDF. Попробуйте ещё раз.");
      throw error;
    }
  }

  /**
   * Рендеринг страниц с умной разбивкой
   */
  async renderPages(container, options) {
    const pages = [];
    const pageHeight = this.getPDFHeight(options);
    const marginTop = options.margin[0] || 15;
    const marginBottom = options.margin[2] || 15;
    const usableHeight = pageHeight - marginTop - marginBottom;

    const totalHeight = container.scrollHeight;
    const breakPoints = this.getSmartBreakPoints(container, usableHeight);

    for (let i = 0; i < breakPoints.length; i++) {
      const start = breakPoints[i];
      const end = i < breakPoints.length - 1 ? breakPoints[i + 1] : totalHeight;

      const clone = container.cloneNode(true);
      clone.style.cssText = `
                position: fixed;
                left: -9999px;
                top: 0;
                width: ${this.getPDFWidth(options)}px;
                background: #0a0a1a;
                padding: 40px;
                z-index: -1;
                clip-path: inset(${start}px 0 ${totalHeight - end}px 0);
            `;
      document.body.appendChild(clone);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await this.html2canvas(clone, {
        scale: options.scale,
        useCORS: true,
        logging: false,
        backgroundColor: "#0a0a1a",
        width: this.getPDFWidth(options),
        height: end - start,
      });

      document.body.removeChild(clone);
      pages.push(canvas);
    }

    return pages;
  }

  /**
   * Умный расчёт разбивки на страницы
   * Не рвёт блоки с классом .no-break
   */
  getSmartBreakPoints(container, usableHeight) {
    const points = [0];
    let currentY = 0;
    const totalHeight = container.scrollHeight;

    // Находим все блоки, которые нельзя рвать
    const noBreakEls = container.querySelectorAll(".no-break");
    const blocks = [];

    noBreakEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const y = rect.top - containerRect.top + container.scrollTop;
      const height = rect.height;
      blocks.push({ y, height, el });
    });

    // Сортируем по y
    blocks.sort((a, b) => a.y - b.y);

    while (currentY + usableHeight < totalHeight) {
      const nextY = currentY + usableHeight;

      // Проверяем, не попадает ли разрыв внутрь no-break блока
      let conflict = false;
      let newBreak = nextY;

      for (const block of blocks) {
        const blockStart = block.y;
        const blockEnd = block.y + block.height;

        // Если разрыв внутри блока
        if (blockStart < nextY && blockEnd > nextY) {
          conflict = true;
          // Переносим разрыв после блока
          newBreak = blockEnd + 15; // + небольшой отступ
          break;
        }
      }

      // Если конфликт был, проверяем, не влезает ли новый разрыв в другой блок
      if (conflict) {
        for (const block of blocks) {
          const blockStart = block.y;
          const blockEnd = block.y + block.height;
          if (blockStart < newBreak && blockEnd > newBreak) {
            newBreak = blockEnd + 15;
          }
        }
      }

      // Если разрыв выходит за пределы — ставим последнюю точку
      if (newBreak >= totalHeight) {
        points.push(totalHeight);
        break;
      }

      points.push(newBreak);
      currentY = newBreak;
    }

    // Добавляем финальную точку, если её нет
    if (points[points.length - 1] < totalHeight) {
      points.push(totalHeight);
    }

    return points;
  }

  /**
   * Создание PDF из изображений
   */
  async createPDF(pages, options) {
    const { jsPDF } = this.jspdf;
    const pdf = new jsPDF({
      unit: "mm",
      format: options.format,
      orientation: options.orientation,
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginTop = options.margin[0] || 15;

    for (let i = 0; i < pages.length; i++) {
      const canvas = pages[i];
      const imgData = canvas.toDataURL("image/jpeg", options.quality);

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;

      let drawWidth = pageWidth - marginTop * 2;
      let drawHeight = drawWidth / ratio;

      if (drawHeight > pageHeight - marginTop * 2) {
        drawHeight = pageHeight - marginTop * 2;
        drawWidth = drawHeight * ratio;
      }

      const x = (pageWidth - drawWidth) / 2;
      const y = marginTop;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "JPEG", x, y, drawWidth, drawHeight);
    }

    return pdf;
  }

  /**
   * Получение ширины PDF в пикселях
   */
  getPDFWidth(options) {
    const sizes = {
      a4: { portrait: 595, landscape: 842 },
      a3: { portrait: 842, landscape: 1191 },
      letter: { portrait: 612, landscape: 792 },
    };
    const size = sizes[options.format] || sizes.a4;
    return size[options.orientation] || size.portrait;
  }

  /**
   * Получение высоты PDF в пикселях
   */
  getPDFHeight(options) {
    const sizes = {
      a4: { portrait: 842, landscape: 595 },
      a3: { portrait: 1191, landscape: 842 },
      letter: { portrait: 792, landscape: 612 },
    };
    const size = sizes[options.format] || sizes.a4;
    return size[options.orientation] || size.portrait;
  }

  /**
   * Стили для PDF
   */
  getPDFStyles() {
    return `
            body {
                background: #0a0a1a;
                color: #f0eef8;
                font-family: 'Inter', -apple-system, sans-serif;
                padding: 40px;
            }
            .report-container { max-width: 100%; }

            /* Заголовки */
            .report-header {
                text-align: center;
                padding: 40px 0 30px;
                border-bottom: 1px solid rgba(255, 215, 0, 0.1);
                margin-bottom: 30px;
            }
            .report-header h1 {
                font-family: 'Playfair Display', serif;
                font-size: 2.5em;
                background: linear-gradient(90deg, #f7971e, #ffd200);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 10px;
            }
            .report-header .name {
                font-size: 1.5em;
                color: #ffd700;
                font-weight: 600;
            }
            .report-header .birth-data {
                color: #a8a4c8;
                font-size: 0.9em;
            }

            /* Секции */
            .report-section {
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.03);
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 25px;
            }
            .report-section h2 {
                font-family: 'Playfair Display', serif;
                font-size: 1.4em;
                color: #ffd700;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(255, 215, 0, 0.1);
            }
            .report-section h3 {
                color: #f0eef8;
                font-size: 1.1em;
                margin: 15px 0 10px;
            }
            .report-section p {
                color: #d0cce8;
                line-height: 1.6;
                margin-bottom: 8px;
            }

            /* Блоки, которые нельзя рвать */
            .no-break {
                page-break-inside: avoid;
                break-inside: avoid;
            }

            /* Принудительный разрыв страницы */
            .page-break {
                page-break-after: always;
                break-after: page;
            }

            /* Сетки */
            .numbers-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            .number-card {
                background: rgba(255, 215, 0, 0.03);
                border: 1px solid rgba(255, 215, 0, 0.05);
                border-radius: 10px;
                padding: 15px;
                text-align: center;
            }
            .number-card .number {
                font-size: 2em;
                font-weight: bold;
                color: #ffd700;
                display: block;
            }
            .number-card .label {
                font-size: 0.75em;
                color: #a8a4c8;
            }
            .number-card .desc {
                font-size: 0.8em;
                color: #d0cce8;
                margin-top: 5px;
            }

            /* Кармическая секция */
            .karma-section {
                border-color: rgba(139, 92, 246, 0.2);
            }
            .karma-section h2 {
                color: #8b5cf6;
                border-bottom-color: rgba(139, 92, 246, 0.2);
            }
            .karma-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 15px 0;
            }
            .karma-node {
                background: rgba(255, 255, 255, 0.02);
                border-radius: 10px;
                padding: 15px;
                border-left: 3px solid;
            }
            .karma-node.south {
                border-left-color: #f87171;
            }
            .karma-node.north {
                border-left-color: #34d399;
            }
            .karma-node h4 {
                color: #ffd700;
                margin-bottom: 8px;
            }

            /* Тени */
            .shadow-section {
                border-color: rgba(248, 113, 113, 0.15);
            }
            .shadow-section h2 {
                color: #f87171;
                border-bottom-color: rgba(248, 113, 113, 0.15);
            }
            .shadow-item {
                padding: 15px;
                border-radius: 10px;
                background: rgba(248, 113, 113, 0.05);
                border: 1px solid rgba(248, 113, 113, 0.1);
                margin-bottom: 10px;
            }
            .shadow-item h4 {
                color: #f87171;
            }

            /* Подвал */
            .footer {
                text-align: center;
                padding: 30px 0 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.03);
                margin-top: 30px;
                color: #6a6690;
                font-size: 0.8em;
            }

            @media print {
                .report-section {
                    page-break-inside: avoid;
                }
                .no-break {
                    page-break-inside: avoid;
                }
            }
        `;
  }

  showLoading() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.classList.add("active");
  }

  hideLoading() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.classList.remove("active");
  }
}

export { PDFGenerator };

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  const pdfGenerator = new PDFGenerator();
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async function () {
      await pdfGenerator.generatePDF(
        "reportContent",
        "космический_портрет.pdf",
      );
    });
  }
  window.pdfGenerator = pdfGenerator;
});
