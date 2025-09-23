import React from 'react';
import { Antenna } from '../../domain/model/Antenna.model';
import { Vendor } from '../../domain/model/Vendor.model';
import VendorRankingRow from './VendorRankingRow';
import { calculateGlobalRanking } from '../../domain/api/Vendor.api';

interface VendorRankingTableProps {
  antennas: Antenna[];
  allVendors: Vendor[];
}

const VendorRankingTable: React.FC<VendorRankingTableProps> = ({
  antennas,
  allVendors,
}) => {
  if (antennas.length === 0) {
    return (
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Technology
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Speed
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Ranking
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">
                No antennas available for this vendor.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Technology
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Speed
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Ranking
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {antennas.map((antenna, index) => {
            const globalRanking = calculateGlobalRanking(antenna, allVendors);
            return (
              <VendorRankingRow
                key={`${antenna.technology}-${index}`}
                antenna={antenna}
                ranking={globalRanking}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRankingTable;
