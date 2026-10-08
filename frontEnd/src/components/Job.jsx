import { memo } from "react";
import { Button } from "./ui/button";
import {
    Bookmark,
    MapPin,
    ChevronRight,
    BriefcaseBusiness,
    Clock3
} from "lucide-react";
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
    const navigate = useNavigate();

    const dayAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 0;

        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();

        const timeDifference = currentTime - createdAt;

        return Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
        );
    };

    const daysAgo = dayAgoFunction(job?.createdAt);

    const companyName = job?.company?.name || "Company Name";
    const companyInitial = companyName.charAt(0).toUpperCase();

    const handleJobDetails = () => {
        if (job?._id) {
            navigate(`/description/${job._id}`);
        }
    };

    return (
        <div
            onClick={handleJobDetails}
            className="
                group
                relative
                flex
                flex-col
                justify-between
                min-h-[390px]
                p-6
                overflow-hidden
                rounded-3xl
                bg-white
                border
                border-gray-200
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                cursor-pointer
                hover:-translate-y-2
                hover:border-purple-200
                hover:shadow-[0_20px_50px_rgba(106,56,194,0.13)]
                transition-all
                duration-500
                ease-out
            "
        >

            {/* Hover Background */}
            <div
                className="
                    absolute
                    inset-0
                    pointer-events-none
                    opacity-0
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-purple-50/60
                    via-white
                    to-orange-50/40
                    transition-opacity
                    duration-500
                "
            />

            {/* Top Gradient Line */}
            <div
                className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-[3px]
                    bg-gradient-to-r
                    from-[#6A38C2]
                    via-[#8B5CF6]
                    to-[#F83002]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                "
            />

            {/* Glow */}
            <div
                className="
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
                    pointer-events-none
                "
            />

            {/* Main Content */}
            <div className="relative z-10">

                {/* Company Header */}
                <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3 min-w-0">

                        {/* Company Logo */}
                        <Avatar
                            className="
                                h-12
                                w-12
                                shrink-0
                                rounded-2xl
                                border
                                border-gray-100
                                shadow-sm
                                ring-4
                                ring-gray-50
                                group-hover:ring-purple-50
                                group-hover:scale-105
                                transition-all
                                duration-300
                            "
                        >
                            <AvatarImage
                                src={job?.company?.logo}
                                alt={companyName}
                                className="object-cover"
                            />

                            <AvatarFallback
                                className="
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-[#6A38C2]
                                    to-[#8B5CF6]
                                    text-white
                                    font-bold
                                    text-lg
                                "
                            >
                                {companyInitial}
                            </AvatarFallback>
                        </Avatar>

                        {/* Company Details */}
                        <div className="min-w-0">

                            <h2
                                className="
                                    font-bold
                                    text-gray-900
                                    text-sm
                                    sm:text-base
                                    truncate
                                    group-hover:text-[#6A38C2]
                                    transition-colors
                                    duration-300
                                "
                            >
                                {companyName}
                            </h2>

                            <p
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    mt-1
                                    text-xs
                                    text-gray-400
                                "
                            >
                                <MapPin className="w-3 h-3" />
                                {job?.location || "India"}
                            </p>

                        </div>

                    </div>

                    {/* Bookmark */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="
                            h-9
                            w-9
                            shrink-0
                            rounded-full
                            border
                            border-gray-100
                            bg-gray-50
                            text-gray-400
                            hover:bg-purple-50
                            hover:text-[#6A38C2]
                            hover:border-purple-100
                            transition-all
                            duration-300
                        "
                        aria-label="Save job"
                    >
                        <Bookmark className="w-4 h-4" />
                    </Button>

                </div>

                {/* Job Information */}
                <div className="mt-7">

                    {/* Status + Date */}
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            mb-3
                        "
                    >

                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-green-50
                                border
                                border-green-100
                                px-3
                                py-1
                                text-[11px]
                                font-semibold
                                text-green-600
                            "
                        >
                            <span
                                className="
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    bg-green-500
                                    animate-pulse
                                "
                            />

                            Actively Hiring
                        </span>

                        <span
                            className="
                                flex
                                items-center
                                gap-1
                                text-[11px]
                                font-medium
                                text-gray-400
                            "
                        >
                            <Clock3 className="w-3 h-3" />

                            {daysAgo === 0
                                ? "Today"
                                : `${daysAgo} days ago`
                            }
                        </span>

                    </div>

                    {/* Job Title */}
                    <h1
                        className="
                            text-xl
                            font-extrabold
                            tracking-tight
                            text-gray-950
                            line-clamp-1
                            group-hover:text-[#6A38C2]
                            transition-colors
                            duration-300
                        "
                    >
                        {job?.title || "Job Title"}
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-500
                            line-clamp-3
                        "
                    >
                        {job?.description ||
                            "No description provided for this job listing."
                        }
                    </p>

                </div>

                {/* Badges */}
                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        mt-6
                    "
                >

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
                            text-xs
                        "
                    >
                        <BriefcaseBusiness className="w-3 h-3 mr-1" />
                        {job?.position || "Positions"}
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
                            text-xs
                        "
                    >
                        {job?.jobType || "Full Time"}
                    </Badge>

                    <Badge
                        className="
                            rounded-full
                            border
                            border-orange-100
                            bg-orange-50
                            text-orange-600
                            hover:bg-orange-100
                            font-semibold
                            px-3
                            py-1
                            text-xs
                        "
                    >
                        {job?.salary || "Salary"} LPA
                    </Badge>

                </div>

            </div>

            {/* Bottom Actions */}
            <div
                className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-3
                    pt-5
                    mt-6
                    border-t
                    border-gray-100
                    group-hover:border-purple-100
                    transition-colors
                    duration-300
                "
            >

                {/* Details */}
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleJobDetails();
                    }}
                    variant="outline"
                    className="
                        flex-1
                        h-11
                        rounded-xl
                        border-gray-200
                        bg-white
                        text-gray-700
                        hover:bg-gray-50
                        hover:text-gray-950
                        hover:border-gray-300
                        font-semibold
                        transition-all
                        duration-300
                    "
                >
                    Details
                </Button>

                {/* Apply Now */}
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleJobDetails();
                    }}
                    className="
                        group/btn
                        flex-1
                        h-11
                        rounded-xl
                        bg-gray-950
                        hover:bg-[#6A38C2]
                        text-white
                        font-semibold
                        shadow-lg
                        shadow-gray-200
                        hover:shadow-purple-200
                        transition-all
                        duration-300
                    "
                >
                    Apply Now

                    <ChevronRight
                        className="
                            w-4
                            h-4
                            ml-1
                            group-hover/btn:translate-x-1
                            transition-transform
                            duration-300
                        "
                    />
                </Button>

            </div>

            {/* Bottom Gradient */}
            <div
                className="
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
                "
            />

        </div>
    );
};

export default memo(Job);