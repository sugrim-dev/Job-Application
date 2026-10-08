import { setSearchedQuery } from "@/redux/jobSlice";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    MapPin,
    BriefcaseBusiness,
    IndianRupee,
    SlidersHorizontal,
    X,
} from "lucide-react";

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        icon: BriefcaseBusiness,
        array: ["Frontend Dev", "Backend", "Fullstack", "HR"],
    },
    {
        filterType: "Salary",
        icon: IndianRupee,
        array: ["0-40k", "42-1lakh", "1lakh-5lakh"],
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: "",
        Salary: "",
    });

    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const clearFilters = () => {
        setSelectedFilters({
            Location: "",
            Industry: "",
            Salary: "",
        });
    };

    useEffect(() => {
        const activeFilter =
            selectedFilters.Location ||
            selectedFilters.Industry ||
            selectedFilters.Salary ||
            "";

        dispatch(setSearchedQuery(activeFilter));
    }, [selectedFilters, dispatch]);

    const hasFilters =
        selectedFilters.Location ||
        selectedFilters.Industry ||
        selectedFilters.Salary;

    return (
        <div
            className="
                w-full
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all
                duration-300
            "
        >

            {/* Header */}
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-purple-50
                        "
                    >
                        <SlidersHorizontal
                            className="h-5 w-5 text-[#6A38C2]"
                        />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-gray-900">
                            Filter Jobs
                        </h1>

                        <p className="text-xs text-gray-400 mt-0.5">
                            Find the right opportunity
                        </p>
                    </div>

                </div>

                {/* Clear Button */}
                {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-lg
                            px-2.5
                            py-1.5
                            text-xs
                            font-semibold
                            text-gray-400
                            hover:bg-red-50
                            hover:text-red-500
                            transition-all
                        "
                    >
                        <X className="h-3.5 w-3.5" />
                        Clear
                    </button>
                )}

            </div>

            <div className="my-5 h-px bg-gray-100" />

            {/* Filters */}
            <div className="space-y-7">

                {filterData.map((data, index) => {

                    const Icon = data.icon;

                    return (
                        <div key={index}>

                            {/* Filter Heading */}
                            <div className="flex items-center gap-2 mb-3">

                                <Icon
                                    className="
                                        h-4
                                        w-4
                                        text-[#6A38C2]
                                    "
                                />

                                <h2
                                    className="
                                        text-sm
                                        font-bold
                                        text-gray-800
                                    "
                                >
                                    {data.filterType}
                                </h2>

                            </div>

                            {/* Options */}
                            <div className="space-y-1">

                                {data.array.map((item, idx) => {

                                    const itemId =
                                        `filter-${index}-${idx}`;

                                    const isSelected =
                                        selectedFilters[data.filterType] === item;

                                    return (
                                        <label
                                            key={idx}
                                            htmlFor={itemId}
                                            className={`
                                                group
                                                flex
                                                items-center
                                                gap-3
                                                rounded-xl
                                                px-3
                                                py-2.5
                                                cursor-pointer
                                                border
                                                transition-all
                                                duration-200
                                                ${
                                                    isSelected
                                                        ? "border-purple-200 bg-purple-50"
                                                        : "border-transparent hover:border-gray-100 hover:bg-gray-50"
                                                }
                                            `}
                                        >

                                            {/* Radio */}
                                            <input
                                                type="radio"
                                                id={itemId}
                                                name={`job-filter-${data.filterType}`}
                                                value={item}
                                                checked={isSelected}
                                                onChange={() =>
                                                    changeHandler(
                                                        data.filterType,
                                                        item
                                                    )
                                                }
                                                className="
                                                    h-4
                                                    w-4
                                                    accent-[#6A38C2]
                                                    cursor-pointer
                                                "
                                            />

                                            {/* Text */}
                                            <span
                                                className={`
                                                    text-sm
                                                    transition-colors
                                                    ${
                                                        isSelected
                                                            ? "font-semibold text-[#6A38C2]"
                                                            : "font-medium text-gray-600 group-hover:text-gray-900"
                                                    }
                                                `}
                                            >
                                                {item}
                                            </span>

                                            {/* Selected Indicator */}
                                            {isSelected && (
                                                <span
                                                    className="
                                                        ml-auto
                                                        h-1.5
                                                        w-1.5
                                                        rounded-full
                                                        bg-[#6A38C2]
                                                    "
                                                />
                                            )}

                                        </label>
                                    );
                                })}

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default memo(FilterCard);