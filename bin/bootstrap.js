var path    = require('path')
,   fs      = require('grunt').file
// ,   fs      = require('fs')
,   pkg     = require('../package.json')
,   minify  = require('minify')
,   chalk   = require('chalk')
;


console.log(chalk.green('Running NPM post installation bootstrapping process...\n'));




// // Ensure we have our base folder structure
// var folders = [
//     './bin'
// ,   './public'
// ,   './src'
// ,   './logs'
// ,   './views'
// ,   './.temp'
// ];

// folders.forEach(function(folder) {
//     var folderPath = path.resolve(process.cwd(), folder);

//     if (!fs.exists(folderPath)) {
//         fs.mkdir(folderPath);
//     }

// });


// Ensure we have an .env file to work with

var envFile = {};

envFile.filepath    = path.join(process.cwd(), '.env');

envFile.content = [
    '; ==========================================================================='
,   ';                            ENVIRONMENT CONFIGS'
,   '; ==========================================================================='
,   ''
,   '; APP ENVIRONMENT STATE'
,   'APP_DEV = dev      ; Change this to `prod` when ready'
,   ''
].join('\n');


// if the .env file doesn't exist... make it so

var checkStatus = function(boo) {
    if (boo) {
        return chalk.green('✔');
    } else {
        return chalk.red('✘');
    }
};



if (!fs.exists(envFile.filepath)) {
    console.log(chalk.yellow('Creating base `.env`...'));
    fs.write(envFile.filepath, envFile.content);
}

console.log(chalk.yellow('- `./.env` file exists:'), checkStatus(true));


// a little breathing room for the console
console.log('\n');
