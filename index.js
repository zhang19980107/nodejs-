const program = require("commander");

program.option("-x, --xxx", "message");
program.option("-p, --ppp", "message");

program
  .command("add")
  .description("add")
  .action((...args) => {
    let words = args.splice(1, 1)[0].join(" ");
    console.log(words);
  });
program
  .command("clean")
  .description("clear")
  .action((...args) => {
    let words = args.splice(1, 1)[0].join(" ");
    console.log(words);
  });

program.parse(process.argv);
