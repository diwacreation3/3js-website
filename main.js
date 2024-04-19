import * as THREE from 'three';
import "./style.css"

//scene
const scene = new THREE.Scene();

//create sphere
const geometry = new THREE.SphereGeometry(3,64,64);

//add material
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
// created mesh 
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);

//sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}


//lighting
const Light = new THREE.PointLight(0xffffff,100 , 100 )

Light.position.set(0, 10,10)
scene.add(Light)

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)


//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width,sizes.height)
renderer.render(scene, camera)