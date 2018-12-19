AOS.init({
  duration: 1200,
  once: true,
});


//---Code for CV Tab Functionality------------------------------------------------
	let selectedItemTab= document.getElementById("background_cv_tab");
	let selectedItemSection = document.getElementById("cv_background");
	selectedItemTab.classList.add("w3-dark-grey");
	selectedItemTab.classList.add("w3-text-white");
	const tabMap = {
			background: cv_background,
			education: cv_education,
			experience: cv_experience,
			skills: cv_skills,
			honors: cv_honors
		};
	
	function loadTab(event, tabVal) {	
		//Remove Selected Classes From Tab (Removes Highlighting)
		selectedItemTab.classList.remove("w3-dark-grey");
		selectedItemTab.classList.remove("w3-text-white");

		//Hide The Selected Section
		selectedItemSection.hidden = true;

		//Point Selected Section and Tab To The New Ones
		selectedItemTab = event.target;
		selectedItemSection = tabMap[tabVal];

		//HighLight The Selected Tab
		selectedItemTab.classList.add("w3-dark-grey");
		selectedItemTab.classList.add("w3-text-white");

		//Show the selected section
		selectedItemSection.hidden = false;
	}
		

//---Code For Project Slides------------------------------------------------------------
	function revealCaption(event) {
		console.log(event.target);
		console.log('children', event.target.childNodes);
		console.log(event.target.childNodes[4]);

		let captionBlock = event.target.childNodes.filter((child) => {
			child.classList.contains("project-caption-container");
		});
	}

	let focusedCard = null;
	function focusOnProjectSlide(event, elemId) {
		const targetCard = document.getElementById(elemId);
		const top = $('div#projects').position().top;
		$(window).scrollTop( top );
		if (targetCard !== focusedCard) {
			if (focusedCard) {
				focusedCard.classList.remove('projectCardFocused');
			}
			focusedCard = targetCard;
			loadProjectData(elemId);
		} else {
			hideProjectData();
			focusedCard = null;
		}
		targetCard.classList.toggle('projectCardFocused');
	}

	const projectCardDataSet = {
		"mcyaf-project-card": {
			title: "MCYAF Site Renovation",
			description: 
				"Volunteer with the Maine Community Youth Assistance Foundation to create a new content management system website and to train them on data entry and maintenance.",
			date: "2017",
			status: "Live- Standby Maintenance",
			link: "http://www.mcyaf.com",
			stack: ["HTML", "CSS"],
			skills: ["Consulting", "Content Managment Systems", "User Training", "Web Design"],
		},
		"facedetection-project-card": {
			title: "Facial Detection App",
			description: "A full-stack web application that makes use of Clarifai's facial detection API deployed onto Heroku.",
			date: "2018",
			status: "Live",
			link: "",
			stack: ["JavaScript", "HTML", "CSS", "Node.js", "ReactJS", "PostgreSQL"],
			skills: ["Full-stack Development", "Deployment"],
		},
		"owe-knowe-project-card": {
			title: "Owe Knowe",
			description: "A web application that allows you to keep track of how much you owe and how much you are owed, complete with interest calculations.",
			date: "2018",
			status: "In Development",
			link: "",
			stack: ["jQuery", "jQuery UI", "JavaScript", "HTML", "CSS"],
			skills: [],
		},
		"advanced-minecraft-project-card": {
			title: "Advanced Minecraft Mods",
			description: "Minecraft Mods made to work on CodeKingdom's platform for Minecraft, used to teach object-oriented programming to K-12 students.",
			date: "2018",
			status: "Ongoing",
			link: "https://www.github.com/jvarilla/minecraftAdvanced",
			stack: ["Java"],
			skills: ["Teaching", "OOP"],
		},
		"alien-ruins-project-card": {
			title: "Alien Ruins",
			description: "Created the UI and sprites for a variant of ruinscape that involves uncovering ancient alien structures",
			date: "2018",
			status: "Live",
			link: "http://studentweb.cdm.depaul.edu/~jvarilla/IT238/game/game.html",
			stack: ["jQuery", "JavaScript", "HTML", "CSS"],
			skills: ["UI Design"],
		},
		"coming-soon-project-card": {
			title: "Coming Soon",
			description: "???",
			date: "Future",
			status: "",
			link: "",
			stack: [],
			skills: [],
		},
	}

	const projectDataCard = document.getElementById("dynamic-project-data-card");
	const projectDataCardJ = $("#dynamic-project-data-card");
	function loadProjectData(elemId) {
		projectDataCard.classList.remove("projectDataCardInactive");
		const dataSet = projectCardDataSet[elemId];
		projectDataCardJ.empty();
		projectDataCardJ.append(`
			${constructDataCardData(dataSet)}`);
		projectDataCard.classList.add("projectDataCardActive");
		// document.getElementById("dynamic-project-title").appendChild(document.createTextNode(dataSet.title));
	}

	function constructDataCardData(dataSet) {
		let elemString = `<div>`;

		//Add Title
		elemString += `<h2>${dataSet.title}</h2>`;

		//Add Date and Status
		elemString += `<h6>Date: ${dataSet.date} | Status: <span class='status ${dataSet.status}-status'>${dataSet.status} </span></h6>`;
		
		//Add Description
		elemString += `<p>${dataSet.description}</p>`;


		//Add Tech Stack
		if (dataSet.stack.length > 0) {
			elemString += `<h6>Technologies:`;

			dataSet.stack.forEach((item) => {
				elemString += `<div class='tech-skill-tag'>${item}</div>`;
			});

			elemString += `</h6>`;
		}
		

		//Add other Skill list
		if (dataSet.skills.length > 0) {
			elemString += `<h6>Skills: <spanclass='other-skill-space'>`;
			for (let skillIdx=0; skillIdx <dataSet.skills.length; skillIdx++) {
				if (skillIdx === dataSet.skills.length - 1) {//no trailing comma
					elemString += `${dataSet.skills[skillIdx]}`
				} else {
					elemString += `${dataSet.skills[skillIdx]}, `;
				}	
			}	
			elemString += `</span></h6>`
		}
		elemString += `<br/>`;
		
		//Add link To button
		if (dataSet.link.length > 0) {
			elemString += `<h4><a href=${dataSet.link}><button class='w3-button w3-text-white w3-black w3-hover-text-black w3-hover-white'>Check it out</button></a></h4>`
		}

		//close and return element
		elemString += `<br/></div>`

		return elemString;
	}

	function hideProjectData() {
		projectDataCardJ.empty();
		projectDataCard.classList.remove("projectDataCardActive");
		projectDataCard.classList.add("projectDataCardInactive");
	}

	// $(() => {
	// 	$(".projectCard").on('click', () => {
	// 		console.log(this);
	// 		this.classList.add('projectCardFocused');
	// 	})
	// })

	// function revealCaption2() {
	// 	$(this).children(".project-caption-container").css('display', 'block');
	// 	// console.log(captionBlock[0]);
	// }





// $(() => {
// 	//Program For CV Tab Component
// 	$("#mcyaf-project-card").on('mouseover', (elem) => {
// 		$(this).find(".project-caption-container").css('display', 'block');
// 		console.log($(this));
// 		console.log('hi');
// 		console.log($(this).children());
// 	})
// })