import {
	BoxGeometry,
	MeshStandardMaterial,
	Mesh,
	ShaderMaterial,
	Vector2,
	Vector4,
	RepeatWrapping,
	DoubleSide,
	Texture,
	PlaneGeometry,
	MeshBasicMaterial,
	Group,
	Vector3,
	Euler,
	Quaternion,
	InstancedMesh,
} from 'three'
import { Matrix4, TextureLoader } from 'three'
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'
import texture from '../assets/textures/me.png'
import dl from '../assets/textures/tbb.jpeg'
import displacemen from '../assets/textures/disp.png'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
const loader = new GLTFLoader()
interface meshInter {
	[key: string]: any
}

export async function addCassette(meshes: meshInter): Promise<void> {
	const cassette = await loader.loadAsync(
		'/src/assets/cassette_tape/scene.gltf'
	)
	const group = new Group()
	cassette.scene.scale.set(0.5, 0.5, 0.5)
	cassette.scene.position.set(0, -0.5, 0)
	group.add(cassette.scene)
	// cassette.scene.visible = false
	group.visible = false
	meshes.model = group
}

export async function addCD(meshes: meshInter): Promise<void> {
	const cd = await loader.loadAsync(
		'/src/assets/CD/star_platinum_compact_disc.glb'
	)
	cd.scene.scale.set(12, 12, 12)
	cd.scene.position.set(0, 0, 0)
	cd.scene.rotation.x = (Math.PI / 180) * 90
	meshes.cd = cd.scene
}
export function download(): Mesh {
	const t: Texture = new TextureLoader().load(dl)
	const geometry = new PlaneGeometry(2.5, 2.5)
	const material = new MeshBasicMaterial({
		map: t,
	})
	const mesh = new Mesh(geometry, material)
	mesh.visible = false
	return mesh
}
export async function addGoods(meshes: meshInter): Promise<void> {
	const potion = await loader.loadAsync('/src/assets/Goods/potion_bottle.glb')
	const group = new Group()
	potion.scene.scale.set(5, 5, 5)
	potion.scene.position.set(0, -0.4, 0)
	group.add(potion.scene)
	group.visible = false
	// potion.scene.visible = false
	meshes.potion = group
}
export async function addPetals(meshes: meshInter): Promise<void> {
	const petal = await loader.loadAsync('/src/assets/leaf/scene.gltf')
	const iMesh = petal.scene.children[0].children[0].children[0].children[0]
	const instanceCount = 100 // adjust as needed
	// 	const meshObject = object as Mesh;
	// console.log(meshObject.geometry);
	const meshObject = iMesh as Mesh
	const instancedMesh = new InstancedMesh(
		meshObject.geometry,
		meshObject.material,
		instanceCount
	)
	const matrix = new Matrix4()
	const position = new Vector3()
	const eulerRotation = new Euler()
	const quaternion = new Quaternion()
	const scale = new Vector3()
	for (let i = 0; i < instanceCount; i++) {
		// Adjust these as needed to position your instances
		position.set(
			Math.random() * 10 - 5,
			Math.random() * 10 - 5,
			Math.random()
		)
		eulerRotation.set(
			Math.random() * 2 * Math.PI * 360,
			Math.random() * 2 * Math.PI * 360,
			Math.random() * 2 * Math.PI * 360
		) // Assuming angles are in radians

		scale.set(Math.random(), Math.random(), Math.random())

		// Update the transformation matrix for this instance
		matrix.compose(position, quaternion.setFromEuler(eulerRotation), scale)

		// Set the transformation matrix for this instance
		instancedMesh.setMatrixAt(i, matrix)
	}
	instancedMesh.instanceMatrix.needsUpdate = true
	instancedMesh.visible = false
	meshes.petal = instancedMesh
}
export const addMeshes = (): Mesh => {
	const t: Texture = new TextureLoader().load(texture)
	t.wrapS = RepeatWrapping
	t.wrapT = RepeatWrapping
	t.repeat.set(1.25, 1.25)

	const geometry = new BoxGeometry(1.4, 1.4, 1.4, 100, 100, 100)
	const material = new MeshStandardMaterial({
		map: t,
		displacementMap: t,
		displacementScale: 0.15,
	})
	const mesh = new Mesh(geometry, material)
	mesh.position.set(0, 0.2, 0)
	mesh.visible = false
	return mesh
}

export const addShader = (): Mesh => {
	const geometry = new BoxGeometry(1, 1, 1)
	const material = new ShaderMaterial({
		extensions: {
			derivatives: true,
		},
		side: DoubleSide,
		uniforms: {
			uTime: { value: 0 },
			resolution: { value: new Vector4() },
			uvRate1: {
				value: new Vector2(1, 1),
			},
			displacementStrength: { value: 0.5 },
		},
		wireframe: true,
		transparent: true,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	})
	const mesh = new Mesh(geometry, material)
	mesh.position.set(2, 0, 0)
	return mesh
}
