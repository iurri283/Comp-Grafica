import * as THREE from "three";
import { OrbitControls } from "./build/jsm/controls/OrbitControls.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import KeyboardState from "./libs/util/KeyboardState.js";
import {
  initRenderer,
  initCamera,
  initDefaultBasicLight,
  setDefaultMaterial,
  InfoBox,
  SecondaryBox,
  BoxSuperior,
  onWindowResize,
  createGroundPlaneXZ,
} from "./libs/util/util.js";

import { Carro } from "./carro.js";
import { Pista } from "./pista.js";
let scene, renderer, camera, camera2, camTerceiraPessoa, orbit, ambientLight, dirLight; // Initial variables
scene = new THREE.Scene(); // Create main scene
//renderer = initRenderer(); // Init a basic renderer
renderer = new THREE.WebGLRenderer();
document.getElementById("webgl-output").appendChild( renderer.domElement );  
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type  = THREE.PCFSoftShadowMap;
ambientLight = new THREE.AmbientLight("rgb(160,160,160)");
scene.add( ambientLight );
camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
dirLight = new THREE.DirectionalLight("rgb(255,255,255)");
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 256;
dirLight.shadow.mapSize.height = 256;
dirLight.shadow.camera.near = .1;
dirLight.shadow.camera.far = 1000;
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.bottom = -50;
dirLight.shadow.camera.top = 50;
dirLight.shadow.bias = -0.0005;  
dirLight.shadow.radius = 20;

scene.add(dirLight);

const shadowHelper = new THREE.CameraHelper(dirLight.shadow.camera);
  shadowHelper.visible = true;
scene.add(shadowHelper);

camera2 = initCamera(new THREE.Vector3(250, 40, -30));
let keyboard = new KeyboardState();
let tVolta = new THREE.Clock(0);
let tTotal = new THREE.Clock(0);
let voltas = 0;
let tempos = new Array(4);

camTerceiraPessoa = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var message = new BoxSuperior("");
// message.changeStyle("gray");
showInformation();

var trackballControls = new TrackballControls(camera2, renderer.domElement); //para visualização do carro no modo exibição
// light = initDefaultBasicLight(scene, true); // Create a basic light to illuminate the scene
// orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
// Listen window size changes

window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

// create the ground plane
let plane = createGroundPlaneXZ(1000000, 1000000);
plane.receiveShadow = true;
scene.add(plane);

//##############################################-- SPOLIGHT MODO INSPEÇÃO --###############################################

//#############################################################################################
const carro = new Carro(scene, camera);
const pista = new Pista(scene);
var inicio = 0;
var auxCam = 0;
pista.pista1();

render();

function reiniciaTempo()
{
  tVolta.stop();
  tTotal.stop();
  tVolta.elapsedTime = 0;
  tTotal.elapsedTime = 0;
  inicio = 0;
}

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

function alternarPista() {
  keyboard.update();
  if(auxCam != 2){
    if (keyboard.pressed("1")) {
      reiniciaTempo();
      pista.removePista1();
      pista.pista1();
      carro.reset([200, 4, 0], [0, 0, 0]);
    } else if (keyboard.pressed("2")) {
      reiniciaTempo();
      pista.removePista1();
      pista.pista2();
      carro.reset([200, 4, 0], [0, 0, 0]);
    } else if (keyboard.pressed("3")) {
      reiniciaTempo();
      pista.removePista1();
      pista.pista3();
      carro.reset([0, 4, 200], [0, 1.516, 0]);
    } else if (keyboard.pressed("4")) {
      reiniciaTempo();
      pista.removePista1();
      pista.pista4();
      carro.reset([500, 4, 700], [0, 3.032, 0]);
    }
  }

}

let spotLight = new THREE.SpotLight(0xffffff);
//spotLight.map = new THREE.TextureLoader().load(url);

function alternarCamera() {

  if (auxCam == 0) {
    auxCam = 1;
  } else if (auxCam == 1) {
    auxCam = 2;
    spotLight.target = carro.esqueletoCarro;
    scene.remove(plane);
    pista.removePista1();
    tVolta.elapsedTime = 0;
    tTotal.elapsedTime = 0;
    message.hide();
    scene.add(spotLight);
  } else if (auxCam == 2) {
    pista.pista1();
    scene.remove(spotLight);
    scene.add(plane);
    carro.reset([200, 4, 0], [0, 0, 0]);
    message.changeStyle("rgba(255,255,255,0.2)");
    auxCam = 0;
  }
}

function gameplay() {
  keyboard.update();
  if (keyboard.pressed("X") && inicio == 0) {
    tTotal.start();
    tVolta.start();
    inicio = 1;
  }

  //SE O CARRO SAIR DA PISTA
  if (!pista.inPista(carro.esqueletoCarro.position)) {
    // console.log(carro.moveDistance);
    if (carro.moveDistance > 0.8) {
      carro.moveDistance -= 0.05;
    }
  }

  if (pista.volta()) {
    tempos[voltas] = tVolta.elapsedTime.toFixed(2);
    tVolta.elapsedTime = 0;
    voltas += 1;
    if (voltas == 4) {
      tVolta.elapsedTime = 0;
      setTimeout(function () {
        tVolta.elapsedTime = 0;
        alert(
          "O JOGO TERMINOU!!!\nTempo total: " +
            tTotal.elapsedTime.toFixed(2) +
            "\nVolta 1: " +
            tempos[0] +
            "\nVolta 2: " +
            tempos[1] +
            "\nVolta 3: " +
            tempos[2] +
            "\nVolta 4: " +
            tempos[3]
        );
        location.reload();
      }, 100);
    }
  }
}

function render() {
  trackballControls.update();
  trackballControls.target.copy(carro.esqueletoCarro.position); // Camera following object

  alternarPista();
  if (keyboard.down("space")) {
    alternarCamera();
  }

  requestAnimationFrame(render); // Show events

  //camera da gampeplay
  if (auxCam == 0) {
    if(pista.numeroPista == 1 || pista.numeroPista == 2)
      camera.position.set(carro.esqueletoCarro.position.x - 100,50,carro.esqueletoCarro.position.z - 80);
    else if(pista.numeroPista == 3)
      camera.position.set(carro.esqueletoCarro.position.x - 100,50,carro.esqueletoCarro.position.z + 80);
    else if(pista.numeroPista == 4)
      camera.position.set(carro.esqueletoCarro.position.x + 100,50,carro.esqueletoCarro.position.z + 80);
    dirLight.target = carro.esqueletoCarro;
    // camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camera.lookAt(carro.esqueletoCarro.position);
    renderer.render(scene, camera); // Render scene
    dirLight.position.set(camera.position.x, camera.position.y+1, camera.position.z-40);

    gameplay();
    message.changeMessage(
      "Tempo da volta: " +
        tVolta.getElapsedTime().toFixed(2) +
        "\nTempo total: " +
        tTotal.getElapsedTime().toFixed(2) +
        "\nVolta: " +
        voltas
    );
    carro.keyboardUpdate(auxCam);
  } else if (auxCam == 1) {
    camTerceiraPessoa.position.set(-90, 20, 0);
    carro.esqueletoCarro.add(camTerceiraPessoa);
    // camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camTerceiraPessoa.lookAt(carro.esqueletoCarro.position);
    // requestAnimationFrame(render); // Show events
    dirLight.position.set(carro.esqueletoCarro.position.x -90, carro.esqueletoCarro.position.y+21, carro.esqueletoCarro.position.z);
    renderer.render(scene, camTerceiraPessoa); // Render scene

    gameplay();
    message.changeMessage(
      "Tempo da volta: " +
        tVolta.getElapsedTime().toFixed(2) +
        "\nTempo total: " +
        tTotal.getElapsedTime().toFixed(2) +
        "\nVolta: " +
        voltas
    );
    carro.keyboardUpdate(auxCam);
  } else if (auxCam == 2) {
    //---------------------------------------------------------
    //camera de visualização
    renderer.render(scene, camera2); // Render scene

    tVolta.stop();
    spotLight.position.set(
      camera2.position.x - 5,
      camera2.position.y + 10,
      camera2.position.z - 5
    );
    tTotal.stop();
    inicio = 0;
    carro.keyboardUpdate(auxCam);
  }
  
}
