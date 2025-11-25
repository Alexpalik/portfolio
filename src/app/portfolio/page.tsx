import React from 'react'

const PortfolioPage = () => {
  return (
    <>
      <div className="bg-black text-white !overflow-x-hidden min-h-screen"
        style={{
          backgroundImage: "url('/bg-3.jpg')",
          backgroundAttachment: "fixed" // Optional: makes background stay in place while scrolling
        }}>
        <section className="md:p-50 pt-15 p-10 flex flex-col gap-20">
          <div className="flex flex-col items-center justify-center">
            <div className="h-[1px] w-full bg-white text-white  mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                Freelance Experience
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>Maintaining an active Upwork profile with hands-on freelance experience, working directly with clients to deliver web development projects. This platform has provided valuable exposure to real-world client requirements, project management, and professional communication in remote work environments</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[1px] w-full bg-white text-white mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                Academic Foundation
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>Currently completing my final year in Computer Science at Aristotle University of Thessaloniki, developing comprehensive expertise in software engineering, algorithms, and modern development methodologies that bridge theoretical concepts with practical, industry-ready solutions.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[1px] w-full bg-white text-white mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                Shopify Development Expertise
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>One year of hands-on experience building and customizing Shopify stores, mastering Liquid templating, theme development, and app integrations. Successfully delivered e-commerce solutions that enhanced user experience and drove business growth through optimized performance and seamless functionality.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[1px] w-full bg-white text-white  mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                Effective Communication & Coordination
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>Excellent communication and coordination skills between different teams and clients, ensuring smooth running of projects and their successful completion. I have a proven track record of building strong working relationships and effective project management.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[1px] w-full bg-white text-white  mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                English Language Proficiency
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>Certified with Michigan English Language Proficiency, demonstrating advanced command of written and verbal communication skills. Capable of articulating complex technical concepts clearly and collaborating effectively in international, English-speaking development environments with confidence and precision.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  justify-center">
            <div className="h-[1px] w-full bg-white text-white  mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                Self-Directed Learning & Development
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>Initiated my web development journey through comprehensive online education, completing tutorials on Udemy, Codecademy, and YouTube covering HTML, CSS, JavaScript fundamentals, and Shopify Liquid templating. This self-motivated approach to learning demonstrates strong initiative and commitment to continuous skill development in rapidly evolving technologies. </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  justify-center">
            <div className="h-[1px] w-full bg-white text-white  mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                Tools I Have Used
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>HTML5, CSS3, JavaScript (ES6+), TypeScript, React, Next.js, Vue.js , Supabase, GSAP, Tailwind CSS, Git, npm/yarn/pnpm , Vercel,  RESTful APIs , Figma , Shopify , Liquid , Mongo DB , MySQL , Docker </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  justify-center">
            <div className="h-[1px] w-full bg-white text-white  mb-4"></div>
            <div className="flex flex-col md:flex-row justify-between  gap-4">
              <div className="text-sm md:text-base md:w-1/2">
                Current Learning Focus
              </div>
              <div className="text-sm md:text-base md:w-1/2">
                <p>Currently expanding my expertise by learning Next.js with Supabase integration, focusing on modern full-stack development practices, authentication systems, and real-time database management to stay current with industry-leading technologies and frameworks.</p>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  )
}

export default PortfolioPage