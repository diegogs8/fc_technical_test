import React from 'react';
import { Link } from 'react-router';
import { Vendor } from '../../domain/model/Vendor.model';

interface GlobalRankingRowProps {
  vendor: Vendor;
  position: number;
  speed: number;
}

const GlobalRankingRow: React.FC<GlobalRankingRowProps> = ({
  vendor,
  position,
  speed,
}) => {
  return (
    <tr className="bg-white hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-lg font-bold text-gray-900">
        {position}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <Link 
          to={`/vendor/${vendor.id}`}
          className="text-blue-600 hover:!text-blue-500 hover:!underline transition-colors duration-200"
        >
          {vendor.vendor}
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {speed.toFixed(2)} Mbps
      </td>
    </tr>
  );
};

export default GlobalRankingRow;
