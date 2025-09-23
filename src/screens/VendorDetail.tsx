import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useVendorApi } from "../../domain/api/Vendor.api";
import { Vendor } from "../../domain/model/Vendor.model";
import AntennaTable from "../components/AntennaTable";
import LoaderRow from "../components/LoaderRow";

const VendorDetail: React.FC = () => {
    const { vendorId } = useParams<{ vendorId: string }>();
    const { vendors, fetchVendors, status } = useVendorApi();
    const [vendor, setVendor] = useState<Vendor | null>(null);

    useEffect(() => {
        fetchVendors();
    }, []);

    const vendorFromStore = useVendorApi().getVendorById(vendorId || '')

    useEffect(() => {
        if (vendorFromStore) setVendor(vendorFromStore)
    }, [vendorFromStore])

    const formatFoundationDate = (timestamp: number): string => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (status === 'loading' && vendors.length === 0) {
        return (
            <>
                <div className="px-4 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Vendor Detail</h1>
                </div>
                <div className="flex justify-center pt-12">
                    <LoaderRow text="loading vendor info..." />
                </div>
            </>
        );
    }

    if (status === 'failed') {
        return (
            <>
                <div className="px-4 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Vendor Detail</h1>
                </div>
                <div className="flex justify-center pt-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-red-600">Failed to load vendor.</div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => fetchVendors(true)}>Retry</button>
                    </div>
                </div>
            </>
        );
    }


    return (
        <div className="px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Vendor Detail</h1>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                        {vendor !== null &&
                            <img
                                src={vendor?.picture}
                                alt={`${vendor?.vendor} logo`}
                                className="w-full h-full rounded-lg object-cover"
                            />
                        }
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{vendor?.vendor}</h2>
                        {vendor !== null &&
                            <p className="text-lg text-gray-600">
                                Founded on {formatFoundationDate(vendor?.foundationDate)}
                            </p>
                        }
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Antennas</h3>
                {(vendor !== null && vendor?.antennas.length > 0) &&
                    <AntennaTable antennas={vendor.antennas} />
                }
            </div>
        </div>
    );
};

export default VendorDetail;
