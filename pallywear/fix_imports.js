const fs = require('fs');
const path = require('path');

if (fs.existsSync('src/assets/qiuck-add.js')) {
  fs.renameSync('src/assets/qiuck-add.js', 'src/assets/quick-add.css');
}

const files = fs.readdirSync('src/assets')
  .filter(f => f.endsWith('.css') || f.endsWith('.js'))
  .sort();

let imports = `import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport './index.css';\n`;

files.forEach(f => {
  imports += `import './assets/${f}';\n`;
});

imports += `\nimport App from './App.jsx';\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n);\n`;

fs.writeFileSync('src/main.jsx', imports);
console.log("Fixed main.jsx");
