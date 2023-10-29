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

let scene, renderer, camera, camera2, camTerceiraPessoa, light, orbit; // Initial variables
scene = new THREE.Scene(); // Create main scene
renderer = initRenderer(); // Init a basic renderer
camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
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
light = initDefaultBasicLight(scene, true); // Create a basic light to illuminate the scene
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
scene.add(plane);

//##############################################-- SPOLIGHT MODO INSPEÇÃO --###############################################

//#############################################################################################
const carro = new Carro(scene, camera);
const pista = new Pista(scene);
var inicio = 0;
var auxCam = 0;
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

function alternarPista() {
  keyboard.update();

  if (keyboard.pressed("1")) {
    pista.removePista2();
    pista.removePista3();
    pista.removePista4();
    pista.pista1();
    carro.reset([200, 4, 0], [0, 0, 0]);
  } else if (keyboard.pressed("2")) {
    pista.removePista1();
    pista.removePista3();
    pista.removePista4();
    pista.pista2();
    carro.reset([200, 4, 0], [0, 0, 0]);
  } else if (keyboard.pressed("3")) {
    pista.removePista1();
    pista.removePista2();
    pista.pista3();
    carro.reset([0, 4, 200], [0, 1.516, 0]);
  } else if (keyboard.pressed("4")) {
    pista.removePista1();
    pista.removePista2();
    pista.removePista3();
    pista.pista3();
    carro.reset([500, 4, 700], [0, 0, 0]);
  }
}

let spotLight = new THREE.SpotLight(0xffffff);
//spotLight.map = new THREE.TextureLoader().load(url);

function alternarCamera() {
  console.log(auxCam);

  if (auxCam == 0) {
    //modo inspeção
    carro.reset([0, 4, 200], [0, 0, 0]);
    pista.removePista1();
    pista.removePista2();
    pista.removePista3();
    pista.pista4();
    message.hide();
    spotLight.target = carro.esqueletoCarro;
    scene.remove(plane);
    scene.add(spotLight);
    // camera2.add(spotLight);
    auxCam = 1;
  } else if (auxCam == 1) {
    auxCam = 2;
  } else if (auxCam == 2) {
    pista.pista1();
    scene.remove(spotLight);
    scene.add(plane);
    message.changeStyle("gray");
    tVolta.elapsedTime = 0;
    tTotal.elapsedTime = 0;
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
    camera.position.set(
      carro.esqueletoCarro.position.x - 100,
      50,
      carro.esqueletoCarro.position.z - 80
    );
    // camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camera.lookAt(carro.esqueletoCarro.position);
    renderer.render(scene, camera); // Render scene

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
