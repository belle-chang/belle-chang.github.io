import * as THREE from '/three.js-master/build/three.module.js'
import { TWEEN } from '/three.js-master/examples/jsm/libs/tween.module.min.js';
import { OrbitControls } from "/three.js-master/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "/three.js-master/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/three.js-master/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/three.js-master/examples/jsm/postprocessing/UnrealBloomPass.js";

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// let camera;
// let scene;

function resizeCanvasToDisplaySize(renderer, camera) {
  const canvas = renderer.domElement;
  // console.log(canvas);
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}
let proj1, proj2, proj3;
let objects = [];


function main() {
  
  const container = document.getElementById('right');
  var renderer = new THREE.WebGLRenderer( {alpha: true, antialias:true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  var width = container.clientWidth;
  var height = container.clientHeight;
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  let camera = new THREE.OrthographicCamera( -12, 10, 10, -10, .1, 5 );
  // camera = new THREE.PerspectiveCamera( 70, width / height, 1, 10000 );
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const canvas = renderer.domElement;
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = false;
  controls.enablePan = false;
  controls.minDistance = 0;
  controls.maxDistance = 5;
  controls.update();

  let scene = new THREE.Scene();

  
  {

    const dir = new THREE.SpotLight(0xffffff, 1.8, 50, Math.PI/2, 1, 2);
    const ambi = new THREE.AmbientLight(0x404040, 0.8);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x191919, 1.3);

    dir.position.set(5, 1, 2);
    dir.target.position.set(0, 0, 0);

    scene.add(ambi, hemi, dir);
  }
  // scene.background = new THREE.Color(0xfcf3b8);
  renderer.setClearColor( 0xfcf3b8, 0 ); 

  proj1 = new THREE.Group();
  proj2 = new THREE.Group();
  proj3 = new THREE.Group();
  var proj4 = new THREE.Group();
  var proj5 = new THREE.Group();

  var loader1 = new THREE.FontLoader();
  loader1.load('assets/fonts/Krona One_Regular.json', (font) => {
    var textGeo1 = new THREE.TextGeometry("TYPE TYPE", {
        font: font,
        size: 1.5,
        height: 1,
        curveSegments: 5
    });
    var geo1 = new THREE.EdgesGeometry(textGeo1);
    // // add material
    var mat1 = new THREE.LineBasicMaterial({ color: 'hsl(248, 71%, 62%)' });
    let mesh1 = new THREE.Mesh(textGeo1, new THREE.MeshBasicMaterial({color: "hsl(248, 71%, 40%)"}));
    mesh1.visible = false;
    let textMesh1 = new THREE.LineSegments(geo1, mat1);
    textMesh1.position.set(-9, 7, 0);
    mesh1.position.set(-9, 7, 0);

    var textGeo2 = new THREE.TextGeometry("REVENGE", {
      font: font,
      size: 1.5,
      height: 1,
      curveSegments: 5
     });
     var geo2 = new THREE.EdgesGeometry(textGeo2);
    // // add material
    var mat2 = new THREE.LineBasicMaterial({ color: 'hsl(248, 71%, 62%)' });
    let mesh2 = new THREE.Mesh(textGeo2, new THREE.MeshBasicMaterial({color: "hsl(248, 71%, 40%)"}));
    mesh2.visible = false;
    let textMesh2 = new THREE.LineSegments(geo2, mat2);
    textMesh2.position.set(-9, 5, 0);
    mesh2.position.set(-9, 5, 0);

    var LABEL = new THREE.TextGeometry("01", {
      font: font,
      size: .5,
      height: .25,
      curveSegments: 5
    });
    var l_geo = new THREE.EdgesGeometry(LABEL);
    // // add material
    var l_mat = new THREE.LineBasicMaterial({ color: 'white' });
    let l_mesh = new THREE.LineSegments(l_geo, l_mat);
    l_mesh.position.set(6, 8, 0);
    proj1.add(textMesh1);
    proj1.add(textMesh2);
    proj1.add(l_mesh);
    proj1.add(mesh1);
    proj1.add(mesh2);
    proj1.state = {};
    proj1.state.mesh1 = mesh1;
    proj1.state.mesh2 = mesh2;
    proj1.color = 'hsl(248, 71%, 62%)'
  });

  var loader2 = new THREE.FontLoader();
  loader2.load('assets/fonts/Krona One_Regular.json', (font) => {
    var textGeo1 = new THREE.TextGeometry("TIGERRIDE", {
        font: font,
        size: 1.5,
        height: 1,
        curveSegments: 5
    });
    var geo1 = new THREE.EdgesGeometry(textGeo1);
    // // add material
    var mat1 = new THREE.LineBasicMaterial({ color: 'hsl(348, 64%, 72%)' });
    let textMesh1 = new THREE.LineSegments(geo1, mat1);
    var mesh1 = new THREE.Mesh(textGeo1, new THREE.MeshBasicMaterial({ color: 'hsl(348, 64%, 40%)' }));
    mesh1.visible = false;
    textMesh1.position.set(-9, 2.5, 0);
    mesh1.position.set(-9, 2.5, 0);

    var LABEL = new THREE.TextGeometry("02", {
      font: font,
      size: .5,
      height: .25,
      curveSegments: 5
    });
    var l_geo = new THREE.EdgesGeometry(LABEL);
    // // add material
    var l_mat = new THREE.LineBasicMaterial({ color: 'white' });
    let l_mesh = new THREE.LineSegments(l_geo, l_mat);
    l_mesh.position.set(5.5, 3.5, 0);
    proj2.add(textMesh1);
    proj2.add(l_mesh);
    proj2.add(mesh1);
    proj2.state = {};
    proj2.state.mesh1 = mesh1;
    proj2.color = 'hsl(348, 64%, 72%)';
  });

  var loader3 = new THREE.FontLoader();
  loader3.load('assets/fonts/Krona One_Regular.json', (font) => {
    var textGeo1 = new THREE.TextGeometry("PRIMARY", {
        font: font,
        size: 1.5,
        height: 1,
        curveSegments: 5
    });
    var geo1 = new THREE.EdgesGeometry(textGeo1);
    // // add material
    var mat1 = new THREE.LineBasicMaterial({ color: 'hsl(231, 100%, 51%)' });
    let textMesh1 = new THREE.LineSegments(geo1, mat1);
    let mesh1 = new THREE.Mesh(textGeo1, new THREE.MeshBasicMaterial({color: 'hsl(231, 100%, 51%)'}));
    mesh1.visible = false;
    mesh1.position.set(-9, 0, 0);
    textMesh1.position.set(-9, 0, 0);

    var textGeo2 = new THREE.TextGeometry("PREDICTOR", {
      font: font,
      size: 1.5,
      height: 1,
      curveSegments: 5
     });
     var geo2 = new THREE.EdgesGeometry(textGeo2);
    // // add material
    var mat2 = new THREE.LineBasicMaterial({ color: 'hsl(231, 100%, 51%)' });
    let textMesh2 = new THREE.LineSegments(geo2, mat2);
    let mesh2 = new THREE.Mesh(textGeo2, new THREE.MeshBasicMaterial({color: 'hsl(231, 100%, 51%)'}));
    mesh2.visible = false;
    mesh2.position.set(-9, -2, 0);
    textMesh2.position.set(-9, -2, 0);

    var LABEL = new THREE.TextGeometry("03", {
      font: font,
      size: .5,
      height: .25,
      curveSegments: 5
    });
    var l_geo = new THREE.EdgesGeometry(LABEL);
    // // add material
    var l_mat = new THREE.LineBasicMaterial({ color: 'white' });
    let l_mesh = new THREE.LineSegments(l_geo, l_mat);
    l_mesh.position.set(3.5, 1, 0);

    proj3.add(l_mesh);
    proj3.add(textMesh1);
    proj3.add(textMesh2);
    proj3.add(mesh1);
    proj3.add(mesh2);
    proj3.state = {};
    proj3.state.mesh1 = mesh1;
    proj3.state.mesh2 = mesh2;
    proj3.color = 'hsl(231, 100%, 51%)';
  });

  scene.add(proj1);
  scene.add(proj2);
  scene.add(proj3);
  objects.push(proj1, proj2, proj3);

  // ADD POSTPROCESSING EFFECT SUPPORT
  var composer = new EffectComposer(renderer);
  // first and mandatory pass
  composer.addPass(new RenderPass(scene, camera));

  // add glow
  // resolution, strength, kernel size, sigma?
  var bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    6,
    0.5,
    0.1
  );
  bloomPass.renderToScreen = true;
  composer.addPass(bloomPass);
  // let objects = [];
  // objects.push(cube);
  // console.log(objects);


  function render(time) {
    time *= 0.001;  // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    // update();
    composer.render(time);

    // renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


}

document.getElementById("proj-1").addEventListener("mouseover", glow.bind(event, 1));
document.getElementById("proj-1").addEventListener("mouseout", turnoff.bind(event, 1));

document.getElementById("proj-2").addEventListener("mouseover", glow.bind(event, 2));
document.getElementById("proj-2").addEventListener("mouseout", turnoff.bind(event, 2));

document.getElementById("proj-3").addEventListener("mouseover", glow.bind(event, 3));
document.getElementById("proj-3").addEventListener("mouseout", turnoff.bind(event, 3));

function glow(arg) {
  console.log("hello");
  console.log(arg);
  // console.log(arg1);
  let current_proj = objects[arg - 1];
  console.log(current_proj);
  current_proj.state.mesh1.visible = true;
  if (current_proj.state.mesh2) current_proj.state.mesh2.visible = true;
  document.getElementById("left").style = "background-color: " + current_proj.color;
}

function turnoff(arg) {

  let current_proj = objects[arg - 1];
  console.log(current_proj);
  current_proj.state.mesh1.visible = false;
  if (current_proj.state.mesh2) current_proj.state.mesh2.visible = false;
}
// var mouse = {
//   x: 0,
//   y: 0
// },
// INTERSECTED;

// document.addEventListener('mousemove', onDocumentMouseMove, false);
// // document.addEventListener( 'mousedown', onDocumentMouseDown, false ); 

// function onDocumentMouseMove(event) {
//   // the following line would stop any other event handler from firing
//   // (such as the mouse's TrackballControls)
//   event.preventDefault();

//   // update the mouse variable
//   console.log(event.clientX);
//   console.log(event.clientY);
//   // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   console.log(mouse);
// }



setTimeout(() => {  main(); }, 200);

// main();
