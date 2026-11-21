import React, { useRef, useState } from 'react';
import {
  Home,
  ShieldAlert,
  Compass,
  Stethoscope,
  FolderOpen,
  UserCircle2,
  Moon,
  Sun,
  Flame,
  Radio,
} from 'lucide-react';
import GlassSurface from '@/components/ui/react-bits/GlassSurface';
import { store, useAppStore } from '@/services/store';

interface LiquidNavigationDockProps {
  currentScreen?: string;
  onNavigate?: (screen: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

interface NavItem {
  id: string;
  targetScreen: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  activeScreens: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    targetScreen: 'S1',
    label: 'Home',
    icon: Home,
    activeScreens: ['S1'],
  },
  {
    id: 'sos',
    targetScreen: 'S2',
    label: 'SOS Emergency',
    icon: ShieldAlert,
    badge: 'LIVE',
    activeScreens: ['S2', 'S3', 'S4', 'S5'],
  },
  {
    id: 'command',
    targetScreen: 'S10',
    label: 'Dr+ Command Centre',
    icon: Compass,
    badge: '6 Calls',
    activeScreens: ['S10', 'S8', 'S9'],
  },
  {
    id: 'doctor',
    targetScreen: 'S14',
    label: 'Doctor Board',
    icon: Stethoscope,
    activeScreens: ['S14', 'S15', 'S17', 'S18'],
  },
  {
    id: 'records',
    targetScreen: 'S16',
    label: '3D Patient Dossier',
    icon: FolderOpen,
    activeScreens: ['S16'],
  },
  {
    id: 'staff',
    targetScreen: 'S6',
    label: 'Staff Portal',
    icon: UserCircle2,
    activeScreens: ['S6', 'S7', 'S20', 'S21', 'S24'],
  },
];

export const LiquidNavigationDock: React.FC<LiquidNavigationDockProps> = ({
  currentScreen: propScreen,
  onNavigate: propNavigate,
  isDark,
  onToggleTheme,
}) => {
  const { currentScreenId } = useAppStore();
  const activeScreen = propScreen || currentScreenId;

  const handleNavigate = (screen: string) => {
    if (propNavigate) {
      propNavigate(screen);
    } else {
      store.setScreen(screen);
    }
  };

  return (
    <aside
      aria-label="Liquid Glass Bottom Navigation"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] pointer-events-auto select-none"
    >
      <GlassSurface
        width="auto"
        height={64}
        borderRadius={32}
        borderWidth={0.04}
        blur={8}
        displace={0.12}
        distortionScale={-25}
        backgroundOpacity={0.88}
        brightness={50}
        saturation={1.05}
        className="px-3 md:px-5 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-white/80 dark:border-white/20 bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl"
      >
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Mivo Radiance Brand Orb Pill */}
          <button
            type="button"
            onClick={() => handleNavigate('S1')}
            title="GoldenHour Home"
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-[1.5px] shadow-lg shadow-rose-500/30 shrink-0 hover:scale-105 transition-transform"
          >
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white font-black text-[11px] tracking-tight">
              GH
            </div>
          </button>

          {/* Nav Destinations */}
          <div className="flex items-center gap-1 md:gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.activeScreens.includes(activeScreen);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.targetScreen)}
                  title={item.label}
                  className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? (isDark ? 'text-rose-600' : 'text-rose-400') : 'text-slate-500 dark:text-slate-300'
                  }`} />

                  {/* Text Label on active or hover */}
                  <span className={`text-xs tracking-tight ${
                    isActive ? 'inline-block' : 'hidden md:group-hover:inline-block font-semibold'
                  }`}>
                    {item.label.split(' ')[0]}
                  </span>

                  {/* Active glowing indicator pill */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  )}

                  {/* Live Badge */}
                  {item.badge && !isActive && (
                    <span className="hidden lg:inline-block px-1.5 py-0.2 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono text-[9px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Vertical Glass Separator */}
          <div className="w-px h-6 bg-slate-300/60 dark:bg-white/20 mx-1 shrink-0" />

          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
              className="w-9 h-9 rounded-full bg-white/40 dark:bg-slate-800/60 hover:bg-white/70 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shrink-0 shadow-xs"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}
        </div>
      </GlassSurface>
    </aside>
  );
};

export default LiquidNavigationDock;
