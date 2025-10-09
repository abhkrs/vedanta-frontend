'use client';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Section from '@/components/uielements/Section';
import { H1, P } from '@/components/typography';
import GridDistortion from '@/components/GridDistortion';
import { motion } from 'framer-motion';
import { useAnimation } from '@/components/AnimationContext';
import Heading from '@/components/typography/Heading';
import PreloaderLink from '@/components/PreloaderLink';

export default function BlogDetails() {
  const { slug } = useParams();
  const { isPageTransitionComplete } = useAnimation();
  const shouldAnimate = isPageTransitionComplete;

  const relatedPosts = [
    {
      id: 2,
      title: "AI-Driven Drug Discovery Accelerates Development",
      slug: "ai-driven-drug-discovery-accelerates-development",
      image: "/bg.webp",
      date: "Nov 4, 2024 10:22:15 AM",
      readTime: "2 min read"
    },
    {
      id: 3,
      title: "New CRDMO Partnership Models Emerge",
      slug: "regulatory-updates-reshape-global-clinical-practices",
      image: "/bg_details.webp",
      date: "Nov 3, 2024 3:45:20 PM",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Biosimilar Market Expansion in Asia Pacific",
      slug: "biosimilar-market-expansion-asia-pacific",
      image: "/bg.webp",
      date: "Nov 2, 2024 11:30:45 AM",
      readTime: "2 min read"
    },
    {
      id: 5,
      title: "Quality Control Innovations in Pharmaceutical Manufacturing",
      slug: "quality-control-innovations-pharmaceutical-manufacturing",
      image: "/bg_details.webp",
      date: "Nov 1, 2024 9:15:30 AM",
      readTime: "3 min read"
    }
  ];

  const blogData = {
    'regulatory-updates-reshape-global-clinical-practices': {
      title: "Regulatory Updates Reshape Global Clinical Practices",
      image: "/bg_details.webp",
      date: "Nov 6, 2024 4:36:46 PM",
      readTime: "5 min read",
      content: `In today's rapidly evolving healthcare landscape, regulatory bodies around the world are implementing new guidelines that are reshaping how clinical practices operate. From patient safety measures to digital health integration, these changes aim to ensure that medical innovations are both effective and accessible while maintaining the highest ethical standards. For healthcare providers and researchers, staying informed about these updates is no longer optional—it is essential for compliance and long-term success.

## Clinical Trial Transparency and Data Sharing

One of the most significant shifts has been the tightening of requirements around clinical trial transparency and data sharing. Authorities such as the U.S. Food and Drug Administration (FDA) and the European Medicines Agency (EMA) are emphasizing real-world evidence and patient-centric outcomes. This move ensures that therapies not only demonstrate efficacy in controlled environments but also prove beneficial across diverse patient populations in everyday practice. As a result, clinicians must adapt their reporting and data management practices to align with these expectations.

## Digital Health Regulation

Digital health regulation is another key area driving change. The rise of telemedicine, AI-driven diagnostics, and wearable health technologies has prompted regulators to establish frameworks that balance innovation with patient protection. Countries such as the UK, Singapore, and Australia are leading the way with digital health standards, setting benchmarks for cybersecurity, interoperability, and ethical AI use. For clinical practitioners, these policies mean integrating new tools into care pathways while remaining vigilant about data security and compliance.

## Global Harmonization Efforts

Global harmonization efforts are also reshaping clinical practice. Initiatives like the International Council for Harmonisation (ICH) aim to create consistency across borders, reducing duplication in research and accelerating the availability of new treatments. This trend benefits multinational clinical trials, enabling researchers to design studies that meet multiple regulatory requirements simultaneously. For practitioners, harmonization translates into earlier access to breakthrough therapies and more standardized care approaches across regions.

## Looking Ahead

Looking ahead, the pace of regulatory change is expected to accelerate as science and technology continue to advance. For clinicians and healthcare organizations, the ability to adapt will be a defining factor in maintaining high-quality care and fostering innovation. By actively monitoring regulatory updates, investing in compliance training, and embracing digital transformation, global clinical practices can position themselves at the forefront of patient-centered healthcare.

## Ethical Oversight and Patient Consent

Another critical area of regulatory reform involves ethical oversight and patient consent. Regulators are strengthening guidelines around informed consent, ensuring that patients are fully aware of potential risks, benefits, and alternatives before participating in clinical trials or treatments. This is especially important in regions where cultural and language differences may have previously led to misunderstandings. By reinforcing patient rights and autonomy, global regulators are driving a cultural shift toward greater trust and transparency in clinical practice.`
    },
    'ai-driven-drug-discovery-accelerates-development': {
      title: "AI-Driven Drug Discovery Accelerates Development",
      image: "/bg.webp",
      date: "Nov 4, 2024 10:22:15 AM",
      readTime: "2 min read",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  };

  const blog = blogData[slug];

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <Section className="py-12">
        <article>
          <div className="w-full aspect-[63/25] rounded-t-xl overflow-hidden">
            <GridDistortion
              imageSrc={blog.image}
              grid={10}
              mouse={0.1}
              strength={0.15}
              relaxation={0.9}
            />
          </div>

          <div className="bg-white shadow-md rounded-b-xl px-4 md:px-14 lg:px-24 xl:px-32 py-3 md:py-5 lg:py-8">
            <H1 className='!text-xl md:!text-2xl  text-black'>{blog.title}</H1>
            <div className="flex items-center text-sm text-gray-600 my-4">
              <span>{blog.date}</span>
              <span className="mx-2 md:mx-4">|</span>
              <span>{blog.readTime}</span>
            </div>
            <motion.div
              className='prose prose-sm text-black'
              initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className='text-2xl font-bold mt-8 mb-4 '>{children}</h1>,
                  h2: ({ children }) => <h2 className='text-xl font-semibold mt-6 mb-3 '>{children}</h2>,
                  h3: ({ children }) => <h3 className='text-lg font-semibold mt-5 mb-2'>{children}</h3>,
                  h4: ({ children }) => <h3 className='text-base font-semibold mt-5 mb-2'>{children}</h3>,
                  p: ({ children }) => <p className='mb-4 text-md leading-relaxed'>{children}</p>,
                  strong: ({ children }) => <strong className='font-semibold '>{children}</strong>,
                  em: ({ children }) => <em className='italic'>{children}</em>,
                  ul: ({ children }) => <ul className='list-disc list-inside mb-4 space-y-1'>{children}</ul>,
                  ol: ({ children }) => <ol className='list-decimal list-inside mb-4 space-y-1'>{children}</ol>,
                  li: ({ children }) => <li className='mb-1'>{children}</li>,
                  a: ({ href, children }) => <a href={href} className='underline'>{children}</a>,
                  img: ({ src, alt }) => <img src={src} alt={alt} className='w-full h-auto rounded-lg my-4' />,
                  blockquote: ({ children }) => <blockquote className='border-l-4  pl-4 italic my-4'>{children}</blockquote>,
                  code: ({ children }) => <code className='bg-gray-100 px-2 py-1 rounded text-sm'>{children}</code>,
                  pre: ({ children }) => <pre className='bg-gray-100 p-4 rounded-lg overflow-x-auto my-4'>{children}</pre>
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </motion.div>
          </div>
        </article>
      </Section>
      <Section className="mb-6 lg:mb-8">
        <div className="flex justify-between items-center gap-4">
          <div>
            <Heading
              black="Related"
              green="Industry News"
            />
            <P>Stay informed with the most recent updates, trends, and insights shaping the global pharma and biotech landscape.</P>
          </div>
          <div>
            <PreloaderLink href="/blogs">
              View All
            </PreloaderLink>
          </div>
        </div>

   
      </Section>
    </>
  );
}