import React from 'react';
import {
  Shield,
  HeartPulse,
  Landmark,
  GraduationCap,
  ShieldAlert,
  Scale,
  Train,
  Cpu,
  Building2,
  Home,
  Globe,
  Trees,
  HelpCircle,
  PoundSterling,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Receipt,
  PieChart,
  Coins,
  ArrowRight,
  Sliders,
  Calendar,
  Layers,
  Info,
  CheckCircle2,
  LucideProps
} from 'lucide-react';

interface IconHelperProps extends LucideProps {
  name: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Shield': return <Shield {...props} />;
    case 'HeartPulse': return <HeartPulse {...props} />;
    case 'Landmark': return <Landmark {...props} />;
    case 'GraduationCap': return <GraduationCap {...props} />;
    case 'ShieldAlert': return <ShieldAlert {...props} />;
    case 'Scale': return <Scale {...props} />;
    case 'Train': return <Train {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Building2': return <Building2 {...props} />;
    case 'Home': return <Home {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Trees': return <Trees {...props} />;
    case 'HelpCircle': return <HelpCircle {...props} />;
    case 'PoundSterling': return <PoundSterling {...props} />;
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'TrendingDown': return <TrendingDown {...props} />;
    case 'AlertTriangle': return <AlertTriangle {...props} />;
    case 'Receipt': return <Receipt {...props} />;
    case 'PieChart': return <PieChart {...props} />;
    case 'Coins': return <Coins {...props} />;
    case 'ArrowRight': return <ArrowRight {...props} />;
    case 'Sliders': return <Sliders {...props} />;
    case 'Calendar': return <Calendar {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Info': return <Info {...props} />;
    case 'CheckCircle2': return <CheckCircle2 {...props} />;
    default: return <Coins {...props} />;
  }
};

