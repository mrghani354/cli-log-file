const mainView = require("../view/tableView");
const moment = require("moment");
const fs = require("fs");
const _ = require("underscore");
const split = require("split");
let keys;

/* read all logs */
const getLogs = (path) => {
  const tableConfig = {
    head: ["File Path"],
  };

  let content = new Array();
  const _files = getFiles(path);
  for (let i = 0; i < _files.length; i++) {
    // console.log(_files[i]);
    content.push([_files[i]]);
  }
  mainView.generateView(tableConfig, content, "FILE LIST");
};

const convertFile = (inPath, outPath, typeFile) => {
  console.log(`Input: ${inPath} -> Output: ${outPath}`);
  readFile(inPath, outPath, true);
};

// /[^\t]+/g
const readFile = (inPath, outPath, useHeader) => {
  let index = 0;
  let outData = [];
  let regex = new RegExp("[^\\n\\r\\t ]+", "g");
  
  let readStream = fs
    .createReadStream(inPath)
    .pipe(split())
    .on("data", function (line) {
      line = line.toString().match(regex);

      if (line) {
        if (useHeader && index == 0) {
          setHeaderRowAsKeys(line);
        } else if (useHeader) {
          // create an object with header row keys
          line = addKeys(line);
          outData.push(line);
        } else {
          // array, no keys
          outData.push(line);
        }

        index++;
      }
    });
    
  readStream.on("end", function () {
    writeFile(outData, outPath);
  });
}

const writeFile = (data, path) => {
  let jsonOut = fs.createWriteStream(path);
  jsonOut.write(JSON.stringify(data));
  jsonOut.on("error", function (err) {
    console.log(err);
  });
  jsonOut.end();
  console.log("done!");
};

const setHeaderRowAsKeys = (line) => {
  keys = line;
};

const addKeys = (line) => {
  return _.object(keys, line);
};

const getFiles = (dir, files_) => {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    const name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
};

module.exports = {
  getLogs,
  convertFile,
};
