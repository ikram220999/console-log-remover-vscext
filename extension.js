// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const readline = require('readline');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "console-log-remover" is now active!');



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('console-log-remover.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
	let editor = vscode.window.activeTextEditor;
if (editor) {
    let document = editor.document;
    console.log(document.fileName);
	
	const file = readline.createInterface({
		input: fs.createReadStream(document.fileName),
		output: process.stdout,
		terminal: false
	});

	file.on('line', (line) => {

		if(line == 'ikram'){
			console.log("line by line ", line);
		}
		
	});
}
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from console log remover!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
