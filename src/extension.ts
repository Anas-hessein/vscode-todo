import * as vscode from 'vscode';

// ensure console is available when lib typings don't include it
declare const console: {
	log: (...args: any[]) => void;
	warn: (...args: any[]) => void;
	error: (...args: any[]) => void;
};
import { HalloWorldPanel } from './HalloWorldPanel';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vs-todo" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('vs-todo.helloWorld', () => {
		HalloWorldPanel.createOrShow(context.extensionUri);
	}));

	context.subscriptions.push(vscode.commands.registerCommand("vs-todo.askQuestion", async () => {
		const answer = await vscode.window.showInformationMessage("How was your day?", "good", "bad");

		if (answer === "bad") {
			vscode.window.showInformationMessage("Sorry to hear that. hope you marry");
		} else {
			console.log(answer)
		}
	}));

}

export function deactivate() { }
