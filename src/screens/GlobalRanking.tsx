import React, { useEffect, useState } from "react";
import { useVendorApi } from "../../domain/api/Vendor.api";
import GlobalRankingRow from "../components/GlobalRankingRow";
import { useSelector } from "react-redux";
import { selectVendorsByAvgSpeed } from "../../domain/store/Vendor.store";
import LoaderRow from "../components/LoaderRow";

const GlobalRanking: React.FC = () => {
    const { vendors, fetchVendors } = useVendorApi();
    const sortedVendors = useSelector(selectVendorsByAvgSpeed);
    const [isLoading, setIsLoading] = useState<boolean>(vendors.length > 0)

    useEffect(() => {
        const fetchVendorsData = async () => {
            try {
                await fetchVendors();
            } finally {
                setIsLoading(false);
            }
        }

        fetchVendorsData();
    }, []);

  return (
      <div className="px-4 py-8 ">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Vendors Global Ranking
          </h1>
          
          <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                              Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                              Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                              Average Speed
                          </th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      {isLoading ? (
                          <LoaderRow text="Loading vendors..."/>
                      ) : (
                          sortedVendors.map((vendor, index) => (
                              <GlobalRankingRow
                                  key={vendor.id}
                                  vendor={vendor }
                                  position={index + 1}
                              />
                          ))
                      )}
                  </tbody>
              </table>
          </div>
      </div>
  );
};

export default GlobalRanking;
