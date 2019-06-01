/*
	Name: RenderEngine
	Author: Joseph Varilla
	Date: 6/1/2019 | Last Edited 5/16/2019
	Description: A class to be used to 
				load multiple image 
				layers into a canvas to 
				produce a superimposed image
				(i.e. badge image, certificate)
*/

class RenderEngine {
	// Context is the canvas context
	// imageLayers is an array of file paths to the images
	constructor(canvas, layers) {
		// The canvas to be drawn on
		this.canvas = canvas;

		// The context to used to draw on canvas
		this.ctx = this.canvas.getContext("2d");

		// Alters the size of the whole image (all layers)
		this.scaleFactor = {};
		this.scaleFactor.x = 1;
		this.scaleFactor.y = 1;

		/* Draw an image layer provided the coords, 
			img buffer, and indidual scale factors */
		this.ctx.safeDraw = (img, x, y, scalex, scaley, callback) => {
			this.ctx.drawImage(img, x, y, img.width * scalex * this.scaleFactor.x, img.height * scaley * this.scaleFactor.y);
			callback();
		}

		// Turns the input layers into an array of layers with specific properties
		this.layers = layers.map((layer, index) => {
			let layerObj = {
				order: index,
				name: layer.name || `layer ${index}`,
				x: layer.x || 0,
				y: layer.y || 0,
				scalex: layer.scalex || 1,
				scaley: layer.scaley || 1,
				scale: layer.scale || 100,
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

	setScaleFactor(xScale, yScale) {
		this.scaleFactor.x = xScale;
		this.scaleFactor.y = yScale;
	}

	drawLayersAsync() {
		return new Promise((resolve, reject) => {
			try {
				let imageLayers = this.layers.filter((layer) => layer.type === "image");
				console.log('image layers', imageLayers)
				let numImagesToBeLoaded = imageLayers.length;
				console.log('num image layers', numImagesToBeLoaded);
				let arrOfLoadedImages = [];
				let numImagesLoaded = 0;
				let drawLayers = (numImgsLoaded, imgsToBeLoaded, loadedImagesArr, layers) => {
					console.log('draw layers attempted');
					if (numImgsLoaded === imgsToBeLoaded) {
						let loadedImagesArrIdx = 0;
						for (let layerIdx= 0; layerIdx < layers.length; layerIdx++) {
							let layer = layers[layerIdx];
							if (layer.type === "image") {
								let currentImage = loadedImagesArr[loadedImagesArrIdx];
								console.log('Current layer', currentImage);
								//this.ctx.safeDraw(, layer.x, layer.y, layer.scalex, layer.scaley)
								this.ctx.drawImage(currentImage, layer.x, layer.y, currentImage.width * layer.scalex * this.scaleFactor.x, currentImage.height * layer.scaley * this.scaleFactor.y);
								loadedImagesArrIdx++;
							} else {
								this.ctx.textAlign = layer.textAlign;
			    				this.ctx.font = `${layer.fontSize} ${layer.fontFamily}`;
			    				console.log(layer.fontFamily);
			    				this.ctx.fillStyle = layer.fontColor;
								this.ctx.fillText(layer.text, layer.x, layer.y);
							}
						}
						resolve({layerOrder: '',
								 imageURI: this.canvas.toDataURL("image/png")})
					}
					
				}
				for (let imgLayersIdx = 0; imgLayersIdx < numImagesToBeLoaded; imgLayersIdx++) {
					let layerImage = new Image();
					layerImage.onload = () => {
						numImagesLoaded++;
						drawLayers(numImagesLoaded, numImagesToBeLoaded, arrOfLoadedImages, this.layers);
					}
					layerImage.src = imageLayers[imgLayersIdx].imagePath;
					arrOfLoadedImages.push(layerImage);
					console.log(arrOfLoadedImages);
				}
			} catch (err) {
				reject(err);
			}
		})
		
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
							this.ctx.safeDraw(layerImage, layer.x, layer.y, layer.scalex, layer.scaley, () => {
								// Resolve the layer Image
								resolve(`${layer.name}`);
							});
						}, ((layer.order + 1 * 10) * 50)); // Need to set the timeout so that the badges will render in the correct order	
					}
					layerImage.onload();
				} else { // Else write the text layer
					window.setTimeout(() => {
						this.ctx.textAlign = layer.textAlign;
	    				this.ctx.font = `${layer.fontSize} ${layer.fontFamily}`;
	    				console.log(layer.fontFamily);
	    				this.ctx.fillStyle = layer.fontColor;
						this.ctx.fillText(layer.text, layer.x, layer.y);
						resolve(`${layer.name}`);
					}, ((layer.order + 1 * 10) * 50))
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
					console.log('order', values);
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