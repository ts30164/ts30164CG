import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// Setting up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222831);

// Setting up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 12);

// Setting up the renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('classroomCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding ambient and point lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const overheadLight = new THREE.PointLight(0xffffff, 100);
overheadLight.position.set(0, 10, 10);
scene.add(overheadLight);

// Creating the classroom cube
const cubeGeometry = new THREE.BoxGeometry(10, 3.01, 10);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x918b79, side: THREE.BackSide });
const classroom = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(classroom);

// Adding floor
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('./floor/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.repeat.set(50, 50); 

const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    bumpMap: floorTexture,
    bumpScale: 0.2,
});

const floorGeometry = new THREE.PlaneGeometry(30, 30, 30, 30);
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2; 
floorMesh.position.y = -1.5; 
floorMesh.scale.set (0.335, 0.335, 0.335);
scene.add(floorMesh);

// Adding chairs
const chairLoader = new GLTFLoader();
chairLoader.load(
  './chair/chair.glb', 
  (gltf) => {
    const chairModel = gltf.scene;
    const startX = -3;
    const startZ = -2;
    const spacing = 2;

    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const chair = chairModel.clone();
        chair.scale.set(1, 1, 1);
        chair.position.set(startX +0.5 + col * spacing, -1.5, startZ + row * spacing+1);
        scene.add(chair);
      }
    }
  },
  undefined,
  (error) => {
    console.error('Error loading chair model:', error);
  }
);

//extra chairs blue
chairLoader.load(
  './chair/chair2.glb', 
  (gltf) => {
    const chairModel = gltf.scene;
    const startX = 1.5;
    const startZ = -2;
    const spacing = 0.8;

   
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 1; col++) {
        const chair = chairModel.clone();
        chair.scale.set(0.23, 0.23, 0.23);
        chair.position.set(startX +3 + col * spacing, -1.5, startZ + row * spacing+1);
        chair.rotation.y= - Math.PI/2;
        scene.add(chair);
      }
    }
  },
  undefined,
  (error) => {
    console.error('Error loading chair model:', error);
  }
);
//professor's chair
chairLoader.load(
  './chair/chair2.glb', 
  (gltf) => {
    const chairModel = gltf.scene;
    const startX = 1.5;
    const startZ = -2;
    const spacing = 0.8;

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 1; col++) {
        const chair = chairModel.clone();
        chair.scale.set(0.23, 0.23, 0.23);
        chair.position.set(startX +3 + col * spacing, -1.5, startZ + row * spacing+1);
        chair.rotation.y= - Math.PI/2;
        scene.add(chair);
      }
    }
  },
  undefined,
  (error) => {
    console.error('Error loading chair model:', error);
  }
);


// Adding windows
const windowMtlLoader = new MTLLoader();
windowMtlLoader.load('./window/window.mtl', (materials) => {
  materials.preload();

  const windowObjLoader = new OBJLoader();
  windowObjLoader.setMaterials(materials);
  windowObjLoader.load(
    './window/window.obj',
    (object) => {
      object.scale.set(-0.025, 0.025, 0.025);

      // Adding multiple windows
      const window1 = object.clone();
      window1.position.set(-4.6, -.5, -2);
      window1.rotation.y = Math.PI / 2;
      scene.add(window1);

      const window2 = object.clone();
      window2.position.set(-4.6, -.5, 2);
      window2.rotation.y = Math.PI / 2;
      scene.add(window2);
    },
    undefined,
    (error) => {
      console.error('Error loading window model:', error);
    }
  );
});

// Adding a board using GLTFLoader
chairLoader.load('./board/board.glb', (gltf) => {
  const board = gltf.scene;
  board.scale.set(0.6, 0.6, 0.6);
  board.position.set(0, 0, -4.98);
  board.rotation.y = Math.PI / 2;
  scene.add(board);
});

// Adding a poster using MTL and OBJ
const posterMtlLoader = new MTLLoader();
posterMtlLoader.load('./poster/poster.mtl', (materials) => {
  materials.preload();

  const posterObjLoader = new OBJLoader();
  posterObjLoader.setMaterials(materials);
  posterObjLoader.load(
    './poster/poster.obj',
    (object) => {
      object.scale.set(2, 2, 2);
      object.position.set(0, 0, 0);
      object.rotation.y = 0;
      scene.add(object);
    },
    undefined,
    (error) => {
      console.error('Error loading poster model:', error);
    }
  );
});
const doorLoader = new FBXLoader();
doorLoader.load(
  './door/door.fbx',
  (object) => {
    object.scale.set(0.005, 0.005, 0.005);
    object.position.set(4.92, -1.5, -3);
    object.rotation.y = Math.PI;
    scene.add(object);
  },
  undefined,
  (error) => {
    console.error('Error loading door model:', error);
  }
);

//Professor's desk (no chair)
const deskLoader = new FBXLoader();
deskLoader.load(
  './chair/professor.fbx',
  (object) => {
    object.scale.set(0.0037, 0.003, 0.0037);
    object.position.set(-2.5, -.9, -3.5); 
    object.rotation.y = Math.PI;
    scene.add(object);
  },
  undefined,
  (error) => {
    console.error('Error loading door model:', error);
  }
);

//Window's view
textureLoader.load('/window/window_view.jpg', (texture) => {
  const windowGeometry = new THREE.PlaneGeometry(0.9, 1.2);
  const windowMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  const windowMesh2 = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.position.set(-4.98, 0.2, -2);
  windowMesh.rotation.y = Math.PI /2;
  windowMesh2.position.set(-4.98, 0.2, 2);
  windowMesh2.rotation.y = Math.PI /2;
  scene.add(windowMesh2);
  scene.add(windowMesh);
});
//posters
textureLoader.load('/poster/image1.png', (texture) => {
  const posterGeometry = new THREE.PlaneGeometry(0.9, 1.2);
  const posterMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const posterMesh = new THREE.Mesh(posterGeometry, posterMaterial);
  posterMesh.position.set(3.5, 0, -4.98);
  posterMesh.rotation.y = 0;
  scene.add(posterMesh);
});
textureLoader.load('/poster/image2.jpeg', (texture) => {
  const posterGeometry = new THREE.PlaneGeometry(0.6, 0.85);
  const posterMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const posterMesh = new THREE.Mesh(posterGeometry, posterMaterial);
  posterMesh.position.set(2.6, 0.5, -4.98);
  posterMesh.rotation.y = 0;
  scene.add(posterMesh);
});
textureLoader.load('/poster/image3.jpeg', (texture) => {
  const posterGeometry = new THREE.PlaneGeometry(0.6, 0.6);
  const posterMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const posterMesh = new THREE.Mesh(posterGeometry, posterMaterial);
  posterMesh.position.set(2.5, -0.5, -4.98);
  posterMesh.rotation.y = 0;
  scene.add(posterMesh);
});
textureLoader.load('/poster/image4.jpeg', (texture) => {
  const posterGeometry = new THREE.PlaneGeometry(0.75, 0.75);
  const posterMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const posterMesh = new THREE.Mesh(posterGeometry, posterMaterial);
  posterMesh.position.set(4.98, -0.2, -4.35);
  posterMesh.rotation.y = - Math.PI / 2;
  scene.add(posterMesh);
});


//Hallway view
textureLoader.load('/door/door_view.jpg', (texture) => {
  const doorGeometry = new THREE.PlaneGeometry(0.9, 2.2);
  const doorMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
  doorMesh.position.set(4.98, -.5, -3.2);
  doorMesh.rotation.y = -Math.PI /2;
  scene.add(doorMesh);
});
// Adding orbit controls for camera interaction
const controls = new OrbitControls(camera, renderer.domElement);

// Responsive canvas resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const loader = new GLTFLoader();
loader.load('./poster/poster.glb', (gltf) => {
  const poster = gltf.scene;
  poster.scale.set(0.7, 0.7, 0.7);
  poster.position.set(0, 0, 0);
  scene.add(poster);
}, undefined, (error) => {
  console.error('Error loading GLB:', error);
});
// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
