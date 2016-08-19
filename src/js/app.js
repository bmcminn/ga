
// Update our Underscore instance to use Mustache style tag delimiters
_.templateSettings.escape       = /\{\{-(.*?)\}\}/g;
_.templateSettings.interpolate  = /\{\{(.+?)\}\}/g;


// Initialize our application instance object
var App = {};


// Initialize our Application's event bus
App.vent = _.extend({}, Backbone.Events);


App.Collections = {};
App.Models      = {};
App.Views       = {};


App.Collections.SearchableCollection = Backbone.Collection.extend({}, {
    search: function(query, options) {
        var search = $.Deferred();

        options = options || {};

        var collection = new this([], options);

        collection.url = _.result(collection, 'url');

        var fetch = collection.fetch({
            data: {
                s: query
            }
        });

        fetch.done(_.bind(function() {
            App.vent.trigger('search:done');
            search.resolveWith(this.Search, [collection]);
        }, this));

        fetch.fail(function() {
            App.vent.trigger('search:fail');
            search.reject();
        })

        return search.promise();
    }
});


var MovieResults = App.Collections.SearchableCollection.extend({
    url: 'http://omdbapi.com/'
}) ;







// Individual movie model
var Movie = Backbone.Model.extend();



// Resulting Movies collection
var Movies = Backbone.Collection.extend({
    model: Movie
});



// Individual movie listing view
var MovieView = Backbone.View.extend({
    tagName: 'li'


,   events: {
        click: 'onClick'
    }


,   template: _.template($('#movie').html())


,   initialize: function(options) {
        this.bus = options.bus;
    }


,   onClick: function() {
        this.bus.trigger('movie:selected', this.model);
    }


,   render: function() {

        console.log(this.model);

        this.$el.html(this.template(this.model));

        return this;
    }
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

            movies.forEach(function(movie) {
                var view = new MovieView({
                    model: movie
                ,   bus: self.bus
                });

                self.$el.append(view.render().$el);
            });

        });

        return this;
    }
});




// var MovieDetailsView = Backbone.View.extend({
//     el: '#movie-details'

// ,   initialize: function(options) {
//         this.bus = options.bus;
//         this.bus.on('movie:selected', this.onMovieSelected, this);
//     }

// ,   render: function() {
//         if (this.model) {
//             this.$('#movie-name').html(this.model.get('name'));
//         }

//         return this;
//     }


// ,   onMovieSelected: function(movie) {
//         this.model = movie;
//         this.render();
//         console.log('movie selected', data);
//     }
// }) ;






var findMovies = MovieResults.search('robin hood');

findMovies.done(function(movies) {

    // console.log(movies);
    var moviesView = new MoviesView({
        collection: movies
    });

    moviesView.render();
});
