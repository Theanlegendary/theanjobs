// The SandBox Logistics & Tech Career Network - Unified Authoritative Portal Data

export interface JobItem {
  id: string;
  title: string;
  company: string;
  companySlug: string;
  logo: string;
  buildingImage?: string;
  location: string;
  workplaceType: 'Hybrid' | 'Remote' | 'On-site';
  seniority: string;
  department: string;
  compensation: string;
  salaryPeriod: string;
  perks: string[];
  datePosted: string;
  timeAgo: string;
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  responsibilities: string[];
  requirements: string[];
  teamQuote?: {
    text: string;
    author: string;
    role: string;
    avatar: string;
  };
  similarJobIds?: string[];
}

export interface CompanyProfile {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tier: string;
  hq: string;
  size: string;
  founded: string;
  industry: string;
  jobsCount: number;
  website: string;
  heroImg: string;
  logoImg: string;
  desc: string;
  stat1Label: string;
  stat1Val: string;
  stat2Label: string;
  stat2Val: string;
  stat3Label: string;
  stat3Val: string;
  quoteText: string;
  quoteAuthor: string;
  photos: string[];
  email: string;
  phone: string;
  address: string;
  certs?: string[];
  perks?: ({ icon: string; label: string; desc: string } | string)[];
  culture?: { title: string; desc: string }[];
  hiringCategories?: { name: string; count: number }[];
  techStack?: { name: string; category: string; icon: string }[];
  cultureValues?: { title: string; desc: string }[];
  offices?: { name: string; location: string; type: string; spec: string }[];
  awards?: { title: string; org: string; badge: string }[];
  openJobIds?: string[];
  linkedinUrl?: string;
  linkedinFollowers?: string;
  linkedinInsights?: {
    medianTenure?: string;
    growthYoY?: string;
    functionalBreakdown?: { function: string; percent: number }[];
  };
  leadershipTeam?: {
    name: string;
    title: string;
    avatar: string;
    location?: string;
    linkedinUrl?: string;
    bio?: string;
  }[];
  linkedinUpdates?: {
    date: string;
    content: string;
    likes: number;
    comments: number;
    tag?: string;
  }[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  topicTag: string;
  category: string;
  categoryLabel: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  companyName?: string;
  date: string;
  timeAgo: string;
  readTime: string;
  readersCount: string;
  image: string;
  imageCaption: string;
  excerpt: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  statCard?: {
    title: string;
    stats: { value: string; label: string }[];
  };
  quote?: {
    text: string;
    cite: string;
  };
  tags: string[];
  sourcesText: string;
  relatedArticleIds?: string[];
}

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  sessionsCount: number;
  online: boolean;
  bioLead: string;
  fullBio: string;
  expertiseTags: string[];
  sessionTopics: { title: string; description: string; duration: string }[];
  reviews: { mentee: string; role: string; comment: string; rating: number }[];
  availableSlots: string[];
}

// ============================================================================
// 1. JOBS DATABASE
// ============================================================================
export const jobsDatabase: JobItem[] = [
  // ============================================================================
  // JOB-1: VICONSHIP SENIOR OCEAN FREIGHT FORWARDER (STANDALONE REFERENCE)
  // ============================================================================
  {
    id: 'job-1',
    title: 'Senior Ocean Freight Forwarder',
    company: 'Viconship Logistics Group',
    companySlug: 'viconship',
    logo: '/images/brands/viconship.svg',
    buildingImage: '/images/today_3.jpg',
    location: 'Ho Chi Minh City, VN',
    workplaceType: 'Hybrid',
    seniority: 'Senior level',
    department: 'Maritime & Seaport Terminal • Freight Forwarding & 3PL • Multimodal',
    compensation: '28M-42M VND',
    salaryPeriod: 'Annually',
    perks: [
      'Competitive base salary (28M - 42M VND/month net) + quarterly performance bonus',
      'Full PTI comprehensive health insurance & annual company trip',
      'Flexible hybrid work options (3 days office, 2 days remote)',
      'Sponsored international FIATA certification training'
    ],
    datePosted: 'Posted 2 Hours Ago',
    timeAgo: 'Posted 2 Hours Ago',
    badge: 'Verified Listing',
    shortDesc: 'Viconship is seeking a seasoned Ocean Freight Forwarding Specialist to manage end-to-end container booking, multimodal carrier negotiations, and freight optimization for multinational manufacturing accounts in Southern Vietnam.',
    fullDesc: "Viconship is one of Vietnam's leading integrated container seaport and container seaport operators. We drive multimodal freight forwarding, container terminal management, bonded warehousing, and logistics supply chain services connecting Vietnam with major world trade lanes.",
    responsibilities: [
      'Coordinate ocean freight routing, rate negotiations, and space allocation with major maritime alliances (2M, Ocean Alliance, THE Alliance).',
      'Manage complex customs clearance, FMC bill-of-lading (B/L) documentation, and cross-border demurrage/detention minimization.',
      'Act as direct strategic escalation lead for Tier-1 automotive and electronics enterprise shippers.',
      'Supervise electronic EDI declarations under Decree 163/2017/ND-CP and international shipping conventions.'
    ],
    requirements: [
      "Bachelor's degree in Foreign Trade, Maritime Economics, or International Logistics.",
      '3+ years of experience in ocean freight forwarding or container shipping lines.',
      'Proficiency in Incoterms 2020, customs brokerage, and maritime bill-of-lading documentation.',
      'Bilingual communication in Vietnamese and English.',
      'Customer-focused approach and ability to build and retain commercial business relationships.'
    ],
    teamQuote: {
      text: '“At Viconship, managing real-time vessel berthing and cross-border maritime logistics alongside an elite team gives you immediate operational impact. There’s real pride in moving Vietnam’s industrial exports to the world every day.”',
      author: 'Nguyen Minh Tri',
      role: 'Director of Ocean Freight & Port Operations, Viconship',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    similarJobIds: ['job-vietnhat-1', 'job-vinmec-1', 'job-chailease-credit']
  },

  // ============================================================================
  // ACCESS PARTNERSHIP - BUILT IN & LINKEDIN FEATURED CAREERS
  // ============================================================================
  {
    id: 'job-ap-1',
    title: 'Senior Tech Policy Analyst - AI & Frontier Tech',
    company: 'Access Partnership',
    companySlug: 'access-partnership',
    logo: '/images/access_partnership_logo.svg',
    buildingImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    location: 'London / Singapore / Hybrid',
    workplaceType: 'Hybrid',
    seniority: 'Senior Analyst',
    department: 'Tech Policy & Advisory',
    compensation: ',000 - ,000',
    salaryPeriod: '/ năm',
    perks: ['Meal Stipend & Wellness', 'Hybrid Flexibility', 'Global Health & Pension'],
    datePosted: 'Vừa đăng',
    timeAgo: 'Vừa đăng',
    badge: 'Hot Job',
    shortDesc: 'Advise Fortune 100 tech companies on international AI policy directives, prepare briefings for sovereign regulators, and navigate frontier tech compliance.',
    fullDesc: 'Join Access Partnership premier AI & Frontier Tech practice. You will spearhead high-impact regulatory engagements across Europe, the US, and Asia-Pacific, drafting policy position papers, advising tech leaders on the EU AI Act, US executive orders, and ASEAN AI governance frameworks.',
    responsibilities: [
      'Monitor and analyze global legislative developments in artificial intelligence, cloud architecture, and cross-border data transfer',
      'Draft policy papers, regulatory submissions, and executive intelligence briefings for senior client leadership',
      'Coordinate client engagements with ministerial bodies, telecommunications regulators, and standards organizations',
      'Deliver strategic workshops on algorithmic compliance, risk classification, and international tech trade'
    ],
    requirements: [
      '5+ years experience in technology policy, regulatory affairs, or legal/government advisory',
      'Deep knowledge of global AI frameworks, cybersecurity legislation, or telecommunications regulations',
      'Exceptional written and oral communication skills in English; additional languages an advantage',
      'Masters degree in Public Policy, International Relations, Law, or relevant field'
    ]
  },
  {
    id: 'job-ap-2',
    title: 'Global Regulatory & Government Affairs Specialist',
    company: 'Access Partnership',
    companySlug: 'access-partnership',
    logo: '/images/access_partnership_logo.svg',
    buildingImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    location: 'Hà Nội / Remote',
    workplaceType: 'Remote',
    seniority: 'Specialist',
    department: 'Government Affairs',
    compensation: '45tr - 65tr đ',
    salaryPeriod: '/ tháng',
    perks: ['Meal Stipend', 'Flexible Remote', 'Laptop & Equipment'],
    datePosted: '1 ngày trước',
    timeAgo: '1 ngày trước',
    badge: 'Featured',
    shortDesc: 'Lead strategic engagements across Southeast Asian digital ministries, telecommunications regulators, and tech trade associations.',
    fullDesc: 'Work closely with Southeast Asian governments and multinational tech enterprises to foster open digital trade, spectrum access, and balanced digital platform governance.',
    responsibilities: [
      'Track Southeast Asian tech regulations across Vietnam, Singapore, Thailand, and Indonesia',
      'Liaise directly with government stakeholders and national regulatory bodies',
      'Deliver actionable regulatory risk assessments for multinational tech clients',
      'Draft market access roadmaps and bilateral compliance agreements'
    ],
    requirements: [
      '3-6 years of experience in public affairs, government relations, or tech consulting in Southeast Asia',
      'Proven understanding of telecommunications, personal data protection laws, and cloud regulations',
      'Fluency in Vietnamese and professional English'
    ]
  },
  {
    id: 'job-ap-3',
    title: 'Director of Emerging Technology Policy (APAC)',
    company: 'Access Partnership',
    companySlug: 'access-partnership',
    logo: '/images/access_partnership_logo.svg',
    buildingImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    location: 'Singapore / Hybrid',
    workplaceType: 'Hybrid',
    seniority: 'Practice Director',
    department: 'Executive Advisory',
    compensation: ',000 - ,000',
    salaryPeriod: '/ năm',
    perks: ['Global Relocation Support', 'Performance Bonus', 'Comprehensive Health'],
    datePosted: '3 ngày trước',
    timeAgo: '3 ngày trước',
    badge: 'Urgent',
    shortDesc: 'Oversee APAC practice delivering high-stakes regulatory advisory to Fortune 100 technology enterprises and sovereign governments.',
    fullDesc: 'Lead our Asia-Pacific practice, guiding tier-1 tech enterprises through complex market access barriers, spectrum licensing, and geopolitical tech dynamics.',
    responsibilities: [
      'Lead high-profile policy and regulatory advisory campaigns across the APAC region',
      'Manage multidisciplinary teams of analysts, economists, and regulatory specialists',
      'Build sustained relationships with senior government ministers, telecom directors, and multilateral agencies',
      'Drive practice business development, client retention, and thought leadership publications'
    ],
    requirements: [
      '8+ years senior leadership in tech policy, government affairs, or international advisory',
      'Strong network across APAC telecommunications and digital economic authorities',
      'Outstanding executive presence and negotiation abilities'
    ]
  },

  // ============================================================================
  // VIỆC LÀM TỐT NHẤT / TOP FEATURED JOBS (Matched with Reference Mockup)
  // ============================================================================
  {
    id: 'job-vietnhat-1',
    title: 'Kỹ Sư Thiết Kế Điện (M&E / Automation)',
    company: 'Công Ty CP Đầu Tư Xây Dựng & Cơ Điện Việt Nhật',
    companySlug: 'vietnhat-ec',
    logo: '/images/logo_vietnhat.png',
    buildingImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    location: 'Hà Nội',
    workplaceType: 'On-site',
    seniority: 'Senior Specialist',
    department: 'M&E Engineering',
    compensation: '30tr - 35tr đ',
    salaryPeriod: '/ tháng',
    perks: ['Thưởng công trình', 'Bảo hiểm Bảo Việt VIP', 'Phụ cấp ăn trưa & xe đưa đón'],
    datePosted: 'Vừa đăng',
    timeAgo: 'Vừa đăng',
    badge: 'Hot Job',
    shortDesc: 'Thiết kế hệ thống điện động lực, chiếu sáng, trạm biến áp và tủ điện cho các dự án công nghiệp, trung tâm thương mại cao tầng.',
    fullDesc: 'Tham gia thiết kế, giám sát thi công hệ thống cơ điện M&E cho các công trình trọng điểm tại miền Bắc. Triển khai bản vẽ Shopdrawing, bóc tách khối lượng và phối hợp cùng ban quản lý dự án.',
    responsibilities: [
      'Lập bản vẽ thiết kế kỹ thuật, bản vẽ thi công hệ thống điện trung - hạ thế.',
      'Tính toán phụ tải, lựa chọn thiết bị đóng cắt, máy biến áp và máy phát điện.',
      'Phối hợp với kỹ sư hiện trường xử lý các phát sinh kỹ thuật trong thi công.',
      'Nghiệm thu vật tư thiết bị điện và hoàn công dự án.',
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Hệ thống điện, Thiết bị điện, Tự động hóa.',
      'Sử dụng thành thạo AutoCAD, Revit MEP, phần mềm tính toán chiếu sáng Dialux.',
      'Tối thiểu 3 năm kinh nghiệm thiết kế M&E cho công trình quy mô lớn.',
    ],
    similarJobIds: ['job-seev-maintenance', 'job-seev-chips'],
  },
  {
    id: 'job-vinmec-1',
    title: 'Giám Đốc Dự Án Bệnh Viện & Y Tế Số',
    company: 'Công Ty CP Bệnh Viện Đa Khoa Quốc Tế Vinmec',
    companySlug: 'vinmec',
    logo: '/images/logo_vinmec.png',
    buildingImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    location: 'Hồ Chí Minh',
    workplaceType: 'Hybrid',
    seniority: 'Director / Executive',
    department: 'Digital Health & Medical Transformation',
    compensation: '200tr - 300tr đ',
    salaryPeriod: '/ tháng',
    perks: ['Cổ phiếu Vingroup', 'Khám chữa bệnh VIP Vinmec', 'Học bổng Vinschool 100%'],
    datePosted: '1 ngày trước',
    timeAgo: '1 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Lãnh đạo chuyển đổi số toàn diện hệ thống quản lý bệnh viện thông minh, hồ sơ bệnh án điện tử (EMR) và tích hợp AI chẩn đoán hình ảnh.',
    fullDesc: 'Vinmec tìm kiếm Giám Đốc Dự Án Y Tế Số phụ trách chiến lược chuyển đổi số, triển khai hệ thống thông tin y tế bệnh viện (HIS/LIS/PACS) và hạ tầng đám mây y tế đạt chuẩn JCI Hoa Kỳ.',
    responsibilities: [
      'Hoạch định lộ trình công nghệ số hóa quy trình khám chữa bệnh tại các bệnh viện Vinmec.',
      'Quản lý ngân sách đầu tư công nghệ trên 10 triệu USD hàng năm.',
      'Điều phối đội ngũ kỹ sư giải pháp, đối tác công nghệ quốc tế (Epic, GE, Philips).',
    ],
    requirements: [
      '10+ năm kinh nghiệm quản lý dự án công nghệ, trong đó ít nhất 5 năm trong lĩnh vực y tế / bệnh viện số.',
      'Am hiểu sâu sắc tiêu chuẩn bảo mật y tế HIPAA, HL7, DICOM, chuẩn JCI quốc tế.',
      'Kỹ năng lãnh đạo, đàm phán hợp đồng với các tập đoàn công nghệ toàn cầu.',
    ],
    similarJobIds: ['job-vinsmart-sa', 'job-pvcfc-data'],
  },
  {
    id: 'job-seev-hr',
    title: 'Nhân Viên Phòng Nhân Sự & Tuyển Dụng',
    company: 'SEI Electronic Components (SEEV)',
    companySlug: 'seev',
    logo: '/images/logo_seev.png',
    buildingImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    location: 'Hà Nội',
    workplaceType: 'On-site',
    seniority: 'Specialist',
    department: 'Human Resources & Talent Acquisition',
    compensation: 'Thương lượng / Negotiable',
    salaryPeriod: '',
    perks: ['Thưởng Tết 2-3 tháng', 'Xe đưa đón nội thành', 'Đào tạo tại Nhật Bản'],
    datePosted: '2 ngày trước',
    timeAgo: '2 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Phụ trách thu hút nhân tài kỹ thuật cao cho nhà máy sản xuất linh kiện điện tử Sumitomo Electric tại KCN Thăng Long.',
    fullDesc: 'SEI Electronic Components tuyển dụng Chuyên viên Tuyển dụng & Đào tạo nhằm mở rộng quy mô sản xuất các bản mạch in linh hoạt (FPC) cho chuỗi cung ứng điện tử toàn cầu.',
    responsibilities: [
      'Lập kế hoạch và thực hiện tuyển dụng kỹ sư công nghệ, kỹ sư vận hành máy SMT.',
      'Tổ chức ngày hội việc làm tại các trường đại học kỹ thuật hàng đầu.',
      'Xây dựng chương trình đào tạo văn hóa doanh nghiệp Nhật Bản (5S, Kaizen).',
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Quản trị Nhân lực, Ngoại ngữ, Kinh tế.',
      'Tối thiểu 2 năm kinh nghiệm tuyển dụng trong các doanh nghiệp sản xuất / FDI.',
      'Khả năng giao tiếp tiếng Anh hoặc tiếng Nhật (N3 trở lên) là lợi thế lớn.',
    ],
    similarJobIds: ['job-chailease-credit', 'job-fpt-schools'],
  },
  {
    id: 'job-chailease-credit',
    title: 'Credit Officer (Thẩm Định Tín Dụng)',
    company: 'Chailease',
    companySlug: 'chailease',
    logo: '/images/logo_chailease.png',
    buildingImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    location: 'Đà Nẵng, Hà Nội',
    workplaceType: 'Hybrid',
    seniority: 'Officer / Specialist',
    department: 'Commercial Credit Assessment',
    compensation: 'Thương lượng / Negotiable',
    salaryPeriod: '',
    perks: ['Thưởng kết quả tín dụng', 'Làm việc linh hoạt Hybrid', 'Bảo hiểm sức khỏe quốc tế'],
    datePosted: '3 ngày trước',
    timeAgo: '3 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Phân tích báo cáo tài chính, thẩm định hồ sơ thuê mua tài chính và định giá rủi ro tín dụng cho khách hàng doanh nghiệp.',
    fullDesc: 'Chailease International Leasing tuyển dụng Credit Officer phụ trách thẩm định các dự án tài trợ vốn mua sắm máy móc thiết bị, phương tiện vận tải thương mại cho các doanh nghiệp vừa và nhỏ tại Việt Nam.',
    responsibilities: [
      'Tiếp nhận, kiểm tra tính pháp lý và phân tích năng lực tài chính của hồ sơ vay.',
      'Khảo sát thực tế cơ sở sản xuất kinh doanh và tài sản đảm bảo của khách hàng.',
      'Lập tờ trình thẩm định tín dụng, đề xuất hạn mức và biện pháp kiểm soát rủi ro.',
      'Theo dõi tiến độ giải ngân và quản lý chất lượng danh mục tín dụng được giao.'
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Tài chính - Ngân hàng, Kế toán, Kiểm toán, Kinh tế.',
      'Tối thiểu 1-2 năm kinh nghiệm thẩm định tín dụng tại Ngân hàng hoặc Công ty Cho thuê tài chính.',
      'Kỹ năng đọc hiểu và bóc tách báo cáo tài chính doanh nghiệp tốt.',
      'Cẩn trọng, bảo mật và tiếng Anh giao tiếp chuyên ngành.'
    ],
    similarJobIds: ['job-vietnhat-1', 'job-seev-hr']
  },
  {
    id: 'job-fpt-schools',
    title: 'FPT Schools Tuyển Dụng Giáo Viên & Quản Lý',
    company: 'Tổ Chức Giáo Dục FPT',
    companySlug: 'fpt-education',
    logo: '/images/logo_fpt.png',
    buildingImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    location: 'Hà Tĩnh, Hồ Chí Minh, Phú Thọ',
    workplaceType: 'On-site',
    seniority: 'Teacher / Team Lead',
    department: 'Khối Giáo Dục Phổ Thông - FPT Schools',
    compensation: 'Thương lượng / Negotiable',
    salaryPeriod: '',
    perks: ['Ưu đãi 50% học phí cho con em', 'Thưởng lễ Tết & du lịch FPT', 'Môi trường công nghệ hiện đại'],
    datePosted: '3 ngày trước',
    timeAgo: '3 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Giảng dạy các bộ môn STEM, Tin học và ngoại ngữ theo chương trình giáo dục hiện đại, ứng dụng AI tại hệ thống FPT Schools.',
    fullDesc: 'Tổ chức Giáo dục FPT mở rộng mạng lưới trường phổ thông liên cấp FPT Schools tại nhiều tỉnh thành trên toàn quốc, tuyển dụng đội ngũ giáo viên và cán bộ quản lý năng động, nhiệt huyết với đổi mới giáo dục.',
    responsibilities: [
      'Giảng dạy theo giáo trình chuẩn và phương pháp học tập qua trải nghiệm (Experiential Learning).',
      'Ứng dụng công nghệ thông tin và AI vào soạn thảo giáo án, theo dõi tiến độ học tập của học sinh.',
      'Chủ trì các câu lạc bộ khoa học kỹ thuật, hướng dẫn học sinh tham gia các kỳ thi sáng tạo.',
      'Phối hợp cùng phụ huynh và nhà trường định hướng phát triển nhân cách, kỹ năng sống.'
    ],
    requirements: [
      'Tốt nghiệp Đại học Sư phạm hoặc có chứng chỉ nghiệp vụ sư phạm phù hợp.',
      'Tư duy đổi mới, yêu thương học sinh và tôn trọng sự khác biệt cá nhân.',
      'Khả năng ứng dụng công nghệ trong giảng dạy thành thạo.',
      'Ưu tiên giáo viên có kinh nghiệm dạy trường song ngữ hoặc đạt danh hiệu giáo viên dạy giỏi.'
    ],
    similarJobIds: ['job-seev-hr', 'job-vinmec-1']
  },
  {
    id: 'job-seev-maintenance',
    title: 'Kỹ Sư Bảo Dưỡng Sửa Chữa Thiết Bị',
    company: 'SEI Electronic Components (SEEV)',
    companySlug: 'seev',
    logo: '/images/logo_seev.png',
    buildingImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    location: 'Hà Nội',
    workplaceType: 'On-site',
    seniority: 'Maintenance Engineer',
    department: 'Equipment Maintenance Division',
    compensation: 'Thương lượng / Negotiable',
    salaryPeriod: '',
    perks: ['Phụ cấp chuyên cần & ca', 'Đào tạo kỹ thuật chuyên sâu', 'Xe đưa đón KCN Thăng Long'],
    datePosted: '4 ngày trước',
    timeAgo: '4 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Bảo trì phòng ngừa và khắc phục sự cố máy móc tự động hóa, dây chuyền sản xuất linh kiện điện tử vi mạch.',
    fullDesc: 'Đảm bảo hoạt động liên tục và ổn định của toàn bộ máy móc thiết bị trong phòng sạch nhà máy SEEV. Áp dụng các tiêu chuẩn quản trị bảo trì TPM và giảm thiểu thời gian dừng máy (Downtime).',
    responsibilities: [
      'Lập kế hoạch bảo dưỡng định kỳ (PM) cho các máy SMT, máy ép nhiệt và cánh tay robot.',
      'Xử lý nhanh chóng các lỗi kỹ thuật phát sinh trong quá trình sản xuất.',
      'Phân tích nguyên nhân gốc rễ (RCA) các sự cố lặp lại và đề xuất cải tiến Kaizen.',
      'Quản lý kho phụ tùng thay thế và thiết bị đo kiểm.'
    ],
    requirements: [
      'Tốt nghiệp Cao đẳng/Đại học chuyên ngành Cơ điện tử, Tự động hóa, Điện tử công nghiệp.',
      'Có từ 2 năm kinh nghiệm bảo dưỡng máy móc trong các nhà máy sản xuất linh kiện điện tử.',
      'Đọc hiểu sơ đồ mạch điện, khí nén và lập trình cơ bản PLC (Mitsubishi, Omron, Keyence).',
      'Chấp nhận làm việc theo ca sản xuất.'
    ],
    similarJobIds: ['job-vietnhat-1', 'job-seev-me']
  },
  {
    id: 'job-pvcfc-data',
    title: 'Chuyên Viên Khoa Học Dữ Liệu & Phân Tích',
    company: 'Tổng công ty Phân bón và Hóa chất Dầu khí (PVCFC)',
    companySlug: 'pvcfc',
    logo: '/images/logo_pvcfc.png',
    buildingImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    location: 'Cà Mau, Hồ Chí Minh',
    workplaceType: 'Hybrid',
    seniority: 'Data Scientist / Specialist',
    department: 'Digital Transformation & Analytics Center',
    compensation: 'Thương lượng / Negotiable',
    salaryPeriod: '',
    perks: ['Thưởng doanh thu Dầu khí', 'Gói bảo hiểm PVI Care VIP', 'Khu lưu trú công vụ tiện nghi'],
    datePosted: '4 ngày trước',
    timeAgo: '4 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Xây dựng mô hình Machine Learning dự báo nhu cầu nông sản, tối ưu chuỗi cung ứng và vận hành nhà máy phân bón.',
    fullDesc: 'Tham gia trung tâm chuyển đổi số của PVCFC để giải quyết các bài toán tối ưu hóa năng lượng, tự động hóa dự báo thị trường phân bón và phân tích dữ liệu hành vi của hàng triệu nông dân trên nền tảng số.',
    responsibilities: [
      'Thu thập, tiền xử lý và xây dựng pipeline dữ liệu lớn từ hệ thống ERP, IoT nhà máy.',
      'Phát triển mô hình học máy (Time-Series, Clustering, Regression) phục vụ dự báo kinh doanh.',
      'Thiết kế dashboard trực quan hóa dữ liệu trên PowerBI / Tableau cho ban lãnh đạo.',
      'Phối hợp cùng kỹ sư phần mềm triển khai mô hình vào môi trường production.'
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Khoa học dữ liệu, Toán tin, CNTT hoặc Kinh tế lượng.',
      'Thành thạo Python (Pandas, Scikit-Learn, PyTorch) và ngôn ngữ truy vấn SQL.',
      'Có kinh nghiệm triển khai ít nhất 2 dự án Machine Learning thực tế.',
      'Tư duy phân tích số liệu nhạy bén và kỹ năng trình bày giải pháp thuyết phục.'
    ],
    similarJobIds: ['job-vinmec-1', 'job-vsf-sa']
  },
  {
    id: 'job-vsf-sa',
    title: 'Solution Architect (Cloud & Distributed Systems)',
    company: 'CÔNG TY CỔ PHẦN VINSMART FUTURE (VSF)',
    companySlug: 'vinsmart',
    logo: '/images/logo_vsf.png',
    buildingImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    location: 'Hà Nội, Hồ Chí Minh',
    workplaceType: 'Hybrid',
    seniority: 'Principal / Lead Architect',
    department: 'Smart Cloud & AI IoT Architecture',
    compensation: 'Thương lượng / Negotiable',
    salaryPeriod: '',
    perks: ['Gói cổ phần ESOP Vingroup', 'MacBook Pro M-series', 'Bảo hiểm sức khỏe hạng kim cương'],
    datePosted: '5 ngày trước',
    timeAgo: '5 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Kiến trúc hạ tầng đám mây phân tán chịu tải cao (High Concurrency) cho hệ sinh thái xe điện thông minh và đô thị thông minh.',
    fullDesc: 'VSF tìm kiếm Solution Architect giàu kinh nghiệm dẫn dắt thiết kế hệ thống backend xử lý hàng tỷ message mỗi ngày từ hàng triệu thiết bị IoT thông minh và phương tiện giao thông thế hệ mới.',
    responsibilities: [
      'Thiết kế kiến trúc hệ thống Microservices quy mô lớn, khả năng tự động mở rộng (Auto-scaling).',
      'Định hình công nghệ lưu trữ dữ liệu phân tán (Cassandra, Redis, ClickHouse, Kafka).',
      'Xây dựng tiêu chuẩn bảo mật đám mây, quy trình CI/CD và kiến trúc Zero-Trust.',
      'Làm việc cùng các chuyên gia quốc tế để tối ưu chi phí hạ tầng Cloud và hiệu năng dịch vụ.'
    ],
    requirements: [
      'Tối thiểu 5 năm kinh nghiệm ở vai trò Solution Architect hoặc Principal Software Engineer.',
      'Làm chủ kiến trúc Microservices, Event-Driven Architecture, Kubernetes, Cloud Native (AWS/GCP).',
      'Thành thạo ít nhất 2 ngôn ngữ: Golang, Java, Python, C++.',
      'Có chứng chỉ AWS Solutions Architect Professional hoặc Google Cloud Certified Professional Architect.'
    ],
    similarJobIds: ['job-pvcfc-data', 'job-seev-me']
  },
  {
    id: 'job-seev-me',
    title: 'Kỹ Sư Thiết Kế & Giám Sát Cơ Điện (M&E)',
    company: 'SEI Electronic Components (SEEV)',
    companySlug: 'seev',
    logo: '/images/logo_seev.png',
    buildingImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    location: 'Hà Nội',
    workplaceType: 'On-site',
    seniority: 'M&E Project Engineer',
    department: 'Facility & Clean Room Engineering',
    compensation: 'Thương lượng / Negotiable',
    salaryPeriod: '',
    perks: ['Thưởng dự án hoàn công', 'Tu nghiệp kỹ thuật tại Nhật', 'Đóng bảo hiểm mức lương thực tế'],
    datePosted: '5 ngày trước',
    timeAgo: '5 ngày trước',
    badge: 'Hot Job',
    shortDesc: 'Thiết kế chi tiết và giám sát thi công hệ thống HVAC phòng sạch, cấp thoát nước và khí nén cho nhà máy công nghệ cao.',
    fullDesc: 'Quản lý và giám sát kỹ thuật các gói thầu cơ điện cải tạo, nâng cấp mở rộng nhà máy sản xuất linh kiện bản mạch in SEEV tại KCN Thăng Long Đông Anh Hà Nội.',
    responsibilities: [
      'Thẩm tra bản vẽ thiết kế thi công hệ thống điều hòa trung tâm Chiller, hệ thống cấp khí sạch AHU.',
      'Giám sát nhà thầu thi công tuân thủ quy chuẩn kỹ thuật và an toàn lao động trong phòng sạch.',
      'Bóc tách khối lượng, kiểm soát vật tư và nghiệm thu các hạng mục cơ điện hoàn thành.',
      'Phối hợp với bộ phận vận hành để bàn giao hệ thống kỹ thuật ổn định.'
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Kỹ thuật Nhiệt - Lạnh, Cấp thoát nước, Cơ điện công trình.',
      'Có chứng chỉ hành nghề giám sát thi công cơ điện hạng II trở lên.',
      'Tối thiểu 3 năm kinh nghiệm giám sát M&E cho các công trình nhà xưởng tiêu chuẩn phòng sạch.',
      'Sử dụng thành thạo AutoCAD, MS Project và giao tiếp tiếng Anh cơ bản.'
    ],
    similarJobIds: ['job-vietnhat-1', 'job-seev-maintenance']
  },
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

  {
    id: 'intern-metfone',
    title: 'Summer 2026 AI Research & Engineering Intern',
    company: 'Metfone',
    companySlug: 'metfone',
    logo: '/images/metfone_badge.svg',
    buildingImage: '/images/metfone_cover.png',
    location: 'Phnom Penh, Cambodia',
    workplaceType: 'Hybrid',
    seniority: 'Internship / Student',
    department: 'AI & Engineering',
    compensation: '$6,200',
    salaryPeriod: '/ month',
    perks: ['Housing Allowance', 'Meal Stipend', 'Health Insurance', '1-on-1 Mentorship'],
    datePosted: 'Today',
    timeAgo: '6 hours ago',
    badge: 'Internship',
    shortDesc: 'Join Metfone’s AI & Engineering team and help build innovative solutions for a smarter, more connected Cambodia.',
    fullDesc: 'Join Metfone’s AI & Engineering team and help build innovative solutions for a smarter, more connected Cambodia. As a Summer 2026 AI Research & Engineering Intern, you will participate in real-world telecommunication AI deployments, automated customer experience agents, and high-volume network telemetry optimization.',
    responsibilities: [
      'Develop AI and machine learning algorithms for telecommunication network traffic analysis.',
      'Build low-latency NLP and computer vision pipelines for enterprise customer service automation.',
      'Collaborate with senior software architects on microservices deployment and cloud containerization.',
      'Analyze high-throughput data streams across nationwide mobile and fiber optic infrastructure.'
    ],
    requirements: [
      'Undergraduate or Master’s student in Computer Science, Data Science, Telecom, or Information Technology.',
      'Solid foundations in Python, JavaScript/TypeScript, SQL, and Machine Learning frameworks.',
      'Familiarity with REST APIs, Git version control, and containerized architectures (Docker/Kubernetes).',
      'Strong logical reasoning, curiosity, and proactive teamwork abilities.'
    ],
    teamQuote: {
      text: 'Our engineering interns work on production-level telecom AI tools that serve millions of subscribers daily.',
      author: 'Sokha Rith',
      role: 'Director of AI & Network Technology • Metfone Phnom Penh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    similarJobIds: ['job-braze', 'job-google', 'intern-datadog']
  },
  {
    id: 'job-braze',
    title: 'Frontend Platform & Web Performance',
    company: 'Braze',
    companySlug: 'braze',
    logo: '/images/braze_logo.svg',
    buildingImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    location: 'Phnom Penh, Cambodia',
    workplaceType: 'Remote',
    seniority: 'Mid-Senior Level',
    department: 'Platform Engineering',
    compensation: '$2,400',
    salaryPeriod: '/ month',
    perks: ['Meal Stipend', 'Remote Work', 'Health Insurance', 'Learning Stipend'],
    datePosted: 'Yesterday',
    timeAgo: '1 day ago',
    badge: 'Full-time',
    shortDesc: 'Drive high-speed web rendering, core web vitals optimization, and scalable micro-frontend architectures across customer engagement platforms.',
    fullDesc: 'Braze is looking for a Frontend Platform Engineer to drive web performance, bundle size reductions, and component architecture for enterprise marketing workflows.',
    responsibilities: [
      'Architect robust, accessible web components and optimize Core Web Vitals across millions of dashboard pageviews.',
      'Implement real-time WebSocket communication pipelines and client-side caching strategies.',
      'Partner with design systems and UX research teams to build fluid, high-conversion interfaces.'
    ],
    requirements: [
      '3+ years professional frontend engineering experience with React, TypeScript, and modern build tooling.',
      'Deep understanding of browser rendering mechanics, DOM lifecycle, and performance profiling.',
      'Proven track record building maintainable design systems and component libraries.'
    ],
    similarJobIds: ['intern-metfone', 'job-google', 'intern-bytedance']
  },
  {
    id: 'job-google',
    title: 'Software Engineer, Google Careers',
    company: 'Google',
    companySlug: 'google',
    logo: '/images/google_logo.svg',
    buildingImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    location: 'Phnom Penh, Cambodia',
    workplaceType: 'Remote',
    seniority: 'Software Engineer',
    department: 'Core Systems & Developer Tooling',
    compensation: '$3,500',
    salaryPeriod: '/ month',
    perks: ['Performance Bonus', 'Google Stock Units', 'Comprehensive Health', 'Wellness Allowance'],
    datePosted: '2 days ago',
    timeAgo: '2 days ago',
    badge: 'Full-time',
    shortDesc: 'Build resilient distributed backends, developer tools, and regional cloud gateways connecting emerging Southeast Asia markets.',
    fullDesc: 'Join Google’s global engineering group working on high-availability cloud platforms, developer tooling, and localized network performance enhancements.',
    responsibilities: [
      'Write scalable, secure backend services in Go, C++, or Java for mission-critical Google Cloud services.',
      'Design fault-tolerant APIs and data synchronization pipelines across multi-region datacenters.',
      'Participate in code reviews, design docs creation, and system scalability reviews.'
    ],
    requirements: [
      'BS or MS degree in Computer Science or equivalent practical experience.',
      'Strong knowledge of algorithms, data structures, and concurrent system design.',
      'Experience developing web APIs, distributed storage, or cloud infrastructure.'
    ],
    similarJobIds: ['intern-metfone', 'job-braze', 'intern-datadog']
  },
  {
    id: 'intern-datadog',
    title: 'Summer 2026 AI Research & Engineering Intern',
    company: 'Datadog',
    companySlug: 'datadog',
    logo: '/images/datadog_logo.png',
    buildingImage: '/images/clean_datadog_building.jpg',
    location: 'New York, NY',
    workplaceType: 'Hybrid',
    seniority: 'Internship / Student',
    department: 'AI & Observability Research',
    compensation: '$6,200',
    salaryPeriod: '/ month',
    perks: ['Housing Allowance', 'Mentorship Cohort', '401(k) Matching', 'Hardware Stipend'],
    datePosted: 'Today',
    timeAgo: '6 hours ago',
    badge: 'Internship',
    shortDesc: 'Contribute to Datadog’s deep learning infrastructure for streaming anomaly detection, high-throughput metrics ingestion, and autonomous LLM telemetry analysis.',
    fullDesc: 'As an AI Research & Systems Intern at Datadog, you will work embedded with our core infrastructure engineering group. You will formulate empirical algorithms to analyze multi-petabyte telemetry streams in real-time, leveraging distributed GPUs, high-concurrency Rust services, and automated model distillation techniques.',
    responsibilities: [
      'Design and benchmark low-latency inference pipelines handling over 100M metric samples per second.',
      'Collaborate with staff researchers on self-supervised anomaly detection across large-scale Kubernetes clusters.',
      'Implement reproducible evaluation frameworks to test LLM-powered root-cause investigation agents.',
      'Present research findings to senior leadership and write peer-reviewed engineering technical notes.'
    ],
    requirements: [
      'Currently enrolled in a BS/MS/PhD program in Computer Science, Applied Mathematics, or related field with graduation in 2026 or 2027.',
      'Proficiency in Python, Go, or Rust, with practical knowledge of PyTorch, CUDA, or distributed computing primitives.',
      'Solid foundations in data structures, concurrent systems, and statistical signal processing.',
      'Strong communication skills and passion for enterprise observability and large-scale computing.'
    ],
    teamQuote: {
      text: 'Our interns do not work on toy demo apps. On week three, my intern shipped a streaming compression patch that saved 4% cluster-wide CPU on our ingestion edge nodes.',
      author: 'Marcus Vance',
      role: 'Staff Infrastructure Architect • Datadog NYC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    similarJobIds: ['intern-bytedance', 'fellow-nus', 'grant-mobility']
  },
  {
    id: 'intern-bytedance',
    title: 'Frontend Platform & Web Performance Intern',
    company: 'ByteDance',
    companySlug: 'bytedance',
    logo: '/images/bytedance_logo.png',
    buildingImage: '/images/clean_bytedance_building.jpg',
    location: 'Singapore',
    workplaceType: 'Hybrid',
    seniority: 'Internship / Student',
    department: 'Web Infrastructure & Client Platform',
    compensation: '$2,400',
    salaryPeriod: '/ month',
    perks: ['Meal Stipend', 'Health Insurance', 'Transportation Allowance', 'Relocation Support'],
    datePosted: '1 day ago',
    timeAgo: '1 day ago',
    badge: 'Internship',
    shortDesc: 'Help engineer world-class web rendering runtimes and developer tools serving hundreds of millions of daily active users.',
    fullDesc: 'ByteDance’s Web Platform group is seeking a Frontend Platform Intern to join our Singapore engineering headquarters. You will help build high-performance WebAssembly engines, zero-latency video player runtimes, and distributed frontend telemetry toolchains.',
    responsibilities: [
      'Optimize web vitals (LCP, INP, CLS) across cross-platform web containers and embedded hybrid views.',
      'Develop automated profiling harnesses to detect JavaScript memory leaks and layout trashing.',
      'Collaborate with UX designers to deliver fluid, accessible UI components at extreme scale.',
      'Experiment with WebCodecs, WebGL, and WebGPU for next-generation interactive experiences.'
    ],
    requirements: [
      'Undergraduate or graduate student in Computer Science or Software Engineering.',
      'Deep understanding of JavaScript/TypeScript, DOM rendering life cycle, and modern CSS architecture.',
      'Familiarity with performance profiling tools (Chrome DevTools, Lighthouse, WebPageTest).',
      'Curiosity for compiler toolchains, bundlers (Vite/Rollup), or WebAssembly is a major plus.'
    ],
    teamQuote: {
      text: 'At ByteDance scale, improving First Contentful Paint by 40 milliseconds yields noticeable retention gains across our global user base.',
      author: 'Chloe Tan',
      role: 'Principal Web Architect • ByteDance Singapore',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    similarJobIds: ['intern-datadog', 'fellow-berkeley']
  },
  {
    id: 'fellow-berkeley',
    title: 'Autonomous Leadership & AI Fellowship 2026',
    company: 'Tsinghua-Berkeley Shenzhen Institute (TBSI)',
    companySlug: 'tbsi',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    buildingImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=85',
    location: 'Shenzhen & Berkeley',
    workplaceType: 'Hybrid',
    seniority: 'Fellowship / Postgrad',
    department: 'Autonomous Systems & Robotics',
    compensation: 'Full Tuition',
    salaryPeriod: '+ $3,200/mo Stipend',
    perks: ['Full Tuition Coverage', 'Shenzhen Lab Access', 'Silicon Valley Immersion', 'Published Paper Grant'],
    datePosted: '3 days ago',
    timeAgo: '3 days ago',
    badge: 'Global Fellowship',
    shortDesc: 'A prestigious dual-institution fellowship focusing on foundation models for autonomous systems, robotics manipulation, and smart logistics.',
    fullDesc: 'The TBSI Autonomous Leadership Fellowship is designed for exceptional researchers wishing to bridge physical robotics with compound AI models. Fellows spend intensive research residencies in Shenzhen and UC Berkeley robotics labs.',
    responsibilities: [
      'Conduct fundamental research on vision-language-action (VLA) models for multi-agent coordination.',
      'Deploy autonomous dispatch algorithms on physical seaport AGVs and warehouse robotic arms.',
      'Author top-tier research papers submitted to CVPR, NeurIPS, ICRA, or IROS.',
      'Engage with global logistics conglomerates for live deployment testbeds.'
    ],
    requirements: [
      'Master’s degree or final-year undergraduate with proven research record in robotics, AI, or control theory.',
      'Demonstrated experience in ROS2, PyTorch, Isaac Sim, or MuJoCo physics simulation.',
      'Excellent analytical writing and collaborative research skills.'
    ],
    similarJobIds: ['fellow-nus', 'grant-mobility']
  },
  {
    id: 'fellow-nus',
    title: 'ASEAN Digital Talent Master’s Scholarship in Computer Science',
    company: 'National University of Singapore (NUS Computing)',
    companySlug: 'nus',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    buildingImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85',
    location: 'Singapore',
    workplaceType: 'On-site',
    seniority: 'Scholarship / Master’s',
    department: 'School of Computing',
    compensation: 'S$38,000',
    salaryPeriod: '/ year',
    perks: ['Tuition Waiver', 'Monthly Living Allowance', 'Conference Travel Budget', 'Industry Internship Track'],
    datePosted: '4 days ago',
    timeAgo: '4 days ago',
    badge: 'Global Scholarship',
    shortDesc: 'Full graduate scholarship for high-potential ASEAN technologists advancing cloud-native platforms, AI security, and distributed computing.',
    fullDesc: 'NUS School of Computing offers the ASEAN Digital Talent Scholarship to develop future engineering leaders across Southeast Asia. The program provides complete tuition remission and structured access to top global research faculty.',
    responsibilities: [
      'Complete advanced coursework in distributed algorithms, formal verification, or ML systems.',
      'Undertake a capstone thesis in partnership with leading tech enterprises in Singapore.',
      'Participate in academic peer review and student mentorship seminars.'
    ],
    requirements: [
      'Citizens of ASEAN nations (excluding Singapore) with stellar academic undergraduate record.',
      'Strong programming competence and passion for transformative digital infrastructure.'
    ],
    similarJobIds: ['intern-datadog', 'grant-mobility']
  },
  {
    id: 'grant-mobility',
    title: 'Autonomous Mobility & Clean Energy Research Grant',
    company: 'Global Automotive Technology Foundation',
    companySlug: 'gatf',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    buildingImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=85',
    location: 'Remote',
    workplaceType: 'Remote',
    seniority: 'Research Grant',
    department: 'Clean Propulsion & Edge AI',
    compensation: '$25,000',
    salaryPeriod: 'Research Grant',
    perks: ['Equity-Free Funding', 'Hardware Access', 'Direct OEM Mentorship', 'Commercialization Support'],
    datePosted: '5 days ago',
    timeAgo: '5 days ago',
    badge: 'Research Grant',
    shortDesc: 'Non-dilutive grant funding for research teams pioneering energy-efficient battery telemetry and autonomous fleet routing algorithms.',
    fullDesc: 'The Global Automotive Technology Foundation sponsors independent researchers and academic labs working on next-generation electric vehicle powertrains, battery health prediction algorithms, and autonomous fleet orchestration.',
    responsibilities: [
      'Formulate edge AI algorithms running directly on microcontrollers to forecast battery degradation.',
      'Validate routing optimization on synthetic city-scale freight data.',
      'Submit open-source reference implementations and quarterly milestone reports.'
    ],
    requirements: [
      'Independent researchers, post-docs, or graduate engineering teams.',
      'Demonstrated expertise in embedded C/C++, Rust, or battery management systems (BMS).'
    ],
    similarJobIds: ['fellow-berkeley', 'intern-datadog']
  },
  {
    id: 'job-vsc-1',
    title: 'Senior Ocean Freight Operations Specialist',
    company: 'Viconship Container Corporation',
    companySlug: 'viconship',
    logo: '/images/brands/viconship.svg',
    buildingImage: '/images/today_3.jpg',
    location: 'Ho Chi Minh City, VN',
    workplaceType: 'Hybrid',
    seniority: 'Senior Specialist',
    department: 'Ocean Freight & Maritime Forwarding',
    compensation: '35M - 50M VND',
    salaryPeriod: '/ month',
    perks: ['Comprehensive PVI Healthcare', 'Annual Performance Bonus (3-4 Months)', 'Maritime Training Allowance', 'Overseas Port Visas'],
    datePosted: 'Today',
    timeAgo: '2 hours ago',
    badge: 'Verified',
    shortDesc: 'Lead high-volume maritime booking and liner carrier negotiations across Transpacific and Intra-Asia trade lanes for key electronics and footwear exporters.',
    fullDesc: 'Viconship is seeking an experienced Senior Ocean Freight Operations Specialist to manage our core maritime forwarding trade lanes out of Southern Vietnam ports (Cai Mep - Thi Vai & Cat Lai). You will lead carrier allocation, chartering negotiations, and end-to-end exception management.',
    responsibilities: [
      'Manage tier-1 carrier space procurement across Transpacific and European routes.',
      'Supervise customs EDI filing via VNACCS and resolve quayside clearance bottlenecks.',
      'Mentor junior forwarding coordinators and maintain 99.4% SLA adherence for key multinational accounts.',
      'Coordinate with deep-sea terminal planners at Gemalink, VIP Green Port, and TCIT.'
    ],
    requirements: [
      'At least 4 years of proven ocean freight forwarding experience with an international 3PL or liner agency.',
      'Fluency in English and Vietnamese; command of CargoWise ONE or Navis N4 is highly preferred.',
      'FIATA or IATA diploma certification is a strong competitive advantage.',
      'Deep knowledge of Incoterms 2020, demurrage/detention tariffs, and maritime customs compliance.'
    ],
    teamQuote: {
      text: 'Viconship gives you direct leverage across both terminal gates and global carrier alliances. It is the most robust maritime infrastructure in Vietnam.',
      author: 'Nguyen Van Binh',
      role: 'Director of Freight Operations • Viconship Hai Phong',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    similarJobIds: ['job-verified-1793071901986', 'job-snp-1']
  },
  {
    id: 'job-verified-1793071901986',
    title: 'Senior Multimodal Freight Operations Lead',
    company: 'DHL Global Forwarding Vietnam',
    companySlug: 'dhl',
    logo: '/images/brands/dhl.svg',
    buildingImage: '/images/hero_2.jpg',
    location: 'Ho Chi Minh City, VN',
    workplaceType: 'Hybrid',
    seniority: 'Lead / Principal',
    department: 'Multimodal Freight & Air Cargo',
    compensation: '45M - 65M VND',
    salaryPeriod: '/ month',
    perks: ['Global Mobility Program', 'Premium Health & Life Insurance', 'Stock Purchase Plan', 'Continuous Executive Coaching'],
    datePosted: '1 day ago',
    timeAgo: '1 day ago',
    badge: 'Verified',
    shortDesc: 'Direct cross-border multimodal air and sea-rail routes connecting Vietnam manufacturing clusters to the European Union and North America.',
    fullDesc: 'DHL Global Forwarding Vietnam invites senior supply chain professionals to spearhead multimodal corridor operations. You will architect resilient cross-border supply chains combining sea transport, bonded trucking, and scheduled charter air freight.',
    responsibilities: [
      'Architect resilient sea-air and cross-border rail solutions connecting Vietnam to Frankfurt and Chicago.',
      'Direct carrier contract negotiations for high-value cold chain and semiconductor cargo.',
      'Lead crisis response and contingency rerouting during Red Sea or canal transit disruptions.',
      'Drive digital freight adoption and automated EDI milestone tracking.'
    ],
    requirements: [
      '6+ years of leadership in multimodal freight forwarding with global logistics providers.',
      'Expertise in temperature-controlled pharmaceutical cold chain, hazardous cargo (DG), and customs regimes.',
      'Excellent executive presentation skills and proven commercial negotiation track record.'
    ],
    similarJobIds: ['job-vsc-1', 'job-snp-1']
  },
  {
    id: 'job-snp-1',
    title: 'Port Gate Automation & TOS Analyst',
    company: 'Saigon Newport Corporation (SNP)',
    companySlug: 'saigon-newport',
    logo: '/images/brands/saigon-newport.svg',
    buildingImage: '/images/hero_1.jpg',
    location: 'Cat Lai Port, Ho Chi Minh City',
    workplaceType: 'On-site',
    seniority: 'Mid-Senior',
    department: 'Port IT & Automation',
    compensation: '30M - 45M VND',
    salaryPeriod: '/ month',
    perks: ['Quayside Allowance', 'Comprehensive Healthcare', 'State Corporation Pension', 'Training Grants'],
    datePosted: '2 days ago',
    timeAgo: '2 days ago',
    badge: 'Verified',
    shortDesc: 'Optimize automated container gate algorithms, optical character recognition (OCR), and Navis N4 dispatch algorithms at Vietnam’s busiest seaport.',
    fullDesc: 'Saigon Newport Corporation is expanding its digital terminal team. You will lead the deployment of smart gate automation, automated truck positioning, and live vessel crane scheduling engines.',
    responsibilities: [
      'Maintain and configure Navis N4 terminal operating system parameters.',
      'Integrate RFID and OCR truck lane recognition hardware with customs gate databases.',
      'Analyze yard dwell time data to minimize container re-handling moves.'
    ],
    requirements: [
      'Degree in Information Technology, Automation Engineering, or Maritime Systems.',
      'Experience with SQL, Linux systems, and terminal operations systems (TOS).',
      'Ability to collaborate on-site with quayside operations managers and marine pilots.'
    ],
    similarJobIds: ['job-vsc-1', 'job-verified-1793071901986']
  }
];

// ============================================================================
// 2. COMPANIES DATABASE
// ============================================================================
export const companiesDatabase: CompanyProfile[] = [
  {
    id: 'access-partnership',
    slug: 'access-partnership',
    name: 'Access Partnership',
    shortName: 'Access Partnership',
    tier: 'Global Tier 1 Advisory',
    hq: 'London, United Kingdom',
    size: '165+ Employees',
    founded: '1999',
    industry: 'Professional Services & Tech Policy Advisory',
    jobsCount: 6,
    website: 'https://accesspartnership.com',
    heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    logoImg: '/images/access_partnership_logo.svg',
    desc: 'Access Partnership is the leading global technology public policy and regulatory advisory firm. Founded in 1999, we help governments, top multilateral organizations, and the world’s most innovative technology companies navigate complex policy landscapes, secure market access, and govern frontier technologies including AI, satellite connectivity, quantum, and digital trade across 12+ international offices.',
    stat1Label: 'Global Offices',
    stat1Val: '12+ Hubs',
    stat2Label: 'Team Size',
    stat2Val: '165+ Experts',
    stat3Label: 'Founded',
    stat3Val: '1999',
    quoteText: 'We shape the regulatory and policy environments that allow technological innovation to scale responsibly worldwide.',
    quoteAuthor: 'Gregory Francis, Founder & CEO',
    photos: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'careers@accesspartnership.com',
    phone: '+44 (0) 20 8600 0630',
    address: '6th Floor, 9 Prescot Street, London E1 8AZ, United Kingdom',
    certs: ['ISO 27001 Certified', 'Global Tech Policy Council', 'United Nations ITU Partner', 'Fair Pay Employer'],
    hiringCategories: [
      { name: 'Public Policy & Government Affairs', count: 3 },
      { name: 'Emerging Tech & AI Governance', count: 2 },
      { name: 'Telecom & Satellite Strategy', count: 1 }
    ],
    techStack: [
      { name: 'AI Governance Frameworks', category: 'Policy & Compliance', icon: 'Cpu' },
      { name: 'ITU Spectrum Allocation', category: 'Telecommunications', icon: 'Wifi' },
      { name: 'Global Regulatory Mapping', category: 'Research & Data', icon: 'Globe' },
      { name: 'Salesforce & Slack Enterprise', category: 'Collaboration', icon: 'Layers' }
    ],
    cultureValues: [
      { title: 'Global Impact with Local Precision', desc: 'Operating across 12 countries, we advise on the critical intersection of cutting-edge technology and government regulation.' },
      { title: 'Hybrid & Flexible Autonomy', desc: 'We trust our specialists with hybrid work policies, flexible hours, and cross-border project mobility.' },
      { title: 'Continuous Policy Thought Leadership', desc: 'Our team regularly testifies before regulatory commissions, speaks at international summits, and publishes influential policy papers.' }
    ],
    offices: [
      { name: 'London Global Headquarters', location: 'London, United Kingdom', type: 'Global HQ', spec: 'Executive, International Policy & Strategy Hub' },
      { name: 'Washington D.C. Americas Hub', location: 'Washington D.C., United States', type: 'Regional HQ', spec: 'Federal Affairs, FTC/FCC Policy & Tech Trade' },
      { name: 'Singapore Asia-Pacific Hub', location: 'Singapore', type: 'Regional Hub', spec: 'APAC Digital Economy, Cross-border Data Flows' },
      { name: 'Hanoi Vietnam Liaison', location: 'Hà Nội, Vietnam', type: 'Regional Office', spec: 'Southeast Asia Emerging Tech & Regulatory Advisory' },
      { name: 'Brussels European Union Hub', location: 'Brussels, Belgium', type: 'EU Policy Hub', spec: 'EU AI Act, DSA/DMA Digital Regulation' }
    ],
    awards: [
      { title: 'Top Global Tech Policy Consultancy 2025', org: 'Global Telecom & Tech Review', badge: 'Tier 1 Advisory' },
      { title: 'Excellence in AI Regulatory Strategy', org: 'International Tech Governance Forum', badge: 'Gold Award' }
    ],
    openJobIds: ['job-ap-1', 'job-ap-2', 'job-ap-3'],
    linkedinUrl: 'https://www.linkedin.com/company/access-partnership',
    linkedinFollowers: '14,800+ followers on LinkedIn',
    linkedinInsights: {
      medianTenure: '2.8 years',
      growthYoY: '+16% headcount growth',
      functionalBreakdown: [
        { function: 'Tech Policy & Advisory', percent: 42 },
        { function: 'Research & Intelligence', percent: 26 },
        { function: 'Government & Legal Affairs', percent: 20 },
        { function: 'Operations & Strategy', percent: 12 }
      ]
    },
    leadershipTeam: [
      {
        name: 'Gregory Francis',
        title: 'Founder & Chief Executive Officer',
        location: 'London, UK',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        linkedinUrl: 'https://www.linkedin.com/in/gregory-francis-ap',
        bio: 'Founder of Access Partnership with 25+ years pioneering international technology diplomacy and regulatory access.'
      },
      {
        name: 'Xiaomeng Lu',
        title: 'Director of Emerging Tech & AI Policy',
        location: 'Washington D.C., USA',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        linkedinUrl: 'https://www.linkedin.com/in/xiaomeng-lu',
        bio: 'Leading global AI governance, semiconductor supply chain analysis, and multilateral digital trade negotiations.'
      },
      {
        name: 'Matthew McDermott',
        title: 'Global Head of Operations & Growth',
        location: 'Singapore',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        linkedinUrl: 'https://www.linkedin.com/in/matthew-mcdermott',
        bio: 'Directing international practice growth across Asia-Pacific, the Americas, Europe, and the Middle East.'
      },
      {
        name: 'Sarah Jenkins',
        title: 'Senior Talent Acquisition & People Lead',
        location: 'London, UK',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        linkedinUrl: 'https://www.linkedin.com/in/sarah-jenkins-ap',
        bio: 'Connecting top public policy analysts, regulatory economists, and frontier technology researchers with global career opportunities.'
      }
    ],
    linkedinUpdates: [
      {
        date: '1 day ago',
        content: 'Excited to release our Q4 Global AI Policy Index: How 45 sovereign nations are balancing frontier safety guardrails with economic acceleration. Read our deep-dive analysis on cross-border data transfer directives.',
        likes: 184,
        comments: 29,
        tag: '#AIGovernance'
      },
      {
        date: '4 days ago',
        content: 'Our Singapore and Hanoi advisory teams met with regional ASEAN telecommunications leaders this week to discuss satellite mega-constellation spectrum allocations and terrestrial 6G harmonization.',
        likes: 247,
        comments: 41,
        tag: '#TelecomPolicy'
      },
      {
        date: '1 week ago',
        content: 'Access Partnership is proud to be named among Built In\'s Top Global Advisory Firms for 2026. A massive thank you to our 165+ policy specialists across 12 international offices.',
        likes: 512,
        comments: 63,
        tag: '#BuiltInTopCompanies'
      }
    ]
  },

  {
    id: 'vietnhat-ec',
    slug: 'vietnhat-ec',
    name: 'Công Ty CP Đầu Tư Xây Dựng & Cơ Điện Việt Nhật',
    shortName: 'Việt Nhật E&C',
    tier: 'Enterprise Contractor',
    hq: 'Hà Nội, Việt Nam',
    size: '500 - 1,000 employees',
    founded: '2012',
    industry: 'Cơ Điện & Xây Dựng Công Nghiệp (M&E / EPC)',
    jobsCount: 12,
    website: 'https://vietnhatec.com.vn',
    heroImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    logoImg: '/images/logo_vietnhat.png',
    desc: 'Tổng thầu cơ điện và xây dựng công nghiệp hàng đầu Việt Nam, chuyên thực hiện các dự án nhà máy FDI tiêu chuẩn Nhật Bản và châu Âu.',
    stat1Label: 'Dự Án EPC',
    stat1Val: '180+',
    stat2Label: 'Kỹ Sư Chuyên Ngành',
    stat2Val: '350+',
    stat3Label: 'Tỷ Lệ An Toàn',
    stat3Val: '100%',
    quoteText: 'Chất lượng công trình và sự an toàn của con người là kim chỉ nam trong mọi dự án của Việt Nhật E&C.',
    quoteAuthor: 'Ban Lãnh Đạo Việt Nhật E&C',
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'tuyendung@vietnhatec.com.vn',
    phone: '+84 (024) 3789 9999',
    address: 'Tầng 8, Tòa nhà Việt Nhật, Quận Cầu Giấy, Hà Nội',
    certs: ['ISO 9001:2015', 'OHSAS 18001', 'Tổng thầu Hạng I Bộ Xây Dựng']
  },
  {
    id: 'vinmec',
    slug: 'vinmec',
    name: 'Công Ty CP Bệnh Viện Đa Khoa Quốc Tế Vinmec',
    shortName: 'Vinmec Healthcare System',
    tier: 'Premier Healthcare Group',
    hq: 'Hà Nội & TP. Hồ Chí Minh',
    size: '5,000+ employees',
    founded: '2012',
    industry: 'Y Tế & Chăm Sóc Sức Khỏe Quốc Tế',
    jobsCount: 45,
    website: 'https://vinmec.com',
    heroImg: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    logoImg: '/images/logo_vinmec.png',
    desc: 'Hệ thống y tế hàn lâm do Tập đoàn Vingroup đầu tư phát triển, đạt chứng chỉ JCI danh giá của Hoa Kỳ về quản lý chất lượng y tế.',
    stat1Label: 'Bệnh Viện Toàn Quốc',
    stat1Val: '7+',
    stat2Label: 'Bác Sĩ & Chuyên Gia',
    stat2Val: '1,500+',
    stat3Label: 'Chứng Chỉ JCI',
    stat3Val: 'Đạt Chuẩn',
    quoteText: 'Kết nối tinh hoa, bảo trợ sức khỏe cho cộng đồng bằng y học chính xác và dịch vụ tận tâm.',
    quoteAuthor: 'Hội đồng Y khoa Quốc tế Vinmec',
    photos: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'recruitment@vinmec.com',
    phone: '+84 (024) 3974 3556',
    address: '458 Minh Khai, Khu đô thị Times City, Hai Bà Trưng, Hà Nội',
    certs: ['JCI Accreditation', 'CAP Certified Laboratories', 'AACI Standards']
  },
  {
    id: 'seev',
    slug: 'seev',
    name: 'SEI Electronic Components (SEEV)',
    shortName: 'SEEV Sumitomo Electric',
    tier: 'Fortune Global 500 Subsidiary',
    hq: 'Hà Nội (KCN Thăng Long)',
    size: '8,000+ employees',
    founded: '2001',
    industry: 'Linh Kiện Điện Tử & Bản Mạch Linh Hoạt (FPC)',
    jobsCount: 28,
    website: 'https://global-sei.com',
    heroImg: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    logoImg: '/images/logo_seev.png',
    desc: 'Thành viên trực thuộc Tập đoàn Sumitomo Electric Industries Nhật Bản, dẫn đầu thế giới về công nghệ chế tạo bản mạch FPC cho điện thoại thông minh và xe điện.',
    stat1Label: 'Quy Mô Nhà Máy',
    stat1Val: '12 ha',
    stat2Label: 'Công Nhân Viên',
    stat2Val: '8,500+',
    stat3Label: 'Xuất Khẩu',
    stat3Val: 'Toàn Cầu',
    quoteText: 'Glorious Excellence - Tôn chỉ Sumitomo lấy con người làm trọng tâm và không ngừng cải tiến Kaizen.',
    quoteAuthor: 'Ban Giám Đốc SEEV',
    photos: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'recruitment@seev.com.vn',
    phone: '+84 (024) 3881 1234',
    address: 'Lô C-4, Khu Công Nghiệp Thăng Long, Đông Anh, Hà Nội',
    certs: ['ISO 14001', 'IATF 16949 Automotive', 'ISO 9001:2015']
  },
  {
    id: 'chailease',
    slug: 'chailease',
    name: 'Chailease International Leasing Company',
    shortName: 'Chailease',
    tier: 'Top Financial Leasing Provider',
    hq: 'Đài Loan & TP. Hồ Chí Minh',
    size: '1,200+ employees',
    founded: '2006',
    industry: 'Cho Thuê Tài Chính & Giải Pháp Vốn Doanh Nghiệp',
    jobsCount: 16,
    website: 'https://chailease.com.vn',
    heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    logoImg: '/images/logo_chailease.png',
    desc: 'Công ty cho thuê tài chính 100% vốn nước ngoài hàng đầu tại Việt Nam, trực thuộc Tập đoàn Chailease Holding danh tiếng của Đài Loan.',
    stat1Label: 'Chi Nhánh',
    stat1Val: '14 Tỉnh Thành',
    stat2Label: 'Khách Hàng Doanh Nghiệp',
    stat2Val: '15,000+',
    stat3Label: 'Dư Nợ Tài Trợ',
    stat3Val: '1.2 Tỷ USD',
    quoteText: 'Đồng hành cung cấp nguồn vốn linh hoạt cho sự phát triển vững bền của các doanh nghiệp Việt Nam.',
    quoteAuthor: 'Tổng Giám Đốc Chailease Việt Nam',
    photos: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    ],
    email: 'hr@chailease.com.vn',
    phone: '+84 (028) 7301 6010',
    address: 'Tầng 28, Tòa nhà Saigon Centre Tower 2, Quận 1, TP. Hồ Chí Minh',
    certs: ['Giấy phép Ngân hàng Nhà nước Việt Nam', 'Top 500 Doanh nghiệp lớn nhất VN (VNR500)']
  },
  {
    id: 'fpt-education',
    slug: 'fpt-education',
    name: 'Tổ Chức Giáo Dục FPT (FPT Education)',
    shortName: 'FPT Education',
    tier: 'Leading Technology Education Group',
    hq: 'Hà Nội, Đà Nẵng, TP. HCM',
    size: '10,000+ employees',
    founded: '1999',
    industry: 'Giáo Dục & Đào Tạo Công Nghệ Phổ Thông Đến Đại Học',
    jobsCount: 50,
    website: 'https://fpt.edu.vn',
    heroImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    logoImg: '/images/logo_fpt.png',
    desc: 'Tổ chức giáo dục tiên phong đưa chuyển đổi số, trí tuệ nhân tạo và phương pháp giáo dục hiện đại vào hệ thống phổ thông FPT Schools và đại học.',
    stat1Label: 'Học Sinh - Sinh Viên',
    stat1Val: '150,000+',
    stat2Label: 'Cơ Sở Đào Tạo',
    stat2Val: '20+ Tỉnh Thành',
    stat3Label: 'Xếp Hạng Quốc Tế',
    stat3Val: 'QS 5 Stars',
    quoteText: 'Trải nghiệm để trưởng thành - kiến tạo thế hệ công dân toàn cầu tự tin làm chủ công nghệ tương lai.',
    quoteAuthor: 'Hội Đồng Giáo Dục FPT',
    photos: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80'
    ],
    email: 'tuyendung.fptedu@fpt.edu.vn',
    phone: '+84 (024) 7300 1866',
    address: 'Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội',
    certs: ['QS Stars 5 Sao Cơ sở vật chất & Đào tạo', 'Chứng nhận Kiểm định ACBSP Hoa Kỳ']
  },
  {
    id: 'pvcfc',
    slug: 'pvcfc',
    name: 'Tổng công ty Phân bón và Hóa chất Dầu khí (PVCFC)',
    shortName: 'Đạm Cà Mau (PVCFC)',
    tier: 'PetroVietnam Member Enterprise',
    hq: 'Cà Mau & TP. Hồ Chí Minh',
    size: '2,000+ employees',
    founded: '2011',
    industry: 'Hóa Chất & Phân Bón Công Nghệ Cao (Dầu Khí)',
    jobsCount: 22,
    website: 'https://pvcfc.com.vn',
    heroImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    logoImg: '/images/logo_pvcfc.png',
    desc: 'Doanh nghiệp lá cờ đầu của Tập đoàn Dầu khí Quốc gia Việt Nam, vận hành Nhà máy Đạm Cà Mau công nghệ hiện đại bậc nhất Đông Nam Á.',
    stat1Label: 'Công Suất Nhà Máy',
    stat1Val: '800,000 tấn/năm',
    stat2Label: 'Thị Phần Phân Bón',
    stat2Val: '60% Tây Nam Bộ',
    stat3Label: 'Doanh Thu Hàng Năm',
    stat3Val: '15,000+ Tỷ VNĐ',
    quoteText: 'Người nuôi dưỡng - Tiên phong giải pháp dinh dưỡng toàn diện cho nền nông nghiệp xanh bền vững.',
    quoteAuthor: 'Ban Điều Hành PVCFC',
    photos: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
    ],
    email: 'tuyendung@pvcfc.com.vn',
    phone: '+84 (0290) 3819 000',
    address: 'Lô D, KCN Phường 1, Đường Ngô Quyền, TP. Cà Mau',
    certs: ['Thương Hiệu Quốc Gia Việt Nam 7 Kỳ Liên Tiếp', 'ISO 9001 / ISO 14001 / ISO 45001']
  },
  {
    id: 'vinsmart',
    slug: 'vinsmart',
    name: 'CÔNG TY CỔ PHẦN VINSMART FUTURE (VSF)',
    shortName: 'VinSmart Future (VSF)',
    tier: 'High-Tech Mobility Ecosystem',
    hq: 'Hà Nội (Khu CNC Hòa Lạc)',
    size: '3,000+ employees',
    founded: '2018',
    industry: 'IoT, Smart Mobility, AI & Cloud Computing',
    jobsCount: 35,
    website: 'https://vingroup.net',
    heroImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    logoImg: '/images/logo_vsf.png',
    desc: 'Đơn vị nghiên cứu và phát triển giải pháp phần mềm thông minh, điện toán đám mây cho phương tiện giao thông thông minh và đô thị thông minh trong hệ sinh thái Vin.',
    stat1Label: 'Kỹ Sư R&D',
    stat1Val: '1,200+',
    stat2Label: 'Bằng Sáng Chế',
    stat2Val: '65+',
    stat3Label: 'Nền Tảng Đám Mây',
    stat3Val: 'Multi-Cloud',
    quoteText: 'Kiến tạo tương lai thông minh và kết nối cuộc sống bền vững bằng công nghệ cao của người Việt.',
    quoteAuthor: 'Viện Nghiên Cứu Công Nghệ VSF',
    photos: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    ],
    email: 'hr@vinsmart.net',
    phone: '+84 (024) 3974 9999',
    address: 'Lô CN1-06B-1, Khu công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội',
    certs: ['Top 10 Doanh nghiệp Công nghệ Uy tín', 'CMMI Level 3 Software Development']
  },
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
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85'
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
  // CELLCARD (CAMGSM PLC)
  // ============================================================================
  {
    id: 'cellcard',
    slug: 'cellcard',
    name: 'Cellcard (CamGSM PLC)',
    shortName: 'Cellcard',
    tier: 'LEADING 5G MOBILE & DIGITAL INNOVATION',
    hq: 'Phnom Penh, Cambodia',
    size: '1,500+ Employees',
    founded: '1997',
    industry: 'Telecommunications & Digital Entertainment',
    jobsCount: 8,
    website: 'https://cellcard.com.kh',
    heroImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    logoImg: '/images/logo_cellcard_kh.png',
    desc: 'Cellcard is Cambodia’s only 100% Cambodian-owned mobile communications company, recognized globally for network excellence, gaming, and digital lifestyle innovation.',
    stat1Label: 'Network Coverage', stat1Val: '99% Population',
    stat2Label: 'Subscribers', stat2Val: '4+ Million',
    stat3Label: '5G Speed Rank', stat3Val: 'Fastest Mobile Speed',
    quoteText: 'Connecting Cambodians with world-class digital services and high-speed innovation.',
    quoteAuthor: 'Simon Perkins — CEO of Cellcard',
    photos: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'careers@cellcard.com.kh',
    phone: '+855 12 812 812',
    address: 'CamGSM PLC, Sihanouk Blvd, Phnom Penh, Cambodia',
    perks: [
      { icon: 'laptop', label: 'Hybrid Work Options', desc: 'Flexible arrangements for engineering & digital teams.' },
      { icon: 'umbrella', label: 'Health & Life Coverage', desc: 'Comprehensive medical and health insurance for staff.' },
      { icon: 'chart-line', label: 'Career Growth', desc: 'Continuous learning programs in telecommunications & cloud.' },
      { icon: 'coffee', label: 'Modern Office', desc: 'High-tech collaborative campus in central Phnom Penh.' }
    ],
    culture: [
      { title: 'Proudly Khmer', desc: 'Delivering world-class telecommunications built by and for Cambodians.' },
      { title: 'Digital Innovator', desc: 'Pioneering Esports, streaming, and digital payment ecosystems.' }
    ],
    offices: [
      { name: 'Cellcard Head Office', location: 'Phnom Penh, Cambodia', type: 'National HQ', spec: 'Digital Innovation Hub & NOC' }
    ],
    awards: [
      { badge: 'OPENSIGNAL 2024', title: 'Fastest Mobile Download Speed in Cambodia', org: 'Opensignal Awards' }
    ],
    openJobIds: []
  },

  // ============================================================================
  // ABA BANK
  // ============================================================================
  {
    id: 'aba-bank',
    slug: 'aba-bank',
    name: 'ABA Bank (National Bank of Canada Group)',
    shortName: 'ABA Bank',
    tier: 'CAMBODIA’S LARGEST COMMERCIAL BANK',
    hq: 'Phnom Penh, Cambodia',
    size: '9,000+ Employees',
    founded: '1996',
    industry: 'Digital Banking & Financial Services',
    jobsCount: 15,
    website: 'https://ababank.com',
    heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    logoImg: '/images/logo_aba_kh.png',
    desc: 'ABA Bank is Cambodia’s largest commercial digital bank, renowned for the award-winning ABA Mobile app and cutting-edge financial infrastructure supporting millions of individuals and businesses nationwide.',
    stat1Label: 'Total Assets', stat1Val: '$11.5+ Billion',
    stat2Label: 'Active Mobile Users', stat2Val: '3.5+ Million',
    stat3Label: 'Branches Nationwide', stat3Val: '90+ Branches & 24/7 Spots',
    quoteText: 'Pioneering digital banking in Cambodia with world-standard security and frictionless user experiences.',
    quoteAuthor: 'Askhat Azhikhanov — CEO of ABA Bank',
    photos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'recruitment@ababank.com',
    phone: '+855 23 225 333',
    address: 'ABA Bank Head Office, Preah Sihanouk Blvd, Phnom Penh, Cambodia',
    perks: [
      { icon: 'graduation-cap', label: 'ABA Academy', desc: 'Structured banking and FinTech certifications.' },
      { icon: 'piggy-bank', label: 'Preferential Loan Rates', desc: 'Special staff loan and savings interest rates.' },
      { icon: 'heartbeat', label: 'Premium Health Insurance', desc: 'Family medical coverage and yearly health checkups.' },
      { icon: 'award', label: 'Performance Bonus', desc: 'Generous 13th-month and performance-based rewards.' }
    ],
    culture: [
      { title: 'Customer First', desc: 'Simplicity, speed, and transparency in every digital interaction.' },
      { title: 'Tech Innovation', desc: 'In-house FinTech engineering driving the nation’s digital payment adoption.' }
    ],
    offices: [
      { name: 'ABA Head Office Tower', location: 'Phnom Penh, Cambodia', type: 'Global HQ', spec: 'Fintech Center & Executive Office' }
    ],
    awards: [
      { badge: 'EUROMONEY 2024', title: 'Best Bank in Cambodia', org: 'Euromoney Awards for Excellence' },
      { badge: 'THE BANKER', title: 'Bank of the Year Cambodia', org: 'Financial Times' }
    ],
    openJobIds: []
  },

  // ============================================================================
  // TRUEMONEY CAMBODIA
  // ============================================================================
  {
    id: 'truemoney',
    slug: 'truemoney',
    name: 'TrueMoney Cambodia (Ascend Money)',
    shortName: 'TrueMoney',
    tier: 'LEADING FINTECH & E-WALLET NETWORK',
    hq: 'Phnom Penh, Cambodia',
    size: '1,000+ Employees',
    founded: '2016',
    industry: 'FinTech, Payments & Digital Wallet',
    jobsCount: 10,
    website: 'https://truemoney.com.kh',
    heroImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    logoImg: '/images/logo_truemoney_kh.png',
    desc: 'TrueMoney Cambodia is part of Ascend Money, Southeast Asia’s premier FinTech venture between CP Group and Ant Financial, providing accessible digital financial services and mobile remittances to millions.',
    stat1Label: 'Agent Network', stat1Val: '10,000+ Agents',
    stat2Label: 'Annual Transactions', stat2Val: '$8+ Billion',
    stat3Label: 'Regional Reach', stat3Val: '6 ASEAN Countries',
    quoteText: 'Enabling financial inclusion and seamless digital payment for everyone across Cambodia.',
    quoteAuthor: 'TrueMoney Executive Leadership',
    photos: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'jobs@truemoney.com.kh',
    phone: '+855 23 999 639',
    address: 'Canadia Tower, Monivong Blvd, Phnom Penh, Cambodia',
    perks: [
      { icon: 'laptop', label: 'Hybrid Flexibility', desc: 'Collaborative office and remote work options.' },
      { icon: 'shield-alt', label: 'Health & Dental Care', desc: 'Comprehensive medical insurance.' },
      { icon: 'globe', label: 'Regional Mobility', desc: 'Opportunities across Ascend Money ASEAN offices.' },
      { icon: 'gift', label: 'Company Events', desc: 'Quarterly team retreats, hackathons, and celebrations.' }
    ],
    culture: [
      { title: 'Financial Inclusion', desc: 'Empowering unbanked and rural communities through micro-financial tech.' },
      { title: 'Agile & Bold', desc: 'Fast-paced iteration, high ownership, and user-centric problem solving.' }
    ],
    offices: [
      { name: 'TrueMoney Cambodia HQ', location: 'Phnom Penh, Cambodia', type: 'Country HQ', spec: 'Tech & Fintech Operations' }
    ],
    awards: [
      { badge: 'FINTECH LEADER', title: 'Top Payment Agent Network in Cambodia', org: 'Cambodia Fintech Association' }
    ],
    openJobIds: []
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
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85'
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
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85'
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

  {
    id: 'datadog',
    slug: 'datadog',
    name: 'Datadog, Inc.',
    shortName: 'Datadog',
    tier: 'ENTERPRISE SPOTLIGHT',
    hq: '620 8th Ave, New York, NY 10018',
    size: '5,000+ Global Employees',
    founded: '2010',
    industry: 'Cloud Infrastructure & Real-Time Observability',
    jobsCount: 38,
    website: 'https://www.datadoghq.com',
    heroImg: '/images/clean_datadog_building.jpg',
    logoImg: '/images/datadog_logo.png',
    desc: 'Datadog is the essential monitoring and security platform for cloud applications. We bring together end-to-end traces, metrics, and logs to make applications, infrastructure, and third-party services entirely observable.',
    stat1Label: 'Daily Data Processed', stat1Val: '35+ Trillion Events',
    stat2Label: 'Global Enterprise Customers', stat2Val: '28,000+',
    stat3Label: 'Cloud Integrations', stat3Val: '750+ Pre-built',
    quoteText: 'We build systems that can inspect billions of distributed events in real time without dropping a single microsecond of telemetry.',
    quoteAuthor: 'Alexis Lê-Quôc &middot; Co-Founder & CTO',
    photos: [
      '/images/clean_datadog_building.jpg',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'careers@datadoghq.com',
    phone: '+1 (866) 329-4466',
    address: 'New York, Boston, Paris, Singapore, Tokyo',
    certs: ['SOC 2 Type II Certified', 'ISO 27001 Certified', 'FedRAMP Moderate Authorized', 'HIPAA Ready'],
    hiringCategories: [
      { name: 'Core Streaming & Infrastructure', count: 14 },
      { name: 'AI & Anomaly Detection Research', count: 9 },
      { name: 'Frontend Platform & Visualization', count: 8 },
      { name: 'Site Reliability & Edge Security', count: 7 }
    ],
    techStack: [
      { name: 'Go & Rust', category: 'HIGH CONCURRENCY STREAMING', icon: 'fa-solid fa-code' },
      { name: 'Kafka & Pulsar', category: 'PETABYTE EVENT LOGS', icon: 'fa-solid fa-server' },
      { name: 'Kubernetes', category: 'MULTI-CLOUD ORCHESTRATION', icon: 'fa-solid fa-cubes' },
      { name: 'PyTorch', category: 'ANOMALY INFERENCE & AI', icon: 'fa-solid fa-brain' },
      { name: 'TypeScript & WebGL', category: 'DASHBOARD RENDERING', icon: 'fa-solid fa-chart-line' },
      { name: 'ClickHouse', category: 'TIME-SERIES ANALYTICS', icon: 'fa-solid fa-database' }
    ],
    cultureValues: [
      { title: 'Extreme Engineering Transparency', desc: 'Every post-mortem is company-wide and blameless. Code reviews are collaborative learning ceremonies.' },
      { title: 'Global Async-First Collaboration', desc: 'Engineers thrive in autonomous pods spanning Paris, New York, and Singapore.' },
      { title: 'Customer Empathy Under Fire', desc: 'When outages hit Fortune 500 clouds, Datadog is the mission-critical cockpit they look at.' }
    ],
    offices: [
      { name: 'World Headquarters', location: 'New York Times Building, NYC', type: 'Primary HQ', spec: '12 Floors • 1,800 Engineers & Staff' },
      { name: 'European Engineering Center', location: 'Paris, France', type: 'R&D Center', spec: 'Core Data Engine Group • 900 Engineers' },
      { name: 'APAC Regional Hub', location: 'Marina Bay Financial Centre, Singapore', type: 'APAC HQ', spec: 'Customer Solutions & Edge Systems' }
    ],
    awards: [
      { title: 'Gartner Magic Quadrant Leader in Observability', org: 'Gartner &bull; 2025', badge: 'LEADER' },
      { title: 'Top 100 Best Tech Workplaces in the US', org: 'Fortune &bull; 2026', badge: 'EXCELLENCE' }
    ],
    openJobIds: ['intern-datadog']
  },
  {
    id: 'bytedance',
    slug: 'bytedance',
    name: 'ByteDance Ltd.',
    shortName: 'ByteDance',
    tier: 'GLOBAL CONSUMER AI',
    hq: 'Singapore (Global Headquarters) & Beijing',
    size: '120,000+ Global Employees',
    founded: '2012',
    industry: 'Consumer Internet, Multimodal AI & Content Platforms',
    jobsCount: 120,
    website: 'https://www.bytedance.com',
    heroImg: '/images/clean_bytedance_building.jpg',
    logoImg: '/images/bytedance_logo.png',
    desc: 'ByteDance’s mission is to inspire creativity and enrich life. Through platforms like TikTok, Douyin, Lark, and CapCut, we connect over a billion users through groundbreaking recommendation algorithms and creative tools.',
    stat1Label: 'Daily Active Users', stat1Val: '1.2B+ Global',
    stat2Label: 'R&D Investment', stat2Val: '$14.2B Annually',
    stat3Label: 'Patents Issued', stat3Val: '18,500+ Worldwide',
    quoteText: 'We empower every individual to express their imagination through intuitive, ultra-responsive technology.',
    quoteAuthor: 'ByteDance Technology Executive Board',
    photos: [
      '/images/clean_bytedance_building.jpg',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'campus@bytedance.com',
    phone: '+65 6978 8888',
    address: 'One Raffles Quay, Singapore',
    certs: ['ISO 27001 Certified', 'Global Privacy Seal', 'Responsible AI Framework Partner'],
    hiringCategories: [
      { name: 'AI Foundation Models & Vision', count: 42 },
      { name: 'Frontend Platform & WebAssembly', count: 35 },
      { name: 'Distributed Storage & Network', count: 28 },
      { name: 'Security & Content Safety AI', count: 15 }
    ],
    techStack: [
      { name: 'PyTorch & Megatron', category: 'LLM PRE-TRAINING', icon: 'fa-solid fa-brain' },
      { name: 'WebAssembly & WebCodecs', category: 'CLIENT RENDERING', icon: 'fa-solid fa-bolt' },
      { name: 'C++ & CUDA', category: 'VIDEO ENCODING & CODECS', icon: 'fa-solid fa-microchip' },
      { name: 'Distributed Key-Value DB', category: 'EXABYTE SCALE STORAGE', icon: 'fa-solid fa-database' }
    ],
    cultureValues: [
      { title: 'Aim for the Highest', desc: 'We encourage moonshot thinking, rapid iteration, and challenging conventional technical bounds.' },
      { title: 'Be Candid and Clear', desc: 'Honest, constructive peer reviews unconstrained by corporate hierarchy.' }
    ],
    offices: [
      { name: 'Singapore HQ', location: 'One Raffles Quay, Singapore', type: 'Global HQ', spec: 'International Leadership & R&D' },
      { name: 'US Research Lab', location: 'San Jose, California', type: 'AI Lab', spec: 'Multimodal Research & Video Generation' }
    ],
    awards: [
      { title: 'World’s Most Innovative Companies in AI', org: 'Fast Company &bull; 2026', badge: 'TOP 5' }
    ],
    openJobIds: ['intern-bytedance']
  },
  {
    id: 'gitlab',
    slug: 'gitlab',
    name: 'GitLab Inc.',
    shortName: 'GitLab',
    tier: 'ENTERPRISE SPOTLIGHT',
    hq: 'All-Remote (Founded in San Francisco, CA)',
    size: '2,200+ Team Members',
    founded: '2014',
    industry: 'DevSecOps & Autonomous Software Engineering',
    jobsCount: 42,
    website: 'https://about.gitlab.com',
    heroImg: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=120&q=80',
    logoImg: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=400&q=85',
    desc: 'GitLab is the premier DevSecOps platform delivered as a single application. From project planning and source code management to CI/CD, security scanning, and autonomous AI Duo workflows.',
    stat1Label: 'Active Developers', stat1Val: '30M+ Worldwide',
    stat2Label: 'Remote Footprint', stat2Val: '65+ Countries',
    stat3Label: 'Open Source Contributors', stat3Val: '3,000+ Active',
    quoteText: 'Everyone can contribute. Remote-first is not just where we sit—it is an egalitarian engineering operating system.',
    quoteAuthor: 'Sid Sijbrandij &middot; Co-Founder & Executive Board',
    photos: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=85'
    ],
    email: 'recruiting@gitlab.com',
    phone: '+1 (415) 830-6788',
    address: '100% All-Remote Worldwide',
    certs: ['SOC 2 Type II', 'ISO 27001', 'FedRAMP In-Process'],
    hiringCategories: [
      { name: 'AI Duo & Autonomous Agents', count: 18 },
      { name: 'CI/CD Engine Infrastructure', count: 12 },
      { name: 'Developer Security & Compliance', count: 12 }
    ],
    techStack: [
      { name: 'Ruby on Rails & Go', category: 'CORE BACKEND ENGINES', icon: 'fa-solid fa-code' },
      { name: 'Vue.js & TypeScript', category: 'WEB PLATFORM', icon: 'fa-solid fa-laptop-code' },
      { name: 'Git & Gitaly RPC', category: 'DISTRIBUTED VERSIONING', icon: 'fa-solid fa-code-branch' }
    ],
    cultureValues: [
      { title: 'CREDIT Values', desc: 'Collaboration, Results, Efficiency, Diversity, Inclusion & Belonging, and Transparency.' }
    ],
    offices: [
      { name: 'Global All-Remote Operations', location: 'Everywhere', type: 'Virtual HQ', spec: 'Fully distributed across 65 nations' }
    ],
    awards: [
      { title: 'Best Workplaces for Remote Work 2026', org: 'Inc. Magazine', badge: 'TOP RANK' }
    ],
    openJobIds: []
  },
  {
    id: 'vinfast',
    slug: 'vinfast',
    name: 'VinFast Auto Ltd.',
    shortName: 'VinFast Global',
    tier: 'ELECTRIC MOBILITY OEM',
    hq: 'Hai Phong Industrial Complex, Vietnam',
    size: '18,000+ Global Employees',
    founded: '2017',
    industry: 'Electric Vehicles, Smart Mobility & Clean Energy R&D',
    jobsCount: 65,
    website: 'https://vinfastauto.com',
    heroImg: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80',
    logoImg: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=85',
    desc: 'VinFast is a pioneering electric vehicle manufacturer committed to a green future, building state-of-the-art intelligent SUVs, electric buses, and battery ecosystems.',
    stat1Label: 'Manufacturing Area', stat1Val: '335 Hectares',
    stat2Label: 'Annual Capacity', stat2Val: '250,000+ EVs',
    stat3Label: 'R&D Labs', stat3Val: 'Vietnam, US, Europe',
    quoteText: 'We move fast, build daringly, and prove that Southeast Asian engineering can compete on the world stage.',
    quoteAuthor: 'VinFast Engineering Directorate',
    photos: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'recruitment@vinfastauto.com',
    phone: '(+84) 225 396 9999',
    address: 'Dinh Vu Economic Zone, Cat Hai Island, Hai Phong',
    certs: ['ISO 9001:2015', 'ECE Global Automotive Certified', 'Euro NCAP 5-Star Ready'],
    hiringCategories: [
      { name: 'Autonomous Driving & Computer Vision', count: 24 },
      { name: 'Battery Telemetry & BMS', count: 21 },
      { name: 'Smart Cabin Infotainment & Android Auto', count: 20 }
    ],
    techStack: [
      { name: 'AUTOSAR & Embedded C++', category: 'AUTOMOTIVE ECU', icon: 'fa-solid fa-car' },
      { name: 'ROS2 & NVIDIA DRIVE', category: 'PERCEPTION & ADAS', icon: 'fa-solid fa-eye' }
    ],
    cultureValues: [
      { title: 'Speed and Discipline', desc: 'Rapid prototyping backed by uncompromising safety verification.' }
    ],
    offices: [
      { name: 'Mega Factory & R&D Complex', location: 'Dinh Vu, Hai Phong', type: 'Manufacturing HQ', spec: 'Fully automated Industry 4.0 complex' }
    ],
    awards: [
      { title: 'Global EV Innovation Award', org: 'Auto Mobility Global 2025', badge: 'GOLD' }
    ],
    openJobIds: []
  },
  {
    id: 'stripe',
    slug: 'stripe',
    name: 'Stripe, Inc.',
    shortName: 'Stripe',
    tier: 'ENTERPRISE SPOTLIGHT',
    hq: 'San Francisco, CA & Dublin, Ireland',
    size: '8,000+ Employees',
    founded: '2010',
    industry: 'Financial Infrastructure & Global Payment Networks',
    jobsCount: 45,
    website: 'https://stripe.com',
    heroImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    logoImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=85',
    desc: 'Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size use our software to accept payments and manage their businesses online.',
    stat1Label: 'Total Payment Volume', stat1Val: '$1+ Trillion Annually',
    stat2Label: 'Platform Availability', stat2Val: '99.999% SLA',
    stat3Label: 'Active Countries', stat3Val: '135+ Currencies',
    quoteText: 'Increase the GDP of the internet by creating financial infrastructure as ubiquitous as electricity.',
    quoteAuthor: 'Patrick & John Collison &middot; Co-Founders',
    photos: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    email: 'jobs@stripe.com',
    phone: '+1 (888) 926-2289',
    address: 'San Francisco, Dublin, Singapore, Tokyo',
    certs: ['PCI-DSS Level 1 Certified', 'SOC 1 and SOC 2 Type II'],
    hiringCategories: [
      { name: 'Core Ledger & High Availability', count: 18 },
      { name: 'Fraud Radar & ML Systems', count: 15 },
      { name: 'Developer APIs & SDKs', count: 12 }
    ],
    techStack: [
      { name: 'Ruby (Sorbet) & Go', category: 'CORE FINANCIAL LEDGER', icon: 'fa-solid fa-code' },
      { name: 'Apache Kafka', category: 'DISTRIBUTED EVENT LOGGING', icon: 'fa-solid fa-server' }
    ],
    cultureValues: [
      { title: 'Move with Urgency', desc: 'The internet is growing fast, and our reliability must outpace it.' }
    ],
    offices: [
      { name: 'US Headquarters', location: 'San Francisco, CA', type: 'Global HQ', spec: 'Core Engineering Group' }
    ],
    awards: [
      { title: 'Fintech Enterprise Leader of the Decade', org: 'Forbes Financial World', badge: 'LEADER' }
    ],
    openJobIds: []
  },
  {
    id: 'viconship',
    slug: 'viconship',
    name: 'Viconship Container Corporation',
    shortName: 'Viconship',
    tier: 'ACCREDITED TIER 1',
    hq: 'Hai Phong Port Cluster, Vietnam',
    size: '2,500+ Total Employees',
    founded: '1985',
    industry: 'Maritime & Port Logistics',
    jobsCount: 7,
    website: 'https://viconship.com',
    heroImg: '/images/today_3.jpg',
    logoImg: '/images/brands/viconship.svg',
    desc: 'Viconship (Vietnam Container Shipping JSC) operates premier deep-water container terminal facilities in Northern Vietnam, including VIP Green Port, Green Port, and VIMC Dinh Vu, in addition to ICD intermodal nodes in Hai Phong and Cai Mep.',
    stat1Label: 'Annual Throughput', stat1Val: '1.8M+ TEUs',
    stat2Label: 'Berth Frontage', stat2Val: '1,200 Meters',
    stat3Label: 'ICD Storage Yard', stat3Val: '450,000 m²',
    quoteText: 'Integrating deep-water quayside efficiency with nationwide bonded ICD nodes to accelerate Vietnam’s cross-border maritime supply chains.',
    quoteAuthor: 'Operations Directorate &middot; Logistics Executive Board',
    photos: [
      '/images/today_3.jpg',
      '/images/report_1.jpg',
      '/images/occ_1.jpg'
    ],
    email: 'careers@viconship.com',
    phone: '(+84) 225 3836 705',
    address: '11 Vo Thi Sau, Ngo Quyen, Hai Phong',
    certs: ['AEO Authorized Economic Operator Tier-1', 'ISO 9001:2015 Quality Management', 'Vietnam Seaports Association (VPA) Member', 'HOSE Listed: VSC'],
    hiringCategories: [
      { name: 'Quayside & Terminal Operations', count: 3 },
      { name: 'Ocean Freight Forwarding & Logistics', count: 2 },
      { name: 'Port IT, Automation & TOS', count: 1 },
      { name: 'Reefer Maintenance & Cold Chain', count: 1 }
    ],
    techStack: [
      { name: 'Navis N4', category: 'TERMINAL OPS (TOS)', icon: 'fa-solid fa-ship' },
      { name: 'CargoWise ONE', category: 'FREIGHT ERP', icon: 'fa-solid fa-boxes-stacked' },
      { name: 'IoT Reefer Telematics', category: 'COLD CHAIN MONITORING', icon: 'fa-solid fa-temperature-arrow-down' },
      { name: 'VNACCS / VCIS', category: 'CUSTOMS EDI GATEWAY', icon: 'fa-solid fa-file-invoice' }
    ],
    cultureValues: [
      { title: 'Zero-Incident Safety Standard', desc: 'Operating deep-water terminals 24/7 demands unyielding safety protocols and designated automated buffer zones.' },
      { title: 'Green Maritime Stewardship', desc: 'Electrifying quay cranes and eliminating diesel emissions by 42% under Vietnam Green Port initiatives.' }
    ],
    offices: [
      { name: 'VIP Green Port Terminal', location: 'Dinh Vu Economic Zone, Hai Phong', type: 'Deep-Water Berth', spec: '2 Berths • 400m Quayside • 80,000 DWT Vessels' },
      { name: 'Green Port Terminal', location: 'Chua Ve Port Area, Hai Phong', type: 'Container Terminal', spec: '2 Berths • 320m Quayside • Navis N4 Integrated' },
      { name: 'Southern Intermodal ICD', location: 'Phu My, Cai Mep - Thi Vai, Ba Ria-Vung Tau', type: 'Bonded Logistics Hub', spec: '150,000 m² Yard • 600 Reefer Plugs' }
    ],
    awards: [
      { title: 'Top 10 Maritime Port Operators Vietnam', org: 'Vietnam Logistics Association (VLA) &bull; 2025', badge: 'GOLD SEAL' }
    ],
    openJobIds: ['job-vsc-1']
  },
  {
    id: 'gemadept',
    slug: 'gemadept',
    name: 'Gemadept Corporation',
    shortName: 'Gemadept',
    tier: 'ACCREDITED CONGLOMERATE',
    hq: '6 Le Thanh Ton, District 1, Ho Chi Minh City',
    size: '3,500+ Total Employees',
    founded: '1990',
    industry: 'Port Operations & Integrated Logistics',
    jobsCount: 12,
    website: 'https://gemadept.com.vn',
    heroImg: '/images/hero_1.jpg',
    logoImg: '/images/brands/gemadept.svg',
    desc: 'Gemadept Corporation is a pioneer in Vietnam’s maritime and port logistics sector. Operating world-class deep-sea ports including Gemalink (Cai Mep) and Nam Dinh Vu (Hai Phong), alongside specialized cold-chain logistics, river-sea barging, and air freight cargo terminal operations.',
    stat1Label: 'Port Capacity', stat1Val: '3.5M+ TEUs',
    stat2Label: 'Cold Storage DC', stat2Val: '65,000 Pallets',
    stat3Label: 'Barge & Liner Fleet', stat3Val: '45+ Vessels',
    quoteText: 'Pioneering integrated seaport ecosystems and zero-emission multimodal logistics to anchor Vietnam as Southeast Asia’s leading trade hub.',
    quoteAuthor: 'Executive Board • Port & Terminal Directorate',
    photos: ['/images/hero_1.jpg', '/images/report_1.jpg'],
    email: 'recruitment@gemadept.com.vn',
    phone: '(+84) 28 3823 8888',
    address: '6 Le Thanh Ton, Ben Nghe, District 1, HCMC',
    certs: ['AEO Authorized Economic Operator', 'ISO 9001:2015', 'HOSE Listed: GMD'],
    hiringCategories: [
      { name: 'Deep-Sea Terminal Operations', count: 6 },
      { name: 'Cold-Chain & Warehouse DC', count: 4 },
      { name: 'Inland Waterway Barging', count: 2 }
    ],
    techStack: [
      { name: 'CATOS / Navis N4', category: 'TERMINAL OPS', icon: 'fa-solid fa-ship' },
      { name: 'SAP S/4HANA', category: 'ENTERPRISE ERP', icon: 'fa-solid fa-server' }
    ],
    cultureValues: [
      { title: 'National Trade Engine', desc: 'Connecting Vietnam directly to global commercial routes without intermediate feeder delays.' }
    ],
    offices: [
      { name: 'Gemadept Tower', location: 'District 1, Ho Chi Minh City', type: 'Corporate HQ', spec: 'Corporate Headquarters' },
      { name: 'Gemalink Deep-Sea Port', location: 'Cai Mep - Thi Vai, Ba Ria - Vung Tau', type: 'Mega Terminal', spec: '24,000 TEU Mega-Vessel Ready' }
    ],
    awards: [
      { title: 'Top 50 Best Listed Companies in Vietnam', org: 'Forbes Vietnam', badge: 'TOP 50' }
    ],
    openJobIds: []
  },
  {
    id: 'dhl',
    slug: 'dhl',
    name: 'DHL Global Forwarding Vietnam',
    shortName: 'DHL Vietnam',
    tier: 'GLOBAL 3PL LEADER',
    hq: 'Ho Chi Minh City & Hanoi',
    size: '1,800+ Employees in Vietnam',
    founded: '1969',
    industry: 'Freight Forwarding, Air Cargo & Multimodal Logistics',
    jobsCount: 15,
    website: 'https://www.dhl.com/vn-en',
    heroImg: '/images/hero_2.jpg',
    logoImg: '/images/brands/dhl.svg',
    desc: 'DHL Global Forwarding is the world leader in air, ocean, and overland freight forwarding. In Vietnam, DHL connects factories directly to global supply chains with industry-leading cold chain, green transport, and customs compliance.',
    stat1Label: 'Air Freight Volume', stat1Val: '2.1M Tonnes',
    stat2Label: 'Ocean TEU Processed', stat2Val: '3.4M TEUs',
    stat3Label: 'Green Transport Target', stat3Val: 'Zero Net Emissions',
    quoteText: 'Excellence. Simply delivered. Connecting people, improving lives through responsible global trade.',
    quoteAuthor: 'DHL Country Management Team',
    photos: ['/images/hero_2.jpg'],
    email: 'vn.careers@dhl.com',
    phone: '(+84) 28 3848 6666',
    address: 'Tan Binh District, Ho Chi Minh City',
    certs: ['IATA Cargo Agent', 'AEO Tier 1', 'GDP Pharma Certified'],
    hiringCategories: [
      { name: 'Multimodal Ocean & Air', count: 8 },
      { name: 'Pharma Cold Chain', count: 4 },
      { name: 'Customs Compliance', count: 3 }
    ],
    techStack: [
      { name: 'LifeTrack Cold Chain', category: 'IOT PHARMA MONITORING', icon: 'fa-solid fa-temperature-low' },
      { name: 'myDHLi Portal', category: 'SHIPMENT VISIBILITY', icon: 'fa-solid fa-globe' }
    ],
    cultureValues: [
      { title: 'Respect and Results', desc: 'Foster diversity while delivering unmatched operational precision.' }
    ],
    offices: [
      { name: 'Southern Hub', location: 'Ho Chi Minh City', type: 'Regional HQ', spec: 'Air & Sea Forwarding Operations' }
    ],
    awards: [
      { title: 'Top 3PL Provider Vietnam', org: 'Supply Chain Asia', badge: 'LEADER' }
    ],
    openJobIds: ['job-verified-1793071901986']
  },
  {
    id: 'saigon-newport',
    slug: 'saigon-newport',
    name: 'Saigon Newport Corporation (SNP)',
    shortName: 'Saigon Newport',
    tier: 'NATIONAL SEAPORT CONGLOMERATE',
    hq: '722 Dien Bien Phu, Binh Thanh District, Ho Chi Minh City',
    size: '8,000+ Total Employees',
    founded: '1989',
    industry: 'Port Operations & Quayside Infrastructure',
    jobsCount: 22,
    website: 'https://saigonnewport.com.vn',
    heroImg: '/images/hero_1.jpg',
    logoImg: '/images/brands/saigon-newport.svg',
    desc: 'Saigon Newport Corporation is Vietnam’s largest container terminal operator, handling over 55% of the country’s container import-export market share through flagship facilities including Tan Cang - Cat Lai and Tan Cang - Cai Mep (TCIT / TCTT).',
    stat1Label: 'Container Market Share', stat1Val: '55%+ in Vietnam',
    stat2Label: 'Annual Throughput', stat2Val: '9.2M+ TEUs',
    stat3Label: 'Quayside Berths', stat3Val: '28 Berths Across VN',
    quoteText: 'Connecting global sea lanes to Vietnam’s economic heartland through high-speed automation and green port stewardship.',
    quoteAuthor: 'Executive Board • Saigon Newport',
    photos: ['/images/hero_1.jpg'],
    email: 'tuyendung@saigonnewport.com.vn',
    phone: '(+84) 28 3742 2234',
    address: 'Tan Cang - Cat Lai Port, Thu Duc City, HCMC',
    certs: ['Vietnam National Brand', 'ISO 9001:2015', 'ISO 14001:2015'],
    hiringCategories: [
      { name: 'Port IT & Terminal Operating Systems', count: 8 },
      { name: 'Quayside Gantry Crane Operations', count: 7 },
      { name: 'Multimodal Barging & ICD Logistics', count: 7 }
    ],
    techStack: [
      { name: 'Navis N4 & TOPX', category: 'TERMINAL MANAGEMENT (TOS)', icon: 'fa-solid fa-ship' },
      { name: 'E-Port Online Booking', category: 'DIGITAL CLIENT GATEWAY', icon: 'fa-solid fa-mobile-screen' }
    ],
    cultureValues: [
      { title: 'National Maritime Vanguard', desc: 'Upholding sovereignty, economic growth, and world-class maritime standards.' }
    ],
    offices: [
      { name: 'Tan Cang - Cat Lai Port', location: 'Thu Duc City, HCMC', type: 'Primary Seaport', spec: 'Over 5.5M TEU Annual Throughput' }
    ],
    awards: [
      { title: 'Top 10 Logistical Brand Vietnam', org: 'Ministry of Industry and Trade', badge: 'NATIONAL BRAND' }
    ],
    openJobIds: ['job-snp-1']
  }
];

// ============================================================================
// 3. ARTICLES DATABASE
// ============================================================================
export const articlesDatabase: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'cross-border-tech-hiring',
    title: 'Cross-Border Tech Hiring Guidelines & Global Remote Tax Treaties for 2026',
    topicTag: 'Policy & Remote Trends',
    category: 'policy',
    categoryLabel: 'POLICY & REMOTE TRENDS',
    authorName: 'Built In Editorial Staff',
    authorRole: 'Global Policy Desk & Compensation Analysts',
    authorAvatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    date: 'Today',
    timeAgo: '2 hours ago',
    readTime: '5 min read',
    readersCount: '12,450 readers',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=85',
    imageCaption: 'Multinational tech enterprises navigate shifting bilateral tax treaties and cross-border IP licensing agreements. (Photo: Sandbox Global Policy Desk)',
    excerpt: 'Key international treaties, permanent establishment thresholds, and currency hedging best practices for engineering leaders managing distributed cross-border teams across the US, EU, and Southeast Asia.',
    leadParagraph: 'As global engineering teams scale past regional borders, tech organizations face an intricate labyrinth of double-taxation treaties, revised permanent establishment (PE) risk factors, and evolving digital nomad compliance guidelines across 45 major jurisdictions.',
    bodyParagraphs: [
      'The 2026 international tax harmonization frameworks established by the OECD now mandate stricter economic nexus disclosures for tech companies with over 15% of their core software development staff residing outside their primary corporate incorporation country.',
      'For fast-growing organizations hiring across Singapore, Vietnam, Japan, and the United States, managing equity-based compensation has become the foremost operational hurdle. Dual-withholding rules on restricted stock units (RSUs) and incentive stock options (ISOs) have caused severe liquidity friction for international talent.',
      'Forward-thinking corporate payroll directors are increasingly transitioning to Employer of Record (EOR) multi-entity hubs with pre-negotiated tax clearance guarantees, ensuring local social security compliance while granting talent direct dollar-denominated contracts.'
    ],
    statCard: {
      title: 'Global Remote Compliance Benchmarks (2026)',
      stats: [
        { value: '45', label: 'Bilateral Treaties Modernized' },
        { value: '62%', label: 'Tech Firms with Multi-Country R&D' },
        { value: '183 Days', label: 'Strict Physical Nexus Limit' },
        { value: '2.4x', label: 'Surge in Direct Multi-Currency Payroll' }
      ]
    },
    quote: {
      text: 'Engineering leaders can no longer treat tax and legal compliance as an afterthought. Designing tax-optimized, legally sound cross-border contracts is now as essential as software architecture.',
      cite: 'David Sterling — Editor-in-Chief • Sandbox Chronicle'
    },
    tags: ['Cross-Border Hiring', 'Remote Work Compliance', 'Tax Treaties 2026', 'Engineering Equity'],
    sourcesText: 'Compiled from OECD Digital Economy Guidelines 2026, Singapore Economic Development Board tax bulletins, and Vietnam Ministry of Finance circulars.'
  },
  {
    id: 'art-2',
    slug: 'gitlab-autonomous-ai-duo',
    title: 'GitLab Unveils Autonomous AI Duo: Transforming Developer Workflows from Planning to Production',
    topicTag: 'Autonomous Dev Workflows',
    category: 'engineering',
    categoryLabel: 'AUTONOMOUS DEV WORKFLOWS',
    authorName: 'Sarah Jenkins',
    authorRole: 'Head of Global Talent & Technical Recruiter • GitLab',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    companyName: 'GitLab',
    date: '3 hours ago',
    timeAgo: '3 hours ago',
    readTime: '4 min read',
    readersCount: '9,820 readers',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'GitLab AI Duo automated pipeline orchestration running on containerized clusters. (Photo: GitLab Engineering)',
    excerpt: 'Next-generation agentic assistants now draft architectural RFCs, run security static analysis, and synthesize full PR unit suites before human code review begins.',
    leadParagraph: 'GitLab has announced the general availability of its Autonomous AI Duo workflow engine, marking a paradigm transition from simple autocomplete code suggestions to goal-driven autonomous software engineering agents embedded into every step of the DevSecOps lifecycle.',
    bodyParagraphs: [
      'Unlike first-generation copilot tools that operate solely inside local text editors, the autonomous Duo system connects directly into project issue trackers, GitLab CI pipelines, and production telemetry logs. When an engineer defines an architectural issue, Duo synthesizes a baseline branch, sets up unit tests, and validates code changes against vulnerability databases.',
      'In empirical benchmarks across 2,400 internal repositories, automated pipeline resolution reduced mean time to remediation (MTTR) for dependency CVE alerts from 4.2 days to less than 18 minutes.',
      'Importantly, GitLab maintains strict data isolation policies: customer proprietary codebases are never leveraged to train public foundation models, addressing the primary intellectual property hesitation of enterprise CISOs.'
    ],
    statCard: {
      title: 'Autonomous DevSecOps Velocity Metrics',
      stats: [
        { value: '18 mins', label: 'Median CVE Remediation Time' },
        { value: '68%', label: 'Unit Tests Auto-Generated' },
        { value: '3.1x', label: 'Acceleration in Issue-to-PR Flow' }
      ]
    },
    quote: {
      text: 'The future software engineer is an orchestrator and reviewer of intelligent agents, guiding high-level architecture while the system handles routine pipeline mechanics.',
      cite: 'Sid Sijbrandij — GitLab Co-Founder'
    },
    tags: ['DevSecOps', 'Autonomous Agents', 'AI Duo', 'Software Engineering'],
    sourcesText: 'Official GitLab Press Briefing and Technical Whitepaper on Agentic DevSecOps.'
  },
  {
    id: 'art-3',
    slug: 'the-2026-state-of-tech-salaries',
    title: 'The 2026 State of Tech Salaries: Why Specialized AI & Distributed Systems Engineers Command Record Premiums',
    topicTag: 'Special Investigation',
    category: 'salary',
    categoryLabel: 'SPECIAL INVESTIGATION',
    authorName: 'David Sterling',
    authorRole: 'Editor-in-Chief • Sandbox Chronicle',
    authorAvatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    date: 'Today',
    timeAgo: '30 mins ago',
    readTime: '7 min read',
    readersCount: '18,900 readers',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=85',
    imageCaption: 'Global tech compensation benchmarks reflect skyrocketing premiums for distributed systems and AI systems engineers. (Photo: Sandbox Research)',
    excerpt: 'An investigation across 1,200 tech organizations reveals evolving equity structures, with demand for high-concurrency systems outstripping generalist development by 2.4x.',
    leadParagraph: 'Our comprehensive global study analyzed compensation benchmarks for software engineering, autonomous systems, and generative AI research across US, Asia, and European tech hubs. Organizations that embraced async-first talent sourcing saw a 34% acceleration in product velocity while maintaining strong retention.',
    bodyParagraphs: [
      'The disparity between generalist full-stack developers and specialists who understand low-level memory allocation, GPU cluster scheduling, and distributed database consistency reached historical highs in early 2026. Staff and Principal engineers with proven experience scaling high-concurrency systems now command total packages exceeding $380,000 annually.',
      'In emerging Asian innovation centers like Singapore and Vietnam, base salaries for senior distributed backend engineers have surged 28% year-over-year, driven by multinational R&D expansions from Datadog, VinFast, and ByteDance.',
      'Equity remains the primary vehicle for generational wealth creation, but candidates are increasingly demanding accelerated vesting cliffs and liquidity tender offer guarantees before signing offer letters.'
    ],
    statCard: {
      title: '2026 Compensation Multipliers',
      stats: [
        { value: '2.4x', label: 'Premium for Distributed Systems' },
        { value: '+28%', label: 'Year-over-Year Senior Tech Pay' },
        { value: '$380k+', label: 'Median Staff Engineer Package' }
      ]
    },
    quote: {
      text: 'Companies that try to compensate high-concurrency systems engineers at standard web developer bands are experiencing 100% offer rejection rates. The talent market has spoken.',
      cite: 'Sarah Jenkins — GitLab Head of Talent'
    },
    tags: ['Tech Salaries', 'Distributed Systems', 'Engineering Compensation', 'Equity Packages'],
    sourcesText: 'Verified across 1,200 verified corporate payroll datasets and candidate offer disclosures.'
  },
  {
    id: 'cai-mep-channel-expansion',
    slug: 'cai-mep-channel-expansion',
    title: 'Cai Mep - Thi Vai Expands Deep-Draft Access to -15.5m for Mega-Vessels',
    topicTag: 'Maritime Logistics',
    category: 'maritime',
    categoryLabel: 'MARITIME & PORT LOGISTICS',
    authorName: 'Maritime Editorial Desk',
    authorRole: 'Senior Port Operations Analyst',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    date: '19 October 2026',
    timeAgo: '4 hours ago',
    readTime: '4 min read',
    readersCount: '8,420 readers',
    image: '/images/hero_1.jpg',
    imageCaption: 'A 24,000 TEU container vessel approaches Gemalink deep-water terminal at Cai Mep - Thi Vai. (Photo: Vinamarine / VietnamNet)',
    excerpt: 'The channel deepening eliminates historical low-tide transit windows, enabling round-the-clock navigation for ultra-large container ships connecting Vietnam directly to the US and Europe.',
    leadParagraph: 'The Ministry of Transport and the Vietnam Maritime Administration (Vinamarine) have officially commissioned the Phase 1 maintenance and capital dredging project for the Cai Mep - Thi Vai navigational channel, deepening the access fairway to a consistent design draft of -15.5 meters at low tide.',
    bodyParagraphs: [
      'The multi-month maritime engineering initiative eliminates historical siltation bottlenecks between buoy zero and the upstream terminal complexes, establishing an unobstructed nautical corridor with a guaranteed bottom width of 350 meters.',
      'According to official hydrographic surveys, the deepened fairway now enables ultra-large container vessels (ULCVs) of up to 24,000 TEU—carrying deadweight tonnage exceeding 232,000 DWT—to transit safely in both directions under all tidal conditions.',
      'Previously, vessels with operating drafts exceeding 14 meters were constrained to narrow tidal transit windows, forcing ocean liners to coordinate arrivals with high-water hours or divert excess container intake to intermediate transshipment hubs across Southeast Asia.'
    ],
    statCard: {
      title: 'Verified Cai Mep - Thi Vai Specifications',
      stats: [
        { value: '-15.5m', label: 'Low-Tide Design Draft' },
        { value: '350m', label: 'Fairway Bottom Width' },
        { value: '24,000 TEU', label: 'Max Vessel Displacement' },
        { value: '8.3M TEU', label: 'Annual Port Throughput' }
      ]
    },
    quote: {
      text: 'Deepening Cai Mep - Thi Vai to -15.5 meters is not merely an engineering achievement; it structurally recalibrates Vietnam’s maritime competitiveness. Ocean carriers no longer need to short-ship export cargo.',
      cite: 'Vietnam Maritime Administration Technical Directorate'
    },
    tags: ['Cai Mep', 'Deep-Draft Port', 'Container Shipping', 'Vietnam Maritime'],
    sourcesText: 'Verified against official maritime navigation notices from Vinamarine and Vietnam Logistics Association (VLA).'
  }
];

// ============================================================================
// 4. MENTORS DATABASE
// ============================================================================
export const mentorsDatabase: MentorProfile[] = [
  {
    id: 'm-1',
    name: 'Dr. Elena Rozova',
    role: 'Principal AI Scientist & Guest Columnist',
    company: 'Ex-DeepMind / AI Lab',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    sessionsCount: 142,
    online: true,
    bioLead: 'Expert in foundational LLM architectures, multimodal representation learning, and autonomous agents with 12+ years of research.',
    fullBio: 'Dr. Elena Rozova was previously a Staff Research Scientist at DeepMind where she led breakthroughs in reinforcement learning from human feedback (RLHF) and low-precision transformer quantization. She has authored over 25 papers at NeurIPS, ICML, and CVPR, and now advises promising AI engineers and founders navigating PhD fellowships, research transitions, and AI startup scaling.',
    expertiseTags: ['AI Research Career', 'LLMs & RAG', 'PhD Fellowship Advisory', 'PyTorch & Distributed Training', 'Paper Publishing'],
    sessionTopics: [
      { title: 'AI Research Strategy & Paper Roadmaps', description: 'Review your ongoing research draft or research fellowship proposal with actionable guidance on methodology and publication target.', duration: '45 mins' },
      { title: 'Transitioning from Software Engineering to AI Research', description: 'Personalized step-by-step roadmap to move from application software engineering to high-impact machine learning research roles.', duration: '45 mins' },
      { title: 'PhD & Global Fellowship Application Polish', description: 'Detailed inspection of your statement of purpose, research proposal, and university shortlists for top global AI labs.', duration: '60 mins' }
    ],
    reviews: [
      { mentee: 'Alex T.', role: 'Senior ML Engineer • Grab', comment: 'Dr. Elena’s advice on my NeurIPS workshop paper was game-changing. She immediately identified a flaw in our baseline ablation study.', rating: 5 },
      { mentee: 'Minh Nguyen', role: 'PhD Candidate • NUS', comment: 'The best 45 minutes of my academic year. Elena helped me structure my statement of purpose that led to acceptance at TBSI and NUS.', rating: 5 }
    ],
    availableSlots: ['Tomorrow at 10:00 AM', 'Tomorrow at 3:30 PM', 'Thursday at 2:00 PM', 'Friday at 9:00 AM']
  },
  {
    id: 'm-2',
    name: 'Marcus Chen',
    role: 'Staff Systems Architect',
    company: 'Google Cloud Platform',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    sessionsCount: 218,
    online: true,
    bioLead: 'Specializes in high-concurrency distributed backends, streaming event pipelines, and Staff+ engineering promotion tracks.',
    fullBio: 'Marcus Chen is a Staff Systems Architect at Google Cloud where he designs distributed storage engines and telemetry pipelines handling tens of millions of QPS. With over 15 years in distributed systems across Silicon Valley and Asia, Marcus is renowned for coaching engineers through demanding System Design interviews and Staff-level promotion packets.',
    expertiseTags: ['Distributed Systems', 'System Design Interview', 'Staff Promotion', 'Go & Rust Systems', 'Kafka & Streaming'],
    sessionTopics: [
      { title: 'System Design Mock Interview & Deep Dive', description: 'High-rigor mock interview designing a global streaming engine, distributed cache, or real-time ledger with whiteboarding feedback.', duration: '60 mins' },
      { title: 'Staff+ Career Progression & Influence', description: 'How to build organizational leverage, write compelling architectural RFCs, and lead cross-team engineering initiatives.', duration: '45 mins' }
    ],
    reviews: [
      { mentee: 'Kenji S.', role: 'Lead Architect • Tokyo', comment: 'Marcus helped me dissect the exact distributed consensus failure modes that Google and Meta ask in their L6 interviews. Passed with flying colors!', rating: 5 }
    ],
    availableSlots: ['Wednesday at 11:00 AM', 'Thursday at 4:00 PM', 'Saturday at 10:00 AM']
  },
  {
    id: 'm-3',
    name: 'Sarah Jenkins',
    role: 'Head of Global Talent & Technical Recruiter',
    company: 'GitLab',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    sessionsCount: 320,
    online: true,
    bioLead: 'Global hiring leader specializing in ATS resume optimization, remote work mastery, and executive salary negotiation.',
    fullBio: 'Sarah Jenkins has led technical recruiting organizations for over a decade at GitLab and high-growth Silicon Valley startups. She has reviewed more than 40,000 engineering CVs and negotiated hundreds of complex multi-currency compensation packages including equity, sign-on bonuses, and remote stipends.',
    expertiseTags: ['ATS Resume Polish', 'Remote Work Mastery', 'Salary Negotiation', 'Executive Interview Prep', 'Equity & RSU Advisory'],
    sessionTopics: [
      { title: 'ATS Resume Overhaul & LinkedIn Alignment', description: 'Line-by-line review of your resume to guarantee high ATS parsability, impact quantification, and recruiter attention.', duration: '45 mins' },
      { title: 'Offer Evaluation & Salary Negotiation Strategy', description: 'Tactical playbooks to counter-offer with confidence, negotiate higher equity grants, and handle multiple competing offers.', duration: '45 mins' }
    ],
    reviews: [
      { mentee: 'Daniel V.', role: 'Senior Staff Engineer • Datadog', comment: 'Sarah coached me through my Datadog negotiation. We increased the initial equity grant by $45k with zero awkward friction.', rating: 5 }
    ],
    availableSlots: ['Tomorrow at 1:00 PM', 'Wednesday at 9:30 AM', 'Friday at 2:00 PM']
  },
  {
    id: 'm-4',
    name: 'David Pham',
    role: 'VP of Product Engineering & Architecture',
    company: 'TechFin Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    sessionsCount: 110,
    online: true,
    bioLead: 'Architecting scalable fintech & enterprise logistics platforms, scaling technical teams from 10 to 300+ engineers.',
    fullBio: 'David Pham is VP of Product Engineering at TechFin Group, overseeing high-throughput transactional backends and financial logistics infrastructure. Prior to TechFin, David was engineering director at regional unicorn platforms and has mentored dozens of founders and senior tech leads.',
    expertiseTags: ['Product Leadership', 'Startup Scaling', 'Portfolio Strategy', 'Engineering Culture', 'Fintech Architecture'],
    sessionTopics: [
      { title: 'Engineering Leadership & Team Scaling', description: 'Frameworks to structure squads, maintain engineering velocity, and establish blameless operational culture.', duration: '45 mins' },
      { title: 'Technical Founder Advisory & MVP Architecture', description: 'Pragmatic tech stack decisions for early-stage B2B and fintech products to avoid premature technical debt.', duration: '60 mins' }
    ],
    reviews: [
      { mentee: 'Thao L.', role: 'CTO & Co-Founder', comment: 'David gave us straightforward, pragmatic architecture advice that kept our infrastructure costs under $500/month while handling our first 100k users.', rating: 5 }
    ],
    availableSlots: ['Thursday at 10:00 AM', 'Friday at 3:00 PM', 'Saturday at 2:00 PM']
  }
];

// ============================================================================
// HELPER LOOKUPS
// ============================================================================
export function getJobById(id: string): JobItem | undefined {
  return jobsDatabase.find(j => j.id.toLowerCase() === id.toLowerCase() || j.companySlug.toLowerCase() === id.toLowerCase());
}

export function getCompanyBySlug(slug: string): CompanyProfile | undefined {
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
}

export function getArticleByIdOrSlug(idOrSlug: string): ArticleItem | undefined {
  if (!idOrSlug) return articlesDatabase[0];
  const s = idOrSlug.toLowerCase().trim();

  // 1. Direct ID or slug match
  const direct = articlesDatabase.find(
    a => a.id.toLowerCase() === s || a.slug.toLowerCase() === s
  );
  if (direct) return direct;

  // 2. Map post-1 / post-2 / post-3 from Home to corresponding articles
  const numMatch = s.match(/(?:post|art)[-_]?(\d+)/i);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    if (s.startsWith('post-')) {
      if (num === 1) return articlesDatabase.find(a => a.id === 'art-3');
      if (num === 2) return articlesDatabase.find(a => a.id === 'art-2');
      if (num === 3) return articlesDatabase.find(a => a.id === 'art-1');
    }
    const byNum = articlesDatabase.find(
      a => a.id.toLowerCase() === `art-${num}` || a.id.toLowerCase() === `post-${num}`
    );
    if (byNum) return byNum;
  }

  return articlesDatabase[0];
}

export function getMentorById(id: string): MentorProfile | undefined {
  return mentorsDatabase.find(m => m.id.toLowerCase() === id.toLowerCase());
}
