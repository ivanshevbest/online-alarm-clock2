
const images = [
    'url("https://yaart-images.s3.yandex.net/b909d4dd415a11f088fa16362698692b:1")', // река
    'url("https://i.pinimg.com/originals/bb/85/29/bb85298403985f288060b3e66488f4f3.jpg")', // лес
    'url("https://avatars.mds.yandex.net/i?id=ced1b997c75dc453e30c8b858ccb1b8a_l-5870172-images-thumbs&n=13")' // пруд
];


const colors = [
    'yellow', // для фона - река
    'green', // для фона - лес
    'blue' // для фона - пруд
];

let currentIndex = 0;
let alarmTime = null;
let fireworks = false;


function changeBackground() {
    document.body.style.backgroundImage = images[currentIndex % images.length];
    document.querySelector('.clock').style.color = colors[currentIndex % colors.length];
    currentIndex++;
}

// Автоматическая смена фона каждые 5 секунд
setInterval(changeBackground, 5000); // Интервал смены изображений


function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    document.querySelector('.clock').innerText = `${hours}:${minutes}:${seconds}`;

    if (alarmTime) {
        const currentTime = `${hours}:${minutes}`;
        if (currentTime === alarmTime) {
            alert('Будильник сработал!');
            alarmTime = null;
            playAlarmSound();
            showFireworks();
            document.querySelector('.stop-alarm').style.display = 'flex'; 
        }
    }
}


setInterval(updateClock, 1000);
updateClock(); // Первоначальное отображение часов
changeBackground(); // Первоначальная установка фона


function setAlarm() {
    const alarmInput = document.getElementById('alarmTime');
    alarmTime = alarmInput.value;
    alert(`Будильник установлен на ${alarmTime}`);
    document.querySelector('.alarm-time').style.display = 'none';
}


function playAlarmSound() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.play();
}


function showFireworks() {
    const fireworksDiv = document.createElement('div');
    fireworksDiv.className = 'fireworks';
    fireworksDiv.innerHTML = '<img src="fireworks.gif" alt="Фейерверк">';
    document.body.appendChild(fireworksDiv);
    setTimeout(() => {
        document.body.removeChild(fireworksDiv);
    }, 5000); // Фейерверк отображается 5 секунд
}


function stopAlarm() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.querySelector('.stop-alarm').style.display = 'none'; // Скрыть кнопку "Выключить"
}


function toggleAlarm() {
    const alarmTimeDiv = document.querySelector('.alarm-time');
    if (alarmTimeDiv.style.display === 'none') {
        alarmTimeDiv.style.display = 'flex';
    } else {
        alarmTimeDiv.style.display = 'none';
    }
}
