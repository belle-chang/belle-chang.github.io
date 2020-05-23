// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import * as THREE from '/three.js-master/build/three.module.js'
import { TWEEN } from '/three.js-master/examples/jsm/libs/tween.module.min.js';
import { OrbitControls } from "/three.js-master/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "/three.js-master/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/three.js-master/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/three.js-master/examples/jsm/postprocessing/UnrealBloomPass.js";

// import * as TWEEN from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js';


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

function main() {
  // const canvas = document.querySelector('#c');
  const container = document.getElementById("container");
  // const renderer = new THREE.WebGLRenderer({canvas});
  var renderer = new THREE.WebGLRenderer( {alpha: true, antialias:true } );
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // const fov = 75;
  // const aspect = 2;  // the canvas default
  // const near = 0.1;
  // const far = 5;

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 16);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const scene = new THREE.Scene();
  const canvas = renderer.domElement;
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = false;
  controls.enablePan = false;
  controls.minDistance = 0;
  controls.maxDistance = 5;
  controls.update();

  {

    const dir = new THREE.SpotLight(0xffffff, 1.8, 50, Math.PI/2, 1, 2);
    const ambi = new THREE.AmbientLight(0x404040, 0.8);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x191919, 1.3);

    dir.position.set(5, 1, 2);
    dir.target.position.set(0, 0, 0);

    scene.add(ambi, hemi, dir);
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // scene.add(light);
  }
  // scene.background = new THREE.Color(0xfcf3b8);
  renderer.setClearColor( 0xfcf3b8, 0 ); 

  // convert camera frustum vertical fov from degrees to rads
  let fovRad = camera.fov * (Math.PI / 180);

  // half of height:
  var height =
  (camera.position.z * Math.sin(fovRad / 2)) /
  Math.sin(Math.PI / 2 - fovRad / 2);

  // half of width:
  var width = (height / window.innerHeight) * window.innerWidth;

  var introGroup = new THREE.Group();


  var loader = new THREE.FontLoader();
  loader.load('assets/fonts/Krona One_Regular.json', (font) => {
    var textGeo1 = new THREE.TextGeometry("anabelle", {
        font: font,
        size: .5,
        height: .1,
        curveSegments: 5
    });
    textGeo1.center();

    // // add material
    // var mat1 = new THREE.MeshNormalMaterial();
    // // create mesh
    // let textMesh1 = new THREE.Mesh(textGeo1, mat1);
    // add material
    var geo1 = new THREE.EdgesGeometry(textGeo1);
    // add material
    var mat1 = new THREE.LineBasicMaterial({ color: 'hsl(44, 100%, 35%)', linewidth: 1.5 });
    let textMesh1 = new THREE.LineSegments(geo1, mat1);
    textMesh1.position.set(0, height - 3, 0);


    var textGeo3 = new THREE.TextGeometry("chang", {
        font: font,
        size: .5,
        height: .1,
        curveSegments: 5
    });
    textGeo3.center();

    var geo3 = new THREE.EdgesGeometry(textGeo3);
    // add material
    var mat3 = new THREE.LineBasicMaterial({ color: 'hsl(44, 100%, 35%)', linewidth: 1.5 });
    // create mesh
    let textMesh3 = new THREE.LineSegments(geo3, mat3);
    // var mat3 = new THREE.MeshNormalMaterial();
    // let textMesh3 = new THREE.Mesh(textGeo3, mat3);
    textMesh3.position.set(0,height - 4,0);

    introGroup.add(textMesh1);
    introGroup.add(textMesh3);
  });

  scene.add(introGroup);

  // ADD POSTPROCESSING EFFECT SUPPORT
  var composer = new EffectComposer(renderer);
  // first and mandatory pass
  composer.addPass(new RenderPass(scene, camera));

  // add glow
  // resolution, strength, kernel size, sigma?
  var bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    3,
    0.5,
    0.1
  );
  bloomPass.renderToScreen = true;
  composer.addPass(bloomPass);

  // https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
  function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
  }

  let running_loader = true;
  function dispose() {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    fade(document.getElementById("loader"));
    running_loader = false;
  }

  function spin() {
    const rt = new TWEEN.Tween( introGroup.rotation ).to( {  y:6.28}, 2000 ).easing(TWEEN.Easing.Quadratic.In).start();
    rt.onComplete(() => dispose());
  }

  let how_many = 0;
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

    composer.render(time);
    TWEEN.update();
    if (how_many == 0) {
      spin();
      how_many += 1;
    }

    // renderer.render(scene, camera);
    if (running_loader) {
      requestAnimationFrame(render);
    }
  }

  requestAnimationFrame(render);

  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // // create a global audio source
  // var sound = new THREE.Audio( listener );

  // // load a sound and set it as the Audio object's buffer
  // var audioLoader = new THREE.AudioLoader();
  // audioLoader.load( 'assets/sounds/walk_away.mp3', function( buffer ) {
  //   sound.setBuffer( buffer );
  //   sound.setLoop(true);
  //   sound.setVolume(0.25);
  //   sound.play();
  // });


  // // create an AudioAnalyser, passing in the sound and desired fftSize
  // var analyser = new THREE.AudioAnalyser( sound, 32 );

  // // get the average frequency of the sound
  // var data = analyser.getAverageFrequency();

}

main();
