const fs = require('fs');

function replaceFileContent(path, replacements) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf-8');
    for (const { from, to } of replacements) {
        content = content.replace(from, to);
    }
    fs.writeFileSync(path, content, 'utf-8');
}

// 1. Forbidden.tsx
replaceFileContent('src/pages/error/Forbidden.tsx', [
    { from: "from '../../../store/useAuthStore'", to: "from '../../store/useAuthStore'" }
]);

// 2. Landlord Dashboard
replaceFileContent('src/pages/Landlord/Dashboard.tsx', [
    { from: 'mockLandlordDashboardStats.totalLeads', to: 'mockLandlordDashboardStats.savedByUsers' },
    { from: 'mockLandlordDashboardStats.upcomingAppointments', to: 'mockLandlordDashboardStats.pendingAppointments' },
    { from: 'mockLandlordDashboardStats.occupiedRooms', to: 'mockLandlordDashboardStats.activeRooms' }
]);

// 3. auth store
replaceFileContent('src/store/useAuthStore.ts', [
    { from: 'clearError: () => void;', to: 'clearError: () => void;\n  verifyLandlord: () => void;' },
    { from: 'clearError: () => set({ error: null })', to: "clearError: () => set({ error: null }),\n      verifyLandlord: () => set((state) => ({ user: state.user ? { ...state.user, kycStatus: 'verified' } : null }))" }
]);

// 4. Tenant Chat
replaceFileContent('src/pages/Tenant/Chat.tsx', [
    { from: "import { ", to: "import { MessageSquare, " } // just inject it, or if it has lucide-react import
]);
// Let's refine Tenant Chat import replacement:
let chatContent = fs.readFileSync('src/pages/Tenant/Chat.tsx', 'utf-8');
if (!chatContent.includes('MessageSquare')) {
    chatContent = chatContent.replace(/import\s+\{([^}]+)\}\s+from\s+'lucide-react';/, (match, p1) => {
        return `import { MessageSquare, ${p1} } from 'lucide-react';`;
    });
    fs.writeFileSync('src/pages/Tenant/Chat.tsx', chatContent, 'utf-8');
}

// 5. Unused imports
replaceFileContent('src/pages/Tenant/Dashboard.tsx', [
    { from: 'mockAppointments, ', to: '' }
]);
replaceFileContent('src/pages/Tenant/ExploreRooms.tsx', [
    { from: 'Star, ', to: '' },
    { from: ', Star', to: '' }
]);
replaceFileContent('src/pages/Tenant/RoommateMatcher.tsx', [
    { from: 'CheckCircle2, ', to: '' }
]);
replaceFileContent('src/store/useTenantStore.ts', [
    { from: 'mockRooms, ', to: '' }
]);

// 6. routes casing
replaceFileContent('src/routes/index.tsx', [
    { from: /\/pages\/tenant\//g, to: '/pages/Tenant/' },
    { from: /\/pages\/landlord\//g, to: '/pages/Landlord/' },
    { from: /\/pages\/admin\//g, to: '/pages/Admin/' }
]);

replaceFileContent('src/routes/AppRoutes.tsx', [
    { from: /\/pages\/tenant\//g, to: '/pages/Tenant/' },
    { from: /\/pages\/landlord\//g, to: '/pages/Landlord/' },
    { from: /\/pages\/admin\//g, to: '/pages/Admin/' }
]);

console.log("Fixed files.");
