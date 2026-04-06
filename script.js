const rebika = {
    name: "rebika parajuli",
    role: "computer engineering student",
    bio: "computer engineering student with a strong interest in artificial intelligence, machine learning, and frontend development.",
    education: "IOE-Paschimanchal Campus\nBachelors in Computer Engineering (Nov 2024 - )",
    leadership: [
        "Marketing & Social Media Head - AWS Student Community Day 2025",
        "Outreach & Branding Member - AWS Cloud Club, IOE-Paschimanchal Campus"
    ],
    skills() {
        return [
            "Programming: Python, JavaScript",
            "AI/ML & Data: PyTorch, Pandas, NumPy",
            "Web Development: HTML, CSS",
            "Tools & Frameworks: Streamlit",
            "Hardware: Arduino, Robotics"
        ];
    },
    about() {
        return `Name: ${this.name}\nRole: ${this.role}\nBio: ${this.bio}\nEducation: ${this.education}`;
    },
    projects() {
        return [
            "Flower Recognition Using Deep Learning - built a ResNet9-based classifier for different flower species and deployed it as an interactive Streamlit app.",
            "Instagram Follower-Following Comparison - created a Python Jupyter Notebook tool that analyzes Instagram follower data, exports CSV reports, and finds mutuals and differences.",
            "Minesweeper with sounds"
        ];
    },
    contact() {
        return "email: rebikaparajuli@gmail.com\nGitHub: github.com/apple-pie-h";
    },
    activities() {
        return this.leadership;
    }
};

const commandResolvers = {
    "rebika.name": () => rebika.name,
    "rebika.role": () => rebika.role,
    "rebika.bio": () => rebika.bio,
    "rebika.about": () => rebika.about(),
    "rebika.skills": () => rebika.skills(),
    "rebika.projects": () => rebika.projects(),
    "rebika.contact": () => rebika.contact(),
    "rebika.contacts": () => rebika.contact(),
    "rebika.education": () => rebika.education,
    "rebika.activities": () => rebika.activities(),
    "rebika.leadership": () => rebika.activities()
};

function normalizeCommand(value) {
    if (!value) return "";
    return value.trim().replace(/\(\)\s*$/, "");
}

function formatResult(result) {
    if (Array.isArray(result)) return result.join(", ");
    if (typeof result === "object" && result !== null) return JSON.stringify(result, null, 2);
    if (result === undefined) return "undefined";
    return String(result);
}

function resolveCommand(command) {
    const normalized = normalizeCommand(command);
    const resolver = commandResolvers[normalized];

    if (!resolver) {
        throw new Error("Unknown command. Try rebika.about, rebika.skills, rebika.projects, rebika.contact, rebika.education, rebika.activities, rebika.name, or rebika.role.");
    }

    return resolver();
}

document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");
    const autoRunBtn = document.getElementById("autoRunBtn");

    function safePrint(text) {
        if (!outputDiv) return;
        const element = document.createElement("div");
        element.className = "output";
        element.textContent = String(text);
        outputDiv.appendChild(element);
    }

    window.runCode = function runCode(cellNum) {
        const output = document.getElementById(`output${cellNum}`);
        const inputField = document.getElementById(`customCode${cellNum}`);

        if (!output || !inputField) return;

        const code = inputField.value.trim();
        if (!code) {
            output.textContent = "";
            output.classList.remove("show");
            return;
        }

        try {
            const result = resolveCommand(code);
            const formatted = formatResult(result);
            output.textContent = formatted;
            output.classList.add("show");
            safePrint(`>>> ${normalizeCommand(code)}\n${formatted}`);
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
            output.classList.add("show");
        }
    };

    if (autoRunBtn) {
        autoRunBtn.addEventListener("click", () => {
            const outputs = Array.from(document.querySelectorAll('[id^="output"]'))
                .filter((element) => /^output\d+$/.test(element.id))
                .sort((a, b) => Number(a.id.replace("output", "")) - Number(b.id.replace("output", "")));

            outputs.forEach((element, index) => {
                const cellNumber = Number(element.id.replace("output", ""));
                window.setTimeout(() => {
                    window.runCode(cellNumber);
                }, index * 180);
            });
        });
    }

    document.querySelectorAll(".code-input-field").forEach((inputField) => {
        inputField.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();

            const match = inputField.id.match(/customCode(\d+)/);
            if (!match) return;

            window.runCode(Number(match[1]));
        });
    });

    initializePet();
});

function initializePet() {
    const pet = document.getElementById("virtual-pet");
    const petContainer = document.getElementById("pet-container");
    const speech = document.getElementById("speech");
    const shadow = document.querySelector(".shadow");

    if (!pet || !petContainer || !speech || !shadow) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const BODY_LIGHT = "#D8D8E0";
    const BODY_DARK = "#B0B0C0";
    const OUTLINE_DARK = "#303030";
    const WHITE = "#FFFFFF";
    const px = 4;

    const characterPixels = [
        [10, 0, OUTLINE_DARK], [11, 0, OUTLINE_DARK], [12, 0, OUTLINE_DARK], [13, 0, OUTLINE_DARK], [14, 0, OUTLINE_DARK], [15, 0, OUTLINE_DARK], [16, 0, OUTLINE_DARK], [17, 0, OUTLINE_DARK],
        [10, 1, WHITE], [11, 1, WHITE], [12, 1, WHITE], [13, 1, WHITE], [14, 1, WHITE], [15, 1, WHITE], [16, 1, WHITE], [17, 1, WHITE],
        [9, 1, OUTLINE_DARK], [18, 1, OUTLINE_DARK],
        [9, 2, OUTLINE_DARK], [18, 2, OUTLINE_DARK],
        [9, 3, OUTLINE_DARK], [18, 3, OUTLINE_DARK],
        [9, 4, OUTLINE_DARK], [18, 4, OUTLINE_DARK],
        [9, 5, OUTLINE_DARK], [18, 5, OUTLINE_DARK],
        [10, 2, BODY_LIGHT], [11, 2, BODY_LIGHT], [12, 2, BODY_LIGHT], [13, 2, BODY_LIGHT], [14, 2, BODY_LIGHT], [15, 2, BODY_LIGHT], [16, 2, BODY_LIGHT], [17, 2, BODY_LIGHT],
        [10, 3, BODY_LIGHT], [11, 3, BODY_LIGHT], [16, 3, BODY_LIGHT], [17, 3, BODY_LIGHT],
        [10, 4, BODY_LIGHT], [11, 4, BODY_LIGHT], [16, 4, BODY_LIGHT], [17, 4, BODY_LIGHT],
        [10, 5, BODY_LIGHT], [11, 5, BODY_LIGHT], [12, 5, BODY_LIGHT], [13, 5, BODY_LIGHT], [14, 5, BODY_LIGHT], [15, 5, BODY_LIGHT], [16, 5, BODY_LIGHT], [17, 5, BODY_LIGHT],
        [12, 3, WHITE], [13, 3, WHITE], [14, 3, WHITE], [15, 3, WHITE],
        [12, 4, WHITE], [13, 4, WHITE], [14, 4, WHITE], [15, 4, WHITE],
        [9, 6, OUTLINE_DARK], [18, 6, OUTLINE_DARK],
        [9, 7, OUTLINE_DARK], [18, 7, OUTLINE_DARK],
        [9, 8, OUTLINE_DARK], [18, 8, OUTLINE_DARK],
        [10, 9, OUTLINE_DARK], [17, 9, OUTLINE_DARK],
        [10, 6, BODY_DARK], [11, 6, BODY_DARK], [12, 6, BODY_DARK], [13, 6, BODY_DARK], [14, 6, BODY_DARK], [15, 6, BODY_DARK], [16, 6, BODY_DARK], [17, 6, BODY_DARK],
        [10, 7, BODY_DARK], [11, 7, BODY_DARK], [12, 7, BODY_DARK], [13, 7, BODY_DARK], [14, 7, BODY_DARK], [15, 7, BODY_DARK], [16, 7, BODY_DARK], [17, 7, BODY_DARK],
        [10, 8, BODY_DARK], [11, 8, BODY_DARK], [12, 8, BODY_DARK], [13, 8, BODY_DARK], [14, 8, BODY_DARK], [15, 8, BODY_DARK], [16, 8, BODY_DARK], [17, 8, BODY_DARK],
        [8, 6, OUTLINE_DARK], [7, 7, OUTLINE_DARK], [7, 6, BODY_LIGHT],
        [19, 6, OUTLINE_DARK], [20, 7, OUTLINE_DARK], [20, 6, BODY_LIGHT],
        [10, 9, OUTLINE_DARK],
        [11, 10, OUTLINE_DARK], [12, 10, OUTLINE_DARK], [13, 10, OUTLINE_DARK], [14, 10, OUTLINE_DARK], [15, 10, OUTLINE_DARK], [16, 10, OUTLINE_DARK],
        [10, 10, BODY_LIGHT], [11, 10, BODY_LIGHT], [12, 10, BODY_LIGHT], [13, 10, BODY_LIGHT], [14, 10, BODY_LIGHT], [15, 10, BODY_LIGHT], [16, 10, BODY_LIGHT],
        [10, 9, BODY_DARK], [11, 9, BODY_DARK], [12, 9, BODY_DARK], [13, 9, BODY_DARK], [14, 9, BODY_DARK], [15, 9, BODY_DARK], [16, 9, BODY_DARK]
    ];

    const fragment = document.createDocumentFragment();
    characterPixels.forEach(([x, y, color]) => {
        const pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.style.left = `${x * px}px`;
        pixel.style.top = `${y * px}px`;
        pixel.style.background = color;
        fragment.appendChild(pixel);
    });
    petContainer.appendChild(fragment);

    const leftPupil = document.createElement("div");
    leftPupil.className = "eye-pupil";
    leftPupil.style.left = `${13 * px}px`;
    leftPupil.style.top = `${4 * px}px`;
    petContainer.appendChild(leftPupil);

    const rightPupil = document.createElement("div");
    rightPupil.className = "eye-pupil";
    rightPupil.style.left = `${15 * px}px`;
    rightPupil.style.top = `${4 * px}px`;
    petContainer.appendChild(rightPupil);

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
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;
    let rafId = null;

    function showSpeech(message) {
        const now = Date.now();
        if (now - lastSpeechTime < 2500) return;

        speech.textContent = message;
        speech.style.display = "block";
        lastSpeechTime = now;
        window.setTimeout(() => {
            speech.style.display = "none";
        }, 2500);
    }

    pet.addEventListener("click", () => {
        petContainer.classList.add("jump");
        showSpeech("Boing! 🐰");
        window.setTimeout(() => {
            petContainer.classList.remove("jump");
        }, 500);
    });

    if (reducedMotion) return;

    function updateTargetFromPointer() {
        if (!pointerActive) {
            rafId = null;
            return;
        }

        const rect = pet.getBoundingClientRect();
        const petCenterX = rect.left + pet.offsetWidth / 2;
        const petCenterY = rect.top + pet.offsetHeight / 2;

        const dx = pointerX - petCenterX;
        const dy = pointerY - petCenterY;
        const distance = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        const maxMove = 1;
        const pupilX = Math.cos(angle) * Math.min(distance / 70, maxMove);
        const pupilY = Math.sin(angle) * Math.min(distance / 70, maxMove);

        leftPupil.style.transform = `translate(${pupilX * px}px, ${pupilY * px}px)`;
        rightPupil.style.transform = `translate(${pupilX * px}px, ${pupilY * px}px)`;

        if (distance < 300) {
            const moveAmount = Math.max(0, (300 - distance) / 300);
            targetX = dx * moveAmount * 0.15;
            targetY = dy * moveAmount * 0.15;

            const scale = 1 + moveAmount * 0.05;
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
            shadow.style.transform = "scale(0.8) translateX(0) translateY(0)";
            isExcited = false;
        }

        rafId = null;
    }

    document.addEventListener("mousemove", (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        pointerActive = true;

        if (rafId === null) {
            rafId = window.requestAnimationFrame(updateTargetFromPointer);
        }
    }, { passive: true });

    function animatePet() {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        const distance = Math.hypot(targetX, targetY);
        const scale = 1 + Math.min(distance / 220, 0.05);
        pet.style.transform = `translate(${currentX}px, ${-currentY}px) scale(${scale})`;

        window.requestAnimationFrame(animatePet);
    }

    animatePet();
}
