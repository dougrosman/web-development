import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Light,
  DirectionalLight,
} from '../libs/threejs/build/three.module.js';

// get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new Scene();

// set the background color
scene.background = new Color('skyblue');

// create a camera
const fov = 35; // field of view
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initally created at (0, 0, 0)
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// add the light source
const light = new DirectionalLight('white', 8);

light.position.set(10, 10, 10);

// create a geometry
const geometry = new BoxBufferGeometry(2, 2, 2);

// create a meshStandardMaterial material (basic material not affected by light)
const material = new MeshStandardMaterial({color: 'purple'});

// create a Mesh containing the geometry and material
const cube = new Mesh(geometry, material);

// rotate the cube to see the lighting in action
cube.rotation.set(-0.5, -0.1, 0.8);

// add the mesh to the scene
scene.add(cube, light);

// create the renderer, turn on antialiasing
const renderer = new WebGLRenderer({ antialias: true});

// turn on the physically correct lighting model
renderer.physicallyCorrectLights = true;

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);



// render, or 'create a still image', of the scene
renderer.render(scene, camera);



// Handle responsiveness
window.addEventListener("resize", function(){

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
})