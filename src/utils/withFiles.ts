// Simple withFiles implementation for react-runner
// This follows the same pattern as the working implementation you provided
export function withFiles(baseScope: any, files: Record<string, string>) {
  const scope = { ...baseScope };

  // Process each file and add to import scope exactly like your working version
  Object.entries(files).forEach(([fileName, content]: [string, string]) => {
    try {
      // Clean filename to get module name (remove ./ prefix and extension)
      const moduleName = fileName.replace('./', '').replace(/\.(tsx?|jsx?)$/, '');
      
      // Check if file has default export
      const hasDefaultExport = content.match(/export\s+default\s+/);
      
      if (hasDefaultExport) {
        // Initialize import object if needed
        if (!scope.import) {
          scope.import = {};
        }
        
        // Add the module content - react-runner will handle the evaluation
        scope.import[moduleName] = content;
      }
    } catch (error) {
      console.warn(`Failed to process file ${fileName}:`, error);
    }
  });

  return scope;
} 