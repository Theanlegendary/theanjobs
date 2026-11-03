import os
import re

portal_data_path = r'Builtin-Clone/artifacts/builtin-recreation/src/data/portalData.ts'
with open(portal_data_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. New jobs to append to jobsDatabase
new_jobs_code = '''
  // ============================================================================
  // SERVICENOW JOBS
  // ============================================================================
  {
    id: 'job-now-1',
    title: 'Staff Enterprise Cloud & Workflow Architect',
    company: 'ServiceNow',
    companySlug: 'servicenow',
    logo: '/images/home_logo_servicenow.png',
    buildingImage: '/images/dir_servicenow.png',
    location: 'Santa Clara, CA & Singapore',
    workplaceType: 'Hybrid',
    seniority: 'Staff / Principal',
    department: 'Cloud Infrastructure & Engineering',
    compensation: '$185,000 - $240,000',
    salaryPeriod: '/ year',
    perks: ['Equity Stock Options (RSUs)', 'Comprehensive Healthcare & 401(k) Match', 'Annual Education Budget', 'Flexible Work Setup'],
    datePosted: 'Today',
    timeAgo: '2 hours ago',
    badge: 'Featured',
    shortDesc: "Lead multi-cloud enterprise orchestration, distributed resilience architectures, and next-generation workflow services on the ServiceNow platform.",
    fullDesc: "ServiceNow is searching for a visionary Staff Enterprise Cloud & Workflow Architect to drive high-availability cloud architecture across our global data centers. You will define technical roadmaps for distributed systems powering millions of mission-critical business transactions.",
    responsibilities: [
      'Architect highly resilient, distributed cloud services with 99.999% SLA requirements.',
      'Partner with enterprise engineering teams to integrate large-scale workflow engines and real-time event pipelines.',
      'Guide technical choices in containerization (Kubernetes), microservices, and database clustering.',
      'Mentor senior engineers and evangelize clean system design principles across international tech hubs.'
    ],
    requirements: [
      '8+ years in cloud infrastructure, enterprise software development, and distributed systems architecture.',
      'Deep mastery of Java, Go, TypeScript, and modern asynchronous architectures.',
      'Demonstrated track record of delivering enterprise-grade SaaS platforms at multi-petabyte scale.',
      'BS, MS, or PhD in Computer Science, Software Engineering, or equivalent experience.'
    ],
    teamQuote: {
      text: "At ServiceNow, your code directly automates the most complex operational challenges for the Fortune 500.",
      author: "Jennifer Patel",
      role: "VP of Cloud Platform Engineering",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    similarJobIds: ['job-now-2', 'job-now-3', 'job-braze']
  },
  {
    id: 'job-now-2',
    title: 'Senior Platform Full-Stack Engineer (React & Java)',
    company: 'ServiceNow',
    companySlug: 'servicenow',
    logo: '/images/home_logo_servicenow.png',
    buildingImage: '/images/photo_servicenow_bldg.png',
    location: 'Santa Clara, CA',
    workplaceType: 'Hybrid',
    seniority: 'Senior',
    department: 'Product Architecture & UX',
    compensation: '$150,000 - $195,000',
    salaryPeriod: '/ year',
    perks: ['Performance Bonus', 'Wellness Stipend', 'Parental Leave', '401(k) Matching'],
    datePosted: '1 day ago',
    timeAgo: '1 day ago',
    badge: 'Verified',
    shortDesc: "Build lightning-fast, accessible web components and robust backend APIs for millions of enterprise workplace users.",
    fullDesc: "Join our UI Platform Engineering squad building high-performance design systems, real-time client state hydration, and micro-frontend orchestrations for the ServiceNow Now Platform.",
    responsibilities: [
      'Develop reactive front-end architectures utilizing modern React, TypeScript, and web components.',
      'Construct high-throughput backend services using Java, Spring Boot, and GraphQL.',
      'Enforce strict WCAG 2.1 AA accessibility standards and sub-second page performance benchmarks.',
      'Collaborate closely with UX researchers and design systems architects.'
    ],
    requirements: [
      '5+ years of full-stack engineering experience in high-traffic web environments.',
      'Strong expertise in modern JavaScript/TypeScript, React internals, and state management.',
      'Proficiency in Java, RESTful services, and SQL/NoSQL database modeling.'
    ],
    similarJobIds: ['job-now-1', 'job-braze']
  },
  {
    id: 'job-now-3',
    title: 'Enterprise AI & Agentic Workflow Specialist',
    company: 'ServiceNow',
    companySlug: 'servicenow',
    logo: '/images/home_logo_servicenow.png',
    buildingImage: '/images/dir_servicenow.png',
    location: 'Remote - US / Global',
    workplaceType: 'Remote',
    seniority: 'Senior / Lead',
    department: 'Generative AI & Machine Learning',
    compensation: '$165,000 - $215,000',
    salaryPeriod: '/ year',
    perks: ['100% Remote Flexibility', 'Home Office Allowance', 'Annual Tech Stipend', 'Health & Dental'],
    datePosted: '2 days ago',
    timeAgo: '2 days ago',
    badge: 'Hot Role',
    shortDesc: "Design generative AI agents, enterprise LLM orchestration layers, and automated workflow triggers.",
    fullDesc: "ServiceNow is pioneering domain-specific generative AI models for enterprise IT, HR, and customer service. As an Enterprise AI Specialist, you will architect retrieval-augmented generation (RAG) frameworks and autonomous workflow agents.",
    responsibilities: [
      'Develop agentic workflows that parse complex enterprise tickets and automate multi-system resolutions.',
      'Fine-tune open weights and proprietary LLMs for task-specific enterprise workflows.',
      'Evaluate model hallucinations, safety, latency, and compliance guardrails.'
    ],
    requirements: [
      'Proven experience training or fine-tuning transformer models and deploying RAG pipelines.',
      'Solid command of Python, PyTorch, LangChain, vLLM, and vector search indices.',
      'Passion for productionizing autonomous AI agents with safety and reliability.'
    ],
    similarJobIds: ['intern-metfone', 'job-now-1']
  },

  // ============================================================================
  // GENERAL MOTORS JOBS
  // ============================================================================
  {
    id: 'job-gm-1',
    title: 'Autonomous Vehicle Systems Software Engineer',
    company: 'General Motors',
    companySlug: 'gm',
    logo: '/images/home_logo_gm.png',
    buildingImage: '/images/dir_gm.png',
    location: 'Detroit, MI',
    workplaceType: 'On-site',
    seniority: 'Senior',
    department: 'Automotive & Autonomous Systems',
    compensation: '$160,000 - $210,000',
    salaryPeriod: '/ year',
    perks: ['Vehicle Lease Program', 'Relocation Assistance', '401(k) Match with Immediate Vesting', 'On-site Test Track Access'],
    datePosted: 'Yesterday',
    timeAgo: '1 day ago',
    badge: 'Featured',
    shortDesc: "Develop safety-critical software for next-generation automated driving and real-time vehicle computing platforms.",
    fullDesc: "General Motors Software & AV division is redefining the future of transportation. You will write high-performance C++ software running directly on our vehicle edge computers, controlling vehicle dynamics, sensor fusion, and drive-by-wire subsystems.",
    responsibilities: [
      'Implement deterministic C++ algorithms for autonomous perception, localization, and trajectory planning.',
      'Integrate sensor inputs from LiDAR, radar, cameras, and ultrasonics into cohesive environmental representations.',
      'Validate software in Hardware-in-the-Loop (HIL) simulators and on test-track proving grounds.'
    ],
    requirements: [
      'Bachelor’s or Master’s in Robotics, Electrical Engineering, or Computer Science.',
      'Strong modern C++ (C++17/20) and real-time operating systems (RTOS/QNX/Linux) background.',
      'Experience with ISO 26262 functional safety and automotive communication protocols (CAN/Ethernet).'
    ],
    teamQuote: {
      text: "We are engineering zero crashes, zero emissions, and zero congestion into our vehicles every single day.",
      author: "Marcus Ray",
      role: "Chief Engineer, Autonomous Software Platforms",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    similarJobIds: ['job-now-1', 'job-axon-1']
  },

  // ============================================================================
  // PFIZER JOBS
  // ============================================================================
  {
    id: 'job-pfizer-1',
    title: 'Senior Computational Biology & AI Lead',
    company: 'Pfizer',
    companySlug: 'pfizer',
    logo: '/images/home_logo_pfizer.png',
    buildingImage: '/images/dir_pfizer.png',
    location: 'New York, NY & Global',
    workplaceType: 'Hybrid',
    seniority: 'Principal / Lead',
    department: 'Biopharma & Computational Biology',
    compensation: '$170,000 - $225,000',
    salaryPeriod: '/ year',
    perks: ['Comprehensive Medical & Prescription Drug Coverage', 'Performance Incentive Plan', 'Tuition Reimbursement', 'Flexible Hours'],
    datePosted: '2 days ago',
    timeAgo: '2 days ago',
    badge: 'Featured',
    shortDesc: "Apply deep learning and molecular simulations to accelerate breakthrough therapeutics and vaccine discovery.",
    fullDesc: "Join Pfizer Digital & R&D as we deploy frontier AI models to unlock novel small molecules, mRNA designs, and oncology therapies. You will work side-by-side with wet-lab chemists and clinical trial researchers.",
    responsibilities: [
      'Build generative molecular chemistry models and 3D protein structure prediction pipelines.',
      'Analyze multi-omic datasets (genomics, transcriptomics, proteomics) to identify novel therapeutic targets.',
      'Deploy scalable machine learning pipelines on AWS and high-performance computing (HPC) clusters.'
    ],
    requirements: [
      'PhD or Master’s with 4+ years experience in Bioinformatics, Computational Chemistry, or ML for biology.',
      'Proficiency with Python, PyTorch, RDKit, BioPython, and HPC orchestration (Slurm/Nextflow).',
      'Track record of impactful contributions to published scientific literature or pharmaceutical discovery.'
    ],
    teamQuote: {
      text: "Our computational models shorten the drug discovery pipeline from years to months, directly saving lives.",
      author: "Dr. Rachel Zhang",
      role: "Head of Computational Chemistry & Genomic AI",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    },
    similarJobIds: ['job-now-3', 'intern-metfone']
  },

  // ============================================================================
  // GRAB JOBS
  // ============================================================================
  {
    id: 'job-grab-1',
    title: 'Lead Backend Systems Engineer - Superapp Dispatch',
    company: 'Grab',
    companySlug: 'grab',
    logo: '/images/logo_grab_clean.png',
    buildingImage: '/images/dir_grab.png',
    location: 'Singapore',
    workplaceType: 'Hybrid',
    seniority: 'Lead',
    department: 'Superapp & Fintech Infrastructure',
    compensation: '$110,000 - $150,000 SGD',
    salaryPeriod: '/ year',
    perks: ['GrabFlex Benefits & Ride Credits', 'Comprehensive Medical & Dental Coverage', 'Hybrid 3/2 Flexibility', 'Annual Growth Grant'],
    datePosted: 'Today',
    timeAgo: '3 hours ago',
    badge: 'Featured',
    shortDesc: "Scale Grab's dynamic matching engine handling millions of real-time ride and delivery requests per second across Southeast Asia.",
    fullDesc: "Grab powers mobility, food deliveries, and digital payments across 8 Southeast Asian nations. As a Lead Backend Systems Engineer, you will maintain and optimize the geospatial dispatching algorithms that connect millions of passengers and merchants.",
    responsibilities: [
      'Design ultra-low-latency Go microservices handling hundreds of thousands of concurrent booking streams.',
      'Optimize geospatial indexing (H3, S2 geometry) and real-time Kafka event pub/sub topologies.',
      'Drive resilience testing, chaos engineering, and zero-downtime multi-region deployments.'
    ],
    requirements: [
      '6+ years developing high-scale distributed backend systems in Go, Java, or C++.',
      'Mastery of relational and distributed NoSQL databases (MySQL, Redis, DynamoDB, Cassandra).',
      'Deep understanding of network protocols, TCP/gRPC, and distributed consensus.'
    ],
    similarJobIds: ['job-shopee-1', 'job-now-1']
  },

  // ============================================================================
  // SHOPEE JOBS
  // ============================================================================
  {
    id: 'job-shopee-1',
    title: 'Tech Lead - High-Throughput E-Commerce Order Processing',
    company: 'Shopee (Sea Group)',
    companySlug: 'shopee',
    logo: '/images/logo_shopee_clean.png',
    buildingImage: '/images/dir_shopee.png',
    location: 'Singapore & Bangkok',
    workplaceType: 'Hybrid',
    seniority: 'Lead / Principal',
    department: 'E-Commerce & Interactive Platforms',
    compensation: '$120,000 - $160,000 SGD',
    salaryPeriod: '/ year',
    perks: ['Sea Group Stock Incentive', 'Annual Travel & Learning Stipend', 'Catered Lunch & Healthy Snacks', 'Full Family Health Coverage'],
    datePosted: '1 day ago',
    timeAgo: '1 day ago',
    badge: 'Featured',
    shortDesc: "Architect mega-sale high-concurrency order placement and flash-sale checkout engines resilient to 50x traffic spikes.",
    fullDesc: "Shopee is the leading e-commerce platform in Southeast Asia and Taiwan. Join the core transaction squad responsible for maintaining high availability, instantaneous inventory deductions, and fraud prevention during 11.11 and 12.12 global shopping festivals.",
    responsibilities: [
      'Architect robust order processing engines resilient to millions of queries per second during mega sales.',
      'Implement distributed lock mechanisms, idempotency barriers, and eventual consistency reconciliations.',
      'Mentor senior engineers in database sharding, caching strategies, and capacity engineering.'
    ],
    requirements: [
      '7+ years experience in high-concurrency internet architecture and e-commerce transactions.',
      'Deep expertise in Go or C++, Redis clustering, Kafka, and sharded MySQL/TiDB.',
      'Proven track record handling massive traffic surges with zero transactional loss.'
    ],
    similarJobIds: ['job-grab-1', 'job-now-1']
  },

  // ============================================================================
  // AXON ENTERPRISE JOBS
  // ============================================================================
  {
    id: 'job-axon-1',
    title: 'Senior Cloud Platform Engineer - Evidence.com',
    company: 'Axon Enterprise',
    companySlug: 'axon',
    logo: '/images/logo_axon_clean.png',
    buildingImage: '/images/dir_axon.png',
    location: 'Scottsdale, AZ & Remote',
    workplaceType: 'On-site',
    seniority: 'Senior',
    department: 'Connected Public Safety & Cloud Software',
    compensation: '$155,000 - $200,000',
    salaryPeriod: '/ year',
    perks: ['Axon Stock Grants', 'Unlimited PTO', 'Comprehensive Health & Vision', 'On-site Gym & Wellness Center'],
    datePosted: '2 days ago',
    timeAgo: '2 days ago',
    badge: 'Hot Role',
    shortDesc: "Develop secure, compliant cloud evidence storage and redaction AI tools utilized by law enforcement and public safety worldwide.",
    fullDesc: "Axon Enterprise builds connected hardware (body cameras, TASER devices) and cloud software that protects life and preserves truth. As a Senior Cloud Platform Engineer on Evidence.com, you will engineer CJIS-compliant multimedia pipelines at petabyte scale.",
    responsibilities: [
      'Architect scalable media transcoding and computer-vision redaction pipelines in AWS and Azure GovCloud.',
      'Ensure strict compliance with federal public safety data governance, audit trails, and cryptographically verified chains of custody.',
      'Collaborate with edge camera hardware teams to deliver instant live streaming and situational awareness.'
    ],
    requirements: [
      '5+ years experience building cloud software in Scala, Java, Go, or modern C#/.NET Core.',
      'Strong background in AWS services, microservices architecture, and Docker/Kubernetes.',
      'Passion for mission-critical software where reliability and security directly impact lives.'
    ],
    similarJobIds: ['job-gm-1', 'job-now-1']
  },
'''

# 2. Complete Company Profiles to add to companiesDatabase
new_companies_code = '''
  // ============================================================================
  // SERVICENOW
  // ============================================================================
  {
    id: 'servicenow',
    slug: 'servicenow',
    name: 'ServiceNow, Inc.',
    shortName: 'ServiceNow',
    tier: 'ENTERPRISE CLOUD LEADER',
    hq: 'Santa Clara, CA & Singapore APAC Hub',
    size: '22,000+ Global Employees',
    founded: '2004',
    industry: 'Enterprise Cloud & Workflow Automation',
    jobsCount: 48,
    website: 'https://www.servicenow.com',
    heroImg: '/images/dir_servicenow.png',
    logoImg: '/images/home_logo_servicenow.png',
    desc: 'ServiceNow makes work work better for everyone. Our cloud-based platform and digital workflow solutions optimize enterprise productivity, connect disparate legacy systems, and deliver seamless experiences for employees, customers, and partners worldwide.',
    stat1Label: 'Enterprise Customers', stat1Val: '8,100+ Global Orgs',
    stat2Label: 'Annual Renewal Rate', stat2Val: '98.5% Client Retention',
    stat3Label: 'Fortune 500 Adoption', stat3Val: '85%+ Trust ServiceNow',
    quoteText: 'We put AI to work for people. By transforming complex operations into intuitive digital workflows, we empower enterprises across the globe to innovate with unprecedented agility.',
    quoteAuthor: 'Bill McDermott · Chairman & CEO',
    photos: [
      '/images/dir_servicenow.png',
      '/images/photo_servicenow_bldg.png',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'recruitment@servicenow.com',
    phone: '+1 (408) 501-8550',
    address: '2225 Lawson Lane, Santa Clara, CA 95054',
    certs: [
      'ISO/IEC 27001 & 27018 Certified Cloud',
      'SOC 1 Type II & SOC 2 Type II Audited',
      'FedRAMP High Authorized Cloud Provider',
      'GDPR, HIPAA, and CCPA Data Governance'
    ],
    hiringCategories: [
      { name: 'Cloud Infrastructure & Distributed Platforms', count: 18 },
      { name: 'Generative AI & Enterprise Automation', count: 12 },
      { name: 'Full-Stack & Product Architecture', count: 10 },
      { name: 'Enterprise Security & Compliance', count: 8 }
    ],
    techStack: [
      { name: 'ServiceNow Now Platform', category: 'Core Platform', icon: 'server' },
      { name: 'Java & Spring Framework', category: 'Backend Services', icon: 'code' },
      { name: 'React & TypeScript', category: 'Frontend Architecture', icon: 'layout' },
      { name: 'Kubernetes & Docker', category: 'Container Orchestration', icon: 'box' },
      { name: 'GraphQL & REST APIs', category: 'Service Connectivity', icon: 'network' },
      { name: 'Apache Kafka & Redis', category: 'Event Streaming & Caching', icon: 'activity' }
    ],
    cultureValues: [
      { title: 'Win as a Team', desc: 'We foster collective excellence, transparency, and cross-functional camaraderie across all our global teams.' },
      { title: 'Innovate with Purpose', desc: 'Every solution we build eliminates human friction and transforms outdated enterprise processes.' },
      { title: 'Belong and Prosper', desc: 'We cultivate an inclusive environment where individuals thrive and bring their authentic selves to work.' }
    ],
    offices: [
      { name: 'Global Headquarters Campus', location: 'Santa Clara, CA, United States', type: 'Global HQ', spec: 'Executive Briefing Center & Core Cloud R&D' },
      { name: 'Asia Pacific Regional Hub', location: 'Marina Bay Financial Centre, Singapore', type: 'APAC Headquarters', spec: 'Enterprise Solutions & Regional Product Engineering' },
      { name: 'European Technology Center', location: 'London, United Kingdom', type: 'EMEA Hub', spec: 'Cloud Architecture & Enterprise Client Engineering' }
    ],
    awards: [
      { badge: 'FORTUNE 100', title: 'Fortune 100 Best Companies to Work For', org: 'Fortune Magazine & Great Place to Work' },
      { badge: 'LEADER', title: 'Leader in Enterprise Low-Code & ITSM', org: 'Gartner Magic Quadrant 2026' },
      { badge: 'TOP 50', title: 'Top 50 Most Innovative Companies in the World', org: 'Fast Company' }
    ],
    openJobIds: ['job-now-1', 'job-now-2', 'job-now-3']
  },

  // ============================================================================
  // GENERAL MOTORS (SOFTWARE & AV)
  // ============================================================================
  {
    id: 'gm',
    slug: 'gm',
    name: 'General Motors (Software & AV)',
    shortName: 'General Motors',
    tier: 'ENTERPRISE MOBILITY PIONEER',
    hq: 'Detroit, MI & Remote',
    size: '16,000+ Software & AV Engineers',
    founded: '1908',
    industry: 'Automotive & Autonomous Systems',
    jobsCount: 34,
    website: 'https://www.gm.com',
    heroImg: '/images/dir_gm.png',
    logoImg: '/images/home_logo_gm.png',
    desc: 'General Motors is revolutionizing the automotive industry through software-defined vehicles, advanced autonomous driving systems (Super Cruise & Ultra Cruise), and next-generation Ultium battery architectures. Drive the future of mobility with GM.',
    stat1Label: 'Autonomous Miles Tested', stat1Val: '50M+ Real-World Miles',
    stat2Label: 'Ultium EV Lineup', stat2Val: '20+ Global Models',
    stat3Label: 'Software Patents', stat3Val: '3,200+ Active Patents',
    quoteText: 'We envision a world with zero crashes, zero emissions, and zero congestion. Software is the catalyst making this vision a reality today.',
    quoteAuthor: 'Mary Barra · Chair & CEO',
    photos: [
      '/images/dir_gm.png',
      '/images/photo_gm_bldg.png',
      'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'software-careers@gm.com',
    phone: '+1 (313) 667-5000',
    address: '300 Renaissance Center, Detroit, MI 48265',
    certs: [
      'ISO 26262 ASIL-D Functional Safety',
      'Automotive SPICE (ASPICE) Level 3',
      'UN R155 & R156 Vehicle Cybersecurity',
      'NHTSA Automated Vehicle Safety Protocol'
    ],
    hiringCategories: [
      { name: 'Autonomous Driving & Computer Vision', count: 14 },
      { name: 'Vehicle OS & Embedded Firmware', count: 10 },
      { name: 'Battery Management & EV Powertrain', count: 6 },
      { name: 'Connected Vehicle Telematics & Cloud', count: 4 }
    ],
    techStack: [
      { name: 'Modern C++ (C++17/20)', category: 'Safety-Critical AV', icon: 'code' },
      { name: 'QNX & Embedded Linux', category: 'Vehicle Operating System', icon: 'server' },
      { name: 'ROS2 & DDS Middleware', category: 'Robotics Orchestration', icon: 'box' },
      { name: 'Python & PyTorch', category: 'Perception AI Models', icon: 'activity' }
    ],
    cultureValues: [
      { title: 'Safety as Our Guiding North Star', desc: 'We never compromise on safety, rigorous verification, and passenger trust.' },
      { title: 'Relentless Curiosity', desc: 'We question the status quo and push the boundaries of electric and autonomous travel.' },
      { title: 'Speed and Excellence', desc: 'Moving quickly with disciplined engineering rigor to bring game-changing vehicles to market.' }
    ],
    offices: [
      { name: 'Global Tech Center & Design Studios', location: 'Warren, MI, United States', type: 'Global Engineering Campus', spec: 'Advanced Vehicle Labs & Proving Grounds' },
      { name: 'Silicon Valley Software Lab', location: 'Mountain View, CA, United States', type: 'Software & AI Center', spec: 'Super Cruise & Autonomy R&D' },
      { name: 'Global Headquarters Renaissance Center', location: 'Detroit, MI, United States', type: 'Executive HQ', spec: 'Corporate Governance & Strategy' }
    ],
    awards: [
      { badge: 'INNOVATION', title: 'Top Autonomous Vehicle Technology Award', org: 'Automotive News PACE' },
      { badge: 'CLIMATE', title: 'Global Sustainability Leadership Award', org: 'Dow Jones Sustainability World Index' }
    ],
    openJobIds: ['job-gm-1']
  },

  // ============================================================================
  // PFIZER DIGITAL & R&D
  // ============================================================================
  {
    id: 'pfizer',
    slug: 'pfizer',
    name: 'Pfizer Digital & R&D',
    shortName: 'Pfizer',
    tier: 'GLOBAL BIOPHARMA LEADER',
    hq: 'New York, NY & Global',
    size: '4,000+ Digital R&D Professionals',
    founded: '1849',
    industry: 'Biopharma & Computational Biology',
    jobsCount: 28,
    website: 'https://www.pfizer.com',
    heroImg: '/images/dir_pfizer.png',
    logoImg: '/images/home_logo_pfizer.png',
    desc: 'Pfizer Digital & R&D harnesses computational biology, quantum chemistry simulations, and machine learning to invent life-saving vaccines and groundbreaking treatments. We innovate breakthroughs that change patients lives.',
    stat1Label: 'Patients Reached Annually', stat1Val: '1.3 Billion People',
    stat2Label: 'Active Clinical Programs', stat2Val: '110+ Therapies in Pipeline',
    stat3Label: 'Annual R&D Investment', stat3Val: '$11.4 Billion Invested',
    quoteText: 'Science will win. By pairing molecular medicine with cutting-edge computational chemistry and AI, we bring hope and healing to patients across the planet.',
    quoteAuthor: 'Dr. Albert Bourla · Chairman & CEO',
    photos: [
      '/images/dir_pfizer.png',
      '/images/photo_pfizer_bldg.png',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'digital-careers@pfizer.com',
    phone: '+1 (212) 733-2323',
    address: '66 Hudson Boulevard East, New York, NY 10001',
    certs: [
      'FDA 21 CFR Part 11 Electronic Records Compliance',
      'GxP Quality Management Standards',
      'HIPAA & HITECH Healthcare Data Protection',
      'ISO/IEC 27001 Biomedical Cloud Security'
    ],
    hiringCategories: [
      { name: 'Computational Biology & Genomics AI', count: 11 },
      { name: 'Clinical Data Science & Biostatistics', count: 8 },
      { name: 'Bioinformatics Cloud Engineering', count: 5 },
      { name: 'Digital Health & Patient Informatics', count: 4 }
    ],
    techStack: [
      { name: 'Python, RDKit & PyTorch', category: 'Molecular Modeling', icon: 'code' },
      { name: 'Nextflow & Slurm HPC', category: 'Genomic Workflow Pipelines', icon: 'server' },
      { name: 'AWS Healthcare Cloud & Databricks', category: 'High-Throughput Analytics', icon: 'activity' },
      { name: 'Snowflake & PostgreSQL', category: 'Clinical Data Warehousing', icon: 'box' }
    ],
    cultureValues: [
      { title: 'Courage to Take Big Bets', desc: 'We take bold scientific risks to pioneer therapies where no solutions existed before.' },
      { title: 'Excellence in Science', desc: 'Data integrity, meticulous peer-reviewed research, and patient safety guide every milestone.' },
      { title: 'Joy in Our Mission', desc: 'We celebrate breakthroughs and find purpose knowing our labor saves human lives.' }
    ],
    offices: [
      { name: 'Global Headquarters at The Spiral', location: 'Hudson Yards, New York, NY', type: 'Global HQ', spec: 'Digital Transformation & Executive Labs' },
      { name: 'Cambridge Biomedical Research Hub', location: 'Kendall Square, Cambridge, MA', type: 'R&D Center of Excellence', spec: 'Computational Biology & AI Drug Discovery' },
      { name: 'San Diego Oncology & Vaccine Lab', location: 'La Jolla, CA, United States', type: 'Specialized R&D', spec: 'Next-Generation mRNA & Immunotherapy' }
    ],
    awards: [
      { badge: 'SCIENCE', title: 'Breakthrough of the Year in Biotechnology', org: 'Nature Biotechnology' },
      { badge: 'ETHICS', title: 'World’s Most Ethical Companies 2026', org: 'Ethisphere Institute' }
    ],
    openJobIds: ['job-pfizer-1']
  },

  // ============================================================================
  // GRAB
  // ============================================================================
  {
    id: 'grab',
    slug: 'grab',
    name: 'Grab Holdings Inc.',
    shortName: 'Grab',
    tier: 'SOUTHEAST ASIA SUPERAPP',
    hq: 'Singapore (One-North Innovation District)',
    size: '9,000+ Regional Employees',
    founded: '2012',
    industry: 'Superapp · Deliveries & Digital Fintech',
    jobsCount: 48,
    website: 'https://www.grab.com',
    heroImg: '/images/feat_grab.png',
    logoImg: '/images/logo_grab_clean.png',
    desc: 'Grab is Southeast Asia’s leading superapp, operating across ride-hailing, food delivery, parcel logistics, and digital banking in 8 nations. Delivering everyday convenience and financial inclusion to hundreds of millions.',
    stat1Label: 'Monthly Transacting Users', stat1Val: '38.5M+ Active Users',
    stat2Label: 'Driver & Merchant Partners', stat2Val: '5M+ Micro-Entrepreneurs',
    stat3Label: 'Annual Gross Merchandise Value', stat3Val: '$22+ Billion GMV',
    quoteText: 'Our mission is to drive Southeast Asia forward by creating economic empowerment for everyone through technology.',
    quoteAuthor: 'Anthony Tan · Group CEO & Co-Founder',
    photos: [
      '/images/feat_grab.png',
      '/images/dir_grab.png',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'careers@grab.com',
    phone: '+65 6655 0005',
    address: '3 Media Close, One-North, Singapore 138498',
    certs: [
      'MAS Digital Banking License (Singapore)',
      'PCI-DSS Level 1 Fintech Security Certification',
      'ISO 27001 Information Security Management',
      'Southeast Asia Data Privacy Act Compliance'
    ],
    hiringCategories: [
      { name: 'Superapp Dispatch & High-Scale Systems', count: 18 },
      { name: 'GrabFinancial & Digital Bank (Digibank)', count: 14 },
      { name: 'Mobile Engineering (iOS / Android / Flutter)', count: 9 },
      { name: 'Geospatial AI & Route Optimization', count: 7 }
    ],
    techStack: [
      { name: 'Go (Golang)', category: 'Core Microservices', icon: 'code' },
      { name: 'Uber H3 & S2 Geometry', category: 'Geospatial Algorithms', icon: 'map-pin' },
      { name: 'Apache Kafka & Flink', category: 'Real-Time Telemetry Stream', icon: 'activity' },
      { name: 'AWS & Kubernetes', category: 'Multi-Region Cloud', icon: 'server' }
    ],
    cultureValues: [
      { title: 'Heart (Honor, Humility, Heart, Hunger)', desc: 'The 4H principles that drive our decision-making and service to our partners.' },
      { title: 'Drive Economic Inclusion', desc: 'Technology is only valuable when it opens livelihood opportunities for everyday workers.' },
      { title: 'Relentless Execution', desc: 'Delivering everyday convenience with speed, safety, and operational precision.' }
    ],
    offices: [
      { name: 'Grab Global HQ @ One-North', location: 'Singapore', type: 'Global HQ', spec: 'Superapp Core R&D, Fintech Labs & Data Science' },
      { name: 'Grab R&D Center Beijing', location: 'Beijing, China', type: 'Deep Tech Center', spec: 'Machine Learning, Computer Vision & Search' },
      { name: 'Grab Regional Tech Center Jakarta', location: 'Jakarta, Indonesia', type: 'Regional Tech Hub', spec: 'Merchant Platform & Indonesian Micro-Fintech' }
    ],
    awards: [
      { badge: 'SUPERAPP', title: 'Best Superapp & Fintech Ecosystem in ASEAN', org: 'Fintech Leaders Awards' },
      { badge: 'FORTUNE', title: 'Fortune Change the World List', org: 'Fortune Magazine' }
    ],
    openJobIds: ['job-grab-1']
  },

  // ============================================================================
  // SHOPEE (SEA GROUP)
  // ============================================================================
  {
    id: 'shopee',
    slug: 'shopee',
    name: 'Shopee (Sea Group)',
    shortName: 'Shopee',
    tier: 'LEADING E-COMMERCE ECOSYSTEM',
    hq: 'Singapore (Science Park) & Bangkok',
    size: '67,000+ Regional Employees',
    founded: '2015',
    industry: 'E-Commerce & Interactive Digital Platforms',
    jobsCount: 72,
    website: 'https://shopee.com',
    heroImg: '/images/feat_shopee.png',
    logoImg: '/images/logo_shopee_clean.png',
    desc: 'Shopee is the premier e-commerce platform in Southeast Asia and Taiwan. Powered by parent company Sea Group (NYSE: SE), Shopee connects millions of buyers and digital sellers with seamless logistics, payment services (ShopeePay), and entertaining livestream shopping.',
    stat1Label: 'Annual Orders Processed', stat1Val: '8.2+ Billion Orders',
    stat2Label: 'Active Sellers Across SEA', stat2Val: '18M+ Digital Merchants',
    stat3Label: 'Livestream Daily Views', stat3Val: '500M+ Livestream Sessions',
    quoteText: 'We believe technology should enhance every life. By creating simple, reliable shopping and selling experiences, Shopee helps micro-businesses flourish across our communities.',
    quoteAuthor: 'Chris Feng · CEO of Shopee',
    photos: [
      '/images/feat_shopee.png',
      '/images/dir_shopee.png',
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'recruitment@shopee.com',
    phone: '+65 6206 6610',
    address: '5 Science Park Drive, Shopee Building, Singapore 118265',
    certs: [
      'PCI-DSS Certified Payment Infrastructure',
      'ISO 27001 Enterprise Cybersecurity',
      'ASEAN E-Commerce Consumer Trust Mark',
      'Singapore Data Protection Trustmark (DPTM)'
    ],
    hiringCategories: [
      { name: 'High-Concurrency Order Processing & Payments', count: 26 },
      { name: 'Search & Recommendation AI Algorithms', count: 20 },
      { name: 'Shopee Express Logistics Automation', count: 14 },
      { name: 'Frontend Architecture & Livestream Video', count: 12 }
    ],
    techStack: [
      { name: 'Go & C++', category: 'High-Throughput Engines', icon: 'code' },
      { name: 'Redis Cluster & TiDB', category: 'Distributed Databases', icon: 'database' },
      { name: 'Kafka & Elasticsearch', category: 'Search & Event Topology', icon: 'search' },
      { name: 'React Native & Flutter', category: 'Cross-Platform Mobile App', icon: 'smartphone' }
    ],
    cultureValues: [
      { title: 'We Serve', desc: 'Our customers and merchants are the sole reason for our existence.' },
      { title: 'We Adapt', desc: 'In fast-paced emerging markets, we evolve rapidly to meet real needs.' },
      { title: 'We Run', desc: 'Urgency, energy, and speed define how we build and deliver.' }
    ],
    offices: [
      { name: 'Shopee Regional Headquarters Building', location: 'Singapore Science Park', type: 'Global HQ', spec: 'Group Executive Leadership & Global Engineering' },
      { name: 'Shopee Thailand Tech Hub', location: 'AIA Sathorn Tower, Bangkok', type: 'Regional Tech Hub', spec: 'Southeast Asia Merchant Solutions & Marketing Tech' },
      { name: 'Shopee Taiwan Product Center', location: 'Taipei, Taiwan', type: 'Product Lab', spec: 'Interactive Shopping Experiences & Live Streaming' }
    ],
    awards: [
      { badge: 'E-COMMERCE', title: 'Top Ranked E-Commerce Platform in Southeast Asia', org: 'YouGov BrandIndex 2026' },
      { badge: 'SEA GROUP', title: 'Forbes Global 2000 Recognized', org: 'Forbes International' }
    ],
    openJobIds: ['job-shopee-1']
  },

  // ============================================================================
  // AXON ENTERPRISE
  // ============================================================================
  {
    id: 'axon',
    slug: 'axon',
    name: 'Axon Enterprise, Inc.',
    shortName: 'Axon Enterprise',
    tier: 'CONNECTED SAFETY & CLOUD DEFENSE',
    hq: 'Scottsdale, AZ & Remote',
    size: '3,800+ Employees Worldwide',
    founded: '1993',
    industry: 'Connected Public Safety & Cloud Software',
    jobsCount: 31,
    website: 'https://www.axon.com',
    heroImg: '/images/feat_axon.png',
    logoImg: '/images/logo_axon_clean.png',
    desc: 'Axon Enterprise builds connected public safety hardware and mission-critical cloud software (Evidence.com). Our ecosystem of TASER energy weapons, body cameras, in-car cameras, and AI-powered evidence management protects life, prevents escalation, and ensures transparency.',
    stat1Label: 'Lives Saved Globally', stat1Val: '300,000+ Lives Saved',
    stat2Label: 'Agencies Using Axon Cloud', stat2Val: '17,000+ Law Enforcement Agencies',
    stat3Label: 'Video Evidence Managed', stat3Val: '100+ Petabytes of Data',
    quoteText: 'Our moonshot goal is to cut gun-related deaths between police and the public by 50% within this decade. Technology can and must protect human life.',
    quoteAuthor: 'Rick Smith · Founder & CEO',
    photos: [
      '/images/feat_axon.png',
      '/images/dir_axon.png',
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'careers@axon.com',
    phone: '+1 (480) 991-0797',
    address: '17800 N 85th St, Scottsdale, AZ 85255',
    certs: [
      'FBI CJIS (Criminal Justice Information Services) Compliant',
      'FedRAMP High Authorized Government Cloud',
      'ISO/IEC 27001 & SOC 2 Type II Security Certified',
      'NIST SP 800-53 Federal Security Controls'
    ],
    hiringCategories: [
      { name: 'Cloud Evidence Platform & Microservices', count: 12 },
      { name: 'Computer Vision & AI Video Redaction', count: 8 },
      { name: 'Embedded Firmware & Edge Sensors', count: 6 },
      { name: 'Information Security & GovCloud Compliance', count: 5 }
    ],
    techStack: [
      { name: 'Scala & Go', category: 'High-Concurrency Services', icon: 'code' },
      { name: 'Python, OpenCV & TensorRT', category: 'Edge AI Redaction', icon: 'camera' },
      { name: 'AWS GovCloud & Kubernetes', category: 'Secure Cloud Infrastructure', icon: 'shield' },
      { name: 'C/C++ & Embedded RTOS', category: 'Body Camera Firmware', icon: 'cpu' }
    ],
    cultureValues: [
      { title: 'Aim Far', desc: 'We take on massive societal problems and pursue moonshot technological innovations.' },
      { title: 'Win Right', desc: 'Integrity and ethics are at the core of every tool, algorithm, and product we build.' },
      { title: 'Be Obsessed', desc: 'We obsess over the safety and well-being of the communities our technology protects.' }
    ],
    offices: [
      { name: 'Global Corporate Campus', location: 'Scottsdale, Arizona', type: 'Global HQ', spec: 'Executive Leadership, Cloud R&D & Advanced Testing' },
      { name: 'Seattle Software Center', location: 'Downtown Seattle, Washington', type: 'Software & AI Lab', spec: 'Evidence.com Cloud Engineering & Computer Vision' },
      { name: 'London International Hub', location: 'London, United Kingdom', type: 'EMEA HQ', spec: 'European Police Services & Cloud Operations' }
    ],
    awards: [
      { badge: 'SAFETY TECH', title: 'World’s Most Innovative Public Safety Enterprise', org: 'Fast Company Most Innovative' },
      { badge: 'BEST WORKPLACE', title: 'Top Workplace for Tech & Innovation', org: 'Great Place to Work' }
    ],
    openJobIds: ['job-axon-1']
  },

  // ============================================================================
  // METFONE
  // ============================================================================
  {
    id: 'metfone',
    slug: 'metfone',
    name: 'Metfone (Viettel Cambodia)',
    shortName: 'Metfone',
    tier: 'LEADING TELECOM & DIGITAL INFRASTRUCTURE',
    hq: 'Phnom Penh, Cambodia',
    size: '3,000+ Employees',
    founded: '2006',
    industry: 'Telecommunications & AI Digital Services',
    jobsCount: 16,
    website: 'https://metfone.com.kh',
    heroImg: '/images/metfone_cover.png',
    logoImg: '/images/metfone_badge.svg',
    desc: 'Metfone is the leading telecommunications and digital technology operator in Cambodia. Offering comprehensive 4G/5G mobile networks, broadband fiber, e-wallet solutions (eMoney), and enterprise digital transformation systems across all 25 provinces.',
    stat1Label: 'Mobile Subscribers', stat1Val: '9M+ Subscribers',
    stat2Label: 'Fiber Optic Coverage', stat2Val: '98% of Cambodia',
    stat3Label: 'Digital Wallet Users', stat3Val: '2.5M+ eMoney Accounts',
    quoteText: 'Bringing cutting-edge telecommunications and artificial intelligence to connect every Cambodian family, school, and business.',
    quoteAuthor: 'Cao Manh Duc · CEO of Metfone',
    photos: [
      '/images/metfone_cover.png',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'hr@metfone.com.kh',
    phone: '(+855) 97 909 7097',
    address: 'Metfone Head Office, Mao Tse Toung Blvd, Phnom Penh, Cambodia',
    certs: [
      'TRC Telecom License Cambodia',
      'ISO 9001:2015 Quality Management',
      'ISO/IEC 27001 Telecommunication Security'
    ],
    hiringCategories: [
      { name: 'AI & Data Science', count: 6 },
      { name: 'Telecom Core & 5G Network', count: 5 },
      { name: 'Fintech & Digital Banking', count: 5 }
    ],
    techStack: [
      { name: 'Python & PyTorch', category: 'AI & ML Telemetry', icon: 'code' },
      { name: 'Java & Spring Boot', category: 'Fintech Backend', icon: 'server' },
      { name: 'React Native & iOS/Android', category: 'Mobile App', icon: 'smartphone' }
    ],
    cultureValues: [
      { title: 'Caring & Innovator', desc: 'Putting customer satisfaction and social responsibility at the core of our tech.' },
      { title: 'United Strength', desc: 'Building nationwide networks through solidarity and shared purpose.' }
    ],
    offices: [
      { name: 'Metfone Tower Phnom Penh', location: 'Phnom Penh, Cambodia', type: 'National HQ', spec: 'Executive, Telecom NOC & AI Labs' }
    ],
    awards: [
      { badge: 'BEST TELECOM', title: 'Best Telecom Service Provider Cambodia', org: 'Global Brands Magazine' }
    ],
    openJobIds: ['intern-metfone']
  },

  // ============================================================================
  // BRAZE
  // ============================================================================
  {
    id: 'braze',
    slug: 'braze',
    name: 'Braze, Inc.',
    shortName: 'Braze',
    tier: 'CUSTOMER ENGAGEMENT PLATFORM',
    hq: 'New York, NY & Global',
    size: '2,000+ Global Employees',
    founded: '2011',
    industry: 'Customer Engagement & Real-Time Data Streaming',
    jobsCount: 22,
    website: 'https://www.braze.com',
    heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    logoImg: '/images/braze_logo.svg',
    desc: 'Braze is the leading customer engagement platform that powers interactions between consumers and the brands they love. Handling billions of daily real-time events to orchestrate personalized mobile, web, and email messaging at scale.',
    stat1Label: 'Daily Messages Processed', stat1Val: '5+ Billion Messages',
    stat2Label: 'Global Enterprise Clients', stat2Val: '2,000+ Brands',
    stat3Label: 'Consumer Touchpoints', stat3Val: '5+ Billion Monthly Users',
    quoteText: 'We help brands connect with people through relevant, memorable digital experiences fueled by real-time stream data.',
    quoteAuthor: 'Bill Magnuson · Co-Founder & CEO',
    photos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'careers@braze.com',
    phone: '+1 (646) 694-8772',
    address: '330 W 34th St, New York, NY 10001',
    certs: [
      'SOC 2 Type II Certified',
      'ISO 27001 Security Management',
      'GDPR & CCPA Compliant Platform'
    ],
    hiringCategories: [
      { name: 'Frontend Platform & Web Performance', count: 8 },
      { name: 'Distributed Stream Processing', count: 8 },
      { name: 'Security & Cloud Operations', count: 6 }
    ],
    techStack: [
      { name: 'TypeScript & React', category: 'Frontend Platform', icon: 'code' },
      { name: 'Ruby, Go & Scala', category: 'Backend Streaming', icon: 'server' },
      { name: 'Kafka & Redis', category: 'Real-Time Message Bus', icon: 'activity' }
    ],
    cultureValues: [
      { title: 'Shape the Future', desc: 'Inventing real-time streaming tools that transform consumer-brand relationships.' },
      { title: 'Collaborate Openly', desc: 'Working together with empathy, accountability, and technical rigor.' }
    ],
    offices: [
      { name: 'New York HQ', location: 'New York, NY', type: 'Global HQ', spec: 'Corporate Headquarters & Core Engineering' },
      { name: 'London EMEA Hub', location: 'London, UK', type: 'Regional HQ', spec: 'Engineering & Client Success' }
    ],
    awards: [
      { badge: 'LEADER', title: 'Leader in Customer Interaction Platforms', org: 'Gartner Magic Quadrant' }
    ],
    openJobIds: ['job-braze']
  },

  // ============================================================================
  // GOOGLE
  // ============================================================================
  {
    id: 'google',
    slug: 'google',
    name: 'Google LLC',
    shortName: 'Google',
    tier: 'GLOBAL TECH & AI LEADER',
    hq: 'Mountain View, CA & Global Hubs',
    size: '180,000+ Worldwide',
    founded: '1998',
    industry: 'Internet, Cloud Computing & Frontier AI',
    jobsCount: 150,
    website: 'https://careers.google.com',
    heroImg: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    logoImg: '/images/google_logo.svg',
    desc: 'Google’s mission is to organize the world’s information and make it universally accessible and useful. From Search, Android, and YouTube to Google Cloud and Gemini AI, we build products that empower billions.',
    stat1Label: 'Daily Searches Handled', stat1Val: '8.5+ Billion Searches',
    stat2Label: 'Products with >1B Users', stat2Val: '9 Global Products',
    stat3Label: 'Global Data Centers', stat3Val: '28+ Cloud Regions',
    quoteText: 'Our goal is to build helpful technology for everyone, everywhere. AI is the most profound platform shift we are working on.',
    quoteAuthor: 'Sundar Pichai · CEO of Google & Alphabet',
    photos: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'recruiting@google.com',
    phone: '+1 (650) 253-0000',
    address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
    certs: [
      'ISO/IEC 27001, 27017, 27018 Certified',
      'FedRAMP High Authorized',
      'SOC 1, 2, 3 Audited Infrastructure'
    ],
    hiringCategories: [
      { name: 'Frontier AI & Machine Learning', count: 45 },
      { name: 'Google Cloud & Distributed Systems', count: 50 },
      { name: 'Developer Tools & Core Infrastructure', count: 35 },
      { name: 'Security & Quantum Computing', count: 20 }
    ],
    techStack: [
      { name: 'C++, Go & Java', category: 'Core Distributed Systems', icon: 'code' },
      { name: 'Python, JAX & TensorFlow', category: 'Frontier AI Research', icon: 'activity' },
      { name: 'Borg & Kubernetes', category: 'Container Cluster Management', icon: 'server' }
    ],
    cultureValues: [
      { title: 'Focus on the User', desc: 'Focus on the user and all else will follow.' },
      { title: '10x Thinking', desc: 'We aspire to solve problems that improve lives by a factor of 10, not 10%.' }
    ],
    offices: [
      { name: 'Googleplex Mountain View', location: 'Mountain View, CA', type: 'Global HQ', spec: 'Alphabet & Google Campus' },
      { name: 'Google Singapore APAC Campus', location: 'Pasir Panjang, Singapore', type: 'APAC Headquarters', spec: 'Regional Engineering & Operations' }
    ],
    awards: [
      { badge: 'MOST VALUABLE', title: 'World’s Most Innovative Tech Company', org: 'Boston Consulting Group' }
    ],
    openJobIds: ['job-google']
  },
'''

# 1. Insert new jobs right after "export const jobsDatabase: JobItem[] = ["
jobs_marker = 'export const jobsDatabase: JobItem[] = ['
if jobs_marker in code:
    code = code.replace(jobs_marker, jobs_marker + new_jobs_code, 1)
    print('Inserted new jobs into jobsDatabase!')
else:
    print('Error: jobsDatabase marker not found')

# 2. Insert new companies right after "export const companiesDatabase: CompanyProfile[] = ["
companies_marker = 'export const companiesDatabase: CompanyProfile[] = ['
if companies_marker in code:
    code = code.replace(companies_marker, companies_marker + new_companies_code, 1)
    print('Inserted new companies into companiesDatabase!')
else:
    print('Error: companiesDatabase marker not found')

# 3. Enhance getCompanyBySlug to handle aliases
old_fn = '''export function getCompanyBySlug(slug: string): CompanyProfile | undefined {
  return companiesDatabase.find(c => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase());
}'''

new_fn = '''export function getCompanyBySlug(slug: string): CompanyProfile | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase().trim();
  return companiesDatabase.find(c => 
    c.slug.toLowerCase() === s || 
    c.id.toLowerCase() === s ||
    c.shortName.toLowerCase() === s ||
    (s === 'general-motors' && (c.id === 'gm' || c.slug === 'gm')) ||
    (s === 'gm' && (c.id === 'gm' || c.slug === 'gm')) ||
    (s === 'axon-enterprise' && (c.id === 'axon' || c.slug === 'axon')) ||
    (s === 'sea-group' && (c.id === 'shopee' || c.slug === 'shopee'))
  );
}'''

if old_fn in code:
    code = code.replace(old_fn, new_fn)
    print('Enhanced getCompanyBySlug!')
else:
    # Try regex replacement if whitespace differed
    pattern = r'export function getCompanyBySlug\(slug:\s*string\):\s*CompanyProfile\s*\|\s*undefined\s*\{[^}]+\}'
    if re.search(pattern, code):
        code = re.sub(pattern, new_fn, code, count=1)
        print('Enhanced getCompanyBySlug via regex!')
    else:
        print('Could not replace getCompanyBySlug')

with open(portal_data_path, 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully updated portalData.ts!')
