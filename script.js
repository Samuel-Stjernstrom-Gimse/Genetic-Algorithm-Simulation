"use strict";
const dataArray = [];
const objArray = [];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const draw = (x, y, w, h, color, ctx) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};
draw(0, 0, 50, 50, 'red', ctx);
function initLearning() {
    for (let i = 0; i < 20; i++) {
        const squareArray = [];
        for (let i = 0; i < 40; i++) {
            const getRandom = Math.floor(Math.random() * 3) + 1;
            squareArray.push(getRandom);
        }
        let squareObj = {
            xPosition: 0,
            yPosition: 0,
            distanceFromGoal: 0
        };
        objArray.push(squareObj);
        dataArray.push(squareArray);
    }
    renderCanvas(ctx, 0, 0);
    for (let i = 0; i < dataArray.length; i++) {
        renderCanvas(ctx, 0, 0);
    }
    for (let i = 0; i < 100; i++) {
    }
}
const renderCanvas = (ctx, xGoal, yGoal) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(0, 0, canvas.width, canvas.height, 'black', ctx);
    draw(xGoal, yGoal, 10, 10, 'red', ctx);
    for (let i = 0; i < dataArray.length; i++) {
        switch (dataArray[i][i]) {
            case 1:
                objArray[i].xPosition -= 10;
                break;
            case 2:
                objArray[i].yPosition += 10;
                break;
            case 3:
                objArray[i].xPosition += 10;
                break;
        }
        draw(objArray[i].xPosition, objArray[i].xPosition, 20, 20, 'red', ctx);
    }
};
initLearning();
//# sourceMappingURL=script.js.map