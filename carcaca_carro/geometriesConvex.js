import * as THREE from "three";
import Stats from "../build/jsm/libs/stats.module.js";
import GUI from "../libs/util/dat.gui.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import { ConvexGeometry } from "../build/jsm/geometries/ConvexGeometry.js";
import {
  initRenderer,
  initDefaultSpotlight,
  createGroundPlane,
  onWindowResize,
  lightFollowingCamera,
} from "../libs/util/util.js";

var scene = new THREE.Scene(); // Create main scene
var stats = new Stats(); // To show FPS information
var clock = new THREE.Clock();
var light = initDefaultSpotlight(scene, new THREE.Vector3(25, 30, 20)); // Use default light
var renderer = initRenderer(); // View function in util/utils
renderer.setClearColor("rgb(30, 30, 30)");
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(-30, 15, 20);
camera.up.set(0, 1, 0);

var followCamera = false; // Controls if light will follow camera

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

var groundPlane = createGroundPlane(40, 35); // width and height
groundPlane.rotateX(THREE.MathUtils.degToRad(-90));
scene.add(groundPlane);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(20);
axesHelper.visible = false;
axesHelper.translateY(0.1);
scene.add(axesHelper);

var objColor = "rgb(255, 0, 0)";
var objOpacity = 0.5;

// Object Material
var objectMaterial = new THREE.MeshPhongMaterial({
  color: objColor,
  opacity: objOpacity,
  transparent: true,
});

//----------------------------------
// Create Convex Geometry
//----------------------------------
var numPoints = 30;

var sphereGeom = new THREE.SphereGeometry(0.2); // Sphere to represent points
var sphereMaterial = new THREE.MeshPhongMaterial({ color: "rgb(255,255,0)" });

// Global variables to be removed from memory each interaction
var pointCloud = null;
var pointCloud2 = null;
//  var spGroup = null;
var points = null;
var objectSize = 10;
var convexGeometry = null;
var object = null;
var pointCloudVisibility = true;
var objectVisibility = true;
var castShadow = true;

// Create convex object the first time
updateConvexObject();

buildInterface();
render();

function generatePoints(vetor) {
  //pontos roda
  // [-0.5, 9.1, 8.2], [-0.5, 9.1, 7.0], [-0.5, 8.05, 6.1] 7, 8, 9
  var points = [];

  for (var i = 0; i < vetor.length; i++) {
    points.push(new THREE.Vector3(vetor[i][0], vetor[i][1], vetor[i][2]));
  }

  // var material = new THREE.MeshPhongMaterial({ color: "rgb(255,255,255)" });
  // pointCloud = new THREE.Object3D();
  // points.forEach(function (point) {
  //   var spGeom = new THREE.SphereGeometry(0.2);
  //   var spMesh = new THREE.Mesh(spGeom, material);
  //   spMesh.position.set(point.x, point.y, point.z);
  //   pointCloud.add(spMesh);
  // });

  // scene.add(pointCloud);

  return points;
}

function criaObjeto(vetor, objectMaterial) {
 // First, create the point vector to be used by the convex hull algorithm
 var localPoints = generatePoints(vetor);

 // Then, build the convex geometry with the generated points
 convexGeometry = new ConvexGeometry(localPoints);

 object = new THREE.Mesh(convexGeometry, objectMaterial);
 object.castShadow = castShadow;
 object.visible = objectVisibility;
 scene.add(object);
}

function updateConvexObject() {
  // As the object is updated when changing number of Points
  // it's useful to remove the previous object from memory (if it exists)

  var vetor = [
    [0, 10, 0], 
    [-0.5, 11.5, 4],
    [0, 10.1, 10],
    [0, 10.2, 4],
    [-0.5, 8.2, 9.7],
    [-0.5, 8.2, 8.7],
    [-0.5, 9.1, 8.2],
    [-0.5, 9.1, 6.9],
    [-0.5, 8.05, 6.4],
    [-0.5, 7.6, 6.4],
    [-0.5, 7.6, 2.4],
    [-0.5, 8.05, 2.3],
    [-0.5, 9.2, 1.8],
    [-0.5, 9.2, 0.9],
    [-0.5, 8.5, 0.4],
    [-0.5, 8.5, 0.1],

    [-5.5, 10, 0],
    [-4.5, 11.5, 4],
    [-5.5, 10.1, 10],
    [-5.5, 10.2, 4],
    [-5.5, 8.2, 9.7],
    [-5.5, 8.2, 8.7],
    [-5.5, 9.1, 8.2],
    [-5.5, 9.1, 6.9],
    [-5.5, 8.05, 6.4],
    [-5.5, 7.6, 6.4],
    [-5.5, 7.6, 2.4],
    [-5.5, 8.05, 2.3],
    [-5.5, 9.2, 1.8],
    [-5.5, 9.2, 0.9],
    [-5.5, 8.5, 0.4],
    [-5.5, 8.5, 0.1],
  ];

  var vetor1 = [
    [-0.5, 10.1, 0],
    [-0.5, 10.1, 10],
    [-0.5, 11.5, 4],

    [-5.5, 10.1, 0],
    [-5.5, 10.1, 10],
    [-5.5, 11.5, 4],
  ];

  var vetor2 = [
    [-0.5, 10.1, 10],
    [-0.5, 8.2, 9.7],
    [-0.5, 8.2, 8.7],
    [-0.5, 9.1, 8.2],
    [-0.5, 10.1, 8.2],

    [-5.5, 10.1, 10],
    [-5.5, 8.2, 9.7],
    [-5.5, 8.2, 8.7],
    [-5.5, 9.1, 8.2],
    [-5.5, 10.1, 8.2],
  ];

  var vetor3 =[
    [-0.5, 9.1, 8.2],
    [-0.5, 9.1, 6.9],
    [-0.5, 10.1, 8.2],
    [-0.5, 10.1, 6.9],
    
    [-5.5, 9.1, 8.2],
    [-5.5, 9.1, 6.9],
    [-5.5, 10.1, 8.2],
    [-5.5, 10.1, 6.9],
  ];

  var vetor4 =[
    [-0.5, 9.1, 6.9],
    [-0.5, 10.1, 6.9],
    [-0.5, 8.05, 6.4],
    [-0.5, 10.1, 6.4],

    [-5.5, 9.1, 6.9],
    [-5.5, 10.1, 6.9],
    [-5.5, 8.05, 6.4],
    [-5.5, 10.1, 6.4],
  ];

  var vetor5 =[
    [-0.5, 8.05, 6.4],
    [-0.5, 10.1, 6.4],
    [-0.5, 8.05, 2.3],
    [-0.5, 10.1, 2.3],

    [-5.5, 8.05, 6.4],
    [-5.5, 10.1, 6.4],
    [-5.5, 8.05, 2.3],
    [-5.5, 10.1, 2.3],
  ];

  var vetor6 =[
    [-0.5, 8.05, 6.4],
    [-0.5, 8.05, 2.3],
    [-0.5, 7.6, 6.4],
    [-0.5, 7.6, 2.3],

    [-5.5, 8.05, 6.4],
    [-5.5, 8.05, 2.3],
    [-5.5, 7.6, 6.4],
    [-5.5, 7.6, 2.3],
  ];

  var vetor7 =[
    [-0.5, 8.05, 2.3],
    [-0.5, 10.1, 2.3],
    [-0.5, 9.1, 1.8],
    [-0.5, 10.1, 1.8],

    [-5.5, 8.05, 2.3],
    [-5.5, 10.1, 2.3],
    [-5.5, 9.1, 1.8],
    [-5.5, 10.1, 1.8],
  ];

  var vetor8 =[
    [-0.5, 9.1, 1.8],
    [-0.5, 9.1, 0.5],
    [-0.5, 10.1, 1.8],
    [-0.5, 10.1, 0.5],
    
    [-5.5, 9.1, 1.8],
    [-5.5, 9.1, 0.5],
    [-5.5, 10.1, 1.8],
    [-5.5, 10.1, 0.5],
  ];

  var vetor9 =[
    [-0.5, 9.1, 0.5],
    [-0.5, 10.1, 0.5],
    [-0.5, 10.1, 0], 
    [-0.5, 8.7, 0.3],
    [-0.5, 8.9, 0.1],

    [-5.5, 9.1, 0.5],
    [-5.5, 10.1, 0.5],
    [-5.5, 10.1, 0], 
    [-5.5, 8.7, 0.3],
    [-5.5, 8.9, 0.1],
  ];

  var vidro1 =[
    [-0.49, 10.7, 2.3],
    [-0.49, 10.45, 2.3],
    [-0.49, 10.45, 1.6],

    [-5.51, 10.7, 2.3],
    [-5.51, 10.45, 2.3],
    [-5.51, 10.45, 1.6],
  ];

  var vidro2 =[
    [-0.49, 10.45, 4.5],
    [-0.49, 10.45, 2.8],
    [-0.49, 11.3, 4],
    [-0.49, 10.85, 2.8],
    [-0.49, 11.17, 4.5],

    [-5.51, 10.45, 4.5],
    [-5.51, 10.45, 2.8],
    [-5.51, 11.3, 4],
    [-5.51, 10.85, 2.8],
    [-5.51, 11.17, 4.5],
  ];

  var vidro3 = [
    [-0.49, 11.14, 5],
    [-0.49, 10.45, 5],
    [-0.49, 10.45, 6.3],
    [-0.49, 10.84, 6.3],

    [-5.51, 11.14, 5],
    [-5.51, 10.45, 5],
    [-5.51, 10.45, 6.3],
    [-5.51, 10.84, 6.3],
  ];

  var vidro4 = [
    [-0.7, 10.7, 1.7], 
    [-0.7, 11.4, 3.7],

    [-5.3, 10.7, 1.7], 
    [-5.3, 11.4, 3.7],
  ];
  
  var vidro5 = [
    [-0.7, 11.51, 4],
    [-0.7, 10.93, 6.5],

    [-5.3, 11.51, 4],
    [-5.3, 10.93, 6.5],
  ];

  var vetor10 = [
    [-0.5, 10.1, -1],
    [-0.5, 10.1, 0],
    [-0.5, 8.7, 0],

    [-5.5, 10.1, -1],
    [-5.5, 10.1, 0],
    [-5.5, 8.7, 0],
  ]

  if (object) scene.remove(object);
  if (pointCloud) scene.remove(pointCloud);
  if (convexGeometry) convexGeometry.dispose();

  var objectMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(255,0,0)",
    opacity: objOpacity,
    transparent: true,
  });

  // criaObjeto(vetor,objectMaterial);

  criaObjeto(vetor1, objectMaterial);
  criaObjeto(vetor2, objectMaterial);
  criaObjeto(vetor3, objectMaterial);
  criaObjeto(vetor4, objectMaterial);
  criaObjeto(vetor5, objectMaterial);
  criaObjeto(vetor6, objectMaterial);
  criaObjeto(vetor7, objectMaterial);
  criaObjeto(vetor8, objectMaterial);
  criaObjeto(vetor9, objectMaterial);

  var objectMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(0,0,0)",
    opacity: objOpacity,
    transparent: false,
  });

  criaObjeto(vidro1, objectMaterial);
  criaObjeto(vidro2, objectMaterial);
  criaObjeto(vidro3, objectMaterial);
  criaObjeto(vidro4, objectMaterial);
  criaObjeto(vidro5, objectMaterial);

  criaObjeto(vetor10, objectMaterial);
  // var localPoints2 = generatePoints(vetor2);

  // // Then, build the convex geometry with the generated points
  // var convexGeometry2 = new ConvexGeometry(localPoints2);

  // var object2 = new THREE.Mesh(convexGeometry2, objectMaterial2);
  // object2.castShadow = castShadow;
  // object2.visible = objectVisibility;
  // scene.add(object2);


  // var localPoints2 = generatePoints(vetor2);

  // // Then, build the convex geometry with the generated points
  // var convexGeometry2 = new ConvexGeometry(localPoints2);

  // var object2 = new THREE.Mesh(convexGeometry2, objectMaterial2);
  // object2.castShadow = castShadow;
  // object2.visible = objectVisibility;
  // scene.add(object2);

  // Uncomment to view debug information of the renderer
  //console.log(renderer.info);
}

function buildInterface() {
  var controls = new (function () {
    this.viewObject = true;
    this.viewAxes = false;
    this.viewPoints = true;
    this.lightFollowCamera = false;
    this.color = objColor;
    this.opacity = objOpacity;
    this.numPoints = numPoints;
    this.objectSize = objectSize;
    this.castShadow = castShadow;

    this.onViewObject = function () {
      object.visible = this.viewObject;
      objectVisibility = this.viewObject;
    };
    this.onViewPoints = function () {
      pointCloud.visible = this.viewPoints;
      pointCloudVisibility = this.viewPoints;
    };
    this.onViewAxes = function () {
      axesHelper.visible = this.viewAxes;
    };
    this.updateColor = function () {
      objectMaterial.color.set(this.color);
    };
    this.updateOpacity = function () {
      objectMaterial.opacity = this.opacity;
    };
    this.updateLight = function () {
      followCamera = this.lightFollowCamera;
    };
    this.onCastShadow = function () {
      object.castShadow = this.castShadow;
      pointCloud.castShadow = this.castShadow;
      castShadow = this.castShadow;
    };
    this.rebuildGeometry = function () {
      numPoints = this.numPoints;
      objectSize = this.objectSize;
      updateConvexObject();
    };
  })();

  var gui = new GUI();
  gui
    .add(controls, "viewObject", true)
    .name("View Object")
    .onChange(function (e) {
      controls.onViewObject();
    });
  gui
    .add(controls, "viewPoints", false)
    .name("View Points")
    .onChange(function (e) {
      controls.onViewPoints();
    });
  gui
    .add(controls, "viewAxes", false)
    .name("View Axes")
    .onChange(function (e) {
      controls.onViewAxes();
    });
  gui
    .add(controls, "lightFollowCamera", false)
    .name("LightFollowCam")
    .onChange(function (e) {
      controls.updateLight();
    });
  gui
    .add(controls, "castShadow", castShadow)
    .name("Shadows")
    .onChange(function (e) {
      controls.onCastShadow();
    });
  gui
    .addColor(controls, "color")
    .name("Object Color")
    .onChange(function (e) {
      controls.updateColor();
    });
  gui
    .add(controls, "opacity", 0, 1)
    .name("Opacity")
    .onChange(function (e) {
      controls.updateOpacity();
    });
  gui
    .add(controls, "objectSize", 2, 20)
    .name("Object Max Size")
    .onChange(function (e) {
      controls.rebuildGeometry();
    });
  gui
    .add(controls, "numPoints", 10, 50)
    .name("Number Of Points")
    .onChange(function (e) {
      controls.rebuildGeometry();
    });
}

function render() {
  stats.update();
  trackballControls.update();
  if (followCamera)
    lightFollowingCamera(light, camera); // Makes light follow the camera
  else light.position.set(5, 15, 40);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
