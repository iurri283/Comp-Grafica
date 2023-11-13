import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cube = new THREE.Mesh(cubeGeometry, material);
// position the cube
cube.position.set(0.0, 4.0, 1.0);
// add the cube to the scene
scene.add(cube);
var faceArray = [];
    var textureFront = new THREE.TextureLoader().load( '../assets/textures/cube/Bridge/negz.jpg');
    var textureBack = new THREE.TextureLoader().load( '../assets/textures/cube/Bridge/posz.jpg');
    var textureTop = new THREE.TextureLoader().load( '../assets/textures/cube/Bridge/posy.jpg');
    textureTop.rotation = THREE.MathUtils.degToRad(-90);
    textureTop.center = new THREE.Vector2(0.5, 0.5);
    var textureBottom = new THREE.TextureLoader().load( '../assets/textures/cube/Bridge/negy.jpg');
    textureBottom.rotation = THREE.MathUtils.degToRad(-90);
    textureBottom.center = new THREE.Vector2(0.5, 0.5);
    var textureRight = new THREE.TextureLoader().load( '../assets/textures/cube/Bridge/posx.jpg');
    var textureLeft = new THREE.TextureLoader().load( '../assets/textures/cube/Bridge/negx.jpg');
      
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureFront }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureBack }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureTop }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureBottom }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureRight }));
    faceArray.push(new THREE.MeshBasicMaterial( { map: textureLeft }));
       
    for (var i = 0; i < 6; i++)
      faceArray[i].side = THREE.BackSide;
       
    var skyboxGeometry = new THREE.BoxGeometry( 1000, 1000, 1000);
    var skybox = new THREE.Mesh( skyboxGeometry, faceArray );
    // skybox.rotateX(degreesToRadians(90));
    scene.add( skybox );

// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}