import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color?: 'blue' | 'purple' | 'gold' | 'green';
}

const colorMap = {
  blue:   'text-tanzania-400 bg-tanzania-500/10 border-tanzania-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  gold:   'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  green:  'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

export function StatCard({ label, value, sub, icon: Icon, color = 'blue' }: StatCardProps) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <TrendingUp className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <p className="text-3xl font-headline font-bold text-white mb-1">
        {value}
      </p>
      <p className="text-sm font-medium text-slate-400">
        {label}
      </p>
      {sub && (
        <p className="text-xs mt-1 text-emerald-400">{sub}</p>
      )}
    </div>
  );
}
