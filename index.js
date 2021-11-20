import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(innerWidth,innerHeight)
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 0.05, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xff6347});
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(30,30,30)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry,material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)
const spaceTexture = new THREE.TextureLoader().load('./nightsky.jpg');
scene.background = spaceTexture;

//Box logo
 const logo = new THREE.TextureLoader().load('./logo.png');
 const myLogo = new THREE.Mesh(
   new THREE.BoxGeometry(3,3,3),
   new THREE.MeshBasicMaterial( { map: logo })
 )
 scene.add(myLogo)
//earth
const earth = new THREE.TextureLoader().load('./earth.jpg');
const myEarth = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,32),
  new THREE.MeshStandardMaterial( { map: earth })
)
scene.add(myEarth)
myEarth.position.z = 30;
myEarth.position.setX(-10);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  myEarth.rotation.x += 0.05;
  myEarth.rotation.y += 0.075;
  myEarth.rotation.z += 0.05;

  myLogo.rotation.y += 0.01;
  myLogo.rotation.z += 0.01;

  camera.rotation.x =t * -0.01;
  camera.rotation.y =t * -0.0002;
  camera.rotation.z =t * -0.0002;
}
document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update();

  renderer.render( scene, camera );
}

animate()