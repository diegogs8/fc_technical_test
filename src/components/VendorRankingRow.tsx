import React from 'react';
import { Antenna } from '../../domain/model/Antenna.model';

interface VendorRankingRowProps {
  antenna: Antenna;
  ranking: number;
  index: number;
}

const VendorRankingRow: React.FC<VendorRankingRowProps> = ({
  antenna,
  ranking,
  index,
}) => {
  return (
    <tr className="bg-white hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {antenna.technology}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {antenna.speedMbps}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-gray-900">
        #{ranking}
      </td>
    </tr>
  );
};

export default VendorRankingRow;

