import * as THREE from 'three';
import "./style.css"
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//scene
const scene = new THREE.Scene();

//create sphere
const geometry = new THREE.SphereGeometry(3,64,64);

//add material
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.4,
 
  
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
const Light = new THREE.PointLight(0xffffff,1 , 100 )
const lightTwo = new THREE.PointLight(0xf3f9f7, 3, 100)
Light.intensity = 200
Light.position.set(0, 10,10)

lightTwo.position.set(90, -90, -10)
lightTwo.intensity = 60

scene.add(Light)
scene.add(lightTwo)

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)



//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setPixelRatio(2);
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene, camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 3

// resize 

window.addEventListener("resize", () =>{
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera

  camera.aspect = sizes.width / sizes.height ;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height)

})


const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();

// timeline
const ti = gsap.timeline({defaults: {duration : 1}})
ti.fromTo(mesh.scale, { z:0, x:0, y:0}, {z:1 , x:1 , y:1})

// this will put nav after the scale animation 
ti.fromTo('nav', {y:'-100%'}, {y:'0%'})

//change opacity of ttal bar
ti.fromTo(".title", {opacity: 0}, {opacity: 1})


// Mouse animation color
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown =true))
window.addEventListener("mouseup", () => (mouseDown =false))

window.addEventListener("mousemove", (e) => {
  if(mouseDown)
  {
    rgb = [ Math.round((e.pageX / sizes.width) * 255),Math.round((e.pageY / sizes.height) * 255), 150 ]
    
    // animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    new THREE.Color(`rgb(0,100,150)`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})