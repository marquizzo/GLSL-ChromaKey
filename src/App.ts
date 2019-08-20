/*
 * App.ts
 * ===========
 * Entry from Webpack, generates Three.js View
 */

import View from "./webgl/View";
import * as Hammer from "hammerjs";
import { Vector2 } from "three";

class App {
	private view: View;
	private mousePrev: Vector2;
	private mouseNow: Vector2;

	constructor() {
		const canvasBox = <HTMLCanvasElement>document.getElementById("webgl-canvas");
		this.view = new View(canvasBox);
		this.mousePrev = new Vector2();
		this.mouseNow = new Vector2();

		// Event listeners
		var mc = new Hammer.Manager(canvasBox);
		mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
		mc.on("panstart", this.onPanStart);
		mc.on("pan", this.onPan);
		window.addEventListener("resize", this.resize);


		this.update(0);
	}

	private onPanStart = (evt: HammerInput): void => {
		this.mousePrev.set(evt.center.x, evt.center.y);
	}

	private onPan = (evt: HammerInput):void => {
		this.mouseNow.set(evt.center.x, evt.center.y);
		this.view.onPan(
			(this.mouseNow.x - this.mousePrev.x) / window.innerWidth,
			(this.mouseNow.y - this.mousePrev.y) / window.innerHeight
		);
		this.mousePrev.copy(this.mouseNow);
	}

	private resize = (): void => {
		this.view.onWindowResize(window.innerWidth, window.innerHeight);
	}

	private update = (t: number): void => {
		this.view.update(t / 1000);
		requestAnimationFrame(this.update);
	}
}

const app = new App();
