import React from 'react';
import { TechnologyType } from '../../domain/model/Antenna.model';

interface TechnologyTabsProps {
  activeTab: TechnologyType ;
  onTabChange: (technology: TechnologyType) => void;
}

const TechnologyTabs: React.FC<TechnologyTabsProps> = ({ activeTab, onTabChange }) => {
  const technologies = [
    { key: TechnologyType.G2, label: '2G' },
    { key: TechnologyType.G3, label: '3G' },
    { key: TechnologyType.G4, label: '4G' },
    { key: TechnologyType.LTE, label: 'LTE' },
    { key: TechnologyType.G5, label: '5G' },
  ];

  return (
    <div className="mb-6">
      <div className="">
        <nav className="-mb-px flex space-x-8">
          {technologies.map((tech) => (
            <button
              key={tech.key}
              onClick={() => onTabChange(tech.key)}
              className={`py-2 px-1 font-medium text-sm !border-2 ${
                activeTab === tech.key
                  ? '!border-gray-500 !text-pink-600'
                  : 'border-transparent hover:!text-pink-600 hover:!border-gray-300'
              }`}
            >
              {tech.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TechnologyTabs;
