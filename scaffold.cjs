const fs = require('fs');

const pages = ["Landing", "Login", "Register", "Dashboard", "Upload", "Processing", "PredictionResult", "Analytics", "Reports", "History", "Profile", "AdminDashboard"];

pages.forEach(page => {
  const content = `export default function ${page}() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">${page} Page</h1>
    </div>
  );
}`;
  fs.writeFileSync(`src/pages/${page}.tsx`, content);
});

const layouts = ["MainLayout", "AuthLayout"];

layouts.forEach(layout => {
  const content = `import { Outlet } from 'react-router-dom';

export default function ${layout}() {
  return (
    <div className="min-h-screen bg-darkBlue-900">
      <Outlet />
    </div>
  );
}`;
  fs.writeFileSync(`src/layouts/${layout}.tsx`, content);
});
