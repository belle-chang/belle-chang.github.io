import * as THREE from '/three.js-master/build/three.module.js'
import { TWEEN } from '/three.js-master/examples/jsm/libs/tween.module.min.js';
import { OrbitControls } from "/three.js-master/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "/three.js-master/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/three.js-master/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/three.js-master/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Project } from './components/index.js'

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

  // FIRST PAGE
  let proj1 = new Project("TYPE TYPE", 'REVENGE', '01', 'hsl(248, 71%, 62%)', 
                          ['three.js', 'tween.js'], 
                          'A dynamic typing-practice game modeled after the classic iPhone game, Tap Tap Revenge.');
  let proj2 = new Project("TIGERRIDE", '', '02', 'hsl(348, 64%, 72%)', 
                          ['python', 'django', 'postgres', 'heroku'], 
                          'A web-app created to help Princeton students organize communal transportation to and from airports.');
  let proj3 = new Project("PRIMARY", "PREDICTOR", '03', 'hsl(231, 100%, 51%)', ['keras', 'twitterscraper', 'vader'], 
                          'A 2020 Democratic Presidential Primary Predictor trained on past Twitter sentiment analysis trends.');
  proj1.position.set(0,7,0);
  proj2.position.set(0,2.5,0);
  proj3.position.set(0,0,0);

  // SECOND PAGE
  let proj4 = new Project("SURFRIDER", '', '04', 'hsl(170, 100%, 43%)', 
                          ['python', 'django', 'postgres', 'heroku'], 
                          'A site created for the Rincon chapter of SurfRider, a nonprofit environmental organization, to quantitatively track QR code metrics.');

  let proj5 = new Project("CLOTH", 'SIMULATION', '05', 'hsl(6, 89%, 48%)', 
                          ['three.js'], 
                          'A simulation of a cloth that numerically integrates Newton\'s equations of motion to model fabric.');
  proj4.position.set(0,-6.5,0);
  proj5.position.set(0,-9,0);


  objects.push(proj1, proj2, proj3, proj4, proj5);
  for (let obj of objects) {
    obj.updateOldPosition();
  }

  scene.add(proj1);
  scene.add(proj2);
  scene.add(proj3);
  scene.add(proj4);
  scene.add(proj5);

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
    TWEEN.update();
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

document.getElementById("proj-4").addEventListener("mouseover", glow.bind(event, 4));
document.getElementById("proj-4").addEventListener("mouseout", turnoff.bind(event, 4));

document.getElementById("proj-51").addEventListener("mouseover", glow.bind(event, 5));
document.getElementById("proj-51").addEventListener("mouseout", turnoff.bind(event, 5));

document.getElementById("proj-52").addEventListener("mouseover", glow.bind(event, 5));
document.getElementById("proj-52").addEventListener("mouseout", turnoff.bind(event, 5));

document.getElementById("iconDown").addEventListener("click", scrollDown);
document.getElementById("iconUp").addEventListener("click", scrollUp);

function scrollDown() {
  objects[0].update(true);
  let delay = 300;
  for (let i = 1; i < objects.length; i++) {
    setTimeout(() => (objects[i].update(true)), delay);
    delay += 300;
  }
  
  // setTimeout(() => (objects[1].update(true)), 300);
  // setTimeout(() => (objects[2].update(true)), 600);
}

function scrollUp() {
  // console.log("scroll...")
  objects[objects.length - 1].update(false);
  let delay = 300;
  for (let i = objects.length - 2; i >= 0; i--) {
    setTimeout(() => (objects[i].update(false)), delay);
    delay += 300;
  }
  // setTimeout(() => (objects[1].update(false)), 300);
  // setTimeout(() => (objects[0].update(false)), 600);
}
function glow(arg) {
  // console.log(arg1);
  let current_proj = objects[arg - 1];
  if (current_proj != null) {
    current_proj.state.mesh1.visible = true;
    if (current_proj.state.mesh2) current_proj.state.mesh2.visible = true;
    // document.getElementById("left").style = "background-color: " + current_proj.color;
    var parent = document.getElementById("made-with");
    let children = document.getElementsByClassName("made-with-txt");
    while (children.length > 0) {
      parent.removeChild(children[0]);
    }
    for (let mw of current_proj.madewith) {
      var node = document.createElement("DIV");                 // Create a <li> node
      node.innerHTML = mw;
      node.className = "made-with-txt";
      node.style.fontSize = "1.5em";
    // console.log(node)
      parent.appendChild(node);     // Append <li> to <ul> with id="myList"
    }
    document.getElementById("description").innerHTML = current_proj.description;
  }
}

function turnoff(arg) {
  let current_proj = objects[arg - 1];
  current_proj.state.mesh1.visible = false;
  if (current_proj.state.mesh2) current_proj.state.mesh2.visible = false;
}


// setTimeout(() => {  main(); }, 200);

main();
