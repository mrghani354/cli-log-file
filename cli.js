#!/usr/bin/env node
const program = require("commander");
const models = require("./models/manage");

program.version("1.0.0").description("CLI Log File Converter");

program
  .command("shows <path>")
  .alias("s")
  .description("show log files")
  .showHelpAfterError("(add --help for additional information)")
  .action((commandAndOptions) => {
    models.getLogs(commandAndOptions);
  });

program
  .option("-i, --input <path>", "input file path")
  .option("-o, --output <path>", "output file path")
  .option("-t, --type <type>", "type file")
  .showHelpAfterError("(add --help for additional information)")
  .action((commandAndOptions) => {
    // console.log(commandAndOptions);
    const { type, input, output } = commandAndOptions;
    const _typeFile = type ? type.toLowerCase() : "text";

    if (input) {
      // console.log(_typeFile);
      // const _output = output ? output : input.replace(/\.[^.]+$/, ".txt");
      const ext = _typeFile == "json" ? ".json" : ".txt";

      const _output = output
        ? output.replace(/\.[^.]+$/, ext)
        : input.replace(/\.[^.]+$/, ext);

      models.convertFile(input, _output);
    } else {
      console.log("add --help for additional information");
    }
  });

program.parse(process.argv);
