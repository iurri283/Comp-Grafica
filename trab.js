import * as THREE from 'three';
import { OrbitControls } from './build/jsm/controls/OrbitControls.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from './libs/util/KeyboardState.js';
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
let obj = new THREE.Object3D(10,0,0);
let keyboard = new KeyboardState();

// camera = initCamera(new THREE.Vector3(0,100,200)); // Init camera in this position

// var controls = new TrackballControls( camera, renderer.domElement );//para visualização do carro no modo exibição
light = initDefaultBasicLight(scene, true); // Create a basic light to illuminate the scene
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

function alternarPista(){

    keyboard.update();

    if (keyboard.pressed("1")) {
        pista.removePista2();
        pista.pista1();
    }else if(keyboard.pressed("2")){
        pista.removePista1();
        pista.pista2();
    }

}

function render() {
    alternarPista();
    carro.keyboardUpdate();
    camera.position.set(carro.esqueletoCarro.position.x-100, 50, carro.esqueletoCarro.position.z-100);
    // camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camera.lookAt(carro.esqueletoCarro.position);
    requestAnimationFrame(render); // Show events
    renderer.render(scene, camera) // Render scene
}
