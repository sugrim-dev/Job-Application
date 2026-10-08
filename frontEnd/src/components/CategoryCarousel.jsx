import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="relative w-full py-4 sm:py-8 overflow-hidden">

            {/* Background Glow */}
            <div className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[500px]
                h-[200px]
                bg-purple-100/40
                blur-3xl
                rounded-full
                pointer-events-none
            " />

            <div className="relative z-10 max-w-6xl mx-auto px-6">

                {/* Section Heading */}
                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                    gap-3
                    mb-7
                ">

                    <div>
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
                                <BriefcaseBusiness className="w-4 h-4" />
                            </span>

                            Explore Opportunities
                        </div>

                        <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            tracking-tight
                            text-gray-950
                        ">
                            Find Jobs By Category
                        </h2>

                        <p className="
                            mt-2
                            text-sm
                            sm:text-base
                            text-gray-500
                        ">
                            Explore roles that match your skills and career goals.
                        </p>
                    </div>

                    <div className="
                        hidden
                        sm:flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-400
                    ">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Trending categories
                    </div>

                </div>

                {/* Carousel */}
                <Carousel className="w-full">

                    <CarouselContent className="-ml-3">

                        {category.map((cat, index) => (

                            <CarouselItem
                                key={index}
                                className="
                                    pl-3
                                    basis-full
                                    sm:basis-1/2
                                    md:basis-1/3
                                    lg:basis-1/4
                                "
                            >

                                <button
                                    onClick={() => searchJobHandler(cat)}
                                    className="
                                        group
                                        relative
                                        w-full
                                        h-16
                                        px-5
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        bg-white
                                        border
                                        border-gray-200
                                        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                                        hover:border-purple-200
                                        hover:shadow-[0_15px_40px_rgba(106,56,194,0.12)]
                                        hover:-translate-y-1
                                        transition-all
                                        duration-300
                                        overflow-hidden
                                    "
                                >

                                    {/* Hover Gradient */}
                                    <div className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-r
                                        from-purple-50
                                        via-white
                                        to-orange-50
                                        opacity-0
                                        group-hover:opacity-100
                                        transition-opacity
                                        duration-300
                                    " />

                                    {/* Content */}
                                    <div className="
                                        relative
                                        z-10
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <span className="
                                            flex
                                            items-center
                                            justify-center
                                            w-9
                                            h-9
                                            rounded-xl
                                            bg-purple-50
                                            text-[#6A38C2]
                                            group-hover:bg-[#6A38C2]
                                            group-hover:text-white
                                            transition-all
                                            duration-300
                                        ">
                                            <BriefcaseBusiness className="w-4 h-4" />
                                        </span>

                                        <span className="
                                            text-sm
                                            font-semibold
                                            text-gray-700
                                            group-hover:text-gray-950
                                            transition-colors
                                            duration-300
                                            whitespace-nowrap
                                        ">
                                            {cat}
                                        </span>

                                    </div>

                                    {/* Arrow */}
                                    <span className="
                                        relative
                                        z-10
                                        flex
                                        items-center
                                        justify-center
                                        w-8
                                        h-8
                                        rounded-full
                                        bg-gray-50
                                        text-gray-400
                                        group-hover:bg-[#6A38C2]
                                        group-hover:text-white
                                        transition-all
                                        duration-300
                                        group-hover:rotate-45
                                    ">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </span>

                                </button>

                            </CarouselItem>

                        ))}

                    </CarouselContent>

                    {/* Previous */}
                    <CarouselPrevious className="
                        hidden
                        sm:flex
                        -left-5
                        w-10
                        h-10
                        border
                        border-gray-200
                        bg-white
                        text-gray-700
                        shadow-lg
                        hover:bg-[#6A38C2]
                        hover:text-white
                        hover:border-[#6A38C2]
                        transition-all
                        duration-300
                        hover:scale-105
                    " />

                    {/* Next */}
                    <CarouselNext className="
                        hidden
                        sm:flex
                        -right-5
                        w-10
                        h-10
                        border
                        border-gray-200
                        bg-white
                        text-gray-700
                        shadow-lg
                        hover:bg-[#6A38C2]
                        hover:text-white
                        hover:border-[#6A38C2]
                        transition-all
                        duration-300
                        hover:scale-105
                    " />

                </Carousel>

            </div>
        </section>
    );
};

export default CategoryCarousel;