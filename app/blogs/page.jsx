'use client';
import { AnimatedText, P, StaggerContainer } from "@/components/typography";
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import SpotlightCard from "@/components/SpotlightCard";
import { ListFilter, ArrowRight, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAnimation } from "@/components/AnimationContext";
import PreloaderLink from "@/components/PreloaderLink";

export default function page() {
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const blogsPerPage = 4;
    const { isPageTransitionComplete } = useAnimation();

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const categories = [
        'Regulatory Updates',
        'Drug Discovery',
        'Manufacturing',
        'Clinical Trials',
        'Biotechnology',
        'Quality Control'
    ];

    const blogData = [
        {
            id: 1,
            title: "Regulatory Updates Reshape Global Clinical Practices",
            slug: "regulatory-updates-reshape-global-clinical-practices",
            image: "/news.webp",
            date: "Nov 6, 2024 4:36:46 PM",
            readTime: "1 min read"
        },
        {
            id: 2,
            title: "AI-Driven Drug Discovery Accelerates Development",
            slug: "ai-driven-drug-discovery-accelerates-development",
            image: "/news (2).webp",
            date: "Nov 4, 2024 10:22:15 AM",
            readTime: "2 min read",
        },
        {
            id: 3,
            title: "New CRDMO Partnership Models Emerge",
            slug: "new-crdmo-partnership-models-emerge",
            image: "/news (3).webp",
            date: "Nov 3, 2024 3:45:20 PM",
            readTime: "4 min read"
        },
        {
            id: 4,
            title: "Biosimilar Market Expansion in Asia Pacific",
            slug: "biosimilar-market-expansion-asia-pacific",
            image: "/news (2).webp",
            date: "Nov 2, 2024 11:30:45 AM",
            readTime: "2 min read"
        },
        {
            id: 5,
            title: "Quality Control Innovations in Pharmaceutical Manufacturing",
            slug: "quality-control-innovations-pharmaceutical-manufacturing",
            image: "/news (3).webp",
            date: "Nov 1, 2024 9:15:30 AM",
            readTime: "3 min read"
        },
        {
            id: 6,
            title: "Advanced Manufacturing Technologies in Pharma",
            slug: "advanced-manufacturing-technologies-pharma",
            image: "/news.webp",
            date: "Oct 30, 2024 2:20:15 PM",
            readTime: "3 min read"
        },
        {
            id: 7,
            title: "Digital Transformation in Clinical Research",
            slug: "digital-transformation-clinical-research",
            image: "/news (2).webp",
            date: "Oct 29, 2024 1:45:30 PM",
            readTime: "4 min read"
        },
        {
            id: 8,
            title: "Sustainable Practices in Pharmaceutical Industry",
            slug: "sustainable-practices-pharmaceutical-industry",
            image: "/news (3).webp",
            date: "Oct 28, 2024 3:10:45 PM",
            readTime: "2 min read"
        }
    ];

    const totalPages = Math.ceil(blogData.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const currentBlogs = blogData.slice(startIndex, startIndex + blogsPerPage);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const removeCategory = (category) => {
        setSelectedCategories(prev => prev.filter(c => c !== category));
    };

    const resetCategories = () => {
        setSelectedCategories([]);
    };



    return (
        <>
            <Section className="py-8 lg:py-10 xl:py-12">
                <Heading black="Latest" blue="Industry News" />
                <P delay={.1} className="my-3">Stay informed with the most recent updates, trends, and insights shaping the global pharma and biotech landscape.</P>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.map(category => (
                            <div key={category} className="bg-white text-black shadow-sm font-semibold p-1 ps-3 rounded-full text-sm flex items-center gap-1">
                                {category}
                                <button onClick={() => removeCategory(category)}>
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="relative">
                        <AnimatedText>
                            <button 
                                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                className="text-right text-black text-md flex gap-2 font-medium items-center"
                            >
                                <ListFilter className="w-4 h-4" />
                                Category
                            </button>
                        </AnimatedText>
                        
                        <AnimatePresence>
                            {showCategoryDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-md p-4 min-w-48 z-10"
                                >
                                    <div className="space-y-3">
                                        {categories.map(category => (
                                            <label key={category} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={() => handleCategoryChange(category)}
                                                    className="w-4 h-4 accent-prime text-white"
                                                />
                                                <span className="text-sm">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-2 mt-4 pt-3 border-t">
                                        <button
                                            onClick={resetCategories}
                                            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={() => setShowCategoryDropdown(false)}
                                            className="px-3 py-1 text-sm bg-prime text-white rounded hover:bg-prime/90"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                    {isLoading ? (
                        Array.from({ length: blogsPerPage }).map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                                <div className="w-full aspect-[63/25] bg-gray-200"></div>
                                <div className="p-4">
                                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                                        </div>
                                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        currentBlogs.map((blog, index) => {
                            const shouldAnimate = isPageTransitionComplete && !isLoading;
                            return (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ delay: shouldAnimate ? index * 0.1 : 0, duration: 0.6 }}
                                >
                                    <PreloaderLink href={`/blogs/${blog.slug}`}>
                                        <SpotlightCard className="overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow !bg-white rounded-lg">
                                            <div className="relative w-full aspect-[63/25]">
                                                <Image
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    fill
                                                    className="object-cover rounded-t-lg"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                                                    {blog.title}
                                                </h3>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <span>{blog.date}</span>
                                                        <span className="mx-2">|</span>
                                                        <span>{blog.readTime}</span>
                                                    </div>
                                                    <div className="bg-prime text-white rounded-full p-2 aspect-square">
                                                        <ArrowUpRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </PreloaderLink>
                                </motion.div>
                            );
                        })
                    )}
                </div>

                <div className="flex justify-center items-center gap-4 mt-12">
                    <button 
                        onClick={() => {
                            setCurrentPage(prev => Math.max(prev - 1, 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === page 
                                    ? 'bg-prime text-white' 
                                    : 'border hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button 
                        onClick={() => {
                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </Section>
        </>
    );
}
