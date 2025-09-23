import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import VendorSelector from "../components/VendorSelector";
import VendorRankingTable from "../components/VendorRankingTable";
import { useVendorApi } from "../../domain/api/Vendor.api";
import LoaderRow from "../components/LoaderRow";

const VendorRanking: React.FC = () => {
    const { vendors, fetchVendors } = useVendorApi();

    const [selectedVendorId, setSelectedVendorId] = useState<string>(vendors.length > 0 ? vendors[0].id : '');
    const [isLoading, setIsLoading] = useState<boolean>(vendors.length > 0);

    const selectedVendor = vendors.find(vendor => vendor.id === selectedVendorId) || vendors[0];

    const handleVendorChange = (vendorId: string) => {
        setSelectedVendorId(vendorId);
    };

    useEffect(() => {
        const fetchVendorsData = async () => {
            try {
                await fetchVendors();
            } finally {
                setSelectedVendorId(vendors[0].id)
                setIsLoading(false);
            }
        }

        fetchVendorsData();
    }, []);

    return (
        <div className="px-4 py-8">
            {isLoading || selectedVendor === undefined ?
                <div className="flex justify-center pt-12">
                    <LoaderRow text="loading vendor info..." />
                </div>
                :
                <>
                    <div className="flex justify-between items-center mb-6">
                        <Link
                            to={`/vendor/${selectedVendor.id}`}
                            className="text-3xl md:text-4xl font-bold hover:!text-blue-600 hover:!underline"
                        >
                            {selectedVendor.vendor}
                        </Link>

                        <VendorSelector
                            vendors={vendors}
                            selectedVendorId={selectedVendorId}
                            onVendorChange={handleVendorChange}
                        />
                    </div>

                    <VendorRankingTable
                        antennas={selectedVendor.antennas}
                        allVendors={vendors}
                    />
                </>
            }
        </div>
    );
};

export default VendorRanking;
