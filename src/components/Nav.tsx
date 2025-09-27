import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-block px-2 py-1 text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'} after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-metro-cyan after:transition-all hover:after:w-full`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-foreground">KMRL Mission Control</Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/ai-processing" className={linkClass}>AI Core</NavLink>
          <AuthButton />
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen((o) => !o)} aria-label="Open menu" title="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/80">
          <div className="container mx-auto px-6 py-2 flex flex-col gap-2">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
            <NavLink to="/ai-processing" className={linkClass} onClick={() => setOpen(false)}>AI Core</NavLink>
            <AuthButton mobile onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const AuthButton = ({ mobile, onClick }: { mobile?: boolean; onClick?: () => void }) => {
  const { session, signOut } = useAuth();
  const isDev = typeof localStorage !== 'undefined' && !!localStorage.getItem('dev_session');
  if (session) {
    return (
      <div className={`flex items-center gap-3 ${mobile ? 'py-2' : ''}`}>
        {isDev && <span className="text-[10px] uppercase tracking-wide text-orange-400">Dev Session</span>}
        <button onClick={async () => { await signOut(); onClick?.(); window.location.href = "/"; }} className={`text-sm ${mobile ? 'text-left' : ''}`}>Logout</button>
      </div>
    );
  }
  return (
    <Link to="/login" onClick={onClick} className={`text-sm ${mobile ? 'py-2' : ''}`}>Login</Link>
  );
};

export default Nav;


