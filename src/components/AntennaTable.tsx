import React from 'react';
import { Antenna } from '../../domain/model/Antenna.model';
import AntennaRow from './AntennaRow';
import LoaderRow from './LoaderRow';

interface AntennaTableProps {
  antennas: Antenna[];
  isLoading?: boolean;
}

const AntennaTable: React.FC<AntennaTableProps> = ({ antennas, isLoading = false }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Technology
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Speed
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <LoaderRow text="Loading antennas..." />
          ) : antennas.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center">
                <p className="text-gray-600 text-lg">No antennas available</p>
              </td>
            </tr>
          ) : (
            antennas.map((antenna, index) => (
              <AntennaRow
                key={`${antenna.technology}-${index}`}
                antenna={antenna}
                index={index}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AntennaTable;

