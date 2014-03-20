// Application JS
window.Moviematch = Ember.Application.create();

Moviematch.ApplicationAdapter = DS.FixtureAdapter.extend();

// Routers
Moviematch.Router.map(function() {
	this.resource('moviematch', { path: '/' });
});

Moviematch.MoviematchRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('movie', 3);
	},
	setupController: function(controller, model) {
		controller.set('movie', model);
	}
});

// Models

// Movie
Moviematch.Movie = DS.Model.extend({
	title: DS.attr('string'),
	year: DS.attr('number'),
	genres: DS.attr('array'),
	cast: DS.attr('array'),
	director: DS.attr('string'),
	synopsis: DS.attr('string'),
	imgUrl: DS.attr('string')
});

Moviematch.Movie.FIXTURES = [
	{
		id: 1,
		title: 'The Wolf of Wall Street',
		year: 2013,
		genres: ['Biography', 'Comedy', 'Crime'],
		cast: ['Leonardo DiCaprio', 'Jonah Hill', 'Margot Robbie'],
		director: 'Martin Scorsese',
		synopsis: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stockbroker living the high life to his fall involving crime, corruption and the federal government.',
		imgUrl: 'images/the-wolf-of-wall-street.jpg'
	},
	{
		id: 2,
		title: 'Titanic',
		year: 1997,
		genres: ['Drama', 'Romance'],
		cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
		director: 'James Cameron',
		synopsis: 'A seventeen-year-old aristocrat, expecting to be married to a rich claimant by her mother, falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
		imgUrl: 'images/titsnic.jpg'
	},
	{
		id: 3,
		title: '12 Years a Slave',
		year: 2013,
		genres: ['Biography', 'Drama', 'History'],
		cast: ['Chiwetel Ejiofor', 'Michael K. Williams', 'Michael Fassbender'],
		director: 'Steve McQueen',
		synopsis: 'In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.',
		imgUrl: 'images/12-years-a-slave.jpg'
	}
];

// Controllers
Moviematch.MoviematchController = Ember.ArrayController.extend();

Moviematch.MovieController = Ember.ObjectController.extend();

// Presentational JS
$(document).ready(function () {
	var movieInformation = $('.movie-information')
    $('h1', movieInformation).click(function(){
        movieInformation.toggleClass( "is-active" );
    });
 });  