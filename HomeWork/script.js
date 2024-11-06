import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

// Initialize the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(25, 30, 35);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Grass field with thinner thickness
const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x4CAF50 });
const fieldSize = 100;
const field = new THREE.Mesh(new THREE.BoxGeometry(fieldSize, 0, fieldSize), grassMaterial);
field.position.y = -0.25;
scene.add(field);

// Create slimmer paths
const pathMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const path1 = new THREE.Mesh(new THREE.PlaneGeometry(8, fieldSize), pathMaterial);
path1.rotation.x = -Math.PI / 2;
path1.position.y = 0.01;
scene.add(path1);

const path2 = new THREE.Mesh(new THREE.PlaneGeometry(fieldSize, 8), pathMaterial);
path2.rotation.x = -Math.PI / 2;
path2.position.y = 0.01;
scene.add(path2);

// Structures on the field

// House 1
const house1 = new THREE.Mesh(new THREE.BoxGeometry(14, 12, 14), new THREE.MeshBasicMaterial({ color: 0xFFDDC1 }));
house1.position.set(-12, 6, -12);
scene.add(house1);

// House 2
const house2 = new THREE.Mesh(new THREE.BoxGeometry(16, 10, 10), new THREE.MeshBasicMaterial({ color: 0x3498DB }));
house2.position.set(16, 5, 15);
scene.add(house2);

// New taller building
const building = new THREE.Mesh(new THREE.BoxGeometry(10, 20, 10), new THREE.MeshBasicMaterial({ color: 0x8E44AD }));
building.position.set(15, 10, -15);
scene.add(building);

// Animated Hexagons with slower speed and separate paths
const hexMaterial1 = new THREE.MeshBasicMaterial({ color: 0xE74C3C });
const hexagon1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 3, 6), hexMaterial1);
hexagon1.position.set(-15, 1.5, 0);
hexagon1.rotation.x = Math.PI / 2;
scene.add(hexagon1);

gsap.to(hexagon1.position, {
    x: 15,
    duration: 6,
    repeat: -1,
    yoyo: true,
});

const hexMaterial2 = new THREE.MeshBasicMaterial({ color: 0x2ECC71 });
const hexagon2 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 3, 6), hexMaterial2);
hexagon2.position.set(0, 1.5, -15);
hexagon2.rotation.x = Math.PI / 2;
scene.add(hexagon2);

gsap.to(hexagon2.position, {
    z: 15,
    duration: 12,
    repeat: -1,
    yoyo: true,
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
