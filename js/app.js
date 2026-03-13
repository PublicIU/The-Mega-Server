// Custom Cursor / Meteor Launcher 2.0
const cursor = document.getElementById('custom-cursor');
const cursorInner = document.querySelector('.cursor-inner');
const cursorOuter = document.querySelector('.cursor-outer');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ultra-responsive cursor logic
const xSetter = gsap.quickSetter(cursor, "x", "px");
const ySetter = gsap.quickSetter(cursor, "y", "px");

gsap.ticker.add(() => {
    // Smoother but instant follow
    const dt = 1.0 - Math.pow(1.0 - 0.4, gsap.ticker.deltaRatio()); 
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;

    xSetter(cursorX - 12);
    ySetter(cursorY - 12);
});

// Mouse down interaction
document.addEventListener('mousedown', () => {
    gsap.to(cursorOuter, { scale: 0.8, duration: 0.1 });
    launchMeteor(mouseX, mouseY);
});

document.addEventListener('mouseup', () => {
    gsap.to(cursorOuter, { scale: 1, duration: 0.2 });
});

function launchMeteor(x, y) {
    const meteor = document.createElement('div');
    meteor.className = 'meteor-trail';
    document.body.appendChild(meteor);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 15 + Math.random() * 10;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    gsap.set(meteor, {
        x: x,
        y: y,
        rotation: angle * (180 / Math.PI),
        width: 100,
        opacity: 1
    });

    gsap.to(meteor, {
        x: x + (dx * 50),
        y: y + (dy * 50),
        opacity: 0,
        width: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
            createParticles(x + (dx * 50), y + (dy * 50));
            meteor.remove();
        }
    });
}

function createParticles(x, y) {
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 50;

        gsap.set(p, { x: x, y: y });
        gsap.to(p, {
            x: x + Math.cos(angle) * dist,
            y: y + Math.sin(angle) * dist,
            opacity: 0,
            scale: 0,
            duration: 0.6,
            ease: "power1.out",
            onComplete: () => p.remove()
        });
    }
}

// Dynamic Mesh Background Logic
function initMesh() {
    const bg = document.getElementById('mesh-bg');
    for (let i = 0; i < 3; i++) {
        const blob = document.createElement('div');
        blob.className = 'bg-blob';
        bg.appendChild(blob);
        
        animateBlob(blob);
    }
}

function animateBlob(blob) {
    gsap.to(blob, {
        x: `random(-20, 100)vw`,
        y: `random(-20, 100)vh`,
        duration: `random(10, 20)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMesh();
});
