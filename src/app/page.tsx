"use client";
import React, { useEffect } from "react";
import * as THREE from "three";
// import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { ARButton } from "../../three.js-master/examples/jsm/webxr/ARButton";
export default function Home() {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff * Math.random(),
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -2);
    scene.add(cube);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 5; // Move the camera away from the cube
    scene.add(camera);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true; // Enable XR
    document.body.appendChild(renderer.domElement);

    // AR Button
    const arButton = ARButton.createButton(renderer);
    document.body.appendChild(arButton);

    // Animation loop
    renderer.setAnimationLoop(() => {
      // Rotate the cube for animation
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene
      renderer.render(scene, camera);
    });

    // Handle resize
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    // Cleanup
    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
      if (arButton) {
        document.body.removeChild(arButton);
      }
    };
  }, []);

  return <div style={{ overflow: "hidden", backgroundColor: "#000" }}></div>;
}
