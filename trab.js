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
camera = new THREE.PerspectiveCamera( 45, window.screen.width /  window.screen.height, 0.1, 1000 );
// camera = initCamera(new THREE.Vector3(0,100,200)); // Init camera in this position
// camera.rotateY(1.516);
var controls = new TrackballControls( camera, renderer.domElement );//para visualização do carro no modo exibição
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
const carro = new Carro(scene);
const pista = new Pista(scene);

// pista.pista1();
pista.pista2();


// carro.esqueletoCarro.add(camera);
// scene.add(carro);
// scene.add(pista);
var aux=0;
camera.position.copy(3.7, 2.2, 1.0);
camera.up.copy(0.0, 1.0, 0.0);
camera.lookAt((carro.esqueletoCarro.position.x), (carro.esqueletoCarro.position.y), (carro.esqueletoCarro.position.z));
render();

function showInformation() {
    // Use this to show information onscreen
    var controls = new InfoBox();
    controls.add("Geometric Transformation");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the cube in X.");
    // controls.add("Press Page Up or Page down to move the cube over the Z axis");
    controls.add("Press 'arrow left' and 'arrow right' to rotate.");
    // controls.add("Press 'W' and 'S' to change scale");
    controls.show();
}

// camera.position.copy(0, -20, 0);

function render() {
    carro.keyboardUpdate();
    // camera.position.copy(0, -20, 0);
    // camera.lookAt(carro.esqueletoCarro.position);
    requestAnimationFrame(render); // Show events
    renderer.render(scene, camera) // Render scene
}
