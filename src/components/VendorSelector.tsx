import React from 'react';
import { Vendor } from '../../domain/model/Vendor.model';

interface VendorSelectorProps {
  vendors: Vendor[];
  selectedVendorId: string;
  onVendorChange: (vendorId: string) => void;
}

const VendorSelector: React.FC<VendorSelectorProps> = ({
  vendors,
  selectedVendorId,
  onVendorChange,
}) => {
  return (
    <div className="w-64">
      <label htmlFor="vendor-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Vendor
      </label>
      <select
        id="vendor-select"
        value={selectedVendorId}
        onChange={(e) => onVendorChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
      >
        {vendors.map((vendor) => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.vendor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VendorSelector;
