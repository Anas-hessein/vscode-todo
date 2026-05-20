import * as vscode from 'vscode';

// ensure console is available when lib typings don't include it
declare const console: {
	log: (...args: any[]) => void;
	warn: (...args: any[]) => void;
	error: (...args: any[]) => void;
};
import { HalloWorldPanel } from './HalloWorldPanel';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
  	context.subscriptions.push(
   		vscode.window.registerWebviewViewProvider(
    		"vs-todo-sidebar",
    		sidebarProvider
    )
  );

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

		context.subscriptions.push(vscode.commands.registerCommand('vs-todo.refresh', () => {
		// HalloWorldPanel.kill();
		// HalloWorldPanel.createOrShow(context.extensionUri); 
		// setTimeout(() => {
		// 	vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
		// }, 500);
		
	}));

}

export function deactivate() { }
