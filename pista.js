import * as THREE from 'three';
// import {abs} from 'math';

export class Pista {
    constructor(scene) {
        this.materialPista = new THREE.MeshPhongMaterial({ color: "orange" });
        this.materialPistaInicio = new THREE.MeshPhongMaterial({ color: "blue" });
        this.cubeGeometry = new THREE.BoxGeometry(100, 1, 100);
        this.pistaFormada = new Array(16);
        this.checkpoint = new Array(16);
        for (let i = 0; i < this.checkpoint.length; i++) {
            this.checkpoint[i] = false;
        }
        this.numeroPista = 0;
        this.estaNaPista = true;
        this.scene = scene;
    }

    pista1() {
        // Crie os 16 cubos e posicione-os na pista quadrada
        this.numeroPista = 1;
        let vet = [[0, 0, 0], [0, 0, 100], [0, 0, 200], [0, 0, 300],
        [0, 0, 400], [100, 0, 0], [100, 0, 400], [200, 0, 0],
        [200, 0, 400], [300, 0, 0], [300, 0, 400], [400, 0, 0],
        [400, 0, 100], [400, 0, 200], [400, 0, 300], [400, 0, 400]];

        for (let i = 0; i < 16; i++) {
            // console.log(vet[i]);
            if (i == 7) {
                this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPistaInicio);
            } else {
                this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPista);
            }
            this.pistaFormada[i].position.set(vet[i][0], vet[i][1], vet[i][2]); // Altere as posições conforme necessário
            this.scene.add(this.pistaFormada[i]);
        }
        // for (let i = 0; i < 5; i++) {
        //     for (let j = 0; j < 5; j++) {

        //         if((i!=1 || j!=1) && (i!=1 || j!=2) && (i!=2 || j!=2) && (i!=2 || j!=1) && (i!=1 || j!=3) && (i!=3 || j!=1) && (i!=2 || j!=3) && (i!=3 || j!=2) && (i!=3  || j!=3)){
        //             console.log([i * 100, 0, j * 100]);
        //             if(i==2 && j==0){
        //                 this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPistaInicio);
        //             }else{
        //                 this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPista);
        //             }
        //             this.pistaFormada[i].position.set(i * 100, 0, j * 100); // Altere as posições conforme necessário
        //             this.scene.add(this.pistaFormada[i]);
        //         } 
        //     }
        // }
    }

    pista2() {
        this.numeroPista = 2;
        let vet = [[0, 0, 0], [0, 0, 100], [0, 0, 200], [100, 0, 200],
        [200, 0, 200], [100, 0, 0], [200, 0, 300], [200, 0, 0],
        [200, 0, 400], [300, 0, 0], [300, 0, 400], [400, 0, 0],
        [400, 0, 100], [400, 0, 200], [400, 0, 300], [400, 0, 400]];

        for (let i = 0; i < 16; i++) {
            // console.log(vet[i]);
            if (i == 7) {
                this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPistaInicio);
            } else {
                this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPista);
            }
            this.pistaFormada[i].position.set(vet[i][0], vet[i][1], vet[i][2]); // Altere as posições conforme necessário
            this.scene.add(this.pistaFormada[i]);
        }
    }

    removePista1() {
        // console.log(this.pistaFormada.length);
        for (let i = 0; i < this.pistaFormada.length; i++) {
            this.scene.remove(this.pistaFormada[i]);
        }
    }

    removePista2() {
        for (let i = 0; i < this.pistaFormada.length; i++) {
            this.scene.remove(this.pistaFormada[i]);
        }
    }

    inPista(posicaoCarro) {

        if (this.numeroPista == 1) {
            for (let i = 0; i < 16; i++) {
                if ((posicaoCarro.x >= this.pistaFormada[i].position.x - 50 && posicaoCarro.x <= this.pistaFormada[i].position.x + 50) && (posicaoCarro.z >= this.pistaFormada[i].position.z - 50 && posicaoCarro.z <= this.pistaFormada[i].position.z + 50)) {
                    this.checkpoint[i] = true;
                    if(i==7){
                        this.checkpoint[7] = true;
                    }else{
                        this.checkpoint[7] = false;
                    }
                    return true;
                }
            }
            return false;
        } else if (this.numeroPista == 2) {
            for (let i = 0; i < 16; i++) {
                if ((posicaoCarro.x >= this.pistaFormada[i].position.x - 50 && posicaoCarro.x <= this.pistaFormada[i].position.x + 50) && (posicaoCarro.z >= this.pistaFormada[i].position.z - 50 && posicaoCarro.z <= this.pistaFormada[i].position.z + 50)) {
                    return true;
                }
            }
            return false;
        }
    }

    volta(){
        // console.log(this.checkpoint);
        for (let i = 0; i < 16; i++) {
            if(!this.checkpoint[i]){
                return false;
            }
        }
        for (let i = 0; i < this.checkpoint.length; i++) {
            this.checkpoint[i] = false;
        }
        return true;
    }
}