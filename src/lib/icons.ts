import {
  Wrench,
  LineChart,
  Building2,
  FolderKanban,
  Briefcase,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';

interface IconConfig {
  type: {
    [key: string]: {
      icon: LucideIcon;
      label: string;
      description: string;
    };
  };
  group: {
    [key: string]: {
      icon: LucideIcon;
      label: string;
    };
  };
}

export const icons: IconConfig = {
  type: {
    engineer: {
      icon: Wrench,
      label: 'Engineer',
      description: 'Automotive engineering projects and technical work',
    },
    data: {
      icon: LineChart,
      label: 'Data',
      description: 'Vehicle data analysis and performance metrics',
    },
    business: {
      icon: Building2,
      label: 'Business',
      description: 'Automotive industry analysis and market research',
    },
    all: {
      icon: LayoutGrid,
      label: 'All Projects & Experiences',
      description: 'View all automotive projects and experiences',
    },
  },
  group: {
    project: {
      icon: FolderKanban,
      label: 'Projects',
    },
    experience: {
      icon: Briefcase,
      label: 'Experiences',
    },
  },
};
