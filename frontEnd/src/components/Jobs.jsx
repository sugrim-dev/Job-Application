import { memo, useEffect, useState } from 'react';
import Navbar from './Shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);

    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        if (!searchedQuery?.trim()) {
            setFilterJobs(allJobs || []);
            return;
        }

        const query = searchedQuery.toLowerCase().trim();

        const filteredJobs = (allJobs || []).filter((job) => {
            return (
                job?.title?.toLowerCase().includes(query) ||
                job?.description?.toLowerCase().includes(query) ||
                job?.location?.toLowerCase().includes(query)
            );
        });

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto mt-5 px-4">
                <div className="flex gap-5">

                    {/* Sidebar */}
                    <div className="w-[20%] ml-6">
                        <FilterCard />
                    </div>

                    {/* Jobs Section */}
                    <div className="flex-1">
                        {filterJobs.length === 0 ? (
                            <div className="flex items-center justify-center h-[60vh]">
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-gray-700">
                                        Job not found
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-2">
                                        Try searching with a different keyword.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filterJobs.map((job) => (
                                        <div key={job?._id}>
                                            <Job job={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default memo(Jobs);