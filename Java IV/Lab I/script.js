import * as THREE from 'three';
const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(5, 5, 5);
scene.add(light);


scene.add(light);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,         
    shininess: 100,          
    specular: 0x555555        
  });
const box = new THREE.Mesh(boxGeometry, boxMaterial);


const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,         
    shininess: 100,          
    specular: 0x555555        
  });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

const cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 2, 32 );
const cylinderMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000ff,         
    shininess: 100,          
    specular: 0x555555        
  }); 
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial ); 

box.position.x = -4;
sphere.position.x = 4;
cylinder.position.z = 1;

scene.add(cylinder);
scene.add(box)
scene.add(sphere)


const sizes = {
    width: 800,
    height: 600
}

// Camera
const orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0, 100);

const camera = new THREE.PerspectiveCamera(75, 800 / 600);
camera.position.z = 10;
camera.position.y = 2;
scene.add(camera);
scene.add(orthoCamera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("perspective").appendChild(renderer.domElement);

const orthoRenderer = new THREE.WebGLRenderer();
orthoRenderer.setSize(800, 600)
document.getElementById("orthographic").appendChild(orthoRenderer.domElement);

orthoCamera.position.z = 5;
orthoRenderer.render(scene, orthoCamera);


const animate = () => {
  requestAnimationFrame(animate);
  box.rotation.y += 0.1;
  console.log(cylinder.position);
  renderer.render(scene, camera);
}

animate();
