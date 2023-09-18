import * as THREE from 'three';
import KeyboardState from './libs/util/KeyboardState.js';

export class Carro {

    constructor(scene, camera) {
        // var speed = 10;
        this.moveDistance = 0.0;
        this.velMaxima = 2.0;
        this.camera = camera;

        // To use the keyboard
        this.keyboard = new KeyboardState();

        let materialEixo, materialCalotas, materialPneu, materialFarois, materialEsqueletoCarro;

        materialEixo = new THREE.MeshPhongMaterial({ color: 0x0000FF }); // create a basic material
        materialCalotas = new THREE.MeshPhongMaterial({ color: 0xFFFF80 }); // create a basic material
        materialPneu = new THREE.MeshPhongMaterial({ color: 0x000000 });
        materialFarois = new THREE.MeshPhongMaterial({ color: 0xFFFF00 });
        materialEsqueletoCarro = new THREE.MeshPhongMaterial({ color: 0x008000 });

        //#################################################-- EIXOS E RODAS DIANTEIROS --##############################
        // let axesHelper = new THREE.AxesHelper( 12 );
        //criando rodas dianteiras
        let rodasGeometry = new THREE.TorusGeometry(1, 0.4, 12, 48);

        this.rd1 = new THREE.Mesh(rodasGeometry, materialPneu);
        this.rd2 = new THREE.Mesh(rodasGeometry, materialPneu);

        // rd1.position.set(0.0, 3.5, 0.0);
        // rd2.position.set(0.0, -3.5, 0.0);

        this.rd1.rotateX(1.5708);
        this.rd2.rotateX(1.5708);

        // rd2.add(axesHelper);

        //criando calotas
        let calotasGeometry = new THREE.CircleGeometry(0.7, 0);
        let calotaRd1 = new THREE.Mesh(calotasGeometry, materialCalotas);
        let calotaRd2 = new THREE.Mesh(calotasGeometry, materialCalotas);

        calotaRd1.position.set(0.0, 0.0, -0.2);
        calotaRd2.position.set(0.0, 0.0, 0.2);

        calotaRd1.rotateX(3.1416);
        // calotaRd2.rotateX(-1.5708);

        this.rd1.add(calotaRd1);
        this.rd2.add(calotaRd2);

        //criando eixos
        let eixoGeometry = new THREE.CylinderGeometry(0.2, 0.2, 7, 64);
        let eixoDianteiro = new THREE.Mesh(eixoGeometry, materialEixo);

        eixoDianteiro.position.set(4, -2.0, 0);
        eixoDianteiro.rotateX(1.5708);


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
        calotaRt1.position.set(0.0, 0.0, -0.2);
        calotaRt2.position.set(0.0, 0.0, 0.2);


        // calotaRt1.rotateX(1.5708);
        calotaRt1.rotateX(3.1416);

        this.rt1.add(calotaRt1);
        this.rt2.add(calotaRt2);

        let eixoTraseiro = new THREE.Mesh(eixoGeometry, materialEixo);
        eixoTraseiro.position.set(-4.0, -2.0, 0.0);
        eixoTraseiro.rotateX(1.5708);

        eixoTraseiro.add(this.rt1);
        eixoTraseiro.add(this.rt2);

        //##########################################--ESFERAS DOS EIXOS--###########################################
        let esferaEixoGeometry = new THREE.SphereGeometry(0.2, 64, 32);
        this.esferaEixo1 = new THREE.Mesh(esferaEixoGeometry, materialFarois);
        this.esferaEixo2 = new THREE.Mesh(esferaEixoGeometry, materialFarois);

        this.esferaEixo1.position.set(0.0, 3.5, 0.0);
        this.esferaEixo2.position.set(0.0, -3.5, 0.0);


        eixoDianteiro.add(this.esferaEixo1);
        eixoDianteiro.add(this.esferaEixo2);

        this.esferaEixo1.add(this.rd1);
        this.esferaEixo2.add(this.rd2);

        //#################################################-- FAROIS DO CARRO --###############################################
        let esferaGeometry = new THREE.SphereGeometry(0.5, 64, 32);
        let farol1 = new THREE.Mesh(esferaGeometry, materialFarois);
        let farol2 = new THREE.Mesh(esferaGeometry, materialFarois);

        farol1.position.set(5, -1.0, 2);
        farol2.position.set(5, -1.0, -2);


        //#################################################-- ESQUELETO DO CARRO --###############################################
        let cubeGeometry = new THREE.BoxGeometry(10, 4, 6.2);
        this.esqueletoCarro = new THREE.Mesh(cubeGeometry, materialEsqueletoCarro);
        this.esqueletoCarro.position.set(200.0, 4.0, 0.0);
        // this.esqueletoCarro.rotateY(1.516);

        this.esqueletoCarro.add(eixoDianteiro);
        this.esqueletoCarro.add(eixoTraseiro);
        this.esqueletoCarro.add(farol1);
        this.esqueletoCarro.add(farol2);

        scene.add(this.esqueletoCarro);
    }

    //#####################################################################################################################
    keyboardUpdate() {
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
            this.esqueletoCarro.translateX(Math.round(this.moveDistance * 100) / 100);

            if (this.keyboard.pressed("left")) {
                this.esqueletoCarro.rotateY(this.moveDistance * 0.05);

            } else if (this.keyboard.pressed("right")) {
                this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);
            }
        } else {
            if (this.moveDistance > 0) {
                this.moveDistance -= 0.007;
                this.esqueletoCarro.translateX(Math.round(this.moveDistance * 100) / 100);
                this.rd1.rotateZ(this.moveDistance);
                this.rd2.rotateZ(this.moveDistance);
                this.rt1.rotateZ(this.moveDistance);
                this.rt2.rotateZ(this.moveDistance);

                if (this.keyboard.pressed("left")) {
                    this.esqueletoCarro.rotateY(this.moveDistance * 0.05);

                } else if (this.keyboard.pressed("right")) {
                    this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);

                }
            }
            // console.log(Math.round(this.moveDistance * 100) / 100);
        }
        if (this.keyboard.pressed("left")) {
            if (Math.round(this.esferaEixo2.rotation.z * 100) / 100 <= 0.6 && Math.round(this.esferaEixo2.rotation.z * 100) / 100 >= -0.6) {
                this.esferaEixo1.rotateZ(-1 * 0.05);
                this.esferaEixo2.rotateZ(-1 * 0.05);

                // this.esferaEixo1.rotateZ(-this.moveDistance * 0.05);
                // this.esferaEixo2.rotateZ(-this.moveDistance * 0.05);

                console.log(this.esqueletoCarro.position.z+" ------ "+this.esferaEixo2.position.z);


            } else {
                this.esferaEixo1.rotation.z = -0.6;
                this.esferaEixo2.rotation.z = -0.6;
            }

        }
        else if (this.keyboard.pressed("right")) {
            if (Math.round(this.esferaEixo2.rotation.z * 100) / 100 <= 0.6 && Math.round(this.esferaEixo2.rotation.z * 100) / 100 >= -0.6) {
                this.esferaEixo1.rotateZ(1 * 0.05);
                this.esferaEixo2.rotateZ(1 * 0.05);

                // this.esferaEixo1.rotateZ(this.moveDistance * 0.05);
                // this.esferaEixo2.rotateZ(this.moveDistance * 0.05);
            } else {
                this.esferaEixo1.rotation.z = 0.6;
                this.esferaEixo2.rotation.z = 0.6;
            }
        }else{//se n tiver pressionar pra esquerda ou direita, volta a roda pra posição 0
            if(Math.round(this.esferaEixo2.rotation.z * 10) / 10 > 0.01){
                this.esferaEixo1.rotateZ(-this.moveDistance*0.02);
                this.esferaEixo2.rotateZ(-this.moveDistance*0.02);
            }else if(Math.round(this.esferaEixo2.rotation.z * 10) / 10 < 0.01){
                this.esferaEixo1.rotateZ(this.moveDistance*0.02);
                this.esferaEixo2.rotateZ(this.moveDistance*0.02);
            }else{
                this.esferaEixo1.rotation.z = 0;
                this.esferaEixo2.rotation.z = 0;
            }
        }
        if (this.keyboard.pressed("down")) {
            this.rd1.rotateZ(-1);
            this.rd2.rotateZ(-1);
            this.rt1.rotateZ(-1);
            this.rt2.rotateZ(-1);

            if (Math.round(this.moveDistance * 100) / 100 > 0) {
                this.moveDistance -= 0.005;
                this.esqueletoCarro.translateX(Math.round(this.moveDistance * 100) / 100);
            } else if (Math.round(this.moveDistance * 100) / 100 <= 0) {
                if (Math.round(this.moveDistance * 100) / 100 > -this.velMaxima)
                    this.moveDistance -= 0.005;
                this.esqueletoCarro.translateX(Math.round(this.moveDistance * 100) / 100);
                if (this.keyboard.pressed("left")) {
                    this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);

                } else if (this.keyboard.pressed("right")) {
                    this.esqueletoCarro.rotateY(this.moveDistance * 0.05);

                }
            }
        } else {//quando o cara nao apertar a seta para tras, a velocidade tem que aumentar linearmente
            if (Math.round(this.moveDistance * 100) / 100 < 0) {
                this.moveDistance += 0.007;

                this.esqueletoCarro.translateX(Math.round(this.moveDistance * 100) / 100);

                this.rd1.rotateZ(-1);
                this.rd2.rotateZ(-1);
                this.rt1.rotateZ(-1);
                this.rt2.rotateZ(-1);

                if (this.keyboard.pressed("left")) {
                    this.esqueletoCarro.rotateY(-this.moveDistance * 0.05);

                } else if (this.keyboard.pressed("right")) {
                    this.esqueletoCarro.rotateY(this.moveDistance * 0.05);

                }
            }
        }
    }

    reset() {
        this.moveDistance = 0;
        this.esqueletoCarro.position.set(200, 4, 0);
        this.esqueletoCarro.rotation.set(0, 0, 0);
        this.esferaEixo1.rotation.z = 0;
        this.esferaEixo2.rotation.z = 0;
    }
}