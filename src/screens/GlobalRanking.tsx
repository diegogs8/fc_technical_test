import React, { useEffect } from "react";
import { useVendorApi } from "../../domain/api/Vendor.api"

const GlobalRanking: React.FC = () => {
    const { vendors, fetchVendors } = useVendorApi()

    useEffect(() => {
        fetchVendors()
    }, []);

  return (
      <div className="flex items-center justify-center bg-gray-100">
          <h1 className="text-4xl font-bold text-blue-600">
              Global Ranking {vendors.length }
          </h1>
          
      </div>
  );
};

export default GlobalRanking;
