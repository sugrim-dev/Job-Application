import { memo, useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import UseGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Search } from 'lucide-react';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    UseGetAllCompanies();

    const [input, setInput] = useState("");
    const { companies } = useSelector(store => store.company);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
    dispatch(setSearchCompanyByText(input));
}, [input, dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 mt-8">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Companies</h1>
                        <p className="text-sm text-gray-500">
                            Manage and track your registered companies
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        <Plus size={16} />
                        New Company
                    </Button>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                        />

                        <Input
                            placeholder="Search companies..."
                            className="pl-9 h-11"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="text-sm text-gray-500">
                        Total Companies:
                        <span className="font-semibold text-black ml-1">
                            {companies?.length || 0}
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                    <CompaniesTable />
                </div>

            </div>
        </div>
    );
};

export default memo(Companies);