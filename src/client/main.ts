import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import {
	addMeshes,
	addCassette,
	addCD,
	addGoods,
	download,
	addPetals,
} from './addMeshes'
import { animateLeaves } from './animateLeaves'
import { resize } from './eventListeners'
import './style.css'

// let renderer, scene
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
const scene = new THREE.Scene()
const audio: HTMLAudioElement | null = document.querySelector('.audio')
const loader: HTMLDivElement | null = document.querySelector('.loader')
const main: HTMLDivElement | null = document.querySelector('.main')
// document.body.style.visibility = 'visible';
const meshes: { [key: string]: any } = {}
const lights: { [key: string]: any } = {}
const clock = new THREE.Clock()
let accumulatedTime: number = 0
let isDragging: boolean = false
let directionX = Math.random() < 0.5 ? -1 : 1
let directionY = Math.random() < 0.5 ? -1 : 1
let lastSwitchTimeX = Date.now()
let lastSwitchTimeY = Date.now()
const switchInterval = 2000 // Interv
let previousMousePosition = { x: 0, y: 0 }
let rotationVelocity = { x: 0, y: 0 }
let rotationFriction = 0.9

init()
dragging()
function init(): void {
	renderer.setSize(sizes.width, sizes.height)
	document.body.appendChild(renderer.domElement)
	meshes.default = addMeshes()
	meshes.download = download()
	lights.default = addLight()
	addCassette(meshes).then(() => {
		scene.add(meshes.model)
	})
	addCD(meshes).then(() => {
		scene.add(meshes.cd)
	})
	addGoods(meshes).then(() => {
		scene.add(meshes.potion)
	})
	addPetals(meshes).then(() => {
		scene.add(meshes.petal)
	})
	scene.add(meshes.default)
	scene.add(lights.default)
	scene.add(meshes.download)
	resize(camera, renderer, sizes)
	// controls = orbit(camera, renderer)
	navigation()
	animate()
}

function navigation() {
	let btn = document.querySelectorAll('.btn')
	let btnArray = Array.from(btn)
	btnArray.map((b) => {
		b.addEventListener('click', () => {
			var current = document.getElementsByClassName('active')
			current[0].className = current[0].className.replace(' active', '')
			b.className += ' active'
			animationHandler(b)
		})
	})
}

function animationHandler(active: Element): void {
	if (active.id == '1') {
		meshes.cd.visible = true
		meshes.default.visible = false
		meshes.model.visible = false
		meshes.download.visible = false
		meshes.potion.visible = false
		meshes.default.visible = false
		meshes.petal.visible = false
		if (audio !== null) {
			audio.style.display = 'none'
		}
		audio?.pause()
	} else if (active.id == '2') {
		meshes.cd.visible = false
		// console.log(meshes.model.children[0].v)
		meshes.model.visible = true
		meshes.default.visible = false
		meshes.download.visible = false
		meshes.potion.visible = false
		meshes.default.visible = false
		meshes.petal.visible = false
		audio?.pause()
		if (audio !== null) {
			audio.style.display = 'none'
		}
	} else if (active.id == '3') {
		meshes.cd.visible = false
		meshes.default.visible = false
		meshes.model.visible = false
		meshes.download.visible = true
		if (audio !== null) {
			audio.style.display = 'none'
		}
		audio?.pause()
		meshes.potion.visible = false
		meshes.default.visible = false
		meshes.petal.visible = false
	} else if (active.id == '4') {
		meshes.cd.visible = false
		meshes.default.visible = false
		meshes.model.visible = false
		meshes.download.visible = false
		meshes.potion.visible = true
		meshes.petal.visible = false
		meshes.default.visible = false
		if (audio !== null) {
			audio.style.display = 'none'
		}
		audio?.pause()
	} else if (active.id == '5') {
		meshes.petal.visible = true
		meshes.cd.visible = false
		meshes.default.visible = false
		meshes.model.visible = false
		meshes.download.visible = false
		meshes.potion.visible = false
		meshes.default.visible = false
		// audio.style.display = 'block'
		if (audio !== null) {
			audio.style.display = 'block'
		}
		audio?.play()
	} else {
		audio?.pause()
		if (audio !== null) {
			audio.style.display = 'none'
		}
		meshes.cd.visible = false
		meshes.petal.visible = false
		meshes.default.visible = false
		meshes.model.visible = false
		meshes.download.visible = false
		meshes.potion.visible = false
		meshes.default.visible = true
	}
}
function dragging() {
	renderer.domElement.addEventListener('mousedown', startDragging, false)
	renderer.domElement.addEventListener('mousemove', drag, false)
	renderer.domElement.addEventListener('mouseup', stopDragging, false)

	renderer.domElement.addEventListener('touchstart', startDragging, false)
	renderer.domElement.addEventListener('touchmove', drag, false)
	renderer.domElement.addEventListener('touchend', stopDragging, false)

	function startDragging(e: MouseEvent | TouchEvent) {
		isDragging = true
		// determine if it is a touch event
		if (e instanceof TouchEvent) {
			previousMousePosition = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			}
		} else {
			previousMousePosition = { x: e.clientX, y: e.clientY }
		}
	}

	function drag(e: MouseEvent | TouchEvent) {
		if (!isDragging) return

		let currentMousePosition

		// determine if it is a touch event
		if (e instanceof TouchEvent) {
			currentMousePosition = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			}
		} else {
			currentMousePosition = { x: e.clientX, y: e.clientY }
		}

		const deltaMove = {
			x: currentMousePosition.x - previousMousePosition.x,
			y: currentMousePosition.y - previousMousePosition.y,
		}

		const rotationSpeed = 0.005 // Control the speed of rotation
		meshes.default.rotation.y += deltaMove.x * rotationSpeed
		meshes.default.rotation.x += deltaMove.y * rotationSpeed
		meshes.cd.rotation.y += deltaMove.x * rotationSpeed
		meshes.cd.rotation.x += deltaMove.y * rotationSpeed
		meshes.model.rotation.y += deltaMove.x * rotationSpeed
		meshes.model.rotation.x += deltaMove.y * rotationSpeed
		meshes.potion.rotation.y += deltaMove.x * rotationSpeed
		meshes.potion.rotation.x += deltaMove.y * rotationSpeed
		rotationVelocity.x = deltaMove.x * rotationSpeed
		rotationVelocity.y = deltaMove.y * rotationSpeed

		previousMousePosition = currentMousePosition
	}

	function stopDragging() {
		isDragging = false
	}
}

function animate(): void {
	requestAnimationFrame(animate)

	if (meshes.petal && meshes.model && meshes.potion && meshes.default) {
		main.style.visibility = 'visible'
		loader.style.display = 'none'
	}
	if (meshes.petal) {
		if (meshes.petal.visible) {
			animateLeaves(0.01, meshes.petal)
		}
	}

	let dt: number = clock.getDelta()
	if (!isDragging && meshes.cd && meshes.model && meshes.potion) {
		meshes.default.rotation.y += rotationVelocity.x
		meshes.default.rotation.x += rotationVelocity.y
		meshes.cd.rotation.y += rotationVelocity.x
		meshes.cd.rotation.x += rotationVelocity.y
		meshes.model.rotation.y += rotationVelocity.x
		meshes.model.rotation.x += rotationVelocity.y
		meshes.potion.rotation.y += rotationVelocity.x
		meshes.potion.rotation.x += rotationVelocity.y
		// Apply "friction":
		rotationVelocity.x *= rotationFriction
		rotationVelocity.y *= rotationFriction
	}
	accumulatedTime += dt

	const time = Date.now()

	// Check if it's time to switch direction for X
	if (time > lastSwitchTimeX + switchInterval) {
		directionX *= -1
		lastSwitchTimeX = time
	}

	// Check if it's time to switch direction for Y
	if (time > lastSwitchTimeY + switchInterval) {
		directionY *= -1
		lastSwitchTimeY = time
	}

	// Use sin(time) for smoother movement
	let offsetX = Math.sin(time * 0.001) * 0.002 * directionX
	let offsetY = Math.sin(time * 0.001) * 0.002 * directionY

	// Apply the offset to the texture
	meshes.default.material.map.offset.x += offsetX
	meshes.default.material.map.offset.y += offsetY
	meshes.default.material.displacementMap.offset.x += offsetX
	meshes.default.material.displacementMap.offset.y += offsetY

	renderer.render(scene, camera)
	renderer.render(scene, camera)
}
