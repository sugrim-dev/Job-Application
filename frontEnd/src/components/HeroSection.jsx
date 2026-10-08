import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, ArrowRight, Sparkles, Briefcase, MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchJobHandler();
        }
    };

    return (
        <section className="relative overflow-hidden bg-white min-h-[650px] flex items-center">

            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                <div className="
                    absolute -top-40 -left-40
                    w-[500px] h-[500px]
                    bg-purple-200/30
                    rounded-full
                    blur-3xl
                    animate-pulse
                " />

                <div className="
                    absolute top-20 -right-40
                    w-[500px] h-[500px]
                    bg-blue-200/25
                    rounded-full
                    blur-3xl
                    animate-pulse
                " />

                <div className="
                    absolute bottom-[-250px]
                    left-1/2
                    -translate-x-1/2
                    w-[600px] h-[300px]
                    bg-indigo-200/20
                    rounded-full
                    blur-3xl
                " />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `
                            linear-gradient(#111 1px, transparent 1px),
                            linear-gradient(90deg, #111 1px, transparent 1px)
                        `,
                        backgroundSize: '45px 45px'
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="
                relative z-10
                max-w-6xl
                mx-auto
                px-6
                py-20
                text-center
                w-full
            ">

                {/* Premium Badge */}
                <div className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    mb-7
                    rounded-full
                    border
                    border-purple-200
                    bg-white/80
                    backdrop-blur-md
                    shadow-sm
                    text-sm
                    font-semibold
                    text-gray-700
                    animate-[fadeDown_0.7s_ease-out]
                ">
                    <span className="
                        flex
                        items-center
                        justify-center
                        w-6
                        h-6
                        rounded-full
                        bg-purple-100
                        text-[#6A38C2]
                    ">
                        <Sparkles className="w-3.5 h-3.5" />
                    </span>

                    India's Smarter Way to Find Your Next Job

                    <span className="
                        w-2
                        h-2
                        rounded-full
                        bg-green-500
                        animate-pulse
                    " />
                </div>

                {/* Heading */}
                <h1 className="
                    max-w-4xl
                    mx-auto
                    text-5xl
                    sm:text-6xl
                    md:text-7xl
                    font-extrabold
                    tracking-tight
                    leading-[1.05]
                    text-gray-950
                    animate-[fadeUp_0.8s_ease-out]
                ">
                    Find Work That

                    <span className="
                        block
                        mt-2
                        bg-gradient-to-r
                        from-[#6A38C2]
                        via-[#8B5CF6]
                        to-[#F83002]
                        bg-clip-text
                        text-transparent
                    ">
                        Moves You Forward.
                    </span>
                </h1>

                {/* Description */}
                <p className="
                    max-w-2xl
                    mx-auto
                    mt-6
                    text-base
                    sm:text-lg
                    leading-8
                    text-gray-500
                    animate-[fadeUp_1s_ease-out]
                ">
                    Discover thousands of opportunities from top companies.
                    Search smarter, apply faster, and take the next step
                    towards your dream career.
                </p>

                {/* Search Box */}
                <div className="
                    max-w-3xl
                    mx-auto
                    mt-10
                    animate-[scaleIn_1s_ease-out]
                ">

                    <div className="
                        relative
                        flex
                        items-center
                        p-2
                        rounded-2xl
                        sm:rounded-full
                        bg-white
                        border
                        border-gray-200
                        shadow-[0_20px_60px_rgba(0,0,0,0.10)]
                        hover:shadow-[0_25px_70px_rgba(106,56,194,0.15)]
                        transition-all
                        duration-500
                    ">

                        {/* Search Icon */}
                        <div className="
                            hidden
                            sm:flex
                            ml-3
                            w-11
                            h-11
                            rounded-full
                            items-center
                            justify-center
                            bg-purple-50
                            text-[#6A38C2]
                        ">
                            <Search className="w-5 h-5" />
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Search jobs, skills, companies..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="
                                flex-1
                                h-12
                                sm:h-14
                                px-4
                                sm:px-5
                                bg-transparent
                                outline-none
                                border-none
                                text-gray-800
                                placeholder:text-gray-400
                                text-sm
                                sm:text-base
                            "
                        />

                        {/* Search Button */}
                        <Button
                            onClick={searchJobHandler}
                            className="
                                h-12
                                sm:h-14
                                px-5
                                sm:px-7
                                rounded-xl
                                sm:rounded-full
                                bg-gray-950
                                hover:bg-[#6A38C2]
                                text-white
                                shadow-lg
                                transition-all
                                duration-300
                                hover:scale-[1.03]
                                active:scale-95
                            "
                        >
                            <span className="hidden sm:inline mr-2 font-semibold">
                                Search Jobs
                            </span>

                            <Search className="w-5 h-5" />
                        </Button>

                    </div>

                    {/* Popular Searches */}

                </div>

                {/* Bottom Stats */}
                <div className="
                    flex
                    flex-wrap
                    justify-center
                    items-center
                    gap-8
                    sm:gap-14
                    mt-14
                    animate-[fadeUp_1.2s_ease-out]
                ">

                    <div className="flex items-center gap-3">
                        <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-purple-50
                            flex
                            items-center
                            justify-center
                            text-[#6A38C2]
                        ">
                            <Briefcase className="w-5 h-5" />
                        </div>

                        <div className="text-left">
                            <p className="font-bold text-gray-900">
                                10K+
                            </p>
                            <p className="text-xs text-gray-400">
                                Active Jobs
                            </p>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-10 bg-gray-200" />

                    <div className="flex items-center gap-3">
                        <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-blue-50
                            flex
                            items-center
                            justify-center
                            text-blue-600
                        ">
                            <MapPin className="w-5 h-5" />
                        </div>

                        <div className="text-left">
                            <p className="font-bold text-gray-900">
                                500+
                            </p>
                            <p className="text-xs text-gray-400">
                                Top Companies
                            </p>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-10 bg-gray-200" />

                    <div className="flex items-center gap-3">
                        <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-green-50
                            flex
                            items-center
                            justify-center
                            text-green-600
                        ">
                            <ArrowRight className="w-5 h-5" />
                        </div>

                        <div className="text-left">
                            <p className="font-bold text-gray-900">
                                50K+
                            </p>
                            <p className="text-xs text-gray-400">
                                Job Seekers
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom Fade */}
            <div className="
                absolute
                bottom-0
                left-0
                right-0
                h-24
                bg-gradient-to-t
                from-white
                to-transparent
                pointer-events-none
            " />

            {/* Custom Animations */}
            <style>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeDown {
                    from {
                        opacity: 0;
                        transform: translateY(-15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>

        </section>
    );
};

export default HeroSection;