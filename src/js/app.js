var Person   = {}
,   Dale     = {}
,   Bob      = {}
;

(function() {

    Person = Backbone.Model.extend({

        defaults: {
            name:       'John Doe'
        ,   age:        30
        ,   occupation: 'Mouth Feeler'
        }

    ,   events: {
            // 'change': 'onChange'
            'error':    'onError'
        ,   'invalid':  'onInvalid'
        }


    ,   work: function() {
            return this.get('name') + ' is ' + this.get('occupation') + 'ing!';
        }

    ,   validate: function(attrs, options) {
            console.log(attrs);
            if (attrs.age <= 0) {
                return 'Age must be positive!!';
            }

            if (!attrs.name) {
                return 'Name must be filled in!!';
            }
        }

    // ,   onChange: function(e) {
    //         console.log(e);
    //         if (e.attributes.age)
    //     }

    ,   onError: function(model, err) {
            console.log('onError()');
            console.log(err);
            return this.validationError;
        })

    ,   onInvalid: function(model, err) {
            console.log('onInvalid()');
            console.log(err);
            return this.validationError;
        })

    });





    Bob = new Person({
        name:       'Bob Barker'
    ,   age:        73
    ,   occupation: 'Game show Announcer'
    });


    Dale = new Person({
        name: 'Dale Gribble'
    ,   age: 43
    ,   occupation: 'Soldier of Fortune'
    });


    // Bob.on('invalid', function(model, err) {
    //     console.log(err);
    //     console.log('BLAH, THERE WAS A PROBLEM!!!');
    // });



})();
