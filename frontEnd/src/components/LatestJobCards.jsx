import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    BriefcaseBusiness,
    MapPin
} from 'lucide-react';

const LatestJobCards = ({ job, index = 0 }) => {
    const navigate = useNavigate();

    const companyName = job?.company?.name || 'Company';
    const companyInitial = companyName.charAt(0).toUpperCase();

    return (
        <motion.div
            onClick={() => navigate(`/description/${job._id}`)}

            initial={{
                opacity: 0,
                y: 30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: "easeOut"
            }}

            whileHover={{
                y: -8
            }}

            whileTap={{
                scale: 0.98
            }}

            className="
                group
                relative
                h-full
                min-h-[285px]
                p-6
                rounded-3xl
                bg-white
                border
                border-gray-200
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                hover:border-purple-200
                hover:shadow-[0_20px_50px_rgba(106,56,194,0.12)]
                cursor-pointer
                overflow-hidden
                transition-all
                duration-500
            "
        >

            {/* Hover Background */}
            <div className="
                absolute
                inset-0
                bg-gradient-to-br
                from-purple-50/70
                via-white
                to-orange-50/40
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
                pointer-events-none
            " />

            {/* Top Glow */}
            <div className="
                absolute
                -top-20
                -right-20
                w-40
                h-40
                rounded-full
                bg-purple-200/30
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
            " />

            {/* Main Content */}
            <div className="relative z-10">

                {/* Company Header */}
                <div className="
                    flex
                    items-start
                    justify-between
                    gap-4
                ">

                    <div className="flex items-center gap-3">

                        {/* Company Logo */}
                        <div className="
                            w-12
                            h-12
                            shrink-0
                            rounded-2xl
                            bg-gradient-to-br
                            from-[#6A38C2]
                            to-[#8B5CF6]
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                            text-lg
                            shadow-lg
                            shadow-purple-200
                            group-hover:scale-105
                            transition-transform
                            duration-300
                        ">
                            {companyInitial}
                        </div>

                        <div className="min-w-0">

                            <h3 className="
                                font-bold
                                text-gray-900
                                truncate
                                group-hover:text-[#6A38C2]
                                transition-colors
                                duration-300
                            ">
                                {companyName}
                            </h3>

                            <div className="
                                flex
                                items-center
                                gap-1
                                mt-1
                                text-xs
                                text-gray-400
                            ">
                                <MapPin className="w-3 h-3" />
                                India
                            </div>

                        </div>

                    </div>

                    {/* Arrow */}
                    <div className="
                        w-9
                        h-9
                        shrink-0
                        rounded-full
                        bg-gray-50
                        border
                        border-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        group-hover:bg-[#6A38C2]
                        group-hover:text-white
                        group-hover:border-[#6A38C2]
                        group-hover:rotate-45
                        transition-all
                        duration-300
                    ">
                        <ArrowUpRight className="w-4 h-4" />
                    </div>

                </div>

                {/* Job Details */}
                <div className="mt-6">

                    <h2 className="
                        text-xl
                        font-bold
                        text-gray-950
                        line-clamp-1
                        group-hover:text-[#6A38C2]
                        transition-colors
                        duration-300
                    ">
                        {job?.title}
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                        line-clamp-2
                    ">
                        {job?.description}
                    </p>

                </div>

                {/* Badges */}
                <div className="
                    flex
                    flex-wrap
                    gap-2
                    mt-5
                ">

                    <Badge
                        className="
                            rounded-full
                            border
                            border-purple-100
                            bg-purple-50
                            text-[#6A38C2]
                            hover:bg-purple-100
                            font-semibold
                            px-3
                            py-1
                        "
                    >
                        {job?.position} Positions
                    </Badge>

                    <Badge
                        className="
                            rounded-full
                            border
                            border-blue-100
                            bg-blue-50
                            text-blue-600
                            hover:bg-blue-100
                            font-semibold
                            px-3
                            py-1
                        "
                    >
                        {job?.jobType}
                    </Badge>

                    <Badge
                        className="
                            rounded-full
                            border
                            border-green-100
                            bg-green-50
                            text-green-600
                            hover:bg-green-100
                            font-semibold
                            px-3
                            py-1
                        "
                    >
                        {job?.salary} LPA
                    </Badge>

                </div>

                {/* Bottom */}
                <div className="
                    flex
                    items-center
                    justify-between
                    mt-6
                    pt-4
                    border-t
                    border-gray-100
                    group-hover:border-purple-100
                    transition-colors
                ">

                    <div className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-400
                    ">
                        <BriefcaseBusiness className="w-4 h-4" />
                        Career Opportunity
                    </div>

                    <span className="
                        text-xs
                        font-semibold
                        text-gray-400
                        group-hover:text-[#6A38C2]
                        transition-colors
                    ">
                        View Details
                    </span>

                </div>

            </div>

            {/* Animated Bottom Line */}
            <div className="
                absolute
                bottom-0
                left-0
                h-[3px]
                w-0
                bg-gradient-to-r
                from-[#6A38C2]
                via-[#8B5CF6]
                to-[#F83002]
                group-hover:w-full
                transition-all
                duration-500
                rounded-full
            " />

        </motion.div>
    );
};

export default LatestJobCards;