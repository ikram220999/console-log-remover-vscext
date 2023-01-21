// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const readline = require("readline");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "console-log-remover" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let comment = vscode.commands.registerCommand(
    "console-log-remover.logcmt",
    function () {
      // The code you place here will be executed every time your command is executed
      let editor = vscode.window.activeTextEditor;

	  let total = 0;
      if (editor) {
        let document = editor.document;
        console.log(document.fileName);

        fs.readFile(document.fileName, "utf8", (err, data) => {
          if (err) throw err;

          var arr = [];

          let lines = data.split("\n");
          lines.map((line, idx) => {
            if (line.includes("console.log")) {
              let obj = {};
              obj["id"] = idx;
              obj["text"] = line;

              arr.push(obj);
            }
          });

		  console.log("lines.length", lines.length);
		  
          arr.map((arr) => {
			  return (lines[arr.id] = "//" + arr.text);
			});
			
			let newData = lines.join("\n");
			
			console.log(arr);
			total = arr.length;
			console.log("total", total);
          fs.writeFile(document.fileName, newData, (err) => {
            if (err) throw err;
            console.log("Text added successfully!");
			vscode.window.showInformationMessage(
				"Total " + total + " console.log() has been commented !"
			  );
          });
        });

		console.log("total 2" , total);
		// Display a message box to the user
		
      }
    }
  );

  let remove = vscode.commands.registerCommand(
    "console-log-remover.logrm",
    function () {
      // The code you place here will be executed every time your command is executed
      let editor = vscode.window.activeTextEditor;

	  let total = 0;
      if (editor) {
        let document = editor.document;
        console.log(document.fileName);

        fs.readFile(document.fileName, "utf8", (err, data) => {
          if (err) throw err;

          var arr = [];

          let lines = data.split("\n");
          lines.map((line, idx) => {
            if (line.includes("console.log")) {
              let obj = {};
              obj["id"] = idx;
              obj["text"] = line;

              arr.push(obj);
            }
          });

		  console.log("lines.length", lines.length);
		  
          arr.map((arr) => {
			  return (lines[arr.id] = " ");
			});
			
			let newData = lines.join("\n");
			
			console.log(arr);
			total = arr.length;
			console.log("total", total);
          fs.writeFile(document.fileName, newData, (err) => {
            if (err) throw err;
            console.log("Text added successfully!");
			vscode.window.showInformationMessage(
				"Total " + total + " console.log() has been removed !"
			  );
          });
        });

		console.log("total 2" , total);
		// Display a message box to the user
		
      }
    }
  );

  context.subscriptions.push(comment, remove);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
