import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import UseGetAllJobs from '@/hooks/UseGetAllJobs';
import { ArrowRight, BriefcaseBusiness, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    UseGetAllJobs();

    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <section className="relative w-full py-16 overflow-hidden">

            {/* Background Glow */}
            <div className="
                absolute
                top-20
                left-[-200px]
                w-[450px]
                h-[450px]
                rounded-full
                bg-purple-100/40
                blur-3xl
                pointer-events-none
            " />

            <div className="
                absolute
                bottom-0
                right-[-200px]
                w-[450px]
                h-[450px]
                rounded-full
                bg-blue-100/30
                blur-3xl
                pointer-events-none
            " />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                    gap-5
                    mb-10
                ">

                    <div>

                        {/* Small Label */}
                        <div className="
                            inline-flex
                            items-center
                            gap-2
                            mb-3
                            text-sm
                            font-semibold
                            text-[#6A38C2]
                        ">
                            <span className="
                                flex
                                items-center
                                justify-center
                                w-7
                                h-7
                                rounded-lg
                                bg-purple-50
                            ">
                                <Sparkles className="w-4 h-4" />
                            </span>

                            Fresh Opportunities
                        </div>

                        {/* Heading */}
                        <h2 className="
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            font-extrabold
                            tracking-tight
                            text-gray-950
                        ">
                            Latest & Top{' '}

                            <span className="
                                bg-gradient-to-r
                                from-[#6A38C2]
                                via-[#8B5CF6]
                                to-[#F83002]
                                bg-clip-text
                                text-transparent
                            ">
                                Job Openings
                            </span>
                        </h2>

                        <p className="
                            mt-3
                            max-w-2xl
                            text-sm
                            sm:text-base
                            text-gray-500
                        ">
                            Explore the latest opportunities from companies
                            looking for talented professionals like you.
                        </p>

                    </div>

                    {/* View All */}
                    <button
                        onClick={() => navigate('/browse')}
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            self-start
                            sm:self-auto
                            px-5
                            py-2.5
                            rounded-full
                            border
                            border-gray-200
                            bg-white
                            text-sm
                            font-semibold
                            text-gray-700
                            shadow-sm
                            hover:border-purple-200
                            hover:text-[#6A38C2]
                            hover:shadow-md
                            transition-all
                            duration-300
                        "
                    >
                        View All Jobs

                        <ArrowRight
                            className="
                                w-4
                                h-4
                                group-hover:translate-x-1
                                transition-transform
                            "
                        />
                    </button>

                </div>

                {/* Jobs */}
                {!allJobs || allJobs.length <= 0 ? (

                    <div className="
                        min-h-[280px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        rounded-3xl
                        border
                        border-dashed
                        border-gray-200
                        bg-gray-50/70
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-purple-50
                            flex
                            items-center
                            justify-center
                            text-[#6A38C2]
                            mb-4
                        ">
                            <BriefcaseBusiness className="w-6 h-6" />
                        </div>

                        <h3 className="
                            text-lg
                            font-bold
                            text-gray-800
                        ">
                            No Jobs Available
                        </h3>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-400
                        ">
                            Check back soon for new opportunities.
                        </p>

                    </div>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                    ">
                        {allJobs.slice(0, 6).map((job, index) => (
                            <LatestJobCards
                                key={job._id}
                                job={job}
                                index={index}
                            />
                        ))}
                    </div>

                )}

            </div>
        </section>
    );
};

export default LatestJobs;