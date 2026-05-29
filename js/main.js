//Import three.js library
import * as THREE from "three";
//Import orbit controls
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
//Allow importing of .gltf
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;

let objToRender = 'alien'

const loader = new GLTFLoader();

// Load file
loader.load(
    `assets/${objToRender}.gltf`,
    function (gltf) {
        // If file is loaded, add to scene
        object = gltf.scene;
        scene.add(object)
    },
    // Gives loading progress
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // If error
    function (error) {
        console.error(error);
    }
)

//Create Renderer
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Add renderer to DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set camera position
camera.position.z = objToRender == 'alien' ? 2 : 500;

//Add lights to scene
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(10, 20, 1000)
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender == 'alien' ? 5 : 1);
scene.add(ambientLight);

if (objToRender == 'alien') {
    controls = new OrbitControls(camera, renderer.domElement);
}

//Render scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//Allows to resize window with camera
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();