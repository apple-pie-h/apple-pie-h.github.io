const rebika = {
    name: "rebika parajuli",
    role: "computer engineering student",
    bio: "hi! i am rebika parajuli — learner | tech enthusiast.",
    skills: function() {
        return ["HTML", "CSS", "JavaScript", "Python", "C/C++", "Arduino", "Robotics"];
    },
    about: function() {
        return `Name: ${this.name}\nRole: ${this.role}\nBio: ${this.bio}`;
    },
    projects: function() {
        return ["line following robot", "instagram analysis tool", "minesweeper with sounds"];
    },
    contact: function() {
        return "email: rebikaparajuli@gmail.com\nGitHub: github.com/apple-pie-h";
    }
};

const commands = {
    "rebika.about": rebika.bio,
    "rebika.skills": rebika.skills,
    "rebika.projects": rebika.projects,
    "rebika.contacts": rebika.contact
};

// Safe DOM setup after load
document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");
    const commandInput = document.getElementById("commandInput");

    function safePrint(text) {
        if (!outputDiv) return console.warn("No #output element found.");
        const d = document.createElement("div");
        d.className = "output";
        d.textContent = String(text);
        outputDiv.appendChild(d);
    }

    function normalizeKey(key) {
        if (!key) return "";
        key = key.trim();
        if (key.endsWith("()")) key = key.slice(0, -2);
        return key;
    }

    function runCommandFromString(cmdStr) {
        const key = normalizeKey(cmdStr);
        // prefer explicit commands map
        if (commands[key] !== undefined) {
            const v = commands[key];
            return (typeof v === "function") ? v() : v;
        }
        try {
            // evaluate references like rebika.skills or rebika.skills()
            let val = eval(cmdStr);
            if (typeof val === "function") val = val();
            return val;
        } catch (err) {
            throw err;
        }
    }

    if (commandInput) {
        commandInput.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            const v = commandInput.value.trim();
            if (!v) return;
            try {
                const res = runCommandFromString(v);
                safePrint(res === undefined ? "undefined" : res);
            } catch (err) {
                safePrint(`Error: ${err.message}`);
                console.error(err);
            }
            commandInput.value = "";
        });
    } else {
        console.warn("#commandInput not found.");
    }

    // expose runCode for inline buttons
    window.runCode = function runCode(cellNum) {
        const output = document.getElementById(`output${cellNum}`);
        const inputField = document.getElementById(`customCode${cellNum}`) ||
                           document.getElementById(`customCode-${cellNum}`) ||
                           document.getElementById("customCode");
        if (!output) return console.error("Missing output element:", `output${cellNum}`);
        if (!inputField) {
            output.textContent = "Missing input field";
            return console.error("Missing input element for cell", cellNum);
        }

        const code = (inputField.value !== undefined) ? inputField.value.trim() : inputField.textContent.trim();
        if (!code) {
            output.textContent = "";
            return;
        }

        try {
            const key = normalizeKey(code);
            let result;
            if (commands[key] !== undefined) {
                const v = commands[key];
                result = (typeof v === "function") ? v() : v;
            } else {
                result = eval(code);
                if (typeof result === "function") result = result();
            }

            if (typeof result === "object") result = JSON.stringify(result, null, 2);
            if (result === undefined) result = "undefined";
            output.textContent = result;
            output.classList.add("show");
        } catch (err) {
            output.textContent = `Error: ${err.message}`;
            output.classList.add("show");
            console.error(err);
        }
    };

    // Auto-run button: runs all numbered cells in sequence
    const autoRunBtn = document.getElementById('autoRunBtn');
    if (autoRunBtn) {
        autoRunBtn.addEventListener('click', () => {
            // discover numbered output/input pairs (output1, output2, ...)
            const outputs = Array.from(document.querySelectorAll('[id^="output"]'))
                .filter(el => /^output\d+$/.test(el.id))
                .sort((a,b) => {
                    const na = Number(a.id.replace('output',''));
                    const nb = Number(b.id.replace('output',''));
                    return na - nb;
                });
            const totalCells = outputs.length;
            if (totalCells === 0) return console.warn("No numbered output cells found.");
            for (let i = 1; i <= totalCells; i++) {
                setTimeout(() => {
                    if (typeof window.runCode === 'function') window.runCode(i);
                }, (i - 1) * 220); // small stagger so outputs appear sequentially
            }
        });
    } else {
        console.warn("#autoRunBtn not found.");
    }
});


const pet = document.getElementById('virtual-pet');
const petContainer = document.getElementById('pet-container');
const speech = document.getElementById('speech');
const shadow = document.querySelector('.shadow');

// Character Colors
const BODY_LIGHT = '#D8D8E0'; 
const BODY_DARK = '#B0B0C0'; 
const OUTLINE_DARK = '#303030';
const WHITE = '#FFFFFF';

// Pixel size is 4px
const px = 4;

// PIXEL ART DATA for the new blocky character with eye sockets
const characterPixels = [
    // --- Head / Top Block ---
    // Top Outline
    [10,0,OUTLINE_DARK],[11,0,OUTLINE_DARK],[12,0,OUTLINE_DARK],[13,0,OUTLINE_DARK],[14,0,OUTLINE_DARK],[15,0,OUTLINE_DARK],[16,0,OUTLINE_DARK],[17,0,OUTLINE_DARK],
    // Top Fill (White band)
    [10,1,WHITE],[11,1,WHITE],[12,1,WHITE],[13,1,WHITE],[14,1,WHITE],[15,1,WHITE],[16,1,WHITE],[17,1,WHITE],
    // Head Outline (Sides)
    [9,1,OUTLINE_DARK],[18,1,OUTLINE_DARK],
    [9,2,OUTLINE_DARK],[18,2,OUTLINE_DARK],
    [9,3,OUTLINE_DARK],[18,3,OUTLINE_DARK],
    [9,4,OUTLINE_DARK],[18,4,OUTLINE_DARK],
    [9,5,OUTLINE_DARK],[18,5,OUTLINE_DARK],
    // Head Fill (BODY_LIGHT)
    [10,2,BODY_LIGHT],[11,2,BODY_LIGHT],[12,2,BODY_LIGHT],[13,2,BODY_LIGHT],[14,2,BODY_LIGHT],[15,2,BODY_LIGHT],[16,2,BODY_LIGHT],[17,2,BODY_LIGHT],
    [10,3,BODY_LIGHT],[11,3,BODY_LIGHT],[16,3,BODY_LIGHT],[17,3,BODY_LIGHT], // Space for eyes
    [10,4,BODY_LIGHT],[11,4,BODY_LIGHT],[16,4,BODY_LIGHT],[17,4,BODY_LIGHT], // Space for eyes
    [10,5,BODY_LIGHT],[11,5,BODY_LIGHT],[12,5,BODY_LIGHT],[13,5,BODY_LIGHT],[14,5,BODY_LIGHT],[15,5,BODY_LIGHT],[16,5,BODY_LIGHT],[17,5,BODY_LIGHT],

    // **NEW EYE SOCKETS (WHITE BASE) **
    [12,3,WHITE],[13,3,WHITE],[14,3,WHITE],[15,3,WHITE],
    [12,4,WHITE],[13,4,WHITE],[14,4,WHITE],[15,4,WHITE],
    
    // --- Body / Bottom Block ---
    // Body Outline
    [9,6,OUTLINE_DARK],[18,6,OUTLINE_DARK],
    [9,7,OUTLINE_DARK],[18,7,OUTLINE_DARK],
    [9,8,OUTLINE_DARK],[18,8,OUTLINE_DARK],
    [10,9,OUTLINE_DARK],[17,9,OUTLINE_DARK],
    // Body Fill (BODY_DARK)
    [10,6,BODY_DARK],[11,6,BODY_DARK],[12,6,BODY_DARK],[13,6,BODY_DARK],[14,6,BODY_DARK],[15,6,BODY_DARK],[16,6,BODY_DARK],[17,6,BODY_DARK],
    [10,7,BODY_DARK],[11,7,BODY_DARK],[12,7,BODY_DARK],[13,7,BODY_DARK],[14,7,BODY_DARK],[15,7,BODY_DARK],[16,7,BODY_DARK],[17,7,BODY_DARK],
    [10,8,BODY_DARK],[11,8,BODY_DARK],[12,8,BODY_DARK],[13,8,BODY_DARK],[14,8,BODY_DARK],[15,8,BODY_DARK],[16,8,BODY_DARK],[17,8,BODY_DARK],

    // --- Arms ---
    [8,6,OUTLINE_DARK],
    [7,7,OUTLINE_DARK],
    [7,6,BODY_LIGHT],

    [19,6,OUTLINE_DARK],
    [20,7,OUTLINE_DARK],
    [20,6,BODY_LIGHT],

    // --- Feet / Base ---
    [10,9,OUTLINE_DARK], 
    [11,10,OUTLINE_DARK],[12,10,OUTLINE_DARK],[13,10,OUTLINE_DARK],[14,10,OUTLINE_DARK],[15,10,OUTLINE_DARK],[16,10,OUTLINE_DARK], 
    [10,10,BODY_LIGHT], [11,10,BODY_LIGHT],[12,10,BODY_LIGHT],[13,10,BODY_LIGHT],[14,10,BODY_LIGHT],[15,10,BODY_LIGHT],[16,10,BODY_LIGHT], 
    [10,9,BODY_DARK],[11,9,BODY_DARK],[12,9,BODY_DARK],[13,9,BODY_DARK],[14,9,BODY_DARK],[15,9,BODY_DARK],[16,9,BODY_DARK],
];

// Create character pixels
characterPixels.forEach(([x, y, color]) => {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.left = `${x * px}px`;
    pixel.style.top = `${y * px}px`;
    pixel.style.background = color;
    petContainer.appendChild(pixel);
});

// Create eye pupils that will move
const leftPupil = document.createElement('div');
leftPupil.className = 'eye-pupil';
leftPupil.style.left = `${13 * px}px`; // Center of left eye base (12,13,14,15)
leftPupil.style.top = `${4 * px}px`; // Center of eye height (3,4)
petContainer.appendChild(leftPupil);

const rightPupil = document.createElement('div');
rightPupil.className = 'eye-pupil';
rightPupil.style.left = `${15 * px}px`; // Center of right eye base
rightPupil.style.top = `${4 * px}px`;
petContainer.appendChild(rightPupil);

// Messages
const messages = [
    "Hi there! ✨",
    "I'm a pet! 💫",
    "Boop! 👆",
    "Wanna play? 🎮",
    "Hello! 👋",
    "Beep boop! 🤖"
];

let lastSpeechTime = 0;
let isExcited = false;

function showSpeech(msg) {
    const now = Date.now();
    if (now - lastSpeechTime < 2500) return;
    
    speech.innerText = msg;
    speech.style.display = 'block';
    lastSpeechTime = now;
    setTimeout(() => { speech.style.display = 'none'; }, 2500);
}

// Click interaction
pet.addEventListener('click', () => {
    petContainer.classList.add('jump');
    showSpeech("Boing! 🐰");
    setTimeout(() => { 
        petContainer.classList.remove('jump');
    }, 500);
});

// Eye tracking and subtle pet movement
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    const rect = pet.getBoundingClientRect();
    const petCenterX = rect.left + pet.offsetWidth / 2; 
    const petCenterY = rect.top + pet.offsetHeight / 2;
    
    const dx = e.clientX - petCenterX;
    const dy = e.clientY - petCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    // --- PUPIL MOVEMENT LOGIC ---
    const maxMove = 1; // Pupils move only 1 pixel (4px)
    const pupilX = Math.cos(angle) * Math.min(distance / 70, maxMove);
    const pupilY = Math.sin(angle) * Math.min(distance / 70, maxMove);
    
    leftPupil.style.transform = `translate(${pupilX * px}px, ${pupilY * px}px)`; // Multiply by px (4)
    rightPupil.style.transform = `translate(${pupilX * px}px, ${pupilY * px}px)`; // Multiply by px (4)

    // Follow cursor logic for the entire pet
    if (distance < 300) { 
        const moveAmount = Math.max(0, (300 - distance) / 300);
        targetX = dx * moveAmount * 0.15;
        targetY = dy * moveAmount * 0.15;
        
        const scale = 1 + (moveAmount * 0.05); 
        pet.style.transform = `scale(${scale})`;
        
        shadow.style.transform = `scale(${scale * 0.8}) translateX(${targetX / 5}px) translateY(${targetY / 5}px)`;

        if (distance < 100 && !isExcited) { 
            isExcited = true;
            if (Math.random() < 0.3) { 
                showSpeech(messages[Math.floor(Math.random() * messages.length)]);
            }
        }
    } else {
        targetX = 0;
        targetY = 0;
        pet.style.transform = 'scale(1)';
        shadow.style.transform = 'scale(0.8) translateX(0) translateY(0)';
        
        if (isExcited) {
            isExcited = false;
        }
    }
});

// Smooth movement animation frame
function animateMovement() {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;
    
    pet.style.transform = `translate(${currentX}px, ${-currentY}px)`;
    
    requestAnimationFrame(animateMovement);
}
animateMovement();
