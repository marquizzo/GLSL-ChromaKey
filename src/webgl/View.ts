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
	private sceneLeft: THREE.Scene;
	private sceneRight: THREE.Scene;
	private cam: THREE.OrthographicCamera;
	private rgbBox: ColorBox;
	private hsbBox: ColorBox;
	private vpW2: number;

	constructor(canvasElem: HTMLCanvasElement) {
		// Boilerplate renderer`
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasElem,
			antialias: true,
		});
		this.renderer.autoClear = false;
		const vpH = 20;
		const vpW = 10 * window.innerWidth / window.innerHeight / 2;
		this.cam = new THREE.OrthographicCamera(-vpW, vpW, vpH, -vpH, 1, 100);
		this.cam.position.z = 40;

		// Build RGB & HSB objects
		this.sceneLeft = new THREE.Scene();
		this.sceneRight = new THREE.Scene();
		const bgnd = new THREE.TextureLoader().load("./textures/bgnd.png");
		this.sceneLeft.background = bgnd;
		this.sceneRight.background = bgnd;
		this.vpW2 = window.innerWidth / 2;
		this.rgbBox = new ColorBox(this.sceneLeft, false);
		this.hsbBox = new ColorBox(this.sceneRight, true);
		this.hsbBox.hsbMix.value = 1.0;

		// Set initial sizes
		this.onWindowResize(window.innerWidth, window.innerHeight);
	}

	public onPan(deltaX: number, deltaY: number): void {
		this.rgbBox.rotate(deltaX, deltaY);
		this.hsbBox.rotate(deltaX, deltaY);
	}

	public onWindowResize(vpW: number, vpH: number): void {
		const half = 20 * window.innerWidth / window.innerHeight / 2;
		this.cam.left = -half;
		this.cam.right = half;
		this.cam.updateProjectionMatrix();

		this.vpW2 = vpW / 2;
		this.renderer.setSize(vpW, vpH);
	}

	public update(secs: number): void {
		this.renderer.setViewport( 0, 0, this.vpW2, window.innerHeight );
		this.renderer.render(this.sceneLeft, this.cam);
		this.renderer.setViewport( this.vpW2, 0, this.vpW2, window.innerHeight );
		this.renderer.render(this.sceneRight, this.cam);
	}
}