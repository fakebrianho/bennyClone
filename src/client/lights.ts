import { AmbientLight, DirectionalLight } from 'three'

const addLight = (): AmbientLight => {
	// let light = new DirectionalLight(0xffffff, 1)
	let light = new AmbientLight(0xffffff, 0.8)
	// light.position.set(1, 1, 1)
	return light
}

export const fancyLight = (pos: {
	x: number
	y: number
	z: number
}): DirectionalLight => {
	const light = new DirectionalLight(0xffffff, 1)
	light.position.set(pos.x, pos.y, pos.z)
	return light
}

export default addLight
