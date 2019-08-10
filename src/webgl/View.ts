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

	constructor(canvasElem: HTMLCanvasElement) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasElem,
			antialias: true,
		});
		this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
		this.camera.position.z = 15;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.TextureLoader().load("./textures/bgnd.png");
		this.rgbBox = new ColorBox(this.scene);

		// Set initial sizes
		this.onWindowResize(window.innerWidth, window.innerHeight);
	}

	public onWindowResize(vpW: number, vpH: number): void {
		this.renderer.setSize(vpW, vpH);
		this.camera.aspect = vpW / vpH;
		this.camera.updateProjectionMatrix();
	}

	public update(secs: number): void {
		this.rgbBox.update(secs);
		this.renderer.render(this.scene, this.camera);
	}
}