
// Update our Underscore instance to use Mustache style tag delimiters
_.templateSettings.escape       = /\{\{-(.*?)\}\}/g;
_.templateSettings.interpolate  = /\{\{(.+?)\}\}/g;



// extend jQuery with a .serializeJSON() method
$.fn.extend({
    serializeJSON: function(exclude) {
        exclude || (exclude = []);
        return _.reduce(this.serializeArray(), function(hash, pair) {
            pair.value && !(pair.name in exclude) && (hash[pair.name] = pair.value);
            return hash;
        }, {});
    }
});



// Initialize our application instance object
var App = {};


// Initialize our Application's event bus
App.vent = _.extend({}, Backbone.Events);


App.Collections = {};
App.Models      = {};
App.Views       = {};


App.Collections.SearchableCollection = Backbone.Collection.extend({}, {

    /**
     * Search
     * @param  {object} query   JSON object of query parameters
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    search: function(query, options) {
        var search = $.Deferred();

        options = options || {};

        var collection = new this([], options);

        collection.url = _.result(collection, 'url');

        var fetch = collection.fetch({
            data: query
        });

        fetch.done(_.bind(function() {
            App.vent.trigger('search:done');
            search.resolveWith(this.Search, [collection]);
        }, this));

        fetch.fail(function() {
            App.vent.trigger('search:fail');
            search.reject();
        });

        return search.promise();
    }
});


var MovieResults = App.Collections.SearchableCollection.extend({
    url: 'http://omdbapi.com/'
});

var MovieResult = App.Collections.SearchableCollection.extend({
    url: 'http://omdbapi.com/'
});





// Individual movie model
var Movie = Backbone.Model.extend();



// Resulting Movies collection
var Movies = Backbone.Collection.extend({
    model: Movie
});




// Movie listings view
var MoviesView = Backbone.View.extend({
    tagName:    'ul'

,   el:         '#movies'

,   initialize: function(options) {
        this.bus = options.bus;
    }

,   render: function() {

        // we alias 'this' to 'self' so we have a reference to 'this' if we change lexical scope
        var self = this;

        this.collection.each(function(model) {

            var movies = model.toJSON().Search;

            // empty the container to redraw things
            self.$el.html('');

            // iterate over each movie and render it in the list
            movies.forEach(function(movie) {
                var movieItemView = new MoviesItemView({
                    model: movie
                ,   bus: self.bus
                });

                self.$el.append(movieItemView.render().$el);
            });

        });

        return this;
    }
});



// Individual movie listing view
var MoviesItemView = Backbone.View.extend({
    tagName: 'li'

,   events: {
        click: 'onClick'
    }


,   template: _.template($('#movie-listing').html())


,   initialize: function(options) {
        this.bus = options.bus;

    }


,   onClick: function() {
        this.bus.trigger('movie:selected', this.model);
    }


,   render: function() {

        // console.log(this.model);

        this.$el.html(this.template(this.model));

        return this;
    }
});






var MovieDetailsView = Backbone.View.extend({

    el: '#movie'

,   template: _.template($('#movie-details').html())

,   initialize: function(options) {
        this.bus = options.bus;

        console.log('loading:', this);
    }

,   render: function() {
        console.log('rendering movie details:', this.model);

        var model = this.model.models[0].toJSON();
        this.$el.html(this.template(model));
    }
});




App.Views.SearchView = Backbone.View.extend({

    initialize: function(options) {
        this.bus = options.bus;
        console.log('search view found!');
    }

,   events: {
        'submit': 'onSubmit'
    }

,   onSubmit: function(e, data) {
        e.preventDefault();
        // console.log('e:', e);
        this.bus.trigger('search:submit', $(e.target).serializeJSON());
    }
});



var searchView = new App.Views.SearchView({
    el: '#movies-search'
,   bus: App.vent
});




App.vent.on('search:submit', function(query) {
    console.log('search:submit', query);

    var findMovies = MovieResults.search(query);

    findMovies.done(function(movies) {

        // console.log(movies);
        var moviesView = new MoviesView({
            collection: movies
        ,   bus: App.vent
        });

        moviesView.render();
    });

});



App.vent.on('movie:selected', function(model) {
    console.log('movie:selected', model);

    var findMovie = MovieResult.search({
        i: model.imdbID
    });

    findMovie.done(function(movie) {

        var movieView = new MovieDetailsView({
            bus: App.vent
        ,   model: movie
        });

        movieView.render();

    });

});
