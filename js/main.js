//Import three.js library
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js";
//Import orbit controls
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.184.0/examples/jsm/controls/OrbitControls.js"
//Allow importing of .gltf
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.184.0/examples/jsm/loaders/GLTFLoader.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;

let objToRender = 'Alien'

const loader = new GLTFLoader();

// Load file
loader.load(
    'models/${objToRender}/scene.gltf',
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
