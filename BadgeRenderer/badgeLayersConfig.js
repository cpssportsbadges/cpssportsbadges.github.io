
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
		},

		v4: {
			academic: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Academic.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Academic.png'
			},
			badminton: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Badminton.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Badminton.png'
			},
			baseball: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Baseball.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Baseball.png'
			},
			basketball: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Basketball.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Basketball.png'
			},
			bowling: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Bowling.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Bowling.png'
			},
			cross_country: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-CrossCountry.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-CrossCountry.png'
			},
			football: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Football.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Football.png'
			},
			golf: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Golf.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Golf.png'
			},
			lacrosse: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Lacrosse.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Lacrosse.png'
			},
			soccer: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Soccer.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Soccer.png'
			},
			softball: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Softball.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Softball.png'
			},
			spirit: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Spirit.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Spirit.png'
			},
			swimming: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Swimming.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Swimming.png'
			},
			tennis: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Tennis.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Tennis.png'
			},
			track_and_field: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Track.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Track.png'
			},
			volleyball: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Volleyball.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Volleyball.png'
			},
			water_polo: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-WaterPolo.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-WaterPolo.png'
			},
			wrestling: {
				0: './BadgeV4/SportsIconsBLUE/Blue-Sports-Icons-Wrestling.png',
				1: './BadgeV4/SportsIconsWHITE/White-Sports-Icons-Wrestling.png'
			}
		}
		// baseball: './BadgeAssets/badge-sport/sport-logo-baseball.png',
		// football: './BadgeAssets/badge-sport/sport-logo-football.png',
		// soccer: './BadgeAssets/badge-sport/sport-logo-soccer.png',
	},

}

module.exports = badgeLayersConfig;