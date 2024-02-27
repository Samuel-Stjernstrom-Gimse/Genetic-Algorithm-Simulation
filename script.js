"use strict";
function main(generations) {
    const dataArray = [];
    const objArray = [];
    const genCount = document.getElementById('genCount');
    let bestDistance = Infinity;
    let bestDistanceIndex = Infinity;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const gX = Math.floor(Math.random() * canvas.width - 30);
    const gY = Math.floor(Math.random() * canvas.height - 30);
    const draw = (x, y, w, h, color, ctx) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    };
    function calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    for (let i = 0; i < 10; i++) {
        const squareArray = [];
        for (let j = 0; j < 10000; j++) {
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
    function initLearning(ctx, numGenerations) {
        let generationCounter = 0;
        const learningInterval = setInterval(() => {
            if (bestDistance < 2) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                bestDistance = Infinity;
                main(1000);
            }
            if (generationCounter < numGenerations) {
                objArray.forEach((obj) => {
                    obj.xPosition = 250;
                    obj.yPosition = 250;
                });
                dataArray.forEach((array, rowIndex) => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    array.forEach((value) => {
                        if (value === 1) {
                            objArray[rowIndex].xPosition -= 1;
                        }
                        else if (value === 2) {
                            objArray[rowIndex].yPosition -= 1;
                        }
                        else if (value === 3) {
                            objArray[rowIndex].xPosition += 1;
                        }
                        else if (value === 4) {
                            objArray[rowIndex].yPosition += 1;
                        }
                        render(objArray[rowIndex].xPosition, objArray[rowIndex].yPosition, gX, gY, ctx);
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
                        array.forEach((value, valueIndex) => {
                            array[valueIndex] = dataArray[bestDistanceIndex][valueIndex];
                        });
                    }
                    const randomIndices = Array.from({ length: 10 }, () => Math.floor(Math.random() * array.length));
                    randomIndices.forEach((randomIndex) => {
                        array[randomIndex] = Math.floor(Math.random() * 4) + 1;
                    });
                });
                bestDistance = Infinity;
                bestDistance = Infinity;
                objArray.forEach((obj, index) => {
                    obj.distanceFromGoal = calculateDistance(obj.xPosition, obj.yPosition, gX, gY);
                    if (obj.distanceFromGoal < bestDistance) {
                        bestDistance = obj.distanceFromGoal;
                        bestDistanceIndex = index;
                    }
                });
                generationCounter++;
            }
            else {
                clearInterval(learningInterval);
            }
        }, 100);
    }
    function render(x, y, gx, gy, ctx) {
        draw(x, y, 2, 2, 'red', ctx);
        draw(gx, gy, 10, 10, 'green', ctx);
    }
    initLearning(ctx, generations);
}
main(1000);
//# sourceMappingURL=script.js.map