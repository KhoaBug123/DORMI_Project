const fs = require('fs');

function replaceFileContent(path, replacements) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf-8');
    for (const { from, to } of replacements) {
        content = content.replace(from, to);
    }
    fs.writeFileSync(path, content, 'utf-8');
}

// 1. ProtectedRoute.tsx
replaceFileContent('src/components/auth/ProtectedRoute.tsx', [
    { from: "import { UserRole }", to: "import type { UserRole }" },
    { from: "import { UserRole,", to: "import type { UserRole } from '../../store/useAuthStore';\nimport {" }
]);

// 2. Admin Dashboard
replaceFileContent('src/pages/Admin/Dashboard.tsx', [
    { from: 'mockAdminDashboardStats', to: 'mockAdminStats' }
]);

// 3. Admin KYCApprovals
replaceFileContent('src/pages/Admin/KYCApprovals.tsx', [
    { from: 'XCircle, ', to: '' },
    { from: ', XCircle', to: '' }
]);

// 4. auth/Login.tsx
replaceFileContent('src/pages/auth/Login.tsx', [
    { from: "../../../store/useAuthStore", to: "../../store/useAuthStore" }
]);

// 5. unused error in Login
// Let's just remove the warning by logging it, or removing the destructuring, but simpler to just replace `error,` with `` or `// eslint-disable-next-line` or since it's TS, remove it.
let loginContent = fs.readFileSync('src/pages/auth/Login.tsx', 'utf-8');
loginContent = loginContent.replace(/error,\s*/, '');
loginContent = loginContent.replace(/\s*error\s*/, ''); // if it's the only one
fs.writeFileSync('src/pages/auth/Login.tsx', loginContent, 'utf-8');

// 6. auth/Register.tsx
replaceFileContent('src/pages/auth/Register.tsx', [
    { from: "../../../store/useAuthStore", to: "../../store/useAuthStore" },
    { from: "import { useAuthStore }", to: "// import { useAuthStore }" }
]);

// 7. Tenant Chat
let chatContent = fs.readFileSync('src/pages/Tenant/Chat.tsx', 'utf-8');
chatContent = chatContent.replace('import { MessageSquare, useState } from \'react\';', 'import { useState } from \'react\';');
chatContent = chatContent.replace('import { MessageSquare, useEffect', 'import { useEffect');
// now inject correctly
if (!chatContent.includes('MessageSquare') && chatContent.includes('lucide-react')) {
    chatContent = chatContent.replace(/import\s+\{([^}]+)\}\s+from\s+'lucide-react';/, "import { MessageSquare, $1 } from 'lucide-react';");
}
fs.writeFileSync('src/pages/Tenant/Chat.tsx', chatContent, 'utf-8');

console.log("Fixed files phase 2.");
