import { memo, useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Search } from 'lucide-react';
import { setSearchJobByText } from '@/redux/jobSlice';
import AdminJobsTable from './AdminJobsTable';
import UseGetAllAdminJobs from '@/hooks/UseGetAllAdminJobs';

const AdminJobs = () => {
    UseGetAllAdminJobs();

    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allAdminJobs = [] } = useSelector(store => store.job);

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 mt-8">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Jobs</h1>
                        <p className="text-sm text-gray-500">
                            Manage and track your posted jobs
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        <Plus size={16} />
                        New Job
                    </Button>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                        />

                        <Input
                            placeholder="Search jobs..."
                            className="pl-9 h-11"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="text-sm text-gray-500">
                        Total Jobs:
                        <span className="font-semibold text-black ml-1">
                            {allAdminJobs.length}
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                    <AdminJobsTable />
                </div>

            </div>
        </div>
    );
};

export default memo(AdminJobs);