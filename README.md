## Command Line Interface (CLI) Log File Converter (With Node.js)

### Installation
- git clone https://gitlab.com/m.rizal.ghani/cli-log-file.git
- cd [folder project]
- npm install

### File Structure

> Folder structure options and naming conventions for software projects

    .
    ├── node_modules                # dependencies node js library
    ├── data                        # dummy file for testing
    ├── models                      # logic for process request
    ├── view                        # show view result process request
    ├── cli.js                      # main program
    ├── package-lock.json           
    ├── package.json
    └── README.md                   # documentation

### Commands
Usage: cli [options] [command]

| Options | Alias | Description |
| ------- | ----- | ----------- |
| --version | -V  | output the version number |
| --help | -h  | display help for command |
| --input <path> | -i <path>  | input file path |
| --output <path> | -o <path>  | output file path |
| --type <type> | -t <path>  | type file |

    
| Command | Alias | Description |
| --------- | ----- | ----------- |
| --shows | s  | show log files |

### Quick Start
node cli -i ./data/dummy.log -t json -o .data/dummy.json
    
Input: ./data/dummy.log -> Output: ./data/data.json
done!
  
