import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin
} from "react-icons/fa";
import {
    Mail,
    ArrowUpRight,
    Sparkles
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-[#09090b] text-gray-300">

            {/* Background Glow */}
            <div className="
                absolute
                -top-40
                left-[-150px]
                w-[450px]
                h-[450px]
                rounded-full
                bg-purple-600/10
                blur-3xl
                pointer-events-none
            " />

            <div className="
                absolute
                -bottom-40
                right-[-150px]
                w-[450px]
                h-[450px]
                rounded-full
                bg-indigo-600/10
                blur-3xl
                pointer-events-none
            " />

            {/* Subtle Grid */}
            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.025]
                    pointer-events-none
                "
                style={{
                    backgroundImage: `
                        linear-gradient(#fff 1px, transparent 1px),
                        linear-gradient(90deg, #fff 1px, transparent 1px)
                    `,
                    backgroundSize: "45px 45px"
                }}
            />

            <div className="
                relative
                z-10
                max-w-7xl
                mx-auto
                px-6
                pt-16
                pb-8
            ">

                {/* Main Footer */}
                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-5
                    gap-10
                    lg:gap-12
                ">

                    {/* Brand */}
                    <div className="lg:col-span-2">

                        {/* Logo */}
                        <div className="
                            inline-flex
                            items-center
                            gap-2
                        ">
                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-gradient-to-br
                                from-[#6A38C2]
                                to-[#8B5CF6]
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                shadow-purple-900/30
                            ">
                                <Sparkles className="
                                    w-5
                                    h-5
                                    text-white
                                " />
                            </div>

                            <h2 className="
                                text-2xl
                                font-extrabold
                                tracking-tight
                                text-white
                            ">
                                Job<span className="text-[#8B5CF6]">Hunt</span>
                            </h2>
                        </div>

                        <p className="
                            mt-5
                            max-w-md
                            text-sm
                            leading-7
                            text-gray-400
                        ">
                            Connecting ambitious talent with exceptional
                            opportunities. Discover your next career move
                            and build the future you deserve.
                        </p>

                        {/* Social Icons */}
                        <div className="
                            flex
                            items-center
                            gap-3
                            mt-7
                        ">

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-400
                                    hover:text-white
                                    hover:bg-[#6A38C2]
                                    hover:border-[#6A38C2]
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >
                                <FaFacebook />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-400
                                    hover:text-white
                                    hover:bg-gradient-to-br
                                    hover:from-purple-600
                                    hover:to-pink-500
                                    hover:border-pink-500
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-400
                                    hover:text-white
                                    hover:bg-sky-500
                                    hover:border-sky-500
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-400
                                    hover:text-white
                                    hover:bg-blue-600
                                    hover:border-blue-600
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >
                                <FaLinkedin />
                            </a>

                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="
                            text-sm
                            font-bold
                            text-white
                            mb-5
                        ">
                            Product
                        </h3>

                        <ul className="
                            space-y-3
                            text-sm
                        ">
                            {[
                                "Find Jobs",
                                "Post a Job",
                                "Companies",
                                "Pricing"
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-1
                                            text-gray-400
                                            hover:text-white
                                            transition-colors
                                        "
                                    >
                                        {item}

                                        <ArrowUpRight className="
                                            w-3
                                            h-3
                                            opacity-0
                                            -translate-x-1
                                            group-hover:opacity-100
                                            group-hover:translate-x-0
                                            transition-all
                                        " />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="
                            text-sm
                            font-bold
                            text-white
                            mb-5
                        ">
                            Company
                        </h3>

                        <ul className="
                            space-y-3
                            text-sm
                        ">
                            {[
                                "About Us",
                                "Careers",
                                "Blog",
                                "Contact"
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-1
                                            text-gray-400
                                            hover:text-white
                                            transition-colors
                                        "
                                    >
                                        {item}

                                        <ArrowUpRight className="
                                            w-3
                                            h-3
                                            opacity-0
                                            -translate-x-1
                                            group-hover:opacity-100
                                            group-hover:translate-x-0
                                            transition-all
                                        " />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="
                            text-sm
                            font-bold
                            text-white
                            mb-5
                        ">
                            Stay Updated
                        </h3>

                        <p className="
                            text-sm
                            leading-6
                            text-gray-400
                            mb-4
                        ">
                            Get the latest job opportunities and career
                            insights delivered to your inbox.
                        </p>

                        {/* Email Box */}
                        <div className="
                            flex
                            items-center
                            gap-2
                            p-1.5
                            rounded-xl
                            border
                            border-white/10
                            bg-white/[0.04]
                            focus-within:border-purple-500/50
                            focus-within:bg-white/[0.06]
                            transition-all
                        ">

                            <Mail className="
                                ml-2
                                w-4
                                h-4
                                text-gray-500
                                shrink-0
                            " />

                            <input
                                type="email"
                                placeholder="Your email"
                                className="
                                    min-w-0
                                    w-full
                                    px-1
                                    py-2
                                    bg-transparent
                                    text-sm
                                    text-white
                                    placeholder:text-gray-600
                                    outline-none
                                "
                            />

                        </div>

                        <button className="
                            group
                            w-full
                            mt-3
                            h-11
                            rounded-xl
                            bg-gradient-to-r
                            from-[#6A38C2]
                            to-[#8B5CF6]
                            text-white
                            text-sm
                            font-semibold
                            shadow-lg
                            shadow-purple-900/20
                            hover:shadow-purple-900/40
                            hover:-translate-y-0.5
                            transition-all
                            duration-300
                        ">
                            Subscribe
                        </button>

                    </div>

                </div>

                {/* Divider */}
                <div className="
                    h-px
                    w-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                    my-10
                " />

                {/* Bottom Footer */}
                <div className="
                    flex
                    flex-col
                    md:flex-row
                    justify-between
                    items-center
                    gap-4
                    text-xs
                    text-gray-500
                ">

                    <p>
                        © {new Date().getFullYear()} JobHunt. All rights reserved.
                    </p>

                    <div className="
                        flex
                        items-center
                        gap-6
                    ">
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Terms
                        </a>

                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Security
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;