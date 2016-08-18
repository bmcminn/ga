var test = require('tape').test;


function add(a,b) {
    return a+b;
}


test('add: add two numbers accordingly', function(t) {

    var actual = add(1,2);
    var expected = 3;

    t.equal(actual, expected);
    t.end();
});
