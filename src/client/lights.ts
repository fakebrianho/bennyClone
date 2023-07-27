import { AmbientLight } from 'three'

const addLight = (): AmbientLight => {
	// let light = new DirectionalLight(0xffffff, 1)
	let light = new AmbientLight(0xffffff, 1)
	// light.position.set(1, 1, 1)
	return light
}

export default addLight
