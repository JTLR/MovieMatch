// Application JS
window.MovieMatch = Ember.Application.create();

MovieMatch.ApplicationAdapter = DS.FixtureAdapter.extend();

// Models

// Movie
MovieMatch.Movie = DS.Model.extend({
	title: DS.attr('string'),
	year: DS.attr('number'),
	genres: DS.attr('string'),
	cast: DS.attr('string'),
	director: DS.attr('string'),
	synopsis: DS.attr('string'),
	imgUrl: DS.attr('string'),
});

MovieMatch.Movie.FIXTURES = [
	{
		id: 1,
		title: 'The Wolf of Wall Street',
		year: 2013,
		genres: ['Biography', 'Comedy', 'Crime'],
		cast: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
		director: 'Martin Scorsese',
		synopsis: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stockbroker living the high life to his fall involving crime, corruption and the federal government.',
		imgUrl: 'the-wolf-of-wall-street.jpg'
	},
	{
		id: 2,
		title: 'Titanic',
		year: 1997,
		genres: ['Drama', 'Romanc'],
		cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
		director: 'James Cameron',
		synopsis: 'A seventeen-year-old aristocrat, expecting to be married to a rich claimant by her mother, falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
		imgUrl: 'titsnic.jpg'
	},
	{
		id: 3,
		title: '12 Years a Slave',
		year: 2013,
		genres: ['Biography', 'Drama', 'History'],
		cast: ['Chiwetel Ejiofor', 'Michael K. Williams', 'Michael Fassbender'],
		director: 'Steve McQueen',
		synopsis: 'In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.',
		imgUrl: '12-years-a-slave.jpg'
	}
]



// Presentational JS

$(document).ready(function () {
	var movieInformation = $('.movie-information')
    $('h1', movieInformation).click(function(){
        movieInformation.toggleClass( "is-active" );
    });
 });
       
