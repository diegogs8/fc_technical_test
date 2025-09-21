import React from 'react';
import { Antenna } from '../../domain/model/Antenna.model';

interface AntennaRowProps {
  antenna: Antenna;
  index: number;
}

const AntennaRow: React.FC<AntennaRowProps> = ({ antenna, index }) => {
  return (
    <tr className="bg-white hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-lg font-bold text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {antenna.technology}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {antenna.speedMbps}
      </td>
    </tr>
  );
};

export default AntennaRow;

