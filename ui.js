$(() => {
	const verticalCards = $('.verticalCard');
	let horizontalCards = $('.horizontalCard');


	//hover horizontal cards
	$(".horizontalCard").click(() => {
		$(this).hide();
		console.log(this);
	})
	verticalCards.hide();
	$('body')

})