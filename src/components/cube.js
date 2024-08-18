import * as THREE from "three";
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff * Math.random(),
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(render);
function render() {
  renderer.render(scene, camera);
}
