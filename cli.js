#!/usr/bin/env node
const {hideBin} = require('yargs/helpers');
const fs = require('fs');
const makeDynamicGroups = require('./index');

const argv = require('yargs/yargs')(hideBin(process.argv))
  .option('amount', {
    describe: 'number of groups',
    type: 'number',
    demandOption: true,
  })
  .option('group-size', {
    describe: 'group size',
    type: 'number',
    default: 2,
    demandOption: true,
  })
  .option('separator', {
    describe: 'input separator',
    type: 'string',
    default: "\n",
    demandOption: true,
  })
  .strict()
  .help()
  .argv;

const separator = argv['separator'];
const groupSize = argv['group-size'];
const amount = argv['amount'];

const input = fs.readFileSync(0).toString(); // STDIN_FILENO = 0

const items = input.split(separator)
    .map((handle) => {
      return handle.trim()
    }).filter((handle) => {
      return handle !== ''
    });

const allGroups = makeDynamicGroups(items, amount, groupSize);

for (let group of allGroups) {
  process.stdout.write(group.join(" ") + "\n");
}
