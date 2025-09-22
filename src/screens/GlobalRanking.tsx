import React, { useEffect, useState } from "react";
import { useVendorApi } from "../../domain/api/Vendor.api";
import GlobalRankingRow from "../components/GlobalRankingRow";
import LoaderRow from "../components/LoaderRow";
import TechnologyTabs from "../components/TechnologyTabs";
import { TechnologyType } from "../../domain/model/Antenna.model";

const GlobalRanking: React.FC = () => {
    const { vendors, fetchVendors, getVendorsByTechnologyOrderedBySpeed, getVendorSpeedForTechnology } = useVendorApi();
    const [isLoading, setIsLoading] = useState<boolean>(vendors.length > 0);
    const [activeTab, setActiveTab] = useState<TechnologyType>(TechnologyType.G2);

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

    const filteredVendors = getVendorsByTechnologyOrderedBySpeed(activeTab);

    return (
        <div className="px-4 py-8 ">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
                Vendors Global Ranking
            </h1>

            <TechnologyTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                Ranking
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
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center">
                                    <LoaderRow text="Loading vendors..." />
                                </td>
                            </tr>
                        ) : (
                            filteredVendors.map((vendor, index) => (
                                <GlobalRankingRow
                                    key={vendor.id}
                                    vendor={vendor}
                                    position={index + 1}
                                    speed={getVendorSpeedForTechnology(vendor.id, activeTab)}
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
