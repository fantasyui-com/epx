#!/usr/bin/env node

const setup = require('commander')
const path = require('path')
const tmp = require('tmp')
const { spawn } = require('child_process');

setup
  .version('1.0.0')
  .usage('<url>')
  setup.parse(process.argv);

const url = setup.args[0];

function exe(command, args){
  const instance = spawn(command, args);
  instance.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  instance.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  instance.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}


const tmpobj = tmp.dirSync();
exe("git", ['clone', url, tmpobj.name])
exe("electron", [tmpobj.name])
