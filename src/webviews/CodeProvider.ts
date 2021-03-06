import * as vscode from 'vscode';

export class CodeProvider implements vscode.CodeLensProvider {

    private codeLenses: vscode.CodeLens[] = [];
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor() {
    }

    public provideCodeLenses(document: vscode.TextDocument):  vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        
        this.codeLenses = [];
        if (document.getText().indexOf("import dev.galasa.Test;") != -1) {
            const text: string[] = document.getText().split(/\n/);
            for(let i = 0; i < text.length; i++) {
                if (text[i].trim() == "@Test") {
                    let textline = document.lineAt(i);
                    if (textline.range) {
                        this.codeLenses.push(new vscode.CodeLens(textline.range));
                        break;
                    }
                }
            }
        }
            
        return this.codeLenses;
    }

    public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
        codeLens.command = {
            title: "Debug Galasa Test",
            command: "galasa-test.debug"
        };
        return codeLens;
    }
    
}