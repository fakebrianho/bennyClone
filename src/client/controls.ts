import { Pane } from 'tweakpane'
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

// const pane: Pane = new Pane()

// const folder = pane.addFolder({
// 	title: 'Parameters',
// })

// folder.addInput(PARAMS, 'displacementStrength', {
// 	min: 0.1,
// 	max: 1.0,
// 	step: 0.1,
// })

// folder.addInput(PARAMS, 'size', {
// 	min: 0.5,
// 	max: 10,
// 	step: 0.1,
// })

export const orbit = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.enableZoom = false
	return controls
}
