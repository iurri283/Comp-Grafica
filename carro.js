import * as THREE from "three";
import KeyboardState from "./libs/util/KeyboardState.js";
import { ConvexGeometry } from "../build/jsm/geometries/ConvexGeometry.js";
export class Carro {
  generatePoints(vetor) {
    var points = [];

    for (var i = 0; i < vetor.length; i++) {
      points.push(new THREE.Vector3(vetor[i][0], vetor[i][1], vetor[i][2]));
    }

    return points;
  }

  criaObjeto(vetor, objectMaterial) {
    // First, create the point vector to be used by the convex hull algorithm
    var localPoints = this.generatePoints(vetor);

    // Then, build the convex geometry with the generated points
    var convexGeometry = new ConvexGeometry(localPoints);

    var object = new THREE.Mesh(convexGeometry, objectMaterial);
    object.castShadow = true;
    object.visible = true;
    return object;
  }

  constructor(scene, camera) {
    // var speed = 10;
    this.loader = new THREE.TextureLoader();

    this.carroMaterial = [
      this.setMaterial("../assets/textures/brickwall.jpg", 1, 1), //x+
      this.setMaterial("../assets/textures/brickwall.jpg", 1, 1), //y+
      this.setMaterial("../assets/textures/brickwall.jpg", 1, 1), //z+
      this.setMaterial("../assets/textures/brickwall.jpg", 1, 1), //z-
      this.setMaterial("../assets/textures/brickwall.jpg", 1, 1), //z-
      this.setMaterial("../assets/textures/brickwall.jpg", 1, 1), //z-
    ];

    this.moveDistance = 0.0;
    this.velMaxima = 2.0;
    this.camera = camera;

    // To use the keyboard
    this.keyboard = new KeyboardState();

    var vetor1 = [
      [-0, 4.1, 0.5],
      [-10, 4.1, 0.5],
      [-4, 5.5, 0.5],
      [-0, 4.1, 5.5],
      [-10, 4.1, 5.5],
      [-4, 5.5, 5.5],
    ];

    var vetor2 = [
      [-10, 4.1, 0.5],
      [-9.7, 2.2, 0.5],
      [-8.7, 2.2, 0.5],
      [-8.2, 3.1, 0.5],
      [-8.2, 4.1, 0.5],
      [-10, 4.1, 5.5],
      [-9.7, 2.2, 5.5],
      [-8.7, 2.2, 5.5],
      [-8.2, 3.1, 5.5],
      [-8.2, 4.1, 5.5],
    ];

    var vetor13 = [
      [-10, 4.05, 0.56],
      [-9.98, 3.95, 0.56],
      [-10, 4.05, 5.44],
      [-9.98, 3.95, 5.44],
    ];

    var vetor14_1 = [
      [-9.75, 2.4, 0.58],
      [-9.74, 2.35, 0.58],
      [-9.75, 2.4, 1.16],
      [-9.74, 2.35, 1.16],
    ];

    var vetor14_2 = [
      [-9.75, 2.4, 4.88],
      [-9.74, 2.35, 4.88],
      [-9.75, 2.4, 5.42],
      [-9.74, 2.35, 5.42],
    ];

    var vetor3 = [
      [-8.2, 3.1, 0.5],
      [-6.9, 3.1, 0.5],
      [-8.2, 4.1, 0.5],
      [-6.9, 4.1, 0.5],
      [-8.2, 3.1, 5.5],
      [-6.9, 3.1, 5.5],
      [-8.2, 4.1, 5.5],
      [-6.9, 4.1, 5.5],
    ];

    var vetor4 = [
      [-6.9, 3.1, 0.5],
      [-6.9, 4.1, 0.5],
      [-6.4, 2.05, 0.5],
      [-6.4, 4.1, 0.5],
      [-6.9, 3.1, 5.5],
      [-6.9, 4.1, 5.5],
      [-6.4, 2.05, 5.5],
      [-6.4, 4.1, 5.5],
    ];

    var vetor5 = [
      [-6.4, 2.05, 0.5],
      [-6.4, 4.1, 0.5],
      [-2.3, 2.05, 0.5],
      [-2.3, 4.1, 0.5],
      [-6.4, 2.05, 5.5],
      [-6.4, 4.1, 5.5],
      [-2.3, 2.05, 5.5],
      [-2.3, 4.1, 5.5],
    ];

    var vetor6 = [
      [-6.4, 2.05, 0.5],
      [-2.3, 2.05, 0.5],
      [-6.4, 1.6, 0.5],
      [-2.3, 1.6, 0.5],
      [-6.4, 2.05, 5.5],
      [-2.3, 2.05, 5.5],
      [-6.4, 1.6, 5.5],
      [-2.3, 1.6, 5.5],
    ];

    var vetor7 = [
      [-2.3, 2.05, 0.5],
      [-2.3, 4.1, 0.5],
      [-1.8, 3.1, 0.5],
      [-1.8, 4.1, 0.5],
      [-2.3, 2.05, 5.5],
      [-4.1, 4.1, 5.5],
      [-1.8, 3.1, 5.5],
      [-1.8, 4.1, 5.5],
    ];

    var vetor8 = [
      [-1.8, 3.1, 0.5],
      [-0.5, 3.1, 0.5],
      [-1.8, 4.1, 0.5],
      [-0.5, 4.1, 0.5],
      [-1.8, 3.1, 5.5],
      [-0.5, 3.1, 5.5],
      [-1.8, 4.1, 5.5],
      [-0.5, 4.1, 5.5],
    ];

    var vetor9 = [
      [-0.5, 3.1, 0.5],
      [-0.5, 4.1, 0.5],
      [-0, 4.1, 0.5],
      [-0.3, 2.7, 0.5],
      [-0.1, 2.9, 0.5],
      [-0.5, 3.1, 5.5],
      [-0.5, 4.1, 5.5],
      [-0, 4.1, 5.5],
      [-0.3, 2.7, 5.5],
      [-0.1, 2.9, 5.5],
    ];

    var vetor10 = [
      [0.85, 3.5, 0.51],
      [0.85, 3, 0.51],
      [-0, 4.1, 0.51],
      [-0.3, 2.7, 0.51],
      [0.1, 2.7, 0.51],
      [0.85, 3.5, 5.49],
      [0.85, 3, 5.49],
      [-0, 4.1, 5.49],
      [-0.3, 2.7, 5.49],
      [0.1, 2.7, 5.49],
    ];

    var vetor11 = [
      [0.86, 3.5, 0.52],
      [0.85, 3.3, 0.52],
      [0.7, 3.3, 0.52],
      [0.86, 3.5, 5.48],
      [0.85, 3.3, 5.48],
      [0.7, 3.3, 5.48],
    ];

    var vetor12_1 = [
      [0.87, 3.18, 0.8],
      [0.87, 3.08, 0.8],
      [0.87, 3.18, 1.3],
      [0.87, 3.08, 1.3],
    ];

    var vetor12_2 = [
      [0.87, 3.18, 4.71],
      [0.87, 3.08, 4.71],
      [0.87, 3.18, 5.21],
      [0.87, 3.08, 5.21],
    ];

    var vidro1 = [
      [-2.3, 4.7, 0.49],
      [-2.3, 4.45, 0.49],
      [-1.6, 4.45, 0.49],
      [-2.3, 4.7, 5.51],
      [-2.3, 4.45, 5.51],
      [-1.6, 4.45, 5.51],
    ];

    var vidro2 = [
      [-4.5, 4.45, 0.49],
      [-2.8, 4.45, 0.49],
      [-4, 5.3, 0.49],
      [-2.8, 4.85, 0.49],
      [-4.5, 5.17, 0.49],
      [-4.5, 4.45, 5.51],
      [-2.8, 4.45, 5.51],
      [-4, 5.3, 5.51],
      [-2.8, 4.85, 5.51],
      [-4.5, 5.17, 5.51],
    ];

    var vidro3 = [
      [-5, 5.14, 0.49],
      [-5, 4.45, 0.49],
      [-6.3, 4.45, 0.49],
      [-6.3, 4.84, 0.49],
      [-5, 5.14, 5.51],
      [-5, 4.45, 5.51],
      [-6.3, 4.45, 5.51],
      [-6.3, 4.84, 5.51],
    ];

    var vidro4 = [
      [-1.7, 4.7, 0.7],
      [-3.7, 5.4, 0.7],
      [-1.7, 4.7, 5.3],
      [-3.7, 5.4, 5.3],
    ];

    var vidro5 = [
      [-4, 5.51, 0.7],
      [-6.5, 4.93, 0.7],
      [-4, 5.51, 5.3],
      [-6.5, 4.93, 5.3],
    ];

    let materialEixo,
      materialCalotas,
      materialDetalhe,
      materialPneu,
      materialVidro,
      materialFarois_1,
      materialFarois_2,
      materialFarois_3,
      materialVidro1,
      materialEsqueletoCarro;

    materialEixo = new THREE.MeshLambertMaterial({
      color: "rgb(32,32,32)",
      opacity: 1,
      transparent: true,
    });

    materialDetalhe = new THREE.MeshPhongMaterial({
      color: "rgb(68,70,72)",
      opacity: 1,
      transparent: true,
    });

    materialCalotas = new THREE.MeshPhongMaterial({
      color: "rgb(61,63,64)",
      opacity: 1,
      transparent: true,
    });
    materialPneu = new THREE.MeshLambertMaterial({
      color: "rgb(32,32,32)",
      opacity: 1,
      transparent: true,
    });

    materialFarois_1 = new THREE.MeshLambertMaterial({
      color: "rgb(255,255,255)",
      opacity: 1,
      transparent: false,
    });

    materialFarois_2 = new THREE.MeshLambertMaterial({
      color: "rgb(255,255,0)",
      opacity: 1,
      transparent: false,
    });

    materialFarois_3 = new THREE.MeshLambertMaterial({
      color: "rgb(255,0,0)",
      opacity: 1,
      transparent: false,
    });

    materialVidro = new THREE.MeshPhongMaterial({
      color: "rgb(0,0,0)",
      opacity: 1,
      transparent: true,
    });

    materialVidro1 = new THREE.MeshPhongMaterial({
      color: "rgb(255,255,255)",
      opacity: 1,
      transparent: true,
    });

    materialEsqueletoCarro = new THREE.MeshPhongMaterial({
      color: "rgb(126, 132, 132)",
      opacity: 1,
      transparent: true,
    });
    let cubeGeometry = new THREE.BoxGeometry(4, 0.1, 4);

    let cubo = new THREE.Mesh(cubeGeometry, this.carroMaterial);

    //#################################################-- EIXOS E RODAS DIANTEIROS --##############################
    //criando rodas dianteiras
    let rodasGeometry = new THREE.TorusGeometry(0.667, 0.25, 12, 48);

    this.rd1 = new THREE.Mesh(rodasGeometry, materialPneu);
    this.rd2 = new THREE.Mesh(rodasGeometry, materialPneu);

    this.rd1.rotateX(1.5708);
    this.rd2.rotateX(1.5708);

    //criando calotas
    let calotasGeometry = new THREE.RingGeometry(4 / 17, 7.5 / 13, 7);
    let calotasDetalhe = new THREE.CircleGeometry(0.27, 7);
    let calotaRd1 = new THREE.Mesh(calotasGeometry, materialCalotas);
    let calotaRd2 = new THREE.Mesh(calotasGeometry, materialCalotas);

    let calotaDetalheRd1 = new THREE.Mesh(calotasDetalhe, materialDetalhe);
    let calotaDetalheRd2 = new THREE.Mesh(calotasDetalhe, materialDetalhe);

    this.rd1.add(calotaRd1);
    this.rd2.add(calotaRd2);

    calotaRd1.add(calotaDetalheRd1);
    calotaRd2.add(calotaDetalheRd2);

    calotaRd1.position.set(0.0, 0.0, -0.173);
    calotaRd2.position.set(0.0, 0.0, 0.173);

    calotaRd1.rotateY(3.1416);

    calotaDetalheRd1.position.set(0, 0, 0.03);
    calotaDetalheRd2.position.set(0, 0, 0.03);

    //criando eixos
    let eixoGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 64);
    let eixoDianteiro = new THREE.Mesh(eixoGeometry, materialEixo);

    //#################################################--EIXOS E RODAS TRASEIRA--###############################################
    //criando rodas traseiras
    this.rt1 = new THREE.Mesh(rodasGeometry, materialPneu);
    this.rt2 = new THREE.Mesh(rodasGeometry, materialPneu);

    this.rt1.position.set(0.0, 3.5, 0.0);
    this.rt2.position.set(0.0, -3.5, 0.0);

    this.rt1.rotateX(1.5708);
    this.rt2.rotateX(1.5708);

    //criando calotas
    let calotaRt1 = new THREE.Mesh(calotasGeometry, materialCalotas);
    let calotaRt2 = new THREE.Mesh(calotasGeometry, materialCalotas);
    let calotaDetalheRt1 = new THREE.Mesh(calotasDetalhe, materialDetalhe);
    let calotaDetalheRt2 = new THREE.Mesh(calotasDetalhe, materialDetalhe);

    calotaRt1.add(calotaDetalheRt1);
    calotaRt2.add(calotaDetalheRt2);
    calotaRt1.position.set(0.0, 0.0, -0.173);
    calotaRt2.position.set(0.0, 0.0, 0.173);

    calotaRt1.rotateY(3.1416);

    calotaDetalheRt1.position.set(0, 0, 0.03);
    calotaDetalheRt2.position.set(0, 0, 0.03);

    this.rt1.add(calotaRt1);
    this.rt2.add(calotaRt2);

    let eixoTraseiro = new THREE.Mesh(eixoGeometry, materialEixo);

    eixoTraseiro.rotateX(1.5708);

    eixoTraseiro.add(this.rt1);
    eixoTraseiro.add(this.rt2);

    this.rt1.position.set(0.0, 2.5, 0.0);
    this.rt2.position.set(0.0, -2.5, 0.0);

    //##########################################--ESFERAS DOS EIXOS--###########################################
    let esferaEixoGeometry = new THREE.SphereGeometry(0.2, 64, 32);
    this.esferaEixo1 = new THREE.Mesh(esferaEixoGeometry, materialPneu);
    this.esferaEixo2 = new THREE.Mesh(esferaEixoGeometry, materialPneu);

    this.esferaEixo1.position.set(0.0, 2.5, 0.0);
    this.esferaEixo2.position.set(0.0, -2.5, 0.0);

    eixoDianteiro.add(this.esferaEixo1);
    eixoDianteiro.add(this.esferaEixo2);

    this.esferaEixo1.add(this.rd1);
    this.esferaEixo2.add(this.rd2);

    eixoDianteiro.position.set(-1.2, 2.17, 3);
    eixoDianteiro.rotation.set(1.5708, 0, 0);
    eixoTraseiro.position.set(-7.6, 2.17, 3);
    eixoTraseiro.rotation.set(1.5708, 0, 0);

    //#################################################-- ESQUELETO DO CARRO --###############################################

    this.esqueletoCarro = this.criaObjeto(vetor1, materialEsqueletoCarro);
    this.esqueletoCarro.add(this.criaObjeto(vetor2, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor3, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor4, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor5, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor6, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor7, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor8, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor9, materialEsqueletoCarro));
    this.esqueletoCarro.add(this.criaObjeto(vetor10, materialEsqueletoCarro));

    this.esqueletoCarro.add(this.criaObjeto(vetor11, materialFarois_1));
    this.esqueletoCarro.add(this.criaObjeto(vetor12_1, materialFarois_2));
    this.esqueletoCarro.add(this.criaObjeto(vetor12_2, materialFarois_2));
    this.esqueletoCarro.add(this.criaObjeto(vetor13, materialFarois_3));
    this.esqueletoCarro.add(this.criaObjeto(vetor14_1, materialFarois_3));
    this.esqueletoCarro.add(this.criaObjeto(vetor14_2, materialFarois_3));
    this.esqueletoCarro.add(this.criaObjeto(vidro1, materialVidro));
    this.esqueletoCarro.add(this.criaObjeto(vidro2, materialVidro));
    this.esqueletoCarro.add(this.criaObjeto(vidro3, materialVidro));
    this.esqueletoCarro.add(this.criaObjeto(vidro4, materialVidro1));
    this.esqueletoCarro.add(this.criaObjeto(vidro5, materialVidro));

    this.esqueletoCarro.position.set(200.0, -0.85, 0.0);

    this.esqueletoCarro.add(eixoDianteiro);
    this.esqueletoCarro.add(eixoTraseiro);

    scene.add(this.esqueletoCarro);

    this.esqueletoCarro.castShadow = true;
  }

  // Function to set a texture
  setMaterial(file, repeatU = 1, repeatV = 1, color = "rgb(255,255,255)") {
    let mat = new THREE.MeshBasicMaterial({
      map: this.loader.load(file),
      color: color,
    });
    mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
    mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
    mat.map.repeat.set(repeatU, repeatV);
    return mat;
  }

  //#####################################################################################################################
  keyboardUpdate(auxCam) {
    this.keyboard.update();

    if (this.keyboard.pressed("X")) {
      this.rd1.rotateZ(this.moveDistance);
      this.rd2.rotateZ(this.moveDistance);
      this.rt1.rotateZ(this.moveDistance);
      this.rt2.rotateZ(this.moveDistance);

      if (this.moveDistance < this.velMaxima) {
        this.moveDistance += 0.007;
      }

      // console.log(Math.round(this.moveDistance * 100) / 100);
      // console.log("\nClock delta: " + clock.getDelta());
      if (auxCam != 2) {
        this.esqueletoCarro.translateX(
          Math.round(this.moveDistance * 100) / 100
        );

        if (this.keyboard.pressed("left")) {
          this.esqueletoCarro.rotateY(this.moveDistance * 0.05);
        } else if (this.keyboard.pressed("right")) {
          this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);
        }
      }
    } else {
      if (this.moveDistance > 0) {
        this.moveDistance -= 0.007;
        if (auxCam != 2) {
          this.esqueletoCarro.translateX(
            Math.round(this.moveDistance * 100) / 100
          );

          if (this.keyboard.pressed("left")) {
            this.esqueletoCarro.rotateY(this.moveDistance * 0.05);
          } else if (this.keyboard.pressed("right")) {
            this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);
          }
        }

        this.rd1.rotateZ(this.moveDistance);
        this.rd2.rotateZ(this.moveDistance);
        this.rt1.rotateZ(this.moveDistance);
        this.rt2.rotateZ(this.moveDistance);
      }
      // console.log(Math.round(this.moveDistance * 100) / 100);
    }
    if (this.keyboard.pressed("left")) {
      if (
        Math.round(this.esferaEixo2.rotation.z * 100) / 100 <= 0.6 &&
        Math.round(this.esferaEixo2.rotation.z * 100) / 100 >= -0.6
      ) {
        this.esferaEixo1.rotateZ(-1 * 0.05);
        this.esferaEixo2.rotateZ(-1 * 0.05);

        // this.esferaEixo1.rotateZ(-this.moveDistance * 0.05);
        // this.esferaEixo2.rotateZ(-this.moveDistance * 0.05);

        // console.log(
        //   this.esqueletoCarro.position.z +
        //     " ------ " +
        //     this.esferaEixo2.position.z
        // );
      } else {
        this.esferaEixo1.rotation.z = -0.6;
        this.esferaEixo2.rotation.z = -0.6;
      }
    } else if (this.keyboard.pressed("right")) {
      if (
        Math.round(this.esferaEixo2.rotation.z * 100) / 100 <= 0.6 &&
        Math.round(this.esferaEixo2.rotation.z * 100) / 100 >= -0.6
      ) {
        this.esferaEixo1.rotateZ(1 * 0.05);
        this.esferaEixo2.rotateZ(1 * 0.05);

        // this.esferaEixo1.rotateZ(this.moveDistance * 0.05);
        // this.esferaEixo2.rotateZ(this.moveDistance * 0.05);
      } else {
        this.esferaEixo1.rotation.z = 0.6;
        this.esferaEixo2.rotation.z = 0.6;
      }
    } else {
      //se n tiver pressionar pra esquerda ou direita, volta a roda pra posição 0
      if (
        Math.round(this.esferaEixo2.rotation.z * 10) / 10 > 0.01 &&
        auxCam != 2
      ) {
        this.esferaEixo1.rotateZ(-this.moveDistance * 0.02);
        this.esferaEixo2.rotateZ(-this.moveDistance * 0.02);
      } else if (
        Math.round(this.esferaEixo2.rotation.z * 10) / 10 < 0.01 &&
        auxCam != 2
      ) {
        this.esferaEixo1.rotateZ(this.moveDistance * 0.02);
        this.esferaEixo2.rotateZ(this.moveDistance * 0.02);
      } else {
        this.esferaEixo1.rotation.z = 0;
        this.esferaEixo2.rotation.z = 0;
      }
    }
    if (this.keyboard.pressed("down")) {
      this.rd1.rotateZ(-this.moveDistance);
      this.rd2.rotateZ(-this.moveDistance);
      this.rt1.rotateZ(-this.moveDistance);
      this.rt2.rotateZ(-this.moveDistance);

      if (Math.round(this.moveDistance * 100) / 100 > 0) {
        this.moveDistance -= 0.005;
        if (auxCam != 2) {
          this.esqueletoCarro.translateX(
            Math.round(this.moveDistance * 100) / 100
          );
        }
      } else if (Math.round(this.moveDistance * 100) / 100 <= 0) {
        if (Math.round(this.moveDistance * 100) / 100 > -this.velMaxima)
          this.moveDistance -= 0.005;
        if (auxCam != 2) {
          this.esqueletoCarro.translateX(
            Math.round(this.moveDistance * 100) / 100
          );

          if (this.keyboard.pressed("left")) {
            this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);
          } else if (this.keyboard.pressed("right")) {
            this.esqueletoCarro.rotateY(this.moveDistance * 0.05);
          }
        }
      }
    } else {
      //quando o cara nao apertar a seta para tras, a velocidade tem que aumentar linearmente
      if (Math.round(this.moveDistance * 100) / 100 < 0) {
        this.moveDistance += 0.007;

        if (auxCam != 2) {
          this.esqueletoCarro.translateX(
            Math.round(this.moveDistance * 100) / 100
          );

          if (this.keyboard.pressed("left")) {
            this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);
          } else if (this.keyboard.pressed("right")) {
            this.esqueletoCarro.rotateY(this.moveDistance * 0.05);
          }

          this.rd1.rotateZ(-this.moveDistance);
          this.rd2.rotateZ(-this.moveDistance);
          this.rt1.rotateZ(-this.moveDistance);
          this.rt2.rotateZ(-this.moveDistance);
        }
      }
    }
  }

  reset(pos, rot) {
    this.moveDistance = 0;
    this.esqueletoCarro.position.set(pos[0], pos[1], pos[2]);
    this.esqueletoCarro.rotation.set(rot[0], rot[1], rot[2]);
    this.esferaEixo1.rotation.z = 0;
    this.esferaEixo2.rotation.z = 0;
  }
}
