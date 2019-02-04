#!/usr/bin/env node
const cp = require("child_process");
process.exitCode = 0;

const chalk = require('chalk');
const log = console.log;

const buildForEnv = (enviorment, region) => {
  var command = 'webpack';
  var args = [ `--env.enviorment ${enviorment} --env.region ${region}`];
  if(enviorment) args[0] = `--env.enviorment ${enviorment}`;
  if(region) args[1] = ` --env.region ${region}`;

  log(chalk.blue.bgYellow(`Building for ${enviorment}-${region} Enviorments`));

  var errorFun = (error) =>  log(chalk.redBright.bgYellow(`Failed: for ${enviorment}-${region} Enviorments`));
  var sucessFun = () =>  log(chalk.greenBright.bgYellow(`Passed: for ${enviorment}-${region} Enviorments`));

	return new Promise((resolve, reject) => {
		const executedCommand = cp.spawn(command, args, {stdio: "inherit", shell: true});
		executedCommand.on("error", error => {errorFun(); reject(error);});

    executedCommand.on("exit", code => {
      if(code === 0) {
        sucessFun();
        resolve();
      } else {
        errorFun();
        reject();
      }
    });

	});
};
const finalSuccessMessage = () =>
    log(chalk.greenBright.bgYellow('>>>>>>>>----------Successful building for All Enviorments----------<<<<<<<<<<<<'));

log(chalk.blue.bgYellow.bold('>>>>>>>>----------building for All Enviorments----------<<<<<<<<<<<<'));

                       buildForEnv('dev', 'EU')
  .then(() => { return buildForEnv('uat', 'EU');})
  .then(() => { return buildForEnv('prod', 'EU');})
  .then(() => { return buildForEnv('dev', 'APAC');})
  .then(() => { return buildForEnv('uat', 'APAC');})
  .then(() => { return buildForEnv('prod', 'APAC');})
  .then(() => { return buildForEnv('dev', '');})
  .then(() => { return buildForEnv('uat', '');})
  .then(() => { return buildForEnv('prod', '');})
  .then(() => {finalSuccessMessage()})
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });



// log(chalk.blue.bgCyan('>>>>>--- building for DEV-EU Enviorments ---<<<<<'));
// const execution_dev_EU = cp.exec('webpack', {env: {enviorment: 'dev', region: 'EU'}}); //['--env.enviorment dev --env.region EU']
// log('execution_dev_EU', execution_dev_EU);
//
// log(chalk.blue.bgCyan('>>>>>--- building for DEV-UAT Enviorments ---<<<<<'));
// const execution_dev_UAT = cp.spawnSync('webpack', ['--env.enviorment uat --env.region EU']);
// log(chalk.blue.bgCyan('>>>>>--- building for DEV-PROD Enviorments ---<<<<<'));
// const execution_dev_PROD = cp.spawnSync('webpack', ['--env.enviorment prod --env.region EU']);

// const executedCommand = cp.spawn('webpack', ['--env.enviorment dev --env.region EU'], {
// 			stdio: "inherit",
// 			shell: true
// });
//
// executedCommand.on("error", error => {
//   log(chalk.red('building for DEV-EU Enviorments Failed'));
// });
//
// executedCommand.on("exit", code => {
//   if (code === 0) {
//     log(chalk.green('building for DEV-EU Enviorments Success'));
//   } else {
//     log(chalk.red('building for DEV-EU Enviorments Failed'));
//   }
// });
//
// console.log('0000000000');
//
//
// runCommand(packageManager, installOptions.concat(packageName))
//   .then(() => {
//     require(packageName); //eslint-disable-line
//   })
//   .then(() => {
//     require(packageName); //eslint-disable-line
//   })
//   .catch(error => {
//     console.error(error);
//     process.exitCode = 1;
//   });
//
//
