$(() => {
	const verticalCards = $('.verticalCard');
	let horizontalCards = $('.horizontalCard');


	//hover horizontal cards
	$(".horizontalCard").click(function() {
		$(this).hide();
		console.log(this);
	})

	$(".horizontalCard").mouseover(function() {
		$(this).children().show();
		console.log(this);
	})
	$(".horizontalCard").mouseout(function() {
		$(this).children()
		$(this).children('.horizontalCardBody').hide();
		console.log(this);
	})

	$("#skills, #projects").mouseenter(function() {
		$(this).children().children('.verticalCardBody').show();
		console.log(this);
	})

	$("#skills, #projects").mouseleave(function() {
		$(this).children().children('.verticalCardBody').hide();
		console.log(this);
	})

	$('body')

})