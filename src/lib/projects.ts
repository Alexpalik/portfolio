export interface ProjectData{
    title:string;
    shortDescription:string;
    fullDescription:string;
    backgroundColor:string;
    textColor:string;
    imageSrc:string;
}



export const projects: Record<string, ProjectData> = {
    "4028": {
        title: "4028 Store Full-Stack",
        shortDescription: "A comprehensive full-stack school project built with custom HTML, CSS, JavaScript, Python, MongoDB, and Docker.",
        fullDescription: "4028 is a full-stack e-commerce project developed as part of my academic curriculum. Built from the ground up using custom HTML, CSS, and JavaScript for the frontend, Python for the backend, MongoDB for database management, and Docker for containerization. This project demonstrates proficiency in modern web development technologies and DevOps practices.",
        backgroundColor: "rgb(232, 84, 55)", // Indigo
        textColor: "rgb(255, 208, 0)",
        imageSrc: "/gemini6.png"
    },
    "amg": {
        title: "AMG Pharmaceuticals",
        shortDescription: "High-revenue medicine company with multiple page developments and adjustments as a Shopify developer.",
        fullDescription: "AMG is a leading pharmaceutical company generating high revenue in the healthcare sector. As a Shopify developer, I worked extensively on developing multiple pages, implementing custom features, and making various adjustments to optimize their online presence and enhance user experience in the medical e-commerce space.",
        backgroundColor: "white", // Emerald/Green
        textColor: "rgb(180, 0, 27)",
        imageSrc: "/gemini1.png"
    },
    "hyperloq": {
        title: "Hyperloq Dragon's Den",
        shortDescription: "Dragon's Den featured project where I implemented custom Shopify adjustments and optimizations.",
        fullDescription: "Hypeloq is an innovative venture that gained recognition on Dragon's Den. I contributed as a Shopify developer, implementing custom adjustments, optimizing the user interface, and ensuring the platform meets the high standards expected from a Dragon's Den featured company. This project showcases my ability to work with high-profile clients.",
        backgroundColor: "rgb(42, 42, 45)", // Red
        textColor: "#ffffff",
        imageSrc: "/gemini4.png"
    },
    "widestep": {
        title: "Widestep Shopify",
        shortDescription: "My first Shopify freelancer project - a complete new website built from scratch on the Shopify platform.",
        fullDescription: "Widestep marks my first professional Shopify freelancing project. I built this entire website from scratch on the Shopify platform, handling everything from design implementation to functionality development. This project was a significant milestone in my freelance career, establishing my expertise in Shopify development.",
        backgroundColor: "rgb(252, 246, 232)", // Sky Blue
        textColor: "rgb(0, 30, 98)",
        imageSrc: "/gemini5.png"
    },
    "females": {
        title: "Females Shopify",
        shortDescription: "A custom-built website created with Shopify, showcasing unique design and functionality tailored to the brand.",
        fullDescription: "Females is a custom website built entirely on the Shopify platform. This project involved creating a unique design that reflects the brand's identity, implementing custom functionality, and ensuring a seamless user experience. The site demonstrates my ability to leverage Shopify's capabilities to create distinctive, custom solutions.",
        backgroundColor: "rgb(219, 39, 119)", // Pink/Rose
        textColor: "#ffffff",
        imageSrc: "/gemini2.png"
    }
}