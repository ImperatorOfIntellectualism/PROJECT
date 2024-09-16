import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const swiper = new Swiper('.mySwiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    modules: [Navigation],
});

const slideARR: string[] = [
    `<div class="slideShow"><span class="slideTitle">Title1</span><span class="slideText">Text1</span></div>`,
    `<div class="slideShow"><span class="slideTitle">Title2</span><span class="slideText">Text2</span></div>`,
    `<div class="slideShow"><span class="slideTitle">Title3</span><span class="slideText">Text3</span></div>`
];

const DATEARR: [number, number][] = [[1990, 1994], [1995, 1999], [2000, 2004], [2005, 2009], [2010, 2014], [2015, 2019]];
const descARR: string[] = ["Кино", "Литература", "Спорт", "Политика", "История", "Наука"];

for (let i = 1; i <= 6; i++) {
    const element = document.getElementById(`slide${i}`);
    if (element) {
        element.innerHTML = slideARR[(i - 1) % 3];
    }
}

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
    const centerX = canvas.width / 2; // Центр по X
    const centerY = canvas.height / 2; // Центр по Y
    const radius = 130; // Радиус главного круга
    const smallCircleRadius = 25; // Радиус маленьких кругов
    const numberOfCircles = 6; // Количество маленьких кругов

    const totalNElement = document.getElementById("totalN");
    if (totalNElement) {
        totalNElement.innerHTML = numberOfCircles.toString();
    }

    let angleOffset = 0; // угол вращения
    let spinning = false; // Флаг для вращения
    let multiplier = 0;
    let current = 0;

    const currentNElement = document.getElementById("currentN");
    if (currentNElement) {
        currentNElement.innerHTML = (current + 1).toString();
    }

    // Функция для рисования круга
    function drawCircle(x: number, y: number, radius: number, color: string, outer: string, chosen: boolean): void {
        ctx.beginPath();
        if (chosen) {
            radius = 3;
            color = "black";
        }
        ctx.arc(x, y, radius, 0, Math.PI * 2); // Рисуем круг
        ctx.fillStyle = color; // Устанавливаем цвет заливки
        ctx.strokeStyle = outer; // Устанавливаем цвет заливки
        ctx.fill(); // Заливаем круг
        ctx.stroke();
        ctx.closePath();
    }

    function drawText(x: number, y: number, text: number): void {
        ctx.fillStyle = '#4f4f4f'; // Цвет текста
        ctx.font = '20px PT Sans'; // Шрифт текста
        ctx.textAlign = 'center'; // Центрирование текста
        ctx.textBaseline = 'middle'; // Вертикальное центрирование текста
        ctx.fillText((text + 1).toString(), x, y); // Рисуем текст
        ctx.fillStyle = 'black'; // Цвет текста
        ctx.font = 'bold 20px PT Sans'; // Шрифт текста
        ctx.textAlign = 'left'; // Выравнивание текста по левому краю
        ctx.fillText(descARR[text], x + 30, y); // Отображаем "Hello World" справа от круга
    }

    const left = (): void => {
        if (spinning) return;
        multiplier = 1;
        spinning = true;
        if (current === 0) {
            current = numberOfCircles - 1;
            changeText(current);
            changeSlides(current);
        } else {
            current = current - 1;
            changeText(current);
            changeSlides(current);
        }
        drawText(0, 0, current);
        if (currentNElement) {
            currentNElement.innerHTML = (current + 1).toString();
        }
    };

    const right = (): void => {
        if (spinning) return;
        multiplier = numberOfCircles - 1;
        spinning = true;
        if (current === numberOfCircles - 1) {
            current = 0;
            changeText(current);
            changeSlides(current);
        }
        // ... rest of the function
    };

    // ... rest of the code
}

