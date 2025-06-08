import { editor } from "monaco-editor";
import { useEffect, useRef } from "react";

type TODO = any;

export const useMonacoEditorActions = (contextValue: any) => {
    // Create refs to hold the current state values
    const codesRef = useRef(contextValue.codes);
    const selectedFileRef = useRef(contextValue.selectedFile);

    // Update refs whenever the props change
    useEffect(() => {
        codesRef.current = contextValue.codes;
    }, [contextValue.codes]);

    useEffect(() => {
        selectedFileRef.current = contextValue.selectedFile;
    }, [contextValue.selectedFile]);

    const editorConfig: editor.IStandaloneEditorConstructionOptions = {
        unusualLineTerminators: 'off',
        wordWrap: 'on',
        scrollbar: {
            horizontalHasArrows: true
        },
        fontSize: contextValue.fontSize || 14,
        readOnly: contextValue.isReadOnly,
        minimap: { enabled: false }
    }

    const handleEditorWillMount = async (monaco: TODO) => {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2016,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            typeRoots: ["node_modules/@types"],
            jsx: monaco.languages.typescript.JsxEmit.React,
            jsxFactory: 'JSXAlone.createElement',
        });

        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
        });
    }

    const handleEditorDidMount = (editor: TODO, monaco: TODO) => {
        editor.onMouseDown((event: any) => {
            const { event: mouseEvent, target } = event;

            // Check if Cmd (metaKey) on Mac or Ctrl (ctrlKey) on Windows is pressed
            if (mouseEvent.metaKey || mouseEvent.ctrlKey) {
                // Get the position of the mouse click
                const position = target.position;

                if (position) {
                    // Get the word at the position
                    const word = editor.getModel().getWordAtPosition(position);

                    if (word) {
                        console.log('Word clicked with Cmd/Ctrl:', word.word);
                        const keys = Object.keys(codesRef.current);
                        console.log('selectedFile', selectedFileRef.current);

                        const matchingKeys = keys.filter(key => key.includes(word.word));

                        if (matchingKeys.length > 0) {
                            const selectedKey = matchingKeys[0];
                            contextValue.setSelectedFile(selectedKey);
                        }
                    }
                }
            }
        });
    };

    const handleEditorChange = (changedCode: string | undefined) => {
        contextValue.setCodes((prevCodes: Record<string, string>) => {
            return { ...prevCodes, [contextValue.selectedFile]: changedCode || '' } as Record<string, string>;
        });
    }

    const handleBlur = async () => {
        // Basic formatting - in a real implementation you might want to add prettier
        if (!contextValue.isReadOnly) {
            // Simple code formatting could go here
        }
    };

    return {
        editorConfig,
        handleEditorDidMount,
        handleEditorWillMount,
        handleEditorChange,
        handleBlur
    }
}