/*
    SITE 1101 Principles of Information Systems 
    (c)2024 by Team 79 
    DISCLAIMER: All code examples are quick hacks to present working prototypes.
*/

// ==================== Artist's Drawing Functions ====================

var x, y, angle;

function radian(degree) {
    return degree * Math.PI / 180;
}

function moveForward(distance, context) {
    let a = radian(angle);
    x = x + distance * Math.cos(a);
    y = y + distance * Math.sin(a);
    context.lineTo(x, y);    
}

function turnRight(degree) {
    angle = angle - degree;
    if (angle < 0) angle = angle + 360;
}

function DrawSpiral(context) {
    x = context.canvas.width / 2;
    y = context.canvas.height / 2;
    angle = 0.0; 
    context.moveTo(x, y);
    context.beginPath();
    for (let counter = 3; counter < 600; counter += 3) {
        moveForward(counter, context);
        context.stroke();
        turnRight(89);
    }
}

// ==================== Hour of Code Setup ====================

function setupHourOfCodeEvent() {
    const canvas = document.getElementById("hourOfCodeCanvas");
    if (canvas) {
        const context = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = 600;

        context.fillStyle = "#f0f0f0";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "#003366";
        context.lineWidth = 2;

        DrawSpiral(context);
    }
}

// ==================== Live Timer ====================

function updateTimer() {
    const timerElement = document.getElementById("live-timer");
    const now = new Date();
    timerElement.textContent = now.toLocaleTimeString();
    timerElement.style.transform = "scale(1.1)";
    setTimeout(() => (timerElement.style.transform = "scale(1)"), 200);
    setTimeout(updateTimer, 1000);
}

// ==================== Code Artist Canvas ====================

document.addEventListener("DOMContentLoaded", setupCodeArtistCanvas);

function setupCodeArtistCanvas() {
    const canvas = document.getElementById("codeArtistCanvas");
    if (canvas) {
        const context = canvas.getContext("2d");

        // Set canvas size
        canvas.width = 800;
        canvas.height = 600;

        // Background color
        context.fillStyle = "#f9f9f9";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw complex art
        context.strokeStyle = "#336178"; // Line color
        context.lineWidth = 2;

        // Call the function to create a more dispersed pattern
        drawDynamicPattern(context, canvas.width, canvas.height);
    }
}

/**
 * Draws a dynamic and balanced pattern of arcs and lines.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} width - The canvas width.
 * @param {number} height - The canvas height.
 */
function drawDynamicPattern(ctx, width, height) {
    // Set starting point to the center of the canvas
    let x = width / 2;
    let y = height / 2;

    const iterations = 1000; // Higher for more complexity
    const maxStepSize = 20; // Larger steps for dispersion

    for (let i = 0; i < iterations; i++) {
        // Generate random step sizes and angles
        const stepSize = Math.random() * maxStepSize;
        const angle = Math.random() * Math.PI * 2;

        // Calculate new positions
        const nextX = x + Math.cos(angle) * stepSize;
        const nextY = y + Math.sin(angle) * stepSize;

        // Draw a line to the next point
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();

        // Draw random circles at intervals
        if (i % 15 === 0) {
            const radius = Math.random() * 10 + 5; // Random radius
            ctx.beginPath();
            ctx.arc(nextX, nextY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Update the current position
        x = nextX;
        y = nextY;

        // Reset position if out of bounds
        if (x < 0 || x > width || y < 0 || y > height) {
            x = Math.random() * width; // Random reset position
            y = Math.random() * height;
        }
    }
}



// ==================== Initialize Functions ====================

window.onload = function () {
    setupHourOfCodeEvent();
    setupCodeArtistCanvas();
    updateTimer();
};
