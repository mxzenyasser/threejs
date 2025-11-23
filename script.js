        //imports
import * as THREE from 'three'
import * as dat from "https://cdn.jsdelivr.net/npm/dat.gui/build/dat.gui.module.js";
const gui = new dat.GUI();

console.log(gui);

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        //canvas
const canvas = document.querySelector('.webgl')
        //scene
const scene = new THREE.Scene()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

        //camera//
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
scene.add(camera)
camera.position.set(0,0,5)

        //geometry//
const geometry = new THREE.SphereGeometry(1,10,10); 
const TextureLoader = new THREE.TextureLoader()
const texture= TextureLoader.load('/golfball.jpg' ); 

const material = new THREE.MeshStandardMaterial( {color:'grey'} ); 
material.normalMap=texture;
material.roughness=0.5
const cube=new THREE.Mesh(geometry,material)
scene.add(cube)


//light
const pointlight1=new THREE.PointLight(0xffffff,0)
pointlight1.position.set(2,3,4)
scene.add(pointlight1)

//light2
const pointlight2=new THREE.PointLight(0x8fc7f9,4.65)
pointlight2.position.set(0.79,0.6,1.2)
scene.add(pointlight2)

const light2=gui.addFolder('light2')
light2.add(pointlight2.position,'y').min(-3).max(3).step(0.01)
light2.add(pointlight2.position,'x').min(-3).max(3).step(0.01)
light2.add(pointlight2.position,'z').min(-3).max(3).step(0.01)
light2.add(pointlight2,'intensity').min(0).max(300).step(0.01)

const light2color={
    color:0xff0000
}

light2.addColor(light2color,'color')
    .onChange(()=>{
        pointlight2.color.set(light2color.color)
    })



// const helper=new THREE.PointLightHelper(pointlight,1,0xfffff)
// scene.add(helper)

//light3

const pointlight3=new THREE.PointLight(0xf0000,300)
pointlight3.position.set(-0.79,0.07,1.2)
scene.add(pointlight3)

const light3=gui.addFolder('light3')

light3.add(pointlight3.position,'y').min(-3).max(3).step(0.01)
light3.add(pointlight3.position,'x').min(-3).max(3).step(0.01)
light3.add(pointlight3.position,'z').min(-3).max(3).step(0.01)
light3.add(pointlight3,'intensity').min(0).max(300).step(0.01)

// const helper=new THREE.PointLightHelper(pointlight3,1,0xfffff)
// scene.add(helper)



//animate
document.addEventListener('mousemove',onDocumentMouseMove)

let mouseX=0
let mouseY=0

let targetX=0
let targetY=0


const windowx=window.innerWidth/2
const windowy=window.innerHeight/2
function onDocumentMouseMove(event){
    mouseX=(event.clientX - windowx)
    mouseY=(event.clientY - windowy)
}


const updateSphere = (event)=>{
    cube.position.z=-window.scrollY*-0.0002
}
window.addEventListener('scroll',updateSphere)

        //renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialise:true,alpha:true })
window.addEventListener('resize',()=> {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})
// const controls = new OrbitControls( camera, renderer.domElement );
const clock = new THREE.Clock()
renderer.setSize(sizes.width, sizes.height);
function animate() {

    const elapsedTime=clock.getElapsedTime()
    targetX=mouseX*0.001
    targetY=mouseY*0.001
    requestAnimationFrame( animate )
    renderer.render(scene, camera)
    cube.rotation.y= 0.5*elapsedTime
    cube.rotation.y+=0.5*(targetX - cube.rotation.y)

 
}

animate()
