import * as THREE from 'three';
import { OrbitControls } from './build/jsm/controls/OrbitControls.js';
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

let scene, renderer, camera, materialEixo, materialCalotas, materialPneu, materialEsqueletoCarro, materialFarois, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
materialEixo = new THREE.MeshBasicMaterial({ color: 0x0000FF }); // create a basic material
materialCalotas = new THREE.MeshBasicMaterial({ color: 0xFFFF80 }); // create a basic material
materialPneu = new THREE.MeshBasicMaterial({ color: 0x000000 });
materialFarois = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
materialEsqueletoCarro = new THREE.MeshBasicMaterial({ color: 0x008000 });
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.


let clock = new THREE.Clock();

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

// Use to scale the cube
var scale = 1.0;

// Show text information onscreen
showInformation();

// To use the keyboard
var keyboard = new KeyboardState();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);


//#################################################-- EIXOS E RODAS DIANTEIROS --##############################
// let axesHelper = new THREE.AxesHelper( 12 );
//criando rodas dianteiras
let rodasGeometry = new THREE.TorusGeometry(1, 0.4, 12, 48);

let rd1 = new THREE.Mesh(rodasGeometry, materialPneu);
let rd2 = new THREE.Mesh(rodasGeometry, materialPneu);

rd1.position.set(0.0, 3.5, 0.0);
rd2.position.set(0.0, -3.5, 0.0);

rd1.rotateX(1.5708);
rd2.rotateX(1.5708);

rd2.add(axesHelper);

//criando calotas
let calotasGeometry = new THREE.CircleGeometry(0.7, 0);
let calotaRd1 = new THREE.Mesh(calotasGeometry, materialCalotas);
let calotaRd2 = new THREE.Mesh(calotasGeometry, materialCalotas);

calotaRd1.position.set(0.0, 0.0, -0.2);
calotaRd2.position.set(0.0, 0.0, 0.2);

calotaRd1.rotateX(3.1416);
// calotaRd2.rotateX(-1.5708);

rd1.add(calotaRd1);
rd2.add(calotaRd2);

//criando eixos
let eixoGeometry = new THREE.CylinderGeometry(0.2, 0.2, 7, 64);
let eixoDianteiro = new THREE.Mesh(eixoGeometry, materialEixo);

eixoDianteiro.position.set(4, -2.0, 0);
eixoDianteiro.rotateX(1.5708);

scene.add(eixoDianteiro);
eixoDianteiro.add(rd1);
eixoDianteiro.add(rd2);


//#################################################--EIXOS E RODAS TRASEIRA--###############################################
//criando rodas traseiras
let rt1 = new THREE.Mesh(rodasGeometry, materialPneu);
let rt2 = new THREE.Mesh(rodasGeometry, materialPneu);

rt1.position.set(0.0, 3.5, 0.0);
rt2.position.set(0.0, -3.5, 0.0);

rt1.rotateX(1.5708);
rt2.rotateX(1.5708);

//criando calotas
let calotaRt1 = new THREE.Mesh(calotasGeometry, materialCalotas);
let calotaRt2 = new THREE.Mesh(calotasGeometry, materialCalotas);
calotaRt1.position.set(0.0, 0.0, -0.2);
calotaRt2.position.set(0.0, 0.0, 0.2);


// calotaRt1.rotateX(1.5708);
calotaRt1.rotateX(3.1416);

rt1.add(calotaRt1);
rt2.add(calotaRt2);

let eixoTraseiro = new THREE.Mesh(eixoGeometry, materialEixo);
eixoTraseiro.position.set(-4.0, -2.0, 0.0);
eixoTraseiro.rotateX(1.5708);


scene.add(eixoTraseiro);
eixoTraseiro.add(rt1);
eixoTraseiro.add(rt2);

//#################################################-- FAROIS DO CARRO --###############################################
let esferaGeometry = new THREE.SphereGeometry(0.5, 64, 32);
let farol1 = new THREE.Mesh(esferaGeometry, materialFarois);
let farol2 = new THREE.Mesh(esferaGeometry, materialFarois);

farol1.position.set(5, -1.0, 2);
farol2.position.set(5, -1.0, -2);

scene.add(farol1);
scene.add(farol2);

//#################################################-- ESQUELETO DO CARRO --###############################################
let cubeGeometry = new THREE.BoxGeometry(10, 4, 6.2);
let esqueletoCarro = new THREE.Mesh(cubeGeometry, materialEsqueletoCarro);
esqueletoCarro.position.set(0.0, 3.0, 0.0);
scene.add(esqueletoCarro);

esqueletoCarro.add(eixoDianteiro);
esqueletoCarro.add(eixoTraseiro);
esqueletoCarro.add(farol1);
esqueletoCarro.add(farol2);



render();

// var speed = 10;
var moveDistance = 0.0;
var velMaxima = 1;

function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("X")) {

        calotaRd1.rotateZ(1);
        calotaRd2.rotateZ(1);
        calotaRt1.rotateZ(1);
        calotaRt2.rotateZ(1);

        if (moveDistance < velMaxima) {
            moveDistance += 0.003;
        }

        console.log(moveDistance);
        console.log("\nClock delta: " + clock.getDelta());
        esqueletoCarro.translateX(moveDistance);

        if (keyboard.pressed("left")) {
            esqueletoCarro.rotateY(0.05);
            esqueletoCarro.rotateY(0.05);
        } else if (keyboard.pressed("right")) {
            esqueletoCarro.rotateY(-0.05);
            esqueletoCarro.rotateY(-0.05);
        }
    } else {
        if(moveDistance > 0){
            moveDistance -= 0.005;
            esqueletoCarro.translateX(moveDistance);
            
            if (keyboard.pressed("left")) {
                esqueletoCarro.rotateY(0.05);
                esqueletoCarro.rotateY(0.05);
            } else if (keyboard.pressed("right")) {
                esqueletoCarro.rotateY(-0.05);
                esqueletoCarro.rotateY(-0.05);
            }
        }
        
    }
    if (keyboard.pressed("left")) {
        if (Math.round(rd2.rotation.y * 100) / 100 <= 0.6 && Math.round(rd2.rotation.y * 100) / 100 >= -0.6) {
            rd1.rotateY(-0.1);
            rd2.rotateY(-0.1);
        } else {
            rd1.rotation.y = -0.6;
            rd2.rotation.y = -0.6;
        }
    }
    if (keyboard.pressed("right")) {
        if (Math.round(rd2.rotation.y * 100) / 100 <= 0.6 && Math.round(rd2.rotation.y * 100) / 100 >= -0.6) {
            rd1.rotateY(0.1);
            rd2.rotateY(0.1);
        } else {
            rd1.rotation.y = 0.6;
            rd2.rotation.y = 0.6;
        }
    }
    if (keyboard.pressed("down")) {
        calotaRd1.rotateZ(-1);
        calotaRd2.rotateZ(-1);
        calotaRt1.rotateZ(-1);
        calotaRt2.rotateZ(-1);

        esqueletoCarro.translateX(-moveDistance);

        if (keyboard.pressed("left")) {
            esqueletoCarro.rotateY(-0.05);
            esqueletoCarro.rotateY(-0.05);
        } else if (keyboard.pressed("right")) {
            esqueletoCarro.rotateY(0.05);
            esqueletoCarro.rotateY(0.05);
        }
    }

    // let angle = THREE.MathUtils.degToRad(10);
    // if (keyboard.pressed("A")) cube.rotateY(angle);
    // if (keyboard.pressed("D")) cube.rotateY(-angle);

    // if (keyboard.pressed("W")) {
    //     scale += .1;
    //     cube.scale.set(scale, scale, scale);
    // }
    // if (keyboard.pressed("S")) {
    //     scale -= .1;
    //     cube.scale.set(scale, scale, scale);
    // }
}

function showInformation() {
    // Use this to show information onscreen
    var controls = new InfoBox();
    controls.add("Geometric Transformation");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the cube in XY.");
    controls.add("Press Page Up or Page down to move the cube over the Z axis");
    controls.add("Press 'A' and 'D' to rotate.");
    controls.add("Press 'W' and 'S' to change scale");
    controls.show();
}

function render() {
    keyboardUpdate();
    requestAnimationFrame(render); // Show events
    renderer.render(scene, camera) // Render scene
}
