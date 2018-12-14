AOS.init({
  duration: 1200,
});

 // tabToCVSectionMap = {
	// 	background: $("#cv_background"),
	// 	education: $("#cv_education"),
	// 	experience: $("#cv_experience"),
	// 	skills: $("#cv_skills")
	// }



//---Code for CV Tab Functionality------------------------------------------------
	let selectedItemTab= document.getElementById("background_cv_tab");
	let selectedItemSection = document.getElementById("cv_background");
	selectedItemTab.classList.add("w3-dark-grey");
	selectedItemTab.classList.add("w3-text-white");
	const tabMap = {
			background: cv_background,
			education: cv_education,
			experience: cv_experience,
			skills: cv_skills
		};
	
	function loadTab(event, tabVal) {
		console.log('tab',selectedItemTab);
		console.log('section', selectedItemSection);
		// console.log('proof',tabMap[selectedItem]);
		
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