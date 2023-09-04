import * as THREE from 'three';
import { OrbitControls } from './build/jsm/controls/OrbitControls.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {
    initRenderer,
    initCamera,
    initDefaultBasicLight,
    setDefaultMaterial,
    InfoBox,
    SecondaryBox,
    onWindowResize,
    createGroundPlaneXZ
} from "./libs/util/util.js";

import { Carro } from "./carro.js";
import { Pista } from "./pista.js";

let scene, renderer, camera, materialEixo, materialCalotas, materialPneu, materialEsqueletoCarro, materialFarois, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = new THREE.PerspectiveCamera( 45, window.innerWidth /  window.innerHeight, 0.1, 1000 );
// camera.translateY(100);
// camera.translateZ(100);
// camera.translateX(-100);
let obj = new THREE.Object3D(10,0,0);

// camera = initCamera(new THREE.Vector3(0,100,200)); // Init camera in this position

// var controls = new TrackballControls( camera, renderer.domElement );//para visualização do carro no modo exibição
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
// Show text information onscreen
showInformation();
// create the ground plane
let plane = createGroundPlaneXZ(1000, 1000)
scene.add(plane);



//#############################################################################################
const carro = new Carro(scene, camera);
const pista = new Pista(scene);

// pista.pista1();
pista.pista2();


// carro.esqueletoCarro.add(camera);

// scene.add(carro);
// scene.add(pista);
// var aux=0;
// camera.up.copy(0.0, 1.0, 0.0);
// camera.lookAt((carro.esqueletoCarro.position.x), (carro.esqueletoCarro.position.y), (carro.esqueletoCarro.position.z));
render();

function showInformation() {
    // Use this to show information onscreen
    var controls = new InfoBox();
    controls.add("COMANDOS  ");
    controls.addParagraph();
    controls.add("X - acelera.");
    controls.add("seta para baixo - ré.");
    controls.add("seta direita e esquerda - virar o carro.");
    controls.add("XXXX - modo exibição do carro.");
    controls.show();
}

// camera.position.copy(0, -20, 0);

function render() {
    carro.keyboardUpdate();
    // camera.position.copy(0, -20, 0);
    camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camera.lookAt(carro.esqueletoCarro.position);
    requestAnimationFrame(render); // Show events
    renderer.render(scene, camera) // Render scene
}
