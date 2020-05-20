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

function main() {
  
  const container = document.getElementById('top-glimpse');
  var renderer = new THREE.WebGLRenderer( {alpha: true, antialias:true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  var width = container.clientWidth;
  var height = container.clientHeight;
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);


  var camera = new THREE.OrthographicCamera( -5, 5, 10, -10, .1, 5 );
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const canvas = renderer.domElement;
  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = false;
  // controls.enablePan = false;
  // controls.minDistance = 0;
  // controls.maxDistance = 5;
  // controls.update();

  const scene = new THREE.Scene();

  
  {

    const dir = new THREE.SpotLight(0xffffff, 1.8, 50, Math.PI/2, 1, 2);
    const ambi = new THREE.AmbientLight(0x404040, 0.8);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x191919, 1.3);

    dir.position.set(5, 1, 2);
    dir.target.position.set(0, 0, 0);

    scene.add(ambi, hemi, dir);
  }
  // scene.background = '0x404040';
  // renderer.setClearColor( 0x000000, 0 ); 
  renderer.setClearColor( 0xffffff, 0);

  var proj1 = new THREE.Group();

  var loader1 = new THREE.FontLoader();
  loader1.load('assets/fonts/Krona One_Regular.json', (font) => {
    var textGeo1 = new THREE.TextGeometry("PROJECTS", {
        font: font,
        size: 1.25,
        height: 1,
        curveSegments: 5
    });
    // var geo1 = new THREE.EdgesGeometry(textGeo1);
    // // add material
    // var mat1 = new THREE.LineBasicMaterial({ color: 'white' });
    var mat1 = new THREE.MeshBasicMaterial({ color: 'white' });
    let textMesh1 = new THREE.Mesh(textGeo1, mat1);
    // textMesh1.position.set(-9, 7, 0);
    textMesh1.position.set(-1,-8.75, 0);
    // textMesh1.rotation.x = Math.PI / 2;
    textMesh1.rotation.z = Math.PI / 2;

   
    proj1.add(textMesh1);
  });


  scene.add(proj1);


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
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


}

var mouse = {
  x: 0,
  y: 0
},
INTERSECTED;

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
  // the following line would stop any other event handler from firing
  // (such as the mouse's TrackballControls)
  // event.preventDefault();

  // update the mouse variable
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // console.log(mouse);
}



setTimeout(() => {  main(); }, 200);

// main();
