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

}

main();
