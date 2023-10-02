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
    BoxSuperior,
    onWindowResize,
    createGroundPlaneXZ
} from "./libs/util/util.js";

import { Carro } from "./carro.js";
import { Pista } from "./pista.js";

let scene, renderer, camera, camera2, materialEixo, materialCalotas, materialPneu, materialEsqueletoCarro, materialFarois, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = new THREE.PerspectiveCamera( 30, window.innerWidth /  window.innerHeight, 0.1, 1000 );
camera2 = initCamera(new THREE.Vector3(250,40,-30));
let keyboard = new KeyboardState();
let tVolta = new THREE.Clock(0);
let tTotal = new THREE.Clock(0);
let voltas=0;
let tempos = new Array(4);

var message = new BoxSuperior("");
// message.changeStyle("gray");
showInformation();

var trackballControls = new TrackballControls( camera2, renderer.domElement );//para visualização do carro no modo exibição
light = initDefaultBasicLight(scene, true); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

// create the ground plane
let plane = createGroundPlaneXZ(1000000, 1000000)
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
            tVolta.elapsedTime = 0;
            tTotal.elapsedTime = 0;
            auxCam = 0;
        } 
    }
}

function gameplay(){
    keyboard.update();
    if(keyboard.pressed("X") && inicio == 0){
        tTotal.start();
        tVolta.start();
        inicio = 1;
    }
    
    //SE O CARRO SAIR DA PISTA
    if(!pista.inPista(carro.esqueletoCarro.position)){
        // console.log(carro.moveDistance);
        if(carro.moveDistance > 0.8){
            carro.moveDistance -= 0.05;
        }
    }

    if(pista.volta()){
        tempos[voltas] = tVolta.elapsedTime.toFixed(2);
        tVolta.elapsedTime = 0;
        voltas+=1;
        if(voltas == 4){
            tVolta.elapsedTime = 0;
            setTimeout(function(){
                tVolta.elapsedTime = 0;
            alert("O JOGO TERMINOU!!!\nTempo total: "+tTotal.elapsedTime.toFixed(2)+"\nVolta 1: "+tempos[0]+"\nVolta 2: "+tempos[1]+"\nVolta 3: "+tempos[2]+"\nVolta 4: "+tempos[3]);
                location.reload();
            }, 100);
        }
    }
}

// ## construção ##

var vetor = [[0, 10, 0], [-0.5, 11.5, 4], [0, 10.1, 10], [0, 10.2, 4], //1, 2, 3, 4 
                  [-0.5, 8.2, 9.7], [-0.5, 8.2, 8.7], [-0.5, 9.1, 8.2], [-0.5, 9.1, 6.9], 
                  [-0.5, 8.05, 6.4], [-0.5, 7.6, 6.4], [-0.5, 7.6, 2.4], [-0.5, 8.05, 2.3], [-0.5, 9.2, 1.8] , [-0.5, 9.2, 0.9], [-0.5, 8.5, 0.4], [-0.5, 8.5, 0.1]
                  ];
                  
function render() {
    trackballControls.update();
    trackballControls.target.copy(carro.esqueletoCarro.position); // Camera following object

    alternarPista();
    alternarCamera();
    
    camera.position.set(carro.esqueletoCarro.position.x-100, 50, carro.esqueletoCarro.position.z-80);
    // camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camera.lookAt(carro.esqueletoCarro.position);
    requestAnimationFrame(render); // Show events

    //camera da gampeplay
    if(auxCam == 0){
        renderer.render(scene, camera); // Render scene
        gameplay();
        message.changeMessage("Tempo da volta: " + tVolta.getElapsedTime().toFixed(2)+ "\nTempo total: "+tTotal.getElapsedTime().toFixed(2)+"\nVolta: "+voltas);
        carro.keyboardUpdate();
    }else if(auxCam == 1){//camera de visualização
        renderer.render(scene, camera2) // Render scene
        tVolta.stop();
        tTotal.stop();
        inicio=0;
    }
    
}
