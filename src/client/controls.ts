import { PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
interface param {
	displacementStrength: number
	size: { x: number; y: number; z: number }
}
export const PARAMS: param = {
	displacementStrength: 0.5,
	size: { x: 1, y: 1, z: 1 },
}

export const orbit = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.enableZoom = false
	return controls
}
