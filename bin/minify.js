var path    = require('path')
,   fs      = require('fs')
,   pkg     = require('../package.json')
,   minify  = require('minify')
,   chalk   = require('chalk')
;


// get list of files to minify
var files = pkg.minify;

// NOTE: "minify" process files defined in package.json should be defined as
//          "sourceFile": "targetFile"
//       OR "What to compile": "Where it should go"


Object.keys(files).forEach(function(source, index) {

    var sourceFile = path.join(process.cwd(), source);
    var targetFile = path.join(process.cwd(), files[source]);

    console.log(chalk.green(sourceFile));
    console.log(chalk.yellow(targetFile));

    minify(sourceFile, function(err, data) {
        if (err){
            console.error(err.message);

        } else {
            fs.writeFileSync(targetFile, data);

        }
    });

});
