import { PerspectiveCamera } from 'three'

const FOV: number = 45
interface size {
	width: number
	height: number
}
export const sizes: size = {
	width: window.innerWidth,
	height: window.innerHeight,
}

export const camera = new PerspectiveCamera(
	FOV,
	window.innerWidth / window.innerHeight,
	1,
	1000
)

camera.position.set(0, 0, 5)

export default camera
