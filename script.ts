const dataArray: Array<number>[] = []
const objArray: any= []

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const draw = (x: number, y: number, w: number, h: number, color: string,  ctx: any): void =>{
	ctx.fillStyle = color
	ctx.fillRect(x, y, w, h,)
}

draw(0,0,50,50, 'red', ctx)

function initLearning(){

	for (let i = 0; i < 20; i++){
		const squareArray = []
		for (let i = 0; i < 40; i ++){
			const getRandom = Math.floor(Math.random() * 3) + 1;
			squareArray.push(getRandom)
		}

		let squareObj
			= {
			xPosition: 0,
			yPosition: 0,
			distanceFromGoal: 0
		}

		objArray.push(squareObj)
		dataArray.push(squareArray)
	}

	renderCanvas(ctx, 0,0,)
	for (let i = 0; i< dataArray.length; i++){
		renderCanvas(ctx, 0,0,)
	}

	for(let i = 0; i < 100; i++) {


/*		let dx = .x - a.x
		let dy = b.y - a.y

		let d = Math.sqrt(dx * dx + dy * dy)*/

	/*	for (let j = 0; j < dataArray.length; j++){
			console.log(`init value${dataArray[j]}`)
		}

		for (let i = 0; i < dataArray.length; i++){

			if (dataArray[i] === maxNum ){
				dataArray[i] = Math.random()*10
			} else {
				dataArray[i] = dataArray[i] + (maxNum * growthFactor);
			}
			console.log(`new value ${dataArray[i]}`)
		}*/

	}
}


const renderCanvas = (ctx: any, xGoal: number, yGoal: number) => {
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw( 0, 0, canvas.width, canvas.height,'black', ctx)
	//draw goal
	draw(xGoal, yGoal, 10, 10, 'red', ctx)

	for (let i = 0; i < dataArray.length; i++){

		switch (dataArray[i][i]) {
			case 1:
				objArray[i].xPosition -= 10
				break;
			case 2:
				objArray[i].yPosition += 10
				break;
			case 3:
				objArray[i].xPosition += 10
				break;
		}

		draw(objArray[i].xPosition, objArray[i].xPosition, 20, 20, 'red', ctx)
	}
}



initLearning()