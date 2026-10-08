import { memo, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [companyName, setCompanyName] = useState("");

    const registerNewCompany = async () => {
        try {
            if (!companyName.trim()) {
                return toast.error("Company name required");
            }

            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }

        } catch (err) {
            console.log("ERROR 👉", err.response?.data);
            toast.error(err.response?.data?.message || "Failed to create company");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-2xl mx-auto mt-12 px-4">

                {/* Card */}
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold">Create Company</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Enter your company name to get started
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">

                        <div>
                            <Label className="text-sm font-medium">
                                Company Name
                            </Label>
                            <Input
                                type="text"
                                placeholder="e.g. Google, Microsoft..."
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="mt-2 h-11"
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-8">

                        <Button
                            variant="outline"
                            className="px-5 py-2 rounded-lg"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                            onClick={registerNewCompany}
                        >
                            Create Company
                        </Button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default memo(CompanyCreate);