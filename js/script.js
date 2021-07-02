const C = document.querySelector("canvas"),
    $ = C.getContext("2d"),
    W = (C.width = window.innerWidth),
    H = (C.height = window.innerHeight);

// const str = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я",
//     matrix = str.split("");


let speedDraw = 70; // Запуск каждые {speed}ms
let speedTransperent = 5; // Скорость прозрачности (от 0 до 100)
let entropy = 0.985; // Энтропия (0.975 - по умолчанию)
let matrix = ["HTML5", "CSS3", "JS", "React", "HTML", "CSS", "JavaScript", "Redux", "VueJS", "AngularJS", "TS", "TypeScript", "Git", "Gulp", "Webpack", "PHP", "SASS", "SCSS", "LESS", "jQuery", "NodeJS"]; // Слова

let colorText = ["#0f0", "#FF7373", "#FF73C2", "#FFB273"];
let fontFamily = 'JetBrains Mono'; // Семейство шрифтов
let font = 20, // Размер шрифта
    // количество колонок = ширина холста / размер шрифта
    col = W / font,
    arr = [];

let matrixLength = matrix.length;
let tempSpace = 2;
for (let i = 0; i < matrixLength; i++) {
    if (tempSpace == 2) {
        // matrix.push(" ");
        tempSpace = 1;
    } else {
        tempSpace++;
    }
}

console.log(matrix);

for (let i = 0; i < col; i++) arr[i] = 1; // Заполняем пустой массив единицами по количеству колонок:
// arr = [8, 8, 1, 1, 8, 8, 8, 8, 8, 1, 1, 1, 8, 8, 8, 8, 8, 8, 1, 8, 1, 1, 1, 8, 8, 8, 8, 8, 8, 8, 1, 8, 1, 8, 8, 8, 1, 8, 8, 8, 8, 1, 1, 1, 8, 8, 8, 1, 8, 8, 1, 8, 8, 1, 8, 8, 1, 8, 1, 8, 8, 8]


function draw() {
    $.fillStyle = "rgba(0,0,0," + speedTransperent / 100 + ")"; // Цвет фона
    $.fillRect(0, 0, W, H);

    // $.fillStyle = "#0f0"; // Цвет текста
    // $.fillStyle = colorText[getRandomInt(colorText.length)];
    $.fillStyle = colorText[Math.floor(Math.random() * colorText.length)];
    // $.fillStyle = "#fff";
    $.font = font + "px " + fontFamily;
    for (let i = 0; i < arr.length; i++) {
        // выбираем случайный набор символов
        let txt = matrix[Math.floor(Math.random() * matrix.length)];

        // рисуем символы
        // двигаемся вправо и вниз
        // fillText(набор символов, координата x = значение i, умноженное на размер шрифта, координата y = значение arr, умноженное на размер шрифта)
        $.fillText(txt, i * font, arr[i] * font);

        // если "y" больше высоты холста или Math.random() выдает больше 0.975 (чем это значение меньше, тем больше будет пустот на экране), то поднимаемся наверх (обнуляем "y")
        // это позволяет обеспечить разницу отрисовки отдельных колонок
        if (arr[i] * font > H && Math.random() > entropy) arr[i] = 0;

        // увеличиваем значение y
        arr[i]++;
    }
    console.log(arr);
    // debugger
}


setInterval(draw, speedDraw);

window.addEventListener("resize", () => location.reload());
