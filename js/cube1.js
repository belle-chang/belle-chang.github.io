import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';

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
  const canvas = document.querySelector('#d');
  // const renderer = new THREE.WebGLRenderer({canvas});
  var renderer = new THREE.WebGLRenderer( { canvas, alpha: true } );
  // const container = document.getElementById("container");
  // // const renderer = new THREE.WebGLRenderer({canvas});
  // var renderer = new THREE.WebGLRenderer( {alpha: true, antialias:true } );
  // // renderer.setSize(window.innerWidth, window.innerHeight);
  // // renderer.setSize($(container).width(), $(container).height());
  // renderer.setPixelRatio(window.devicePixelRatio);
  // console.log(container);
  // container.appendChild(renderer.domElement);
  // console.log(container);


  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  scene.background = new THREE.Color(0xfcf3b8);
  // renderer.setClearColor( 0xfcf3b8, 0 ); 

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // const material = new THREE.MeshPhongMaterial({color: 0xd7b1f0});
  const material = new THREE.MeshPhongMaterial({color: 0x5830c7});
    // greenish blue

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function render(time) {
    time *= 0.001;  // convert time to seconds

    // if (resizeRendererToDisplaySize(renderer)) {
    //   const canvas = renderer.domElement;
    //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //   camera.updateProjectionMatrix();
    // }

    // const canvas = renderer.domElement;
    // camera.aspect = canvas.clientWidth / canvas.clientHeight;
    // camera.updateProjectionMatrix();
    resizeCanvasToDisplaySize(renderer, camera);


    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


}






main();
