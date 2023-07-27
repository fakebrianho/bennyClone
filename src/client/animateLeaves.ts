import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from 'three'

export function animateLeaves(rSpeed: number, instanced: InstancedMesh) {
	const matrix = new Matrix4()
	const quaternion = new Quaternion()
	const eulerRotation = new Euler()
	const scale = new Vector3()
	const position = new Vector3()
	const rotationSpeed: number = rSpeed
	for (let i = 0; i < instanced.count; i++) {
		instanced.getMatrixAt(i, matrix)
		matrix.decompose(position, quaternion, scale)
		// Convert the quaternion to Euler, add a small rotation, and convert back to quaternion
		position.y -= 0.01
		if (position.y < -5) {
			position.y = 5
		}
		// instanced.position.y = -8
		eulerRotation.setFromQuaternion(quaternion)
		eulerRotation.y += rotationSpeed // Add to the y component of the Euler object
		eulerRotation.z += rotationSpeed // Add to the y component of the Euler object
		// eulerRotation.x += rotationSpeed // Add to the y component of the Euler object
		quaternion.setFromEuler(eulerRotation)

		// Compose the transformation matrix again and update it for this instance
		matrix.compose(position, quaternion, scale)
		instanced.setMatrixAt(i, matrix)
	}
	instanced.instanceMatrix.needsUpdate = true
}
//
