
const badgeLayersConfig = {//paths relative to BadgeRenderer
	background: {
		// green: './BadgeAssets/badge-background/badge-base-hexagon-green.png' ,
		// purple: './BadgeAssets/badge-background/badge-base-hexagon-purple.png',
		// red: './BadgeAssets/badge-background/badge-base-hexagon-red.png'
		distinction: {
			// a: "./BadgeV3/oldbase_blank_hole.png",
			// 0: "./BadgeV3/oldbase_blank_hole.png",
			a: "./BadgeV3/BaseLayers/defaultBaseLayer.png",
			0: "./BadgeV3/BaseLayers/defaultBaseLayer.png",
			1: "./BadgeV3/BaseLayers/goldBaseLayer.png",
			2: "./BadgeV3/BaseLayers/silverBaseLayer.png",
			v4: {
				a: "./BadgeV4/Base-Layers/CPS_Sports_Base_Layer-Default.png",
				0: "./BadgeV4/Base-Layers/CPS_Sports_Base_Layer-Default.png",
				1: "./BadgeV4/Base-Layers/CPS_Sports_Base_Layer-Gold.png",
				2: "./BadgeV4/Base-Layers/CPS_Sports_Base_Layer-Silver.png",
			}
		}
	},
	overlay: {
		skyline: './BadgeAssets/badge-overlay/badge-overlay-skyline-1.png'
	},
	sport: {
		x: {
			0: './BadgeV3/SportIcons/sport-icon-none-wob.png',
			1: './BadgeV3/SportIcons/sport-icon-none-bow.png'
		},
		academic: {
			0: './BadgeV3/SportIcons/sport-icon-none-wob.png',
			1: './BadgeV3/SportIcons/sport-icon-none-bow.png'
		},
		none: {
			0: './BadgeV3/SportIcons/sport-icon-none-wob.png',
			1: './BadgeV3/SportIcons/sport-icon-none-bow.png'
		},
		golf: {
			0: './BadgeV3/SportIcons/sport-icon-golf-wob.png',
			1: './BadgeV3/SportIcons/sport-icon-golf-bow.png'
		},
		tennis: {
			0: './BadgeV3/SportIcons/sport-icon-tennis-wob.png',
			1: './BadgeV3/SportIcons/sport-icon-tennis-bow.png'
		},
		wrestling: {
			0: './BadgeV3/SportIcons/sport-icon-wrestling-wob.png',
			1: './BadgeV3/SportIcons/sport-icon-wrestling-bow.png'
		}
		// baseball: './BadgeAssets/badge-sport/sport-logo-baseball.png',
		// football: './BadgeAssets/badge-sport/sport-logo-football.png',
		// soccer: './BadgeAssets/badge-sport/sport-logo-soccer.png',
	},

}

module.exports = badgeLayersConfig;