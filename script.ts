import { getRandomColor } from './helpers.js'

let color: number = 1
const colorBtn = document.getElementById('color-button') as HTMLButtonElement

colorBtn.addEventListener('click', (): void => {
	color = color === 1 ? 2 : (color = color === 2 ? 3 : (color = color === 3 ? 4 : (color = color === 4 ? 5 : 1)))

	colorBtn.textContent = color === 1
		? 'gray'
		: colorBtn.textContent = color === 2
			? 'branch Random'
			: colorBtn.textContent = color === 3
				? 'pixel Random'
				: colorBtn.textContent = color === 4
					? 'generation random'
					: 'environment random'
})

const main = (generations: number): void => {
	const dataArray: Array<number>[] = []
	const objArray: any[] = []

	const mutationInput = document.getElementById('mutation-percentage') as HTMLInputElement
	const stepCount = document.getElementById('generationSize') as HTMLInputElement
	const inheritance = document.getElementById('inheritance') as HTMLInputElement
	const stepLength = document.getElementById('stepLength') as HTMLInputElement
	const pixelSize = document.getElementById('pixel') as HTMLInputElement
	const speed = document.getElementById('speed') as HTMLInputElement
	const resetBtn = document.getElementById('btn') as HTMLInputElement
	const branches = document.getElementById('branches') as HTMLInputElement

	let displayColor: string = getRandomColor()
	let resetBool: boolean = false

	resetBtn.addEventListener('click', (): void => {
		resetBool = !resetBool
	})

	let bestDistance: number = Infinity
	let bestDistanceIndex: number = Infinity

	const canvas = document.getElementById('canvas') as HTMLCanvasElement
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	let gX: number = Math.floor(Math.random() * canvas.width - 30)
	let gY: number = Math.floor(Math.random() * canvas.height - 30)

	const draw = (x: number, y: number, w: number, h: number, color: string, ctx: any): void => {
		ctx.fillStyle = color
		ctx.fillRect(x, y, w, h)
	}

	const drawStrokedCircle = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		radius: number,
		fillColor: string
	): void => {
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, 2 * Math.PI)
		ctx.fillStyle = fillColor
		ctx.fill()
		ctx.stroke()
	}

	const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
		return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
	}

	for (let i: number = 0; i < branches.valueAsNumber; i++) {
		const squareArray: number[] = []
		for (let j: number = 0; j < stepCount.valueAsNumber; j++) {
			const getRandom: number = Math.floor(Math.random() * 4) + 1
			squareArray.push(getRandom)
		}

		let squareObj: { xPosition: number; yPosition: number; distanceFromGoal: number } = {
			xPosition: canvas.width / 2,
			yPosition: canvas.height / 2,
			distanceFromGoal: 0
		}

		objArray.push(squareObj)
		dataArray.push(squareArray)
	}

	canvas.addEventListener('mousemove', (event: MouseEvent): void => {
		gX = event.clientX
		gY = event.clientY
	})

	const initLearning = (ctx: CanvasRenderingContext2D, numGenerations: number): void => {
		let generationCounter: number = 0
		let lastFrameTime: number = 0
		const fpsInterval: number = 1000 / speed.valueAsNumber

		const animate = (timestamp: number): void => {
			if (color === 4) displayColor = getRandomColor()

			if (bestDistance < 15 || generationCounter >= numGenerations || resetBool) {
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				main(Infinity)
				return
			}

			const elapsedTime: number = timestamp - lastFrameTime
			if (elapsedTime > fpsInterval) {
				lastFrameTime = timestamp - (elapsedTime % fpsInterval)

				objArray.forEach((obj): void => {
					obj.xPosition = canvas.width / 2
					obj.yPosition = canvas.height / 2
				})

				ctx.clearRect(0, 0, canvas.width, canvas.height)
				drawStrokedCircle(ctx, gX, gY, 5, 'orange')

				ctx.font = '16px Arial'
				ctx.fillStyle = 'white'
				ctx.fillText(`Generations: ${generationCounter}`, 10, 20)

				if (color === 1) {
					displayColor = 'gray'
				}

				dataArray.forEach((array: number[], rowIndex: number): void => {
					if (color === 2) {
						displayColor = getRandomColor()
					}

					array.forEach((value: number): void => {
						if (color === 3) displayColor = getRandomColor()

						if (value === 1) {
							objArray[rowIndex].xPosition -= stepLength.valueAsNumber
						} else if (value === 2) {
							objArray[rowIndex].yPosition -= stepLength.valueAsNumber
						} else if (value === 3) {
							objArray[rowIndex].xPosition += stepLength.valueAsNumber
						} else if (value === 4) {
							objArray[rowIndex].yPosition += stepLength.valueAsNumber
						}
						render(objArray[rowIndex].xPosition, objArray[rowIndex].yPosition, ctx, displayColor)
					})
				})

				bestDistance = Infinity
				bestDistanceIndex = 0
				objArray.forEach((obj, index: number): void => {
					obj.distanceFromGoal = calculateDistance(obj.xPosition, obj.yPosition, gX, gY)
					if (obj.distanceFromGoal < bestDistance) {
						bestDistance = obj.distanceFromGoal
						bestDistanceIndex = index
					}
				})
				//arv her
				dataArray.forEach((array: number[], rowIndex: number): void => {
					// optimal genes
					if (rowIndex !== bestDistanceIndex) {
						const randomIndicesOptimal: number[] = Array.from({ length: inheritance.valueAsNumber }, () =>
							Math.floor(Math.random() * array.length)
						)
						randomIndicesOptimal.forEach((randomIndex: number): void => {
							array[randomIndex] = dataArray[bestDistanceIndex][randomIndex]
						})
					}
					//random genes
					const randomIndices: number[] = Array.from({ length: mutationInput.valueAsNumber }, () =>
						Math.floor(Math.random() * array.length)
					)
					randomIndices.forEach((randomIndex: number): void => {
						array[randomIndex] = Math.floor(Math.random() * 4) + 1
					})
				})

				objArray.forEach((obj, index: number): void => {
					obj.distanceFromGoal = calculateDistance(obj.xPosition, obj.yPosition, gX, gY)

					if (obj.distanceFromGoal < bestDistance) {
						bestDistance = obj.distanceFromGoal
						bestDistanceIndex = index
					}
				})
				generationCounter++
			}

			requestAnimationFrame(animate)
		}
		requestAnimationFrame(animate)
	}

	const render = (x: number, y: number, ctx: CanvasRenderingContext2D, color: string): void => {
		draw(x, y, pixelSize.valueAsNumber, pixelSize.valueAsNumber, color, ctx)
	}

	if (ctx !== null) initLearning(ctx, generations)
}

main(Infinity)
