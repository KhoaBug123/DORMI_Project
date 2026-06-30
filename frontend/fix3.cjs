const fs = require('fs');

let loginContent = fs.readFileSync('src/pages/auth/Login.tsx', 'utf-8');
loginContent = loginContent.replace("toast.('", "toast.error('");
fs.writeFileSync('src/pages/auth/Login.tsx', loginContent, 'utf-8');

console.log("Fixed Login.tsx");
