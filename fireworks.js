const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

// Подгоняем canvas под окно
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Массив «частиц»
let particles = [];

// Количество искр в одном «залпе»
const numParticles = 100;

// Создаём «залп» в случайном месте экрана
function createFirework() {
    // Случайная точка «взрыва»
    const fx = Math.random() * canvas.width;
    const fy = Math.random() * canvas.height;

    for (let i = 0; i < numParticles; i++) {
        // Случайный угол (от 0 до 2π)
        const angle = Math.random() * 2 * Math.PI;
        // Случайная скорость (задём диапазон, например, от 2 до 7)
        const speed = Math.random() * 3 + 1;

        // Компоненты скорости по осям
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        particles.push({
            x: fx,
            y: fy,
            vx,
            vy,
            r: Math.random() * 4 + 2,  // радиус искры
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            alpha: 1
        });
    }
}

// Запускаем «залп» каждые 2 секунды
setInterval(createFirework, 500);

// Функция анимации
function animate() {
    // Очищаем холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Перебираем частицы с конца (чтобы удобно удалять)
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Двигаем частицу
        p.x += p.vx;
        p.y += p.vy;

        // Медленно «гасим» искру
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
            // Удаляем «мертвую» искру
            particles.splice(i, 1);
        } else {
            // Рисуем искру
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;  // прозрачность
            ctx.fill();
            ctx.globalAlpha = 1;        // восстанавливаем прозрачность
        }
    }

    requestAnimationFrame(animate);
}

// Стартуем анимацию
animate();