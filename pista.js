import * as THREE from "three";
// import {abs} from 'math';

export class Pista {
  constructor(scene) {
    this.materialPista = new THREE.MeshPhongMaterial({ color: "orange" });
    this.materialPistaInicio = new THREE.MeshPhongMaterial({ color: "blue" });
    this.cubeGeometry = new THREE.BoxGeometry(100, 1, 100);
    this.pistaFormada = new Array(37);
    this.checkpoint = new Array(37);
    for (let i = 0; i < this.checkpoint.length; i++) {
      this.checkpoint[i] = false;
    }
    this.numeroPista = 0;
    this.contador_blocos = 0;
    this.estaNaPista = true;
    this.scene = scene;
    this.loader = new THREE.TextureLoader();

    this.pistaMaterials1 = [
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //x+
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //x-   Texture + color
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //y+
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z+
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z-
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z-
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z-
    ];

    this.pistaMaterials2 = [
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //x+
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //x-   Texture + color
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //y+
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z+
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z-
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z-
      this.setMaterial("../assets/textures/asfalto.jpg", 1, 1), //z-
    ];
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

  pista1() {
    // Crie os 16 cubos e posicione-os na pista quadrada
    this.numeroPista = 1;
    let vet = [
      [0, 0, 0],
      [0, 0, 100],
      [0, 0, 200],
      [0, 0, 300],
      [0, 0, 400],
      [100, 0, 0],
      [100, 0, 400],
      [200, 0, 0],
      [200, 0, 400],
      [300, 0, 0],
      [300, 0, 400],
      [400, 0, 0],
      [400, 0, 100],
      [400, 0, 200],
      [400, 0, 300],
      [400, 0, 400],
    ];

    for (let i = 0; i < 16; i++) {
      // console.log(vet[i]);
      if (i == 7) {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.materialPistaInicio
        );
      } else {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.pistaMaterials1
        );
      }
      this.pistaFormada[i].receiveShadow = true;
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
    let vet = [
      [0, 0, 0],
      [0, 0, 100],
      [0, 0, 200],
      [100, 0, 200],
      [200, 0, 200],
      [100, 0, 0],
      [200, 0, 300],
      [200, 0, 0],
      [200, 0, 400],
      [300, 0, 0],
      [300, 0, 400],
      [400, 0, 0],
      [400, 0, 100],
      [400, 0, 200],
      [400, 0, 300],
      [400, 0, 400],
    ];

    for (let i = 0; i < 16; i++) {
      // console.log(vet[i]);
      if (i == 7) {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.materialPistaInicio
        );
      } else {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.pistaMaterials1
        );
      }
      this.pistaFormada[i].receiveShadow = true;
      this.pistaFormada[i].position.set(vet[i][0], vet[i][1], vet[i][2]); // Altere as posições conforme necessário
      this.scene.add(this.pistaFormada[i]);
    }
  }

  pista3() {
    this.numeroPista = 3;
    let vet = [
      [0, 0, 0],
      [100, 0, 0],
      [200, 0, 0],
      [300, 0, 0],
      [400, 0, 0],
      [500, 0, 0],
      [600, 0, 0],
      [0, 0, 200],
      [0, 0, 100],
      [200, 0, 100],
      [700, 0, 100],
      [700, 0, 0],
      [200, 0, 200],
      [700, 0, 200],
      [0, 0, 300],
      [200, 0, 300],
      [300, 0, 300],
      [400, 0, 300],
      [500, 0, 300],
      [600, 0, 300],
      [700, 0, 300],
      [0, 0, 400],
      [700, 0, 400],
      [0, 0, 500],
      [700, 0, 500],
      [0, 0, 600],
      [100, 0, 600],
      [200, 0, 600],
      [700, 0, 600],
      [200, 0, 700],
      [700, 0, 700],
      [200, 0, 800],
      [300, 0, 800],
      [400, 0, 800],
      [500, 0, 800],
      [600, 0, 800],
      [700, 0, 800],
    ];

    for (let i = 0; i < 37; i++) {
      // console.log(vet[i]);
      if (i == 7) {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.materialPistaInicio
        );
      } else {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.materialPista
        );
      }
      this.pistaFormada[i].receiveShadow = true;
      this.pistaFormada[i].position.set(vet[i][0], vet[i][1], vet[i][2]); // Altere as posições conforme necessário
      this.scene.add(this.pistaFormada[i]);
    }
  }

  pista4() {
    this.numeroPista = 4;
    let vet = [
      [0, 0, 0],
      [100, 0, 0],
      [200, 0, 0],
      [0, 0, 100],
      [200, 0, 100],
      [0, 0, 200],
      [100, 0, 200],
      [500, 0, 700],
      [300, 0, 200],
      [400, 0, 200],
      [200, 0, 300],
      [400, 0, 300],
      [200, 0, 400],
      [300, 0, 400],
      [400, 0, 400],
      [500, 0, 400],
      [600, 0, 400],
      [700, 0, 400],
      [400, 0, 500],
      [700, 0, 500],
      [400, 0, 600],
      [700, 0, 600],
      [400, 0, 700],
      [200, 0, 200],
      [600, 0, 700],
      [700, 0, 700],
    ];

    for (let i = 0; i < 26; i++) {
      // console.log(vet[i]);
      if (i == 7) {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.materialPistaInicio
        );
      } else {
        this.pistaFormada[i] = new THREE.Mesh(
          this.cubeGeometry,
          this.materialPista
        );
      }
      this.pistaFormada[i].receiveShadow = true;
      this.pistaFormada[i].position.set(vet[i][0], vet[i][1], vet[i][2]); // Altere as posições conforme necessário
      this.scene.add(this.pistaFormada[i]);
    }
  }

  removePista() {
    // console.log(this.pistaFormada.length);
    for (let i = 0; i < this.pistaFormada.length; i++) {
      this.scene.remove(this.pistaFormada[i]);
    }
  }
  inPista(posicaoCarro) {
    if (this.numeroPista == 1 || this.numeroPista == 2) {
      for (let i = 0; i < 16; i++) {
        if (
          posicaoCarro.x >= this.pistaFormada[i].position.x - 50 &&
          posicaoCarro.x <= this.pistaFormada[i].position.x + 50 &&
          posicaoCarro.z >= this.pistaFormada[i].position.z - 50 &&
          posicaoCarro.z <= this.pistaFormada[i].position.z + 50
        ) {
          this.checkpoint[i] = true;
          if (i == 7) {
            this.checkpoint[7] = true;
          } else {
            this.checkpoint[7] = false;
          }
          return true;
        }
      }
      return false;
    } else if (this.numeroPista == 3) {
      for (let i = 0; i < 37; i++) {
        if (
          posicaoCarro.x >= this.pistaFormada[i].position.x - 50 &&
          posicaoCarro.x <= this.pistaFormada[i].position.x + 50 &&
          posicaoCarro.z >= this.pistaFormada[i].position.z - 50 &&
          posicaoCarro.z <= this.pistaFormada[i].position.z + 50
        ) {
          if (i == 7) {
            this.checkpoint[7] = true;
          } else {
            this.checkpoint[7] = false;
          }
          if (this.checkpoint[i] == false) {
            this.contador_blocos++;
            this.checkpoint[i] = true;
          }
          return true;
        }
      }
      return false;
    } else if (this.numeroPista == 4) {
      for (let i = 0; i < 26; i++) {
        if (
          posicaoCarro.x >= this.pistaFormada[i].position.x - 50 &&
          posicaoCarro.x <= this.pistaFormada[i].position.x + 50 &&
          posicaoCarro.z >= this.pistaFormada[i].position.z - 50 &&
          posicaoCarro.z <= this.pistaFormada[i].position.z + 50
        ) {
          if (i == 7) {
            this.checkpoint[7] = true;
          } else {
            this.checkpoint[7] = false;
          }
          if (this.checkpoint[i] == false) {
            this.contador_blocos++;
            this.checkpoint[i] = true;
          }
          return true;
        }
      }
      return false;
    }
  }

  volta() {
    // console.log(this.checkpoint);
    if (this.numeroPista == 1 || this.numeroPista == 2) {
      for (let i = 0; i < 16; i++) {
        if (!this.checkpoint[i]) {
          return false;
        }
      }
      for (let i = 0; i < 16; i++) {
        this.checkpoint[i] = false;
      }
      return true;
    } else if (this.numeroPista == 3) {
      // console.log(this.contador_blocos);
      if (this.checkpoint[7] && this.contador_blocos >= 29) {
        for (let i = 0; i < 37; i++) {
          this.checkpoint[i] = false;
          this.contador_blocos = 0;
        }
        return true;
      }
      return false;
    } else if (this.numeroPista == 4) {
      // console.log(this.contador_blocos);
      if (this.checkpoint[7] && this.contador_blocos >= 25) {
        for (let i = 0; i < 26; i++) {
          this.checkpoint[i] = false;
          this.contador_blocos = 0;
        }
        return true;
      }
      return false;
    }
  }
}
