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

  });


  const slideARR = [`<div class="slideShow"><span class="slideTitle">1990</span><span class="slideText">Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11</span></div>`, `<div class="slideShow"><span class="slideTitle">1991</span><span class="slideText">13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды</span></div>`, `<div class="slideShow"><span class="slideTitle">1992</span><span class="slideText">Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi</span></div>`]
  const DATEARR = [[1990, 1994],[1995, 1999],[2000, 2004],[2005, 2009],[2010, 2014],[2015, 2019]]
  const descARR = ["Кино", "Литература", "Спорт", "Политика", "История", "Наука"]

  document.getElementById("slide1").innerHTML = slideARR[0]
  document.getElementById("slide2").innerHTML = slideARR[1]
  document.getElementById("slide3").innerHTML = slideARR[2]
  document.getElementById("slide4").innerHTML = slideARR[0]
  document.getElementById("slide5").innerHTML = slideARR[1]
  document.getElementById("slide6").innerHTML = slideARR[2]

  const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        const centerX = canvas.width / 2; // Центр по X
        const centerY = canvas.height / 2; // Центр по Y
        const radius = 130; // Радиус главного круга
        const smallCircleRadius = 25; // Радиус маленьких кругов
        const numberOfCircles = 6; // Количество маленьких кругов
        document.getElementById("totalN").innerHTML = numberOfCircles
        let angleOffset = 0; // угол вращения
        let spinning = false; // Флаг для вращения
        let multiplier = 0;
        let current = 0
        document.getElementById("currentN").innerHTML = current + 1

        // Функция для рисования круга
        function drawCircle(x, y, radius, color, outer, chosen) {
            ctx.beginPath();
            if(chosen){
                radius = 3
                color = "black"
            }
            ctx.arc(x, y, radius, 0, Math.PI * 2); // Рисуем круг
            ctx.fillStyle = color; // Устанавливаем цвет заливки
            ctx.strokeStyle = outer; // Устанавливаем цвет заливки
            ctx.fill(); // Заливаем круг
            ctx.stroke();
            ctx.closePath();
        }



        function drawText(x, y, text) {
            ctx.fillStyle = '#4f4f4f'; // Цвет текста
            ctx.font = '20px PT Sans'; // Шрифт текста
            ctx.textAlign = 'center'; // Центрирование текста
            ctx.textBaseline = 'middle'; // Вертикальное центрирование текста
            ctx.fillText(text + 1, x, y); // Рисуем текст
            ctx.fillStyle = 'black'; // Цвет текста
                    ctx.font = 'bold 20px PT Sans'; // Шрифт текста
                    ctx.textAlign = 'left'; // Выравнивание текста по левому краю
                    ctx.fillText(descARR[text], x + 30, y); // Отображаем "Hello World" справа от круга
        }

        const left = () => {
            if(spinning) return null
            multiplier = 1
            spinning = true;
            if(current == 0){
                current = numberOfCircles - 1
                changeText(current)
                changeSlides(current)
            }
            else{
                current = current - 1
                changeText(current)
                changeSlides(current)
            }
            drawText(0, 0, current);
            document.getElementById("currentN").innerHTML = current + 1
        }

        const right = () => {
            if(spinning) return null
            multiplier = numberOfCircles - 1
            spinning = true;
            if(current == numberOfCircles - 1){
                current = 0
                changeText(current)
                changeSlides(current)
            }
            else{
                current = current + 1
                changeText(current)
                changeSlides(current)
            }
            drawText(0, 0, current);
            document.getElementById("currentN").innerHTML = current + 1
        }

        // Функция для рисования сцены
        function drawScene() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
            // Рисуем главный круг в центре
            drawCircle(centerX, centerY, radius, "transparent", "transparent");

            // Рисуем маленькие круги
            for (let i = 0; i < numberOfCircles; i++) {
                const angle = (i * 2 * Math.PI) / numberOfCircles + angleOffset - 1.1; // Угол для малого круга
                const x = centerX + radius * Math.cos(angle); // Вычисляем координату X
                const y = centerY + radius * Math.sin(angle); // Вычисляем координату Y
                console.log(current)
                if (current === i) {
                    drawCircle(x, y, smallCircleRadius, "transparent", "grey");
                    drawText(x, y, current); // Рисуем номер круга
                }
                else {
                    drawCircle(x, y, smallCircleRadius, "transparent", "grey", true); 
                }
            }
        }

        function isHoveringOverCircle(mouseX, mouseY, circleX, circleY) {
            return Math.hypot(mouseX - circleX, mouseY - circleY) < smallCircleRadius;
        }

        const changeText = (index) => {
            console.log(index)
            document.getElementById("date1").innerHTML = DATEARR[index][0]
            document.getElementById("date2").innerHTML = DATEARR[index][1]
        }

        const changeSlides = (index) => {
            document.getElementById("slide1").innerHTML = slideARR[0]
            document.getElementById("slide2").innerHTML = slideARR[1]
            document.getElementById("slide3").innerHTML = slideARR[2]
            document.getElementById("slide4").innerHTML = slideARR[0]
            document.getElementById("slide5").innerHTML = slideARR[1]
            document.getElementById("slide6").innerHTML = slideARR[2]
        }

        canvas.addEventListener("mousemove", (event) => {
            const mouseX = event.offsetX;
            const mouseY = event.offsetY;
            let isHovering = false;
            // Сравниваем с координатами маленьких кругов
            for (let i = 0; i < numberOfCircles; i++) {
                const angle = (i * 2 * Math.PI) / numberOfCircles + angleOffset;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                // Проверяем, попадает ли курсор над маленьким кругом
                if (isHoveringOverCircle(mouseX, mouseY, x, y)) {
                    isHovering = true;
                    break;
                }
            }
            // Меняем курсор на pointer если курсор над маленьким кругом
            canvas.style.cursor = isHovering ? "pointer" : "default";
        });

        // Обработчик нажатия на canvas
        canvas.addEventListener("click", (event) => {
            if(spinning == true) return null
            const mouseX = event.offsetX;
            const mouseY = event.offsetY;
            // Сравниваем с координатами маленьких кругов
            for (let i = 0; i < numberOfCircles; i++) {
                const angle = (i * 2 * Math.PI) / numberOfCircles + angleOffset - 1.1;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                // Проверяем, попадает ли клик внутри маленького круга
                if (Math.hypot(mouseX - x, mouseY - y) < smallCircleRadius && spinning == false) {
                    if(current < i){
                        multiplier = numberOfCircles - (i - current) 
                    }
                    else {
                        multiplier =  current - i
                    }
                    if(numberOfCircles == multiplier || current == i) break;
                    spinning = true; // Начинаем вращение
                    current = i
                    changeText(i)
                    changeSlides(i)
                    document.getElementById("currentN").innerHTML = current + 1
                    break;
                }
            }
        });

        let timer = 0

        // Функция анимации
        function animate() {
            if (spinning) {
                angleOffset += 0.07; // Увеличиваем угол для вращения
                timer+=4
            }
            drawScene(); // Рисуем сцену
            if(timer >= 360/numberOfCircles * multiplier) {spinning = false; timer = 0;}
            requestAnimationFrame(animate); // Запрос на перерисовку
        }

        animate(); // Запускаем анимацию