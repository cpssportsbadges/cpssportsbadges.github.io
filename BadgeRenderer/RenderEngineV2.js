/*
	Name: RenderEngine
	Author: Joseph Varilla
	Date: 4/12/2019
	Description: A class to be used to load multiple image 
				layers into a canvas to produce a superimposed image
*/

class RenderEngineV2 {
	// Context is the canvas context
	// imageLayers is an array of file paths to the images
	constructor(canvas, layers) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.scaleFactor = {};
		this.scaleFactor.x = 1;
		this.scaleFactor.y = 1;
		this.ctx.safeDraw = (img, x, y, scalex, scaley, callback) => {
			console.log("img.scalex", scalex);
			console.log("img.scalex", scaley);

			this.ctx.drawImage(img, x, y, img.width * scalex * this.scaleFactor.x, img.height * scaley * this.scaleFactor.y);
			callback();
		}
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

	drawLayersMethodConditional() {
		return new Promise((resolve, reject) => {
			try {
				// Make counter for number of images that have to load
				let imageLayers = this.layers.filter((layer, index) => {
					layer.ogIdx = index;
					return layer.type === "image";
				});

				let numberOfImagesToLoad = imageLayers.length;
				let imagesLoaded = 0;

				let singleImgOnLoad = () => {
					imagesLoaded++;
					// Try To Draw All
					drawAllLayers()
				}

				imageLayers.forEach((layer, index) => {
					this.layers[layer.ogIdx].imageBuffer = new Image();
					// Set Layer Image Path
					this.layers[layer.ogIdx].imageBuffer.src = layer.imagePath;
					this.layers[layer.ogIdx].imageBuffer.onload = singleImgOnLoad;
				})
				

				let drawAllLayers = (imgsLoaded, imgsToLoad) => {
					if (imgsLoaded === imgsToLoad) {
						this.layers.forEach((layer, index) => {
							if (layer.type === "image") {
								this.ctx.drawImage(layer.imageBuffer, layer.x, layer.y, layer.width * layer.scalex * this.scaleFactor.x, layer.height * layer.scaley * this.scaleFactor.y);
							} else if (layer.type === "text") {
								this.ctx.textAlign = layer.textAlign;
			    				this.ctx.font = `${layer.fontSize} ${layer.fontFamily}`;
			    				this.ctx.fillStyle = layer.fontColor;
								this.ctx.fillText(layer.text, layer.x, layer.y);
							}
						})
						resolve({layerOrder: [],
								imageURI: this.canvas.toDataURL("image/png")
								});
					}
				}
			} catch(err) {
				reject(err);
			}
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

module.exports = RenderEngineV2;