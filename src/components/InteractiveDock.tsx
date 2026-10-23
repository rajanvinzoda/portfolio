import React from 'react';
import { PortfolioData } from '../data/portfolioData.ts';
import { AnimatedDock, DockItemData } from '@/components/ui/animated-dock';
import { Github, Linkedin, Mail, FolderGit2, Code2 } from 'lucide-react';

interface InteractiveDockProps {
  portfolioData: PortfolioData;
}

export const InteractiveDock: React.FC<InteractiveDockProps> = ({ portfolioData }) => {
  // Clean animated dock with key social and navigation links
  const dockItems: DockItemData[] = [
    {
      title: 'GitHub Profile',
      link: `https://github.com/${portfolioData.githubUser}`,
      target: '_blank',
      Icon: <Github size={20} className="text-white" />,
    },
    {
      title: 'LinkedIn Network',
      link: 'https://www.linkedin.com/in/rajan-maheshwari-6372582a7',
      target: '_blank',
      Icon: <Linkedin size={20} className="text-white" />,
    },
    {
      title: 'Selected Work',
      link: '#work',
      Icon: <FolderGit2 size={20} className="text-white" />,
    },
    {
      title: 'Tech Stack & Skills',
      link: '#stack',
      Icon: <Code2 size={20} className="text-white" />,
    },
    {
      title: 'Send Email',
      link: `mailto:${portfolioData.email}`,
      Icon: <Mail size={20} className="text-white" />,
    },
  ];

  return (
    <div className="relative mx-auto my-6 flex flex-col items-center w-full z-20">
      <div className="relative group inline-flex flex-col items-center">
        <AnimatedDock
          items={dockItems}
          className="bg-[#110f1c]/92 border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] h-[72px] px-6"
        />
      </div>
    </div>
  );
};
