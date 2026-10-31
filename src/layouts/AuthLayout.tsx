import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-darkBlue-900 flex flex-col items-center justify-center p-4 relative overflow-hidden text-white selection:bg-skyBlue-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-skyBlue-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded bg-skyBlue-500 flex items-center justify-center font-bold text-darkBlue-900">
          AI
        </div>
        <span className="text-xl font-bold tracking-tight">GeoDamage AI</span>
      </Link>
      
      <div className="z-10 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}