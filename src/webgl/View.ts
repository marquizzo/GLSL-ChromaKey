/*
 * View.ts
 * ===========
 * Topmost Three.js class. 
 * Controls scene, cam, renderer, and objects in scene.
 */

import * as THREE from "three";

import ColorBox from "./ColorBox";

export default class View {
	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private rgbBox: ColorBox;
	private hsbBox: ColorBox;

	constructor(canvasElem: HTMLCanvasElement) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasElem,
			antialias: true,
		});
		this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
		this.camera.position.z = 50;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.TextureLoader().load("./textures/bgnd.png");
		this.rgbBox = new ColorBox(this.scene);
		this.hsbBox = new ColorBox(this.scene);
		this.rgbBox.mesh.position.x = -15;
		this.hsbBox.mesh.position.x = 15;
		this.hsbBox.hsbMix.value = 1.0;

		// Set initial sizes
		this.onWindowResize(window.innerWidth, window.innerHeight);
	}

	public onPan(deltaX: number, deltaY: number): void {
		this.rgbBox.rotate(deltaX, deltaY);
		this.hsbBox.rotate(deltaX, deltaY);
	}

	public onWindowResize(vpW: number, vpH: number): void {
		this.renderer.setSize(vpW, vpH);
		this.camera.aspect = vpW / vpH;
		this.camera.updateProjectionMatrix();
	}

	public update(secs: number): void {
		this.rgbBox.update(secs);
		this.hsbBox.update(secs);
		this.renderer.render(this.scene, this.camera);
	}
}