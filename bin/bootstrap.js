var path    = require('path')
,   fs      = require('fs')
,   pkg     = require('../package.json')
,   minify  = require('minify')
,   chalk   = require('chalk')
;


console.log(chalk.green('Running NPM post installation bootstrapping process...\n'));



// Start by ensuring we have an .env file to work with

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



if (!fs.existsSync(envFile.filepath)) {
    console.log(chalk.yellow('Creating base `.env`...'));
    fs.writeFileSync(envFile.filepath, envFile.content);
}

console.log(chalk.yellow('- `./.env` file exists:'), checkStatus(true));


// a little breathing room for the console
console.log('\n');
