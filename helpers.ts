export const getRandomNumberInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
export const getRandomColor = (): string => {
	const red = getRandomNumberInRange(0, 255)
	const green = getRandomNumberInRange(0, 255)
	const blue = getRandomNumberInRange(0, 255)
	return `rgb(${red},${green},${blue})`
}
