// Application JS
var Moviematch = Ember.Application.create();
Moviematch.ApplicationAdapter = DS.FixtureAdapter;

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
	this.route('moviematch', { path: '/' });
	this.route('login', { path: '/login'});

});

Moviematch.MoviematchRoute = Ember.Route.extend({
	model: function() {
		return Moviematch.Movie.findAll();
	}
});

Moviematch.loginRoute = Ember.Route.extend({
	model: function() {
		return Moviematch.User.findAll();
	}, 
	setupController: function(controller, model) {
		controller.set("model", model);
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
Moviematch.User = Moviematch.Model.extend({
    
    username: DS.attr('string'),
    password: DS.attr('string')
    
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

Moviematch.LoginController = Ember.ArrayController.extend({

  loginFailed: false,
  loginSuccessful: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,

  login: function(model) {
    this.setProperties({
      loginFailed: false,
      isProcessing: true
    });

    this.set("timeout", setTimeout(this.slowConnection.bind(this), 1));
    alert(model);
    var request = $.post("/login", this.getProperties("username", "password"));
    
    request.then(this.success.bind(this), this.failure.bind(this));
  },

  success: function() {
    this.reset();
    this.set("loginSuccessful", true);
    // sign in logic
  },

  failure: function() {
    this.reset();
    this.set("loginFailed", true);
  },

  slowConnection: function() {
    this.set("isSlowConnection", true);
  },

  reset: function() {
    clearTimeout(this.get("timeout"));
    this.setProperties({
      isProcessing: false,
      isSlowConnection: false
    });
  }

});

// Presentational JS

var body;
var backgroundPosition;
var scrollPosition;
var parallaxAmount = 1.5;
var heroText;

$(document).ready(function () {
    var typist1 = $('#js-typist-1'),
    typist2 = $('#js-typist-2');      

    $('.js-site-navigation-toggle').bind('click', function() {
    	$('.js-site-navigation').slideToggle();
    });

    setTimeout(function() {
    	$('.js-intro').removeClass('is-active');
    	$('.js-type').fadeIn(1000).addClass('is-active');

        setTimeout(function() { 
        	typist1.typer(['Die Hard', 'Inception', 'Titanic', 'Knocked up', 'Project X', 'Coach Carter', 'Toy Story', 'Blindness', 'About a Boy', 'Casino'], {
            	delay: 5000,
            	duration: 1000
            });
            setTimeout(function() { 
            	typist2.typer(['Air Force One', 'Source Code', 'Dear John', 'Role Models', 'The Hangover', 'Goal', 'Madagascar', 'Pontypool', 'Juno', 'Scarface'], {
            		delay: 5000,
            		duration: 1000
            	});
            }, 1250);
    	}, 500);
    }, 3500);
});

$(window).bind('load', function () {
	heroText = $('.hero-container');
	body = $('body');

	$(".like-movie").each(function () {
 		$(this).hover(function () {
 		 	$('.icon-hover').text("I like this movie");
  			$('.movie-information', $(this).siblings(".movie-container")).addClass("active green");  //Add the active class to the area is hovered     
  		}, function () {
	      	$('.movie-information', $(this).siblings(".movie-container")).removeClass("active green");
		});
	 });

 	$(".watch-list").each(function () {
 		$(this).hover(function () {
			$('.icon-hover').text("Add to watch list");  //Add the active class to the area is hovered
			$('.movie-information', $(this).siblings(".movie-container")).addClass("active brand"); 
		}, function () {
			$('.movie-information', $(this).siblings(".movie-container")).removeClass("active brand");
		});
	 });

	$(".dislike-movie").each(function () {
		$(this).hover(function () {
			//Add the active class to the area is hovered
			$('.icon-hover').text("I don't like this movie");
			$('.movie-information', $(this).siblings(".movie-container")).addClass("active red"); 
		}, function () {
			$('.movie-information', $(this).siblings(".movie-container")).removeClass("active red");
		});
	});
}); 
		 
$(window).bind('scroll', function () {
	scrollPosition = $(window).scrollTop();
	backgroundPosition = (Math.floor(scrollPosition/parallaxAmount));
	heroPosition = -(Math.floor(scrollPosition/parallaxAmount));
	body.css('background-position', 'center ' + (backgroundPosition + 60) + 'px');
	heroText.css('top', (heroPosition * 2.4) + 'px');
});


