const chokidar = require('chokidar');

const pArgs = process.argv.slice(2,process.argv.length);

// Remove the recursive flag and use it in watcher instead
const recIndex = pArgs.indexOf("--recursive");
let recSnippet = "/";
if (recIndex != -1) {
  recSnippet = "/**/";
  pArgs.splice(recIndex);
}

console.log("******************************************************************");
console.log("plantuml-watcher watching for changes in .puml and .plantuml files");
console.log("plantuml args:", pArgs);
console.log("******************************************************************");

// Use choikdar to watch for file changes of know plantuml files
const path = [process.env.PWD + recSnippet + '*.puml', process.env.PWD + recSnippet + '*.plantuml'];
const ignored = "/**/node_modules/**";

chokidar.watch(path, {
  ignored: ignored
}).on('all', (event, path) => {
  console.log(event == "add" ? "watching:" : event + ":", path);

  if (event === "add" && pArgs.includes("--draw-on-add")) {
    renderUml(path);
  } else if (event === "change") {
    renderUml(path);
  }
});

const { spawn } = require('child_process');
function renderUml(path) {
  console.log(" > draw:", path);
  spawn('java', ['-jar', '-Djava.awt.headless=true', '/app/plantuml.jar', ...pArgs, path], {stdio: 'inherit'});
}