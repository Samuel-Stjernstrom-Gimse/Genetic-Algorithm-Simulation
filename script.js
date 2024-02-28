"use strict";
function main(generations) {
    const dataArray = [];
    const objArray = [];
    const mutationInput = document.getElementById('mutation-percentage');
    const stepCount = document.getElementById('generationSize');
    const inheritance = document.getElementById('inheritance');
    const stepLength = document.getElementById('stepLength');
    const pixelSize = document.getElementById('pixel');
    const speed = document.getElementById('speed');
    const resetBtn = document.getElementById('btn');
    const branches = document.getElementById('branches');
    let resetBool = false;
    resetBtn.addEventListener('click', () => {
        resetBool = !resetBool;
    });
    let bestDistance = Infinity;
    let bestDistanceIndex = Infinity;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let gX = Math.floor(Math.random() * canvas.width - 30);
    let gY = Math.floor(Math.random() * canvas.height - 30);
    const draw = (x, y, w, h, color, ctx) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    };
    function drawStrokedCircle(ctx, x, y, radius, fillColor) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();
    }
    function calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    for (let i = 0; i < branches.valueAsNumber; i++) {
        const squareArray = [];
        for (let j = 0; j < stepCount.valueAsNumber; j++) {
            const getRandom = Math.floor(Math.random() * 4) + 1;
            squareArray.push(getRandom);
        }
        let squareObj = {
            xPosition: canvas.width / 2,
            yPosition: canvas.height / 2,
            distanceFromGoal: 0
        };
        objArray.push(squareObj);
        dataArray.push(squareArray);
    }
    canvas.addEventListener('mousemove', (event) => {
        gX = event.clientX;
        gY = event.clientY;
    });
    function initLearning(ctx, numGenerations) {
        let generationCounter = 0;
        let lastFrameTime = 0;
        const fpsInterval = 1000 / speed.valueAsNumber;
        const animate = (timestamp) => {
            if (bestDistance < 15 || generationCounter >= numGenerations || resetBool) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                main(Infinity);
                return;
            }
            const elapsedTime = timestamp - lastFrameTime;
            if (elapsedTime > fpsInterval) {
                lastFrameTime = timestamp - (elapsedTime % fpsInterval);
                objArray.forEach((obj) => {
                    obj.xPosition = canvas.width / 2;
                    obj.yPosition = canvas.height / 2;
                });
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawStrokedCircle(ctx, gX, gY, 5, 'orange');
                ctx.font = '16px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(`Generations: ${generationCounter}`, 10, 20);
                dataArray.forEach((array, rowIndex) => {
                    array.forEach((value) => {
                        if (value === 1) {
                            objArray[rowIndex].xPosition -= stepLength.valueAsNumber;
                        }
                        else if (value === 2) {
                            objArray[rowIndex].yPosition -= stepLength.valueAsNumber;
                        }
                        else if (value === 3) {
                            objArray[rowIndex].xPosition += stepLength.valueAsNumber;
                        }
                        else if (value === 4) {
                            objArray[rowIndex].yPosition += stepLength.valueAsNumber;
                        }
                        render(objArray[rowIndex].xPosition, objArray[rowIndex].yPosition, ctx);
                    });
                });
                bestDistance = Infinity;
                bestDistanceIndex = 0;
                objArray.forEach((obj, index) => {
                    obj.distanceFromGoal = calculateDistance(obj.xPosition, obj.yPosition, gX, gY);
                    if (obj.distanceFromGoal < bestDistance) {
                        bestDistance = obj.distanceFromGoal;
                        bestDistanceIndex = index;
                    }
                });
                dataArray.forEach((array, rowIndex) => {
                    if (rowIndex !== bestDistanceIndex) {
                        const randomIndicesOptimal = Array.from({ length: inheritance.valueAsNumber }, () => Math.floor(Math.random() * array.length));
                        randomIndicesOptimal.forEach((randomIndex) => {
                            array[randomIndex] = dataArray[bestDistanceIndex][randomIndex];
                        });
                    }
                    const randomIndices = Array.from({ length: mutationInput.valueAsNumber }, () => Math.floor(Math.random() * array.length));
                    randomIndices.forEach((randomIndex) => {
                        array[randomIndex] = Math.floor(Math.random() * 4) + 1;
                    });
                });
                objArray.forEach((obj, index) => {
                    obj.distanceFromGoal = calculateDistance(obj.xPosition, obj.yPosition, gX, gY);
                    if (obj.distanceFromGoal < bestDistance) {
                        bestDistance = obj.distanceFromGoal;
                        bestDistanceIndex = index;
                    }
                });
                generationCounter++;
            }
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
    function render(x, y, ctx) {
        draw(x, y, pixelSize.valueAsNumber, pixelSize.valueAsNumber, 'gray', ctx);
    }
    if (ctx !== null)
        initLearning(ctx, generations);
}
main(Infinity);
//# sourceMappingURL=script.js.map