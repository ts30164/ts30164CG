import * as THREE from 'three';

const scene = new THREE.Scene();

// Plane Geometry
const geometry = new THREE.PlaneGeometry(7, 8, 10, 15);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);

plane.rotateX(2);
scene.add(plane);

// Define 5 different geometries
const geometries = [
    new THREE.BoxGeometry(0.5, 0.5, 0.5), // Cube
    new THREE.SphereGeometry(0.3, 16, 16), // Sphere
    new THREE.ConeGeometry(0.3, 0.8, 16),  // Cone
    new THREE.TorusGeometry(0.8, 0.1, 16, 100), // Torus
    new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16), // Cylinder
];

// Define materials with different colors for each shape
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red for cube
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green for sphere
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue for cone
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta for torus
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow for cylinder
];

// Add each shape to the scene and position them randomly on the plane
for (let i = 0; i < geometries.length; i++) {
    const mesh = new THREE.Mesh(geometries[i], materials[i]);
    
    // Randomly position each mesh on the plane
    mesh.position.x = 6;
    mesh.position.y = 6;
    mesh.position.z = 1; // Lift above the plane for visibility
    scene.add(mesh);
}

// Set up the camera
const sizes = {
    width: 120,
    height: 100,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.x = 1;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.getElementById("scene").appendChild(renderer.domElement);

// Render
renderer.render(scene, camera);
