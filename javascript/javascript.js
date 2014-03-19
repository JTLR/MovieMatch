// Application JS





// Presentational JS

$(document).ready(function () {
	var movieInformation = $('.movie-information')
    $('h1', movieInformation).click(function(){
        movieInformation.toggleClass( "is-active" );
    });
 });
       
