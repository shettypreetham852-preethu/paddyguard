import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, Moon, Menu, X, Sprout, Activity, 
  Stethoscope, TrendingUp, BookOpen, LayoutDashboard, Info 
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: Sprout },
  { name: 'Detect Disease', path: '/detect', icon: Activity, highlight: true },
  { name: 'Treatment', path: '/treatment', icon: Stethoscope },
  { name: 'Yield Prediction', path: '/yield', icon: TrendingUp },
  { name: 'Disease Library', path: '/library', icon: BookOpen },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'About', path: '/about', icon: Info },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <nav className="glass-panel rounded-2xl px-4 py-3 shadow-glass dark:shadow-glass-dark border border-forest-100/60 dark:border-forest-900/40 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-forest-700 via-forest-600 to-leaf-500 shadow-glow-green text-white group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-yellow-300 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-forest-900 via-forest-700 to-emerald-600 dark:from-emerald-400 dark:via-leaf-300 dark:to-yellow-300 bg-clip-text text-transparent">
                  PaddyGuard
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-paddy-400/20 text-yellow-700 dark:text-yellow-300 border border-paddy-400/30 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block tracking-wide font-medium">
                Crop Health & Yield Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    relative px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-200
                    ${isActive 
                      ? 'text-forest-800 dark:text-emerald-300 bg-forest-500/10 dark:bg-emerald-500/15 font-semibold shadow-sm' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-forest-700 dark:hover:text-emerald-300 hover:bg-forest-50/60 dark:hover:bg-forest-900/30'}
                    ${link.highlight && !isActive ? 'text-forest-700 dark:text-emerald-400' : ''}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-forest-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-500 to-yellow-400 rounded-full"></span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Quick Action CTA */}
            <Link
              to="/detect"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white shadow-sm hover:shadow-glow-green transition-all duration-200 active:scale-95"
            >
              <Activity className="w-3.5 h-3.5 text-yellow-300" />
              <span>Scan Crop</span>
            </Link>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors duration-200 border border-slate-200/50 dark:border-slate-700/50"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4">
          <div className="glass-panel rounded-2xl p-3 shadow-xl border border-forest-100 dark:border-forest-900/60 flex flex-col gap-1">
            {NAV_LINKS.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${isActive 
                      ? 'text-forest-800 dark:text-emerald-300 bg-forest-500/15 dark:bg-emerald-500/20 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-forest-50 dark:hover:bg-forest-900/40'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-slate-800">
              <Link
                to="/detect"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-forest-700 text-white font-medium text-sm shadow"
              >
                <Activity className="w-4 h-4 text-yellow-300" />
                <span>Launch Disease Scanner</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
