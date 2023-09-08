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

let scene, renderer, camera, camera2, materialEixo, materialCalotas, materialPneu, materialEsqueletoCarro, materialFarois, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = new THREE.PerspectiveCamera( 45, window.innerWidth /  window.innerHeight, 0.1, 1000 );
camera2 = initCamera(new THREE.Vector3(5,15,50));
let keyboard = new KeyboardState();
let clock = new THREE.Clock(0);
let clock2 = new THREE.Clock(0);

var message = new SecondaryBox("");
message.changeStyle("gray");
showInformation();

var trackballControls = new TrackballControls( camera2, renderer.domElement );//para visualização do carro no modo exibição
light = initDefaultBasicLight(scene, true); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

// create the ground plane
let plane = createGroundPlaneXZ(1000, 1000)
scene.add(plane);



//#############################################################################################
const carro = new Carro(scene, camera);
const pista = new Pista(scene);
var inicio = 0;
var auxCam=0;
pista.pista1();

render();

function showInformation() {
    // Use this to show information onscreen
    var controls = new InfoBox();

    controls.add("TEMPO: "+clock.getElapsedTime());
    controls.addParagraph();
    controls.add("VOLTAS: ");
    controls.addParagraph();
    controls.add("COMANDOS:");
    // controls.addParagraph();
    controls.add("X - acelera.");
    controls.add("seta para baixo - ré.");
    controls.add("seta direita e esquerda - virar o carro.");
    controls.add("espaço - modo exibição do carro.");
    controls.show();
}

function alternarPista(){

    keyboard.update();

    if (keyboard.pressed("1")) {
        pista.removePista2();
        pista.pista1();
        carro.reset();
    }else if(keyboard.pressed("2")){
        pista.removePista1();
        pista.pista2();
        carro.reset();
    }

}

function alternarCamera(){
    if(keyboard.down("space")){
        if(auxCam == 0){
            carro.reset();
            pista.removePista1();
            pista.removePista2();
            message.hide();
            auxCam = 1;
        } 
        else if(auxCam == 1){
            pista.pista1();
            message.changeStyle("gray");
            clock.elapsedTime = 0;
            auxCam = 0;
        } 
    }
}

function gameplay(){
    keyboard.update();
    if(keyboard.pressed("X") && inicio == 0){
        clock.start();
        inicio = 1;
    }
    pista.inPista(carro.esqueletoCarro.position);
}

function render() {
    trackballControls.update();
    trackballControls.target.copy(carro.esqueletoCarro.position); // Camera following object

    alternarPista();
    alternarCamera();
    
    camera.position.set(carro.esqueletoCarro.position.x-100, 50, carro.esqueletoCarro.position.z-100);
    // camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camera.lookAt(carro.esqueletoCarro.position);
    requestAnimationFrame(render); // Show events

    if(auxCam == 0){
        renderer.render(scene, camera); // Render scene
        gameplay();
        message.changeMessage("Tempo da volta: " + clock.getElapsedTime().toFixed(2)+ "  Tempo total: "+clock2.getElapsedTime().toFixed(2)+"\nVolta: ");
        carro.keyboardUpdate();
    }else if(auxCam == 1){
        renderer.render(scene, camera2) // Render scene
        clock.stop();
        inicio=0;
    }
    
}
