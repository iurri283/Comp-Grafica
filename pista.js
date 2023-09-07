import * as THREE from 'three';

export class Pista {
    constructor(scene) {
        this.materialPista = new THREE.MeshBasicMaterial({ color: "orange" });
        this.materialPistaInicio = new THREE.MeshBasicMaterial({ color: "blue" });
        this.cubeGeometry = new THREE.BoxGeometry(100, 1, 100);
        this.pistaFormada = new Array(16);
        this.scene = scene;
    }

    pista1(){
        // Crie os 16 cubos e posicione-os na pista quadrada
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                
                if((i!=1 || j!=1) && (i!=1 || j!=2) && (i!=2 || j!=2) && (i!=2 || j!=1) && (i!=1 || j!=3) && (i!=3 || j!=1) && (i!=2 || j!=3) && (i!=3 || j!=2) && (i!=3  || j!=3)){
                    // console.log([i * 100, 0, j * 100]);
                    if(i==2 && j==0){
                        this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPistaInicio);
                    }else{
                        this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPista);
                    }
                    this.pistaFormada[i].position.set(i * 100, 0, j * 100); // Altere as posições conforme necessário
                    this.scene.add(this.pistaFormada[i]);
                } 
            }
        }
    }

    pista2(){
        let vet = [[0, 0, 0], [0,0,100],[0,0,200], [100,0,200],
                   [200,0,200], [100, 0, 0], [200,0,300],[200,0,0],
                   [200,0,400], [300,0,0], [300, 0, 400], [400,0,0],
                   [400,0,100], [400,0,200],[400,0,300], [400, 0, 400]];

        for(let i=0; i<16;i++){
            // console.log(vet[i]);
            if(i==7){
                this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPistaInicio);
            }else{
                this.pistaFormada[i] = new THREE.Mesh(this.cubeGeometry, this.materialPista);
            }
            this.pistaFormada[i].position.set(vet[i][0], vet[i][1], vet[i][2]); // Altere as posições conforme necessário
            this.scene.add(this.pistaFormada[i]);
        }
    }

    removePista1(){
        console.log(this.pistaFormada.length);
        for(let i=0; i<this.pistaFormada.length;i++){
            this.scene.remove(this.pistaFormada[i]);
        }
    }

    removePista2(){
        for(let i=0; i<this.pistaFormada.length;i++){
            this.scene.remove(this.pistaFormada[i]);
        }
    }
}