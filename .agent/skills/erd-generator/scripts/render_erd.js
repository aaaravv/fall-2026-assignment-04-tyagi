import {execSync} from 'node:child_process';
import path from 'node:path';

let inputFile = path.join('docs', 'architecture', 'schema.mmd');
let outputFile = path.join('docs', 'architecture', 'erd.svg');

try{ 
   execSync(`npx mmdc -i ${inputFile} -o ${outputFile}`);
   console.log("SUCCESS");
   process.exit(0);
}catch(error) {
     console.log(`SYNTAX_ERROR: ${error.stderr}`);
     process.exit(1);
}