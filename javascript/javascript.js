// Application JS
var Moviematch = Ember.Application.create();

// Record array
Moviematch.RecordArray = Ember.ArrayProxy.extend({

});

function createOrGetRecordArray(context) {
	var array = context._recordArray;
	if (array) {
		return array;
	}

	context._recordArray = array = Moviematch.RecordArray.create();

	array.set('isLoaded', false);
	array.set('_ids', Ember.Map.create());

	return array;
}

// Routers
Moviematch.Router.map(function() {
	this.resource('moviematch', { path: '/' });
});

Moviematch.MoviematchRoute = Ember.Route.extend({
	model: function() {
		return Moviematch.Movie.findAll();
	}
});

// Models

Moviematch.Model = Ember.Object.extend({

});

Moviematch.Model.reopenClass({
	findAll: function() {
		var array = createOrGetRecordArray(this);
		this.fetch(array);
		return array;
	},
	fetch: function(array) {
		var model = this;

		ajax(searchUrl).then(function(data) {
			model.materializeData(data.results, array.get('_ids'), array);
		}).then(null, function(err) {
			console.log(err.message);
			console.log(err.stack);
			throw err;
		});
	},
	materializeData: function(data, cache, records) {
		var model = this;

		var content = data.map(function(item) {
			var record;

			if (cache.has(item.id)) {
				record = cache.get(item.id);
			} else {
				record = model.create();
				cache.set(item.id, record);
			}
			record.setProperties(item);
			return record;
		});

		records.set('content', content);
		records.set('isLoaded', true);
	}
});

var searchUrl = "https://api.themoviedb.org/3/movie/upcoming";
var apiKey = "30b6b095d358b4ba9eeb5154fdfce80c";

function ajax(url) {
	return Ember.Deferred.promise(function(promise) {
		var xhr = $.ajax(url, {
			data: { api_key: apiKey, page: 1 },
			dataType: 'jsonp'
		});
		xhr.then(function(data) {
			Ember.run(promise, promise.resolve, data);
		}, function(err) {
			promise.reject(e);
		});
	});
}

// User
Moviematch.User = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    watchList: DS.hasMany('movie', {async: true}),
    likeList: DS.hasMany('movie', {async: true}),
    dislikeList: DS.hasMany('movie', {async: true})
});

// Movie
Moviematch.Movie = Moviematch.Model.extend({
	title: null,
	img: function() {
		var posterBasePath = 'https://image.tmdb.org/t/p/original';
		return posterBasePath + this.get('poster_path');
	}.property('poster_path')
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