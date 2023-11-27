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
  Velocimetro,
  onWindowResize,
} from "./libs/util/util.js";

import { Carro } from "./carro.js";
import { Pista } from "./pista.js";
let scene,
  renderer,
  camera,
  camera2,
  camTerceiraPessoa,
  orbit,
  ambientLight,
  dirLight; // Initial variables
let width = window.innerWidth;
let height = window.innerHeight;
scene = new THREE.Scene(); // Create main scene
//renderer = initRenderer(); // Init a basic renderer
renderer = new THREE.WebGLRenderer();
document.getElementById("webgl-output").appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
ambientLight = new THREE.AmbientLight("rgb(160,160,160)");
scene.add(ambientLight);
camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);
dirLight = new THREE.DirectionalLight("rgb(255,255,255)");
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 256;
dirLight.shadow.mapSize.height = 256;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 1000;
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.bottom = -50;
dirLight.shadow.camera.top = 50;
dirLight.shadow.bias = -0.0005;
dirLight.shadow.radius = 20;

scene.add(dirLight);

let camPosition = new THREE.Vector3(200, 250, 200);
let upVec = new THREE.Vector3(0.0, 0.0, 0.0);

// let projectionChanged = false;
let virtualCamera = new THREE.PerspectiveCamera(90, 1.3, 0.1, 400.0);
virtualCamera.position.copy(camPosition);
virtualCamera.rotation.set(-1.5708, 0, 0);
virtualCamera.up.copy(upVec);

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
  4000
);

//declaracao skybox

var faceArray = [];
var textureFront = new THREE.TextureLoader().load(
  "../assets/textures/cube/sky/yonder_ft.jpg"
);
var textureBack = new THREE.TextureLoader().load(
  "../assets/textures/cube/sky/yonder_bk.jpg"
);
var textureTop = new THREE.TextureLoader().load(
  "../assets/textures/cube/sky/yonder_up.jpg"
);
// textureTop.rotation = THREE.MathUtils.degToRad(-90);
// textureTop.center = new THREE.Vector2(0.5, 0.5);
var textureBottom = new THREE.TextureLoader().load(
  "../assets/textures/cube/sky/yonder_dn.jpg"
);
// textureBottom.rotation = THREE.MathUtils.degToRad(-90);
// textureBottom.center = new THREE.Vector2(0.5, 0.5);
var textureRight = new THREE.TextureLoader().load(
  "../assets/textures/cube/sky/yonder_rt.jpg"
);
var textureLeft = new THREE.TextureLoader().load(
  "../assets/textures/cube/sky/yonder_lf.jpg"
);

faceArray.push(new THREE.MeshBasicMaterial({ map: textureFront }));
faceArray.push(new THREE.MeshBasicMaterial({ map: textureBack }));
faceArray.push(new THREE.MeshBasicMaterial({ map: textureTop }));
faceArray.push(new THREE.MeshBasicMaterial({ map: textureBottom }));
faceArray.push(new THREE.MeshBasicMaterial({ map: textureRight }));
faceArray.push(new THREE.MeshBasicMaterial({ map: textureLeft }));

for (var i = 0; i < 6; i++) faceArray[i].side = THREE.BackSide;

var skyboxGeometry = new THREE.BoxGeometry(1500, 1500, 1500);
var skybox = new THREE.Mesh(skyboxGeometry, faceArray);
// skybox.rotateX(degreesToRadians(90));
scene.add(skybox);
skybox.position.set(200, 0, 200);

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

let loader = new THREE.TextureLoader();

let planoMaterial = [
  setMaterial("../assets/textures/grass.jpg", 100, 100), //x+
  setMaterial("../assets/textures/grass.jpg", 100, 100), //y+
  setMaterial("../assets/textures/grass.jpg", 100, 100), //z+
  setMaterial("../assets/textures/grass.jpg", 100, 100), //z-
  setMaterial("../assets/textures/grass.jpg", 100, 100), //z-
  setMaterial("../assets/textures/grass.jpg", 100, 100), //z-
];

let planoMaterial1 = [
  setMaterial("../assets/textures/sand.jpg", 100, 100), //x+
  setMaterial("../assets/textures/sand.jpg", 100, 100), //y+
  setMaterial("../assets/textures/sand.jpg", 100, 100), //z+
  setMaterial("../assets/textures/sand.jpg", 100, 100), //z-
  setMaterial("../assets/textures/sand.jpg", 100, 100), //z-
  setMaterial("../assets/textures/sand.jpg", 100, 100), //z-
];

let planoMaterial2 = [
  setMaterial("../assets/textures/intertravado.jpg", 100, 100), //x+
  setMaterial("../assets/textures/intertravado.jpg", 100, 100), //y+
  setMaterial("../assets/textures/intertravado.jpg", 100, 100), //z+
  setMaterial("../assets/textures/intertravado.jpg", 100, 100), //z-
  setMaterial("../assets/textures/intertravado.jpg", 100, 100), //z-
  setMaterial("../assets/textures/intertravado.jpg", 100, 100), //z-
];

//##############################################-- SPOLIGHT MODO INSPEÇÃO --###############################################

//#############################################################################################
const carro = new Carro(scene, camera);

//#########################################  VELOCÍMETRO  #####################################
const velocimetro = new Velocimetro("Velocímetro");
var velocidadeAtual = carro.moveDistance;
var velocidadeAnterior = 0;
var escalaAtual = 1;
var vetorCores = new Array(19);
var vetorVelocidade = new Array(19);
//#########################################  VELOCÍMETRO  #####################################

const pista = new Pista(scene);
var inicio = 0;
var auxCam = 0;
pista.pista1();
let cubeGeometry = new THREE.BoxGeometry(10000, 0.1, 10000);

let plane = new THREE.Mesh(cubeGeometry, planoMaterial);
let lookAtVec = new THREE.Vector3(
  carro.esqueletoCarro.position.x,
  carro.esqueletoCarro.position.y,
  carro.esqueletoCarro.position.z
);
// virtualCamera.lookAt(lookAtVec);

plane.position.set(200, 0, 200);
plane.receiveShadow = true;
scene.add(plane);

render();

function reiniciaTempo() {
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
  if (auxCam != 2) {
    if (keyboard.pressed("1")) {
      reiniciaTempo();
      virtualCamera.position.set(200, 250, 200);
      pista.removePista();
      pista.pista1();
      carro.reset([200, -0.85, 0], [0, 0, 0]);
    } else if (keyboard.pressed("2")) {
      reiniciaTempo();
      virtualCamera.position.set(200, 250, 200);
      pista.removePista();
      pista.pista2();
      carro.reset([200, -0.85, 0], [0, 0, 0]);
    } else if (keyboard.pressed("3")) {
      reiniciaTempo();
      pista.removePista();
      pista.pista3();
      carro.reset([0, -0.85, 200], [0, 1.5708, 0]);
    } else if (keyboard.pressed("4")) {
      reiniciaTempo();
      pista.removePista();
      pista.pista4();
      carro.reset([500, -0.85, 700], [0, 3.1416, 0]);
    }
  }
}

// Function to set a texture
function setMaterial(
  file,
  repeatU = 1,
  repeatV = 1,
  color = "rgb(255,255,255)"
) {
  let mat = new THREE.MeshBasicMaterial({
    map: loader.load(file),
    color: color,
  });
  mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
  mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
  mat.map.repeat.set(repeatU, repeatV);
  return mat;
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
    pista.removePista();
    tVolta.elapsedTime = 0;
    tTotal.elapsedTime = 0;
    message.hide();
    scene.add(spotLight);
  } else if (auxCam == 2) {
    pista.pista1();
    scene.remove(spotLight);
    scene.add(plane);
    carro.reset([200, -0.85, 0], [0, 0, 0]);
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

function handleClasses(velocidadeAtual) {
  velocidadeAtual = parseInt(velocidadeAtual * 100, 10);
  velocidadeAtual = Math.ceil(velocidadeAtual / 10) * 10;
  console.log(velocidadeAtual);

  if (velocidadeAtual <= 180) {
    let novaClasse = "velocidade-" + velocidadeAtual;
    let classeAnterior = "velocidade-" + velocidadeAnterior;
    let el = document.getElementsByClassName("seta-wrapper")[0];
    if (el.classList.contains(classeAnterior)) {
      el.classList.remove(classeAnterior);
      el.classList.add(novaClasse);
    }
    velocidadeAnterior = velocidadeAtual;
  }
}

function handleCores() {
  let velocidade = parseInt(carro.moveDistance * 10);
  //
  for (let i = 1; i < 20; i++) {
    // console.log(velocidade);
    // console.log(i);
    // Alterado o limite para 7 para coincidir com o número de classes
    let classeTemporaria = "escala-velocimetro-" + i;
    let el = document.getElementsByClassName(classeTemporaria)[0];

    if (el) {
      if (velocidade == i) {
        el.classList.add("ativado");
      } else {
        el.classList.remove("ativado");
      }
    }
  }
}

function controlledRender() {
  if (pista.numeroPista == 3 || pista.numeroPista == 4)
    virtualCamera.position.set(
      carro.esqueletoCarro.position.x,
      250,
      carro.esqueletoCarro.position.z
    );
  if (auxCam == 0) {
    if (pista.numeroPista == 1 || pista.numeroPista == 2) {
      camera.position.set(
        carro.esqueletoCarro.position.x - 100,
        50,
        carro.esqueletoCarro.position.z - 80
      );
      if (pista.numeroPista == 2) {
        // create the ground plane
        scene.remove(plane);
        plane = new THREE.Mesh(cubeGeometry, planoMaterial1);
        plane.position.set(200, 0, 200);
        plane.receiveShadow = true;
        scene.add(plane);
      } else if (pista.numeroPista == 1) {
        // create the ground plane
        scene.remove(plane);
        plane = new THREE.Mesh(cubeGeometry, planoMaterial);
        plane.position.set(200, 0, 200);
        plane.receiveShadow = true;
        scene.add(plane);
      }
    } else if (pista.numeroPista == 3) {
      camera.position.set(
        carro.esqueletoCarro.position.x - 100,
        50,
        carro.esqueletoCarro.position.z + 80
      );

      scene.remove(plane);
      plane = new THREE.Mesh(cubeGeometry, planoMaterial2);
      plane.position.set(200, 0, 200);
      plane.receiveShadow = true;
      scene.add(plane);
    } else if (pista.numeroPista == 4) {
      camera.position.set(
        carro.esqueletoCarro.position.x + 100,
        50,
        carro.esqueletoCarro.position.z + 80
      );
      scene.remove(plane);
      plane = new THREE.Mesh(cubeGeometry, planoMaterial1);
      plane.position.set(200, 0, 200);
      plane.receiveShadow = true;
      scene.add(plane);
    }
    dirLight.target = carro.esqueletoCarro;
    // camera.position.copy(carro.esqueletoCarro.position+obj.position);
    camera.lookAt(carro.esqueletoCarro.position);
    renderer.setViewport(0, 0, width, height); // Reset viewport
    renderer.setScissorTest(false); // Disable scissor to paint the entire window
    renderer.setClearColor("rgb(120, 190, 220)");
    renderer.clear(); // Clean the window
    renderer.render(scene, camera);
    dirLight.position.set(
      camera.position.x,
      camera.position.y + 1,
      camera.position.z - 40
    );

    gameplay();
    // #############################################################  VELOCÍMETRO  #####################################################
    if (carro.moveDistance * 100 < 200) {
      if (carro.moveDistance <= 0) {
        velocidadeAtual = Math.abs(carro.moveDistance);
      }
      velocidadeAtual = Math.abs(carro.moveDistance);
      handleClasses(velocidadeAtual);
      if (carro.moveDistance * 10 > 1) handleCores();
    }

    // if (carro.moveDistance * 100 < 0) {
    //   carro.moveDistance = 0;
    // }

    velocimetro.changeMessage(
      "" + (parseInt((carro.moveDistance * 100).toFixed(2), 10) + "km/h")
    );

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
    dirLight.position.set(
      carro.esqueletoCarro.position.x - 90,
      carro.esqueletoCarro.position.y + 21,
      carro.esqueletoCarro.position.z
    );
    renderer.setViewport(0, 0, width, height); // Reset viewport
    renderer.setScissorTest(false); // Disable scissor to paint the entire window
    renderer.setClearColor("rgb(120, 190, 220)");
    renderer.clear(); // Clean the window
    renderer.render(scene, camTerceiraPessoa);

    gameplay();

    if (carro.moveDistance * 100 < 0) {
      carro.moveDistance = 0;
    }

    velocimetro.changeMessage(
      "" + ((carro.moveDistance * 10).toFixed(2) * 10).toFixed(2) + "km/h"
    );

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
    renderer.setViewport(0, 0, width, height); // Reset viewport
    renderer.setScissorTest(false); // Disable scissor to paint the entire window
    renderer.setClearColor("rgb(120, 190, 220)");
    renderer.clear(); // Clean the window
    renderer.render(scene, camera2);

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

  // Set main viewport

  // If autoClear if false, clear depth buffer to avoid unwanted overlays
  if (!renderer.autoClear) renderer.clearDepth(); // Clean the small viewport

  // Set virtual camera viewport
  let offset = 10;
  let vcWidth = width / 3.0 > 400 ? 400 : width / 3.0;
  let vcHeidth = vcWidth * 0.75;
  renderer.setViewport(offset, height - vcHeidth - offset, vcWidth, vcHeidth); // Set virtual camera viewport
  renderer.setScissor(
    offset,
    height - vcHeidth - offset,
    vcWidth - 1,
    vcHeidth - 1
  ); // Set scissor with the same size as the viewport - 1
  renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
  // renderer.setClearColor("rgb(60, 50, 150)"); // Use a darker clear color in the small viewport
  if (auxCam != 2) renderer.render(scene, virtualCamera); // Render scene of the virtual camera
}

function render() {
  trackballControls.update();
  trackballControls.target.copy(carro.esqueletoCarro.position); // Camera following object

  alternarPista();
  if (keyboard.down("space")) {
    alternarCamera();
  }

  requestAnimationFrame(render); // Show events

  controlledRender();
}
