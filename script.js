const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionContainer = document.getElementById('questionContainer');
const celebrationContainer = document.getElementById('celebrationContainer');

let noClickCount = 0;
const messages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

noBtn.addEventListener('click', () => {
    noClickCount++;

    // Decrease No button size
    // Start trying to move away after a few clicks or when small
    const currentScale = 1 - (noClickCount * 0.1);

    if (currentScale < 0.2) {
        // Teleport mode engaged fully
        noBtn.style.position = 'absolute';
        teleportButton();
        return;
    }

    noBtn.style.transform = `scale(${currentScale})`;

    // Increase Yes button size
    const yesScale = 1 + (noClickCount * 0.2);
    yesBtn.style.transform = `scale(${yesScale})`;

    // Change text (cycle through messages)
    const messageIndex = Math.min(noClickCount, messages.length - 1);
    noBtn.innerText = messages[messageIndex];
});

// Teleport logic on hover if it's getting small/annoying
noBtn.addEventListener('mouseover', () => {
    if (noClickCount > 5) {
        teleportButton();
    }
});

function teleportButton() {
    // Determine container bounds
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate available space within the window, but let's keep it somewhat near or within screen
    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply fixed position for teleporting around the whole screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    celebrationContainer.style.display = 'flex';

    // Trigger Heart Confetti
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            shapes: ['heart'],
            colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585']
        });

        // Continuous burst for a few seconds
        let end = Date.now() + 2000;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                shapes: ['heart'],
                colors: ['#FFC0CB', '#FF69B4']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                shapes: ['heart'],
                colors: ['#FFC0CB', '#FF69B4']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});
