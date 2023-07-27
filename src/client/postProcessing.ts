import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import {
	Vector2,
	ReinhardToneMapping,
	WebGLRenderer,
	Scene,
	PerspectiveCamera,
} from 'three'

const params = {
	threshold: 0,
	strength: 0.3,
	radius: 1,
	exposure: 0.65,
}

export const postprocessing = (
	renderer: WebGLRenderer,
	scene: Scene,
	camera: PerspectiveCamera
) => {
	const composer: EffectComposer = new EffectComposer(renderer)
	const renderScene = new RenderPass(scene, camera)

	const bloomPass = new UnrealBloomPass(
		new Vector2(window.innerWidth, window.innerHeight),
		1.5,
		0.4,
		0.85
	)
	bloomPass.threshold = params.threshold
	bloomPass.strength = params.strength
	bloomPass.radius = params.radius

	const outputPass = new OutputPass(ReinhardToneMapping)

	composer.addPass(renderScene)
	composer.addPass(bloomPass)
	composer.addPass(outputPass)
	return composer
}
