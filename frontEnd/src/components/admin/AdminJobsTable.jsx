import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs = [], searchJobByText = "" } = useSelector(
        store => store.job
    );

    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }

            const title = job?.title?.toLowerCase() || "";
            const companyName = job?.company?.name?.toLowerCase() || "";
            const searchText = searchJobByText.toLowerCase();

            return (
                title.includes(searchText) ||
                companyName.includes(searchText)
            );
        });

        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent posted jobs
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-10 text-gray-500"
                            >
                                {searchJobByText
                                    ? `No job found for "${searchJobByText}"`
                                    : "You haven't posted any job yet."}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>
                                    {job?.company?.name || "N/A"}
                                </TableCell>

                                <TableCell>
                                    {job?.title || "N/A"}
                                </TableCell>

                                <TableCell>
                                    {job?.createdAt
                                        ? job.createdAt.split("T")[0]
                                        : "N/A"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
    <PopoverTrigger asChild>
        <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 outline-none"
        >
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
    </PopoverTrigger>

    <PopoverContent
        align="end"
        className="w-44 p-2 rounded-xl shadow-lg border border-gray-100 bg-white"
    >
        {/* Edit */}
        <div
            onClick={() => navigate(`/admin/jobs/${job._id}`)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg 
                       text-sm font-medium text-gray-700 
                       hover:bg-gray-100 hover:text-black
                       cursor-pointer transition-all duration-200"
        >
            <Edit2 className="w-4 h-4 text-gray-500" />
            <span>Edit Job</span>
        </div>

        {/* Applicants */}
        <div
            className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg
                       text-sm font-medium text-gray-700
                       hover:bg-gray-100 hover:text-black
                       cursor-pointer transition-all duration-200"
                       onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)}
        >
            <Eye className="w-4 h-4 text-gray-500" />
            <span>Applicants</span>
        </div>
    </PopoverContent>
</Popover> 
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;