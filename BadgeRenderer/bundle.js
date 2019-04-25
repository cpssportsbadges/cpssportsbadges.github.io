(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
	Name: RenderEngine
	Author: Joseph Varilla
	Date: 4/12/2019
	Description: A class to be used to load multiple image 
				layers into a canvas to produce a superimposed image
*/

class RenderEngine {
	// Context is the canvas context
	// imageLayers is an array of file paths to the images
	constructor(canvas, layers) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.safeDraw = (img, x, y, callback) => {
			this.ctx.drawImage(img, x, y);
			callback();
		}
		this.layers = layers.map((layer, index) => {
			let layerObj = {
				order: index,
				name: layer.name || `layer ${index}`,
				x: layer.x || 0,
				y: layer.y || 0,
				scale: layer.scale || 100
			}
			if (layer.type === "image") { // If it is an image layer
				layerObj.type = "image";
				layerObj.imagePath = layer.imagePath || "blank.png"
			} else { // Assume that it is a text layer
				layerObj.type = "text";
				layerObj.text = layer.text || "";
				layerObj.fontSize = layer.fontSize || "12px";
				layerObj.fontFamily = layer.fontFamily || "Serif";
				layerObj.fontColor = layer.fontColor || "black";
				layerObj.textAlign = layer.textAlign || "center";
			}

			return layerObj;
			
		});
	}

	drawLayer(layer) { // Draws a single layer
		return new Promise((resolve, reject) => {
			try {

				if (layer.type === "image") { // Draw the image layer
					let layerImage = new Image();
					// Set Layer Image Path
					layerImage.src = layer.imagePath;
	
					layerImage.onload = () => {
						window.setTimeout(() => {
							// Draw The Image Layer
							this.ctx.safeDraw(layerImage, layer.x, layer.y, () => {
								// Resolve the layer Image
								resolve(`${layer.name}`);
							});
						}, ((layer.order + 1) * 50)); // Need to set the timeout so that the badges will render in the correct order	
					}
					layerImage.onload();
				} else { // Else write the text layer
					window.setTimeout(() => {
						this.ctx.textAlign = layer.textAlign;
	    				this.ctx.font = `${layer.fontSize} ${layer.fontFamily}`;
	    				this.ctx.fillStyle = layer.fontColor;
						this.ctx.fillText(layer.text, layer.x, layer.y);
						resolve(`${layer.name}`);
					}, ((layer.order + 1) * 50))
				}
				
			} catch (err) {
				reject(`Error loading ${layer.name} layer`);
			}
		});
	}

	drawImage() { // Draw image with all layers with the first layer being in the back (drawn first)
		return new Promise((resolve, reject) => {
			try { // Draw All the layers
				Promise.all(this.layers.map((layer) => {
					return this.drawLayer(layer);
				}))
				.then((values) => {
					return new Promise((resolve, reject) => {
						try {
							window.setTimeout(() => {
								resolve({layerOrder: values,
								imageURI: this.canvas.toDataURL("image/png")
								});
							}, 500);	
						} catch (err) {
							reject(err);
						}
					});	
				})
				.then(values => resolve(values));
			} catch (err) {
				reject(err);
			}
		});

	}
}

module.exports = RenderEngine;
},{}]},{},[1]);
