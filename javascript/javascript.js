// Application JS
window.Moviematch = Ember.Application.create();

Moviematch.ApplicationAdapter = DS.FixtureAdapter.extend();

ENV = {
    EXPERIMENTAL_CONTROL_HELPER: true
};

// Routers
Moviematch.Router.map(function() {
	this.resource('moviematch', { path: '/' });
});

Moviematch.MoviematchRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('movie', 2);
	},
	setupController: function(controller, model) {
		controller.set('movie', model);
	}
});

// Models

// Movie
Moviematch.Movie = DS.Model.extend({
	title: DS.attr('string'),
	year: DS.belongsTo('year'),
	genre: DS.hasMany('genre', {async: true}),
	cast: DS.hasMany('person', {async: true}),
	director: DS.belongsTo('person'),
	synopsis: DS.attr('string'),
	imgUrl: DS.attr('string')
});

// Year
Moviematch.Year = DS.Model.extend({
	year: DS.attr('number'),
	movie: DS.hasMany('movie')
});

// Genre
Moviematch.Genre = DS.Model.extend({
	genre: DS.attr('string'),
	movie: DS.hasMany('movie')	
});

// Person
Moviematch.Person = DS.Model.extend({
	name: DS.attr('string'),
	movie: DS.hasMany('movie')	
});


// Controllers
Moviematch.MoviematchController = Ember.ArrayController.extend();

Moviematch.MovieController = Ember.ObjectController.extend();

Moviematch.YearController = Ember.ObjectController.extend();

Moviematch.GenreController = Ember.ObjectController.extend();

Moviematch.PersonController = Ember.ObjectController.extend();

// Presentational JS
$(document).ready(function () {
	var movieInformation = $('.movie-information')
    $('h1', movieInformation).click(function(){
        movieInformation.toggleClass( "is-active" );
    });
 });  