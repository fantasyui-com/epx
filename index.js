#!/usr/bin/env node

const setup = require('commander')
const tmp = require('tmp')
const pacote = require('pacote');
const { spawn } = require('child_process');
const tmpobj = tmp.dirSync();

setup.version('1.0.0').usage('<module>');
setup.parse(process.argv);

async function main(){

  await pacote.extract(setup.args[0], tmpobj.name);

  const install = spawn("npm", ["i"], {cwd:tmpobj.name});
   install.stdout.on('data', (data) => {
     console.log(`install stdout: ${data}`);
   });
   install.stderr.on('data', (data) => {
     console.log(`install stderr: ${data}`);
   });

   install.on('close', (code) => {

    console.log(`install child process exited with code ${code}`);

    const electron = spawn("electron", [tmpobj.name]);
    electron.stdout.on('data', (data) => {
    console.log(`electron stdout: ${data}`);
    });
    electron.stderr.on('data', (data) => {
    console.log(`electron stderr: ${data}`);
    });
    electron.on('close', (code) => {
    console.log(`electron child process exited with code ${code}`);
    });

  });

}

main();
