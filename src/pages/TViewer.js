import React, { Component } from "react";
import styled from "styled-components";
import * as THREE from "three";
//Model
import FaceMask from "../assets/models/face_cover.STL";
let STLLoader = require("three-stl-loader")(THREE);

export default class TViewer extends Component {
  componentDidMount = async () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x72645b);
    this.scene.fog = new THREE.Fog(0x72645b, 2, 15);
    this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      15
    );
    this.camera.position.set(3, 0.5, 3);
    this.camera.position.z = 5;

    this.cameraTarget = new THREE.Vector3(0, -0.25, 0);

    //INFO : Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;

    let modalLoad = document.getElementById("modalLoader");
    modalLoad.append(this.renderer.domElement);

    //INFO : Plane
    let plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(40, 40),
      new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.receiveShadow = true;
    this.scene.add(plane);

    //INFO : Light
    this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
    let loader = new STLLoader();
    //INFO : STL
    let scene = this.scene;
    loader.load(FaceMask, function (geometry) {
      let material = new THREE.MeshPhongMaterial({
        color: 0xff5533,
        specular: 0x111111,
        shininess: 200,
      });
      let mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, -0.5, 0.6);
      mesh.rotation.set(0, -Math.PI / 2, 0);
      mesh.scale.set(0.01, 0.01, 0.01);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
    });

    this.animate();
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderThreeJS();
  };

  renderThreeJS = () => {
    let timer = Date.now() * 0.0005;

    this.camera.position.x = Math.cos(timer) * 3;
    this.camera.position.z = Math.sin(timer) * 3;

    this.camera.lookAt(this.cameraTarget);

    this.renderer.render(this.scene, this.camera);
  };

  addShadowedLight = (x, y, z, color, intensity) => {
    let directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    this.scene.add(directionalLight);

    directionalLight.castShadow = true;

    let d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = -0.002;
  };

  render() {
    return <div id="modalLoader"></div>;
  }
}
