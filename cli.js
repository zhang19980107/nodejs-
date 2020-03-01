#!/usr/bin/env node
const program = require("commander");
let api = require('./index')
program.option("-x, --xxx", "message");
program.option("-p, --ppp", "message");

program
  .command("add")
  .description("add a task")
  .action((...args) => {
    if(args.length === 1) return
    let words = args[1].join(' ')
    api.add(words)
  });
program
  .command("clear")
  .description("clear")
  .action(() => {
    api.clear()
  });

program.parse(process.argv);


if (process.argv.length <= 2) {
    api.showAll()
}