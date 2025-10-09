'use client'
import Heading from "@/components/typography/Heading";
import Section from "@/components/uielements/Section";
import { useState, memo, useCallback } from 'react';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@/components/AnimationContext';
import { AnimatedText, H1, H2, P } from "@/components/typography";

const AccordionItem = memo(({ item, originalIndex, isOpen, onToggle, delay }) => {
    const { isPageTransitionComplete } = useAnimation();
    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={isPageTransitionComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: isPageTransitionComplete ? delay : 0, duration: 0.6 }}
        >
            <motion.button
                onClick={() => onToggle(originalIndex)}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <span className="text-sm md:text-base font-medium text-gray-900 pr-4">
                    {item.question}
                </span>
                <motion.div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-prime text-white"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown size={18} />

                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            className="px-4 pb-4 text-sm"
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {item.answer}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

export default function page() {
    const [activeTab, setActiveTab] = useState('employee');
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = {
        employee: [
            {
                question: "How do I create an account on the job portal?",
                answer: "To create an account on the job portal, simply click on the 'Register' or 'Sign Up' button on the homepage, select whether you are a job seeker or an employer, fill in your basic details such as name, email, phone number, and password, verify your account through the link sent to your email or the code sent to your mobile, and then complete your profile by uploading your resume and adding details like skills, education, and experience."
            },
            {
                question: "How do I search and apply for jobs?",
                answer: "You can search for jobs using the search bar on the homepage or browse through job categories. Use filters to narrow down results by location, salary, experience level, and company. Click on any job listing to view details and click 'Apply Now' to submit your application."
            },
            {
                question: "Can I apply for multiple jobs at the same time?",
                answer: "Yes, you can apply for multiple jobs simultaneously. There's no limit to the number of applications you can submit. However, make sure to tailor your application for each position to increase your chances of success."
            },
            {
                question: "What should I do if I forget my password?",
                answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Enter your registered email address or phone number, and you'll receive a password reset link or OTP to create a new password."
            },
            {
                question: "How do employers contact me after I apply?",
                answer: "Employers will contact you through the email address or phone number provided in your profile. Make sure your contact information is up-to-date. You may also receive notifications through the job portal's messaging system."
            },
            {
                question: "How do I track the status of my job applications?",
                answer: "You can track your application status by logging into your account and visiting the 'My Applications' section. Here you'll see all your submitted applications with their current status: Applied, Under Review, Shortlisted, or Rejected."
            }
        ],
        employer: [
            {
                question: "How do I post a job on the portal?",
                answer: "To post a job, log into your employer account, click on 'Post a Job' button, fill in the job details including title, description, requirements, salary range, and location. Review your posting and click 'Publish' to make it live."
            },
            {
                question: "How can I search for candidates?",
                answer: "Use the candidate search feature to find potential employees. You can filter by skills, experience, location, education, and other criteria. Browse through profiles and contact suitable candidates directly."
            },
            {
                question: "What is the cost of posting jobs?",
                answer: "We offer various pricing plans for employers. Basic job postings may be free for a limited time, while premium features like featured listings, extended visibility, and advanced candidate search tools are available through paid plans."
            },
            {
                question: "How do I manage job applications?",
                answer: "Access your employer dashboard to view all applications for your posted jobs. You can sort, filter, and review applications, shortlist candidates, schedule interviews, and update application statuses."
            }
        ],
        courseLearners: [
            {
                question: "How do I enroll in a course?",
                answer: "Browse our course catalog, select the course you're interested in, review the curriculum and requirements, and click 'Enroll Now'. Complete the payment process if it's a paid course, or simply register for free courses."
            },
            {
                question: "Are the courses certified?",
                answer: "Yes, most of our courses offer certificates upon successful completion. These certificates are industry-recognized and can be added to your professional profile to enhance your career prospects."
            },
            {
                question: "Can I access courses on mobile devices?",
                answer: "Absolutely! Our platform is mobile-friendly, allowing you to access course content, watch videos, take quizzes, and track your progress from any device, anywhere, anytime."
            },
            {
                question: "What if I need help during the course?",
                answer: "We provide comprehensive support through discussion forums, direct messaging with instructors, live Q&A sessions, and dedicated customer support. You're never alone in your learning journey."
            }
        ]
    };

    const accordionData = faqData[activeTab];

    const toggleAccordion = useCallback((index) => {
        setOpenIndex(prev => prev === index ? null : index);
    }, []);

    const leftColumn = accordionData.filter((_, index) => index % 2 === 0);
    const rightColumn = accordionData.filter((_, index) => index % 2 === 1);

    return (
        <>
            <Section className="py-12">
                <div className="text-center mb-6">
                    <span className="border rounded-full text-black py-1 px-10">FAQs</span>
                </div>
                <H1 className="text-center text-black">Frequently Asked Questions</H1>
                <P className="text-center max-w-3xl mx-auto my-4">We understand you may have questions before getting started. To make things easier, we’ve gathered a list of the most frequently asked questions along with clear, straightforward answers.</P>

                <div className="relative border-b-4 border-prime/20 mb-8">
                    <div className="flex justify-center gap-8 -mb-1">
                        <button
                            onClick={() => { setActiveTab('employee'); setOpenIndex(0); }}
                            className={`py-3 font-medium transition-all duration-300 relative ${
                                activeTab === 'employee'
                                    ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-prime after:transition-all after:duration-300'
                                    : 'text-gray-600 hover:text-prime after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-prime after:transition-all after:duration-300 hover:after:w-full'
                            }`}
                        >
                            Employee
                        </button>
                        <button
                            onClick={() => { setActiveTab('employer'); setOpenIndex(0); }}
                            className={`py-3 font-medium transition-all duration-300 relative ${
                                activeTab === 'employer'
                                    ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-prime after:transition-all after:duration-300'
                                    : 'text-gray-600 hover:text-prime after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-prime after:transition-all after:duration-300 hover:after:w-full'
                            }`}
                        >
                            Employer
                        </button>
                        <button
                            onClick={() => { setActiveTab('courseLearners'); setOpenIndex(0); }}
                            className={`py-3 font-medium transition-all duration-300 relative ${
                                activeTab === 'courseLearners'
                                    ? 'text-prime after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-prime after:transition-all after:duration-300'
                                    : 'text-gray-600 hover:text-prime after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-prime after:transition-all after:duration-300 hover:after:w-full'
                            }`}
                        >
                            Course Learners
                        </button>
                    </div>
           
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
                    <div className="space-y-6">
                        {leftColumn.map((item, index) => {
                            const originalIndex = accordionData.indexOf(item);
                            return (
                                <AccordionItem
                                    key={originalIndex}
                                    item={item}
                                    originalIndex={originalIndex}
                                    isOpen={openIndex === originalIndex}
                                    onToggle={toggleAccordion}
                                    delay={index * 0.1}
                                />
                            );
                        })}
                    </div>

                    <div className="space-y-6">
                        {rightColumn.map((item, index) => {
                            const originalIndex = accordionData.indexOf(item);
                            return (
                                <AccordionItem
                                    key={originalIndex}
                                    item={item}
                                    originalIndex={originalIndex}
                                    isOpen={openIndex === originalIndex}
                                    onToggle={toggleAccordion}
                                    delay={(index + leftColumn.length) * 0.1}
                                />
                            );
                        })}
                    </div>
                </div>
            </Section>
        </>
    )
}
