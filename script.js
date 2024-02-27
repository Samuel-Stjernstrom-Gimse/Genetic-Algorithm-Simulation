"use strict";
const dataArray = [];
const objArray = [];
const genCount = document.getElementById('generation-counter');
let bestDistance = 10000000;
let bestDistanceIndex = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const draw = (x, y, w, h, color, ctx) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
for (let i = 0; i < 100; i++) {
    const squareArray = [];
    for (let j = 0; j < 500; j++) {
        const getRandom = Math.floor(Math.random() * 4) + 1;
        squareArray.push(getRandom);
    }
    let squareObj = {
        xPosition: 250,
        yPosition: 250,
        distanceFromGoal: 0,
    };
    objArray.push(squareObj);
    dataArray.push(squareArray);
}
function initLearning(ctx) {
    for (let i = 0; i < 10; i++) {
        objArray.forEach((obj) => {
            obj.xPosition = 250;
            obj.yPosition = 250;
        });
        dataArray.forEach((array, rowIndex) => {
            array.forEach((value, valueIndex) => {
                if (value === 1) {
                    objArray[rowIndex].xPosition -= 3;
                }
                else if (value === 2) {
                    objArray[rowIndex].yPosition -= 3;
                }
                else if (value === 3) {
                    objArray[rowIndex].xPosition += 3;
                }
                else if (value === 4) {
                    objArray[rowIndex].yPosition += 3;
                }
                objArray.forEach((obj) => {
                    setInterval(render, 100, obj.xPosition, obj.yPosition, 2, 2, ctx);
                });
            });
        });
        bestDistance = Infinity;
        bestDistance = Infinity;
        objArray.forEach((obj, index) => {
            obj.distanceFromGoal = calculateDistance(obj.xPosition, obj.yPosition, 2, 2);
            if (obj.distanceFromGoal < bestDistance) {
                bestDistance = obj.distanceFromGoal;
                bestDistanceIndex = index;
            }
            console.log(bestDistanceIndex);
        });
        dataArray.forEach((array, rowIndex) => {
            if (rowIndex !== bestDistanceIndex) {
                array.forEach((value, valueIndex) => {
                    array[valueIndex] = dataArray[bestDistanceIndex][valueIndex];
                });
            }
            const randomNum1 = Math.floor(Math.random() * array.length);
            const randomNum2 = Math.floor(Math.random() * array.length);
            const randomNum3 = Math.floor(Math.random() * array.length);
            const randomNum4 = Math.floor(Math.random() * array.length);
            const randomNum5 = Math.floor(Math.random() * array.length);
            const randomNum6 = Math.floor(Math.random() * array.length);
            const randomNum7 = Math.floor(Math.random() * array.length);
            const randomNum8 = Math.floor(Math.random() * array.length);
            const randomNum9 = Math.floor(Math.random() * array.length);
            array[randomNum1] = Math.floor(Math.random() * 4) + 1;
            array[randomNum2] = Math.floor(Math.random() * 4) + 1;
            array[randomNum3] = Math.floor(Math.random() * 4) + 1;
            array[randomNum4] = Math.floor(Math.random() * 4) + 1;
            array[randomNum5] = Math.floor(Math.random() * 4) + 1;
            array[randomNum6] = Math.floor(Math.random() * 4) + 1;
            array[randomNum7] = Math.floor(Math.random() * 4) + 1;
            array[randomNum8] = Math.floor(Math.random() * 4) + 1;
            array[randomNum9] = Math.floor(Math.random() * 4) + 1;
        });
    }
}
function render(x, y, gx, gy, ctx) {
    draw(x, y, 5, 5, 'red', ctx);
    draw(gx, gy, 30, 30, 'red', ctx);
}
initLearning(ctx);
//# sourceMappingURL=script.js.map