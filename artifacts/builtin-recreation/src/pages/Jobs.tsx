import React, { useState, useMemo, useEffect } from 'react';
import { useSearch, Link } from 'wouter';
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  Bookmark,
  Check,
  Building2,
  Send,
  GraduationCap,
  Sparkles,
  Share2,
  TrendingUp,
  ArrowRight,
  Flame,
  Wifi,
  Star,
  CheckCircle2,
  DollarSign,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { SEO } from '@/lib/seo';
import { BestJobsSection } from '@/components/BestJobsSection';

export interface JobListing {
  id: string;
  type: 'Full-time' | 'Internship' | 'Remote' | 'Part-time';
  title: string;
  company: string;
  companySlug: string;
  logo: string;
  featured?: boolean;
  isHot?: boolean;
  location: string;
  workPolicy: 'Hybrid' | 'Remote' | 'On-site';
  salary: string;
  salaryPeriod?: string;
  perkHighlight?: string;
  posted: string;
  duration?: string;
  coverImage?: string;
  shortDesc: string;
  fullDesc: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  compensation?: string;
  salaryAmount?: string;
  companyLogo?: string;
  industry?: string;
  remote?: boolean;
}

export type Opportunity = JobListing;

// =========================================================================
// 1. VIỆC LÀM TỐT NHẤT (Top Featured Jobs matching user's exact uploaded image)
// =========================================================================
export const topBestJobs: JobListing[] = [
  {
    id: 'job-vietnhat-1',
    type: 'Full-time',
    title: 'Kỹ Sư Thiết Kế Điện (M&E / Automation)',
    company: 'Công Ty CP Đầu Tư Xây Dựng & Cơ Điện Việt Nhật',
    companySlug: 'vietnhat-ec',
    logo: '/images/logo_vietnhat.png',
    featured: true,
    isHot: true,
    location: 'Hà Nội',
    workPolicy: 'On-site',
    salary: '30tr-35tr đ',
    salaryPeriod: '/tháng',
    perkHighlight: '+ Thưởng công trình',
    posted: 'Vừa đăng',
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
      'Nhanh nhẹn, có khả năng làm việc độc lập và chịu áp lực tiến độ.',
    ],
    benefits: [
      'Lương cứng 30.000.000đ - 35.000.000đ/tháng + thưởng hoàn thành dự án',
      'Đóng đầy đủ BHXH, BHYT, BHTN và gói bảo hiểm sức khỏe Bảo Việt',
      'Phụ cấp ăn trưa, công tác phí và xe đưa đón',
      'Cơ hội thăng tiến lên Trưởng bộ phận thiết kế',
    ],
    skills: ['AutoCAD', 'Revit MEP', 'Dialux', 'M&E', 'Hệ thống điện'],
  },
  {
    id: 'job-vinmec-1',
    type: 'Full-time',
    title: 'Giám Đốc Dự Án Bệnh Viện & Y Tế Số',
    company: 'Công Ty CP Bệnh Viện Đa Khoa Quốc Tế Vinmec',
    companySlug: 'vinmec',
    logo: '/images/logo_vinmec.png',
    featured: true,
    isHot: true,
    location: 'Hồ Chí Minh',
    workPolicy: 'Hybrid',
    salary: '200tr-300tr đ',
    salaryPeriod: '/tháng',
    perkHighlight: '+ Cổ phiếu Vingroup',
    posted: '1 ngày trước',
    shortDesc: 'Lãnh đạo chuyển đổi số toàn diện hệ thống quản lý bệnh viện thông minh, hồ sơ bệnh án điện tử (EMR) và tích hợp AI chẩn đoán hình ảnh.',
    fullDesc: 'Vinmec tìm kiếm Giám Đốc Dự Án Y Tế Số phụ trách chiến lược chuyển đổi số, triển khai hệ thống thông tin y tế bệnh viện (HIS/LIS/PACS) và hạ tầng đám mây y tế đạt chuẩn JCI Hoa Kỳ.',
    responsibilities: [
      'Hoạch định lộ trình công nghệ số hóa quy trình khám chữa bệnh tại các bệnh viện Vinmec.',
      'Quản lý ngân sách đầu tư công nghệ trên 10 triệu USD hàng năm.',
      'Điều phối đội ngũ kỹ sư giải pháp, đối tác công nghệ quốc tế (Epic, GE, Philips).',
      'Báo cáo trực tiếp Hội đồng Quản trị về tiến độ và hiệu quả chuyển đổi số.',
    ],
    requirements: [
      '10+ năm kinh nghiệm quản lý dự án công nghệ, trong đó ít nhất 5 năm trong lĩnh vực y tế / bệnh viện số.',
      'Am hiểu sâu sắc tiêu chuẩn bảo mật y tế HIPAA, HL7, DICOM, chuẩn JCI quốc tế.',
      'Kỹ năng lãnh đạo, đàm phán hợp đồng với các tập đoàn công nghệ toàn cầu.',
      'Tiếng Anh lưu loát, ưu tiên có chứng chỉ PMP, TOGAF.',
    ],
    benefits: [
      'Thu nhập 200.000.000đ - 300.000.000đ/tháng kèm gói thưởng cổ tức Vingroup',
      'Gói khám chữa bệnh VIP miễn phí cho gia đình tại chuỗi Vinmec toàn quốc',
      'Học bổng Vinschool 100% cho con cái',
      'Môi trường làm việc chuẩn mực quốc tế với công nghệ y tế tối tân nhất',
    ],
    skills: ['Healthcare Tech', 'Digital Transformation', 'HIS/PACS', 'PMP', 'Enterprise Architecture'],
  },
  {
    id: 'job-seev-hr',
    type: 'Full-time',
    title: 'Nhân Viên Phòng Nhân Sự & Tuyển Dụng',
    company: 'SEI Electronic Components (SEEV)',
    companySlug: 'seev',
    logo: '/images/logo_seev.png',
    featured: false,
    isHot: true,
    location: 'Hà Nội',
    workPolicy: 'On-site',
    salary: 'Thương lượng',
    salaryPeriod: '',
    perkHighlight: '+ Thưởng quý',
    posted: '2 ngày trước',
    shortDesc: 'Phụ trách thu hút nhân tài kỹ thuật cao cho nhà máy sản xuất linh kiện điện tử Sumitomo Electric tại KCN Thăng Long.',
    fullDesc: 'SEI Electronic Components tuyển dụng Chuyên viên Tuyển dụng & Đào tạo nhằm mở rộng quy mô sản xuất các bản mạch in linh hoạt (FPC) cho chuỗi cung ứng điện tử toàn cầu.',
    responsibilities: [
      'Lập kế hoạch và thực hiện tuyển dụng kỹ sư công nghệ, kỹ sư vận hành máy SMT.',
      'Tổ chức ngày hội việc làm tại các trường đại học kỹ thuật hàng đầu (Bách Khoa, Công Nghiệp).',
      'Xây dựng chương trình đào tạo văn hóa doanh nghiệp Nhật Bản (5S, Kaizen).',
      'Thực hiện các thủ tục tiếp nhận, đánh giá thử việc và tái ký hợp đồng lao động.',
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Quản trị Nhân lực, Ngoại ngữ, Kinh tế.',
      'Tối thiểu 2 năm kinh nghiệm tuyển dụng trong các doanh nghiệp sản xuất / FDI.',
      'Khả năng giao tiếp tiếng Anh hoặc tiếng Nhật (N3 trở lên) là lợi thế lớn.',
      'Tác phong chuyên nghiệp, tinh thần trách nhiệm và bảo mật thông tin.',
    ],
    benefits: [
      'Mức lương cạnh tranh theo năng lực thỏa thuận trong phỏng vấn',
      'Thưởng Tết 2-3 tháng lương + phụ cấp chuyên cần hàng tháng',
      'Xe đưa đón nhân viên từ nội thành Hà Nội đến KCN Thăng Long',
      'Tham gia các khóa đào tạo nâng cao kỹ năng tại Nhật Bản',
    ],
    skills: ['Recruitment', 'Talent Sourcing', 'Japanese 5S', 'HR Operations', 'Interviewing'],
  },
  {
    id: 'job-chailease-credit',
    type: 'Full-time',
    title: 'Credit Officer / Quản Lý Tín Dụng Doanh Nghiệp',
    company: 'Chailease International Leasing',
    companySlug: 'chailease',
    logo: '/images/logo_chailease.png',
    featured: false,
    isHot: true,
    location: 'Đà Nẵng, Hà Nội',
    workPolicy: 'Hybrid',
    salary: 'Thương lượng',
    salaryPeriod: '',
    perkHighlight: '+ Hoa hồng cao',
    posted: '3 ngày trước',
    shortDesc: 'Thẩm định tài chính và quản trị rủi ro cấp tín dụng cho thuê tài chính đối với các doanh nghiệp vừa và nhỏ (SME).',
    fullDesc: 'Gia nhập tập đoàn Chailease - công ty cho thuê tài chính hàng đầu khu vực Châu Á. Phụ trách phân tích năng lực tài chính khách hàng doanh nghiệp và đề xuất hạn mức tín dụng tài trợ máy móc thiết bị.',
    responsibilities: [
      'Thu thập hồ sơ tài chính, thẩm định thực tế hoạt động sản xuất kinh doanh của khách hàng.',
      'Lập tờ trình thẩm định tín dụng, phân tích dòng tiền và đánh giá rủi ro tài sản đảm bảo.',
      'Trình phê duyệt hồ sơ tín dụng lên Ban Giám đốc và Hội đồng Tín dụng.',
      'Theo dõi và quản lý danh mục nợ vay, nhắc nợ định kỳ và cảnh báo sớm rủi ro quá hạn.',
    ],
    requirements: [
      'Cử nhân chuyên ngành Tài chính - Ngân hàng, Kế toán - Kiểm toán hoặc Kinh tế.',
      'Tối thiểu 2 năm kinh nghiệm thẩm định tín dụng doanh nghiệp tại ngân hàng hoặc công ty tài chính.',
      'Khả năng đọc hiểu và phân tích báo cáo tài chính doanh nghiệp thành thạo.',
      'Kỹ năng giao tiếp, thương lượng và tư duy logic sắc bén.',
    ],
    benefits: [
      'Lương cơ bản cạnh tranh + hoa hồng giải ngân không giới hạn',
      'Thưởng kết quả kinh doanh quý & thưởng cuối năm hấp dẫn',
      'Gói bảo hiểm sức khỏe toàn diện PTI',
      'Du lịch công ty hàng năm tại Đài Loan / Thái Lan',
    ],
    skills: ['Credit Analysis', 'Financial Modeling', 'Risk Assessment', 'SME Banking', 'Due Diligence'],
  },
  {
    id: 'job-fpt-schools',
    type: 'Full-time',
    title: 'FPT Schools Tuyển Dụng Giảng Viên & Chuyên Viên',
    company: 'Tổ Chức Giáo Dục FPT (FPT Education)',
    companySlug: 'fpt-education',
    logo: '/images/logo_fpt.png',
    featured: false,
    isHot: true,
    location: 'Hà Tĩnh, Hồ Chí Minh, Phú Thọ',
    workPolicy: 'Hybrid',
    salary: 'Thương lượng',
    salaryPeriod: '',
    perkHighlight: '+ Ưu đãi học phí 50%',
    posted: '3 ngày trước',
    shortDesc: 'Tuyển dụng giáo viên STEM, Tin học, Tiếng Anh và cán bộ phát triển chương trình cho các trường phổ thông liên cấp FPT.',
    fullDesc: 'Hệ thống Trường Phổ thông FPT tìm kiếm những người thầy truyền cảm hứng, tiên phong ứng dụng công nghệ thông tin và AI vào giảng dạy để đào tạo thế hệ công dân toàn cầu.',
    responsibilities: [
      'Giảng dạy các môn học theo phương pháp giáo dục hiện đại, kích thích tư duy sáng tạo.',
      'Biên soạn giáo án điện tử, tài liệu bổ trợ và ngân hàng đề thi trực tuyến.',
      'Chủ nhiệm lớp học, đồng hành và tư vấn hướng nghiệp cho học sinh.',
      'Tham gia nghiên cứu và ứng dụng các phương pháp sư phạm tiên tiến (STEM, PBL).',
    ],
    requirements: [
      'Tốt nghiệp Đại học Sư phạm hoặc có chứng chỉ nghiệp vụ sư phạm.',
      'Yêu thích công nghệ, có khả năng ứng dụng các công cụ AI trong soạn giảng.',
      'Nhiệt huyết, yêu trẻ và tôn trọng sự phát triển cá nhân của học sinh.',
      'Tiếng Anh giao tiếp tốt; phát âm chuẩn.',
    ],
    benefits: [
      'Thu nhập cạnh tranh theo năng lực và số tiết giảng dạy',
      'Giảm 50% học phí cho con cái học tập tại Hệ thống giáo dục FPT',
      'Được đào tạo định kỳ bởi các chuyên gia giáo dục hàng đầu trong và ngoài nước',
      'Môi trường năng động, tôn trọng sự sáng tạo và khác biệt cá nhân',
    ],
    skills: ['STEM Education', 'Teaching', 'Curriculum Design', 'EdTech', 'Public Speaking'],
  },
  {
    id: 'job-seev-maintenance',
    type: 'Full-time',
    title: 'Kỹ Sư Bảo Dưỡng Sửa Chữa Thiết Bị Điện Tử',
    company: 'SEI Electronic Components (SEEV)',
    companySlug: 'seev',
    logo: '/images/logo_seev.png',
    featured: false,
    isHot: true,
    location: 'Hà Nội',
    workPolicy: 'On-site',
    salary: 'Thương lượng',
    salaryPeriod: '',
    perkHighlight: '+ Đào tạo tại Nhật',
    posted: '4 ngày trước',
    shortDesc: 'Vận hành, bảo trì định kỳ và khắc phục sự cố hệ thống máy móc dây chuyền tự động hóa sản xuất bản mạch điện tử FPC.',
    fullDesc: 'Phụ trách công tác bảo dưỡng cơ điện, cân chỉnh thiết bị chính xác cao và tối ưu hóa thời gian hoạt động của dây chuyền sản xuất bo mạch điện tử công nghệ cao.',
    responsibilities: [
      'Lập kế hoạch bảo dưỡng phòng ngừa (PM) hàng tuần, hàng tháng cho dây chuyền sản xuất.',
      'Xử lý nhanh chóng các sự cố máy móc phát sinh, giảm thiểu tối đa thời gian dừng chuyền.',
      'Cải tiến máy móc nhằm nâng cao năng suất (OEE) và tiết kiệm năng lượng.',
      'Quản lý kho phụ tùng thay thế và đặt hàng linh kiện kỹ thuật.',
    ],
    requirements: [
      'Tốt nghiệp Cao đẳng/Đại học chuyên ngành Cơ điện tử, Điện - Điện tử, Tự động hóa.',
      'Hiểu biết về PLC (Mitsubishi, Omron), khí nén thủy lực, động cơ Servo.',
      'Sẵn sàng làm việc theo ca sản xuất khi có yêu cầu điều động.',
      'Ưu tiên ứng viên có kinh nghiệm bảo trì máy trong các công ty điện tử Nhật Bản.',
    ],
    benefits: [
      'Mức lương tương xứng với năng lực kinh nghiệm kỹ thuật',
      'Phụ cấp ca đêm, phụ cấp bảo hộ lao động và độc hại đầy đủ',
      'Cơ hội cử sang tập đoàn Sumitomo Electric tại Nhật Bản tập huấn kỹ thuật',
      'Đầy đủ chế độ phúc lợi theo Luật lao động Việt Nam và quy chế công ty',
    ],
    skills: ['PLC', 'Automation', 'Maintenance', 'Pneumatics', 'OEE'],
  },
  {
    id: 'job-pvcfc-data',
    type: 'Full-time',
    title: 'Chuyên Viên Khoa Học Dữ Liệu & Hóa Dầu',
    company: 'Công ty CP Phân bón Dầu khí Cà Mau (PVCFC)',
    companySlug: 'pvcfc',
    logo: '/images/logo_pvcfc.png',
    featured: true,
    isHot: true,
    location: 'Cà Mau, Hồ Chí Minh',
    workPolicy: 'Hybrid',
    salary: 'Thương lượng',
    salaryPeriod: '',
    perkHighlight: '+ Nhà ở công vụ',
    posted: '4 ngày trước',
    shortDesc: 'Xây dựng mô hình máy học dự báo chuỗi cung ứng hóa dầu và tối ưu hóa vận hành nhà máy phân bón Đạm Cà Mau bằng dữ liệu IoT.',
    fullDesc: 'Tham gia khối chuyển đổi số của Tổng Công ty Phân bón Dầu khí Cà Mau. Nghiên cứu triển khai các thuật toán AI phân tích dữ liệu cảm biến thời gian thực, dự báo nhu cầu thị trường nông nghiệp và tối ưu năng lượng.',
    responsibilities: [
      'Phát triển các mô hình học máy (Machine Learning) phục vụ tối ưu hóa thông số nhiệt động học nhà máy.',
      'Thiết kế kiến trúc đường ống dữ liệu (Data Pipeline) thu thập từ hàng nghìn cảm biến IoT.',
      'Xây dựng các dashboard trực quan hóa dữ liệu kinh doanh phục vụ quyết sách Ban Điều Hành.',
      'Nghiên cứu ứng dụng Computer Vision phát hiện khuyết tật bao bì tự động.',
    ],
    requirements: [
      'Tốt nghiệp Thạc sĩ hoặc Cử nhân xuất sắc ngành Khoa học dữ liệu, CNTT, Hóa tin.',
      'Sử dụng thành thạo Python, SQL, các thư viện PyTorch, TensorFlow, Scikit-learn.',
      'Hiểu biết về kiến trúc dữ liệu lớn (Kafka, Spark, ClickHouse).',
      'Tư duy phân tích số liệu sắc bén, khả năng làm việc độc lập.',
    ],
    benefits: [
      'Mức lương hấp dẫn của ngành Dầu khí Quốc gia',
      'Cấp nhà ở công vụ tiện nghi đầy đủ hoặc phụ cấp nhà ở hàng tháng',
      'Gói bảo hiểm sức khỏe PVI hạn mức cao cho bản thân và người thân',
      'Thưởng thành tích cuối năm 4-6 tháng thu nhập',
    ],
    skills: ['Python', 'Machine Learning', 'Data Pipelines', 'IoT Analytics', 'SQL'],
  },
  {
    id: 'job-vinsmart-sa',
    type: 'Full-time',
    title: 'Solution Architect & Cloud Infrastructure',
    company: 'Công Ty Cổ Phần Nghiên Cứu & Sản Xuất VinSmart (VSF)',
    companySlug: 'vinsmart',
    logo: '/images/logo_vsf.png',
    featured: true,
    isHot: true,
    location: 'Hà Nội, Hồ Chí Minh',
    workPolicy: 'Hybrid',
    salary: 'Thương lượng',
    salaryPeriod: '',
    perkHighlight: '+ Thưởng dự án VinFast',
    posted: '5 ngày trước',
    shortDesc: 'Kiến trúc sư giải pháp đám mây cho hệ thống IoT Smart City, Smart Home và kết nối xe thông minh ô tô điện thế hệ mới.',
    fullDesc: 'VSF tuyển dụng Solution Architect dày dạn kinh nghiệm để định hình kiến trúc phần mềm phân tán, đảm bảo hệ thống chịu tải hàng triệu thiết bị IoT đồng thời với độ trễ thấp.',
    responsibilities: [
      'Thiết kế kiến trúc hệ thống backend microservices trên nền tảng AWS / GCP và Private Cloud.',
      'Tối ưu hóa giao thức kết nối MQTT, gRPC, WebSocket cho hàng triệu thiết bị biên.',
      'Định chuẩn an toàn bảo mật thông tin theo tiêu chuẩn ISO 27001 và GDPR.',
      'Cố vấn kỹ thuật và giải quyết các bài toán hóc búa về kiến trúc phân tán cho các team phát triển.',
    ],
    requirements: [
      '7+ năm kinh nghiệm phát triển phần mềm, trong đó ít nhất 3 năm làm Solution Architect.',
      'Thành thạo kiến trúc Microservices, Kubernetes, Kafka, Redis, PostgreSQL, NoSQL.',
      'Có chứng chỉ AWS Certified Solutions Architect Professional hoặc GCP Professional.',
      'Tư duy hệ thống sắc sảo, kỹ năng thuyết trình và đào tạo kỹ thuật tốt.',
    ],
    benefits: [
      'Gói đãi ngộ thuộc top cao nhất thị trường công nghệ Việt Nam',
      'Ưu đãi đặc biệt khi mua xe điện VinFast và thuê/mua nhà Vinhomes',
      'Gói chăm sóc y tế toàn diện Vinmec VIP',
      'Làm việc cùng đội ngũ chuyên gia hàng đầu từ Silicon Valley, Hàn Quốc, Nhật Bản',
    ],
    skills: ['Solution Architecture', 'Kubernetes', 'AWS', 'Microservices', 'Kafka'],
  },
  {
    id: 'job-seev-chips',
    type: 'Full-time',
    title: 'Kỹ Sư Thiết Kế & Giám Sát Linh Kiện Bán Dẫn',
    company: 'SEI Electronic Components (SEEV)',
    companySlug: 'seev',
    logo: '/images/logo_seev.png',
    featured: false,
    isHot: true,
    location: 'Hà Nội',
    workPolicy: 'On-site',
    salary: 'Thương lượng',
    salaryPeriod: '',
    perkHighlight: '+ Trợ cấp ngoại ngữ',
    posted: '5 ngày trước',
    shortDesc: 'Nghiên cứu công nghệ vật liệu mới, thiết kế khuôn mẫu và giám sát chất lượng linh kiện điện tử vi mạch chính xác cao.',
    fullDesc: 'Tham gia vào quy trình R&D sản phẩm bản mạch vi điện tử mới cho các tập đoàn viễn thông và ô tô toàn cầu, đảm bảo tiêu chuẩn chất lượng khắt khe Zero-Defect của Nhật Bản.',
    responsibilities: [
      'Thiết kế mạch in cao tầng và mô phỏng tín hiệu điện từ (Signal Integrity).',
      'Giám sát các chỉ số chất lượng trong công đoạn mạ vàng, dán linh kiện và đóng gói chip.',
      'Phân tích nguyên nhân gốc rễ (8D, 5-Why) của các lỗi kỹ thuật phát sinh và đề xuất biện pháp khắc phục.',
      'Làm việc trực tiếp với khách hàng quốc tế về các yêu cầu kỹ thuật đặc thù.',
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Điện tử viễn thông, Vật lý kỹ thuật, Khoa học vật liệu.',
      'Hiểu biết sâu sắc về cấu tạo mạch bán dẫn, công nghệ SMT và tiêu chuẩn IPC-A-610.',
      'Tiếng Anh hoặc tiếng Nhật giao tiếp kỹ thuật thành thạo.',
      'Cẩn thận, tỉ mỉ, có tư duy logic và giải quyết vấn đề xuất sắc.',
    ],
    benefits: [
      'Thu nhập thỏa thuận xứng đáng theo năng lực chuyên môn',
      'Phụ cấp ngoại ngữ tiếng Nhật hàng tháng từ 2 - 8 triệu đồng',
      'Thưởng hiệu quả công việc và sáng kiến cải tiến Kaizen hàng quý',
      'Đài thọ 100% chi phí đào tạo chứng chỉ quốc tế liên quan',
    ],
    skills: ['Semiconductor', 'Signal Integrity', 'IPC Standards', '8D Problem Solving', 'SMT'],
  },
];

// =========================================================================
// 2. GLOBAL & TECH OPPORTUNITIES (ServiceNow, Grab, Google, ByteDance, etc.)
// =========================================================================
export const globalTechJobs: JobListing[] = [
  {
    id: 'intern-metfone',
    type: 'Internship',
    title: 'Summer 2026 AI Research & Engineering Intern',
    company: 'Metfone',
    companySlug: 'metfone',
    logo: '/images/metfone_badge.svg',
    featured: true,
    isHot: true,
    location: 'Phnom Penh & Remote',
    workPolicy: 'Hybrid',
    salary: '$6,200',
    salaryPeriod: '/ month',
    perkHighlight: '+ Housing Allowance',
    posted: '6 hours ago',
    duration: '6 months',
    coverImage: '/images/metfone_cover.png',
    shortDesc: 'Join Metfone’s AI & Engineering team and help build innovative solutions for telecommunications telemetry and LLM customer agents.',
    fullDesc: 'Join Metfone’s AI & Engineering team and help build innovative solutions for a smarter, more connected network. As an AI Research & Engineering Intern, you will participate in real-world telecommunication AI deployments and automated telemetry optimization.',
    responsibilities: [
      'Conduct empirical research on streaming network telemetry and automated anomaly detection.',
      'Train, fine-tune, and benchmark machine learning models across high-concurrency telecom clusters.',
      'Build low-latency NLP and computer vision pipelines for enterprise customer service automation.',
      'Collaborate 1-on-1 with Staff Distributed Systems Engineers and research leads.',
    ],
    requirements: [
      'Currently pursuing a BS, MS, or PhD in Computer Science, Data Science, or related STEM field.',
      'Hands-on experience with Python, PyTorch, Go, TypeScript, or SQL.',
      'Familiarity with REST APIs, Git version control, and containerized architectures.',
      'Strong logical reasoning, curiosity, and proactive teamwork abilities.',
    ],
    benefits: [
      '$6,200 monthly competitive internship stipend',
      'Corporate housing allowance or housing stipend',
      'Comprehensive health coverage and daily meal stipend',
      '1-on-1 mentorship with Staff Systems Architects',
    ],
    skills: ['Python', 'PyTorch', 'Distributed Systems', 'Go', 'AI'],
  },
  {
    id: 'job-braze',
    type: 'Full-time',
    title: 'Frontend Platform & Web Performance Engineer',
    company: 'Braze',
    companySlug: 'braze',
    logo: '/images/braze_logo.svg',
    featured: false,
    isHot: false,
    location: 'Singapore & Remote',
    workPolicy: 'Remote',
    salary: '$2,400 - $3,800',
    salaryPeriod: '/ month',
    perkHighlight: '+ Flexible Hours',
    posted: '1 day ago',
    duration: 'Permanent',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Drive high-speed web rendering, core web vitals optimization, and scalable micro-frontend architectures across customer engagement platforms.',
    fullDesc: 'Braze is looking for a Frontend Platform Engineer to drive web performance, bundle size reductions, and component architecture for enterprise marketing workflows.',
    responsibilities: [
      'Architect robust, accessible web components and optimize Core Web Vitals across millions of dashboard pageviews.',
      'Implement real-time WebSocket communication pipelines and client-side caching strategies.',
      'Partner with design systems and UX research teams to build fluid, high-conversion interfaces.',
    ],
    requirements: [
      '3+ years professional frontend engineering experience with React, TypeScript, and modern build tooling.',
      'Deep understanding of browser rendering mechanics, DOM lifecycle, and performance profiling.',
      'Proven track record building maintainable design systems and component libraries.',
    ],
    benefits: [
      'Competitive monthly base salary with quarterly bonuses',
      'Fully flexible remote work environment',
      'Home office setup allowance and annual learning budget',
    ],
    skills: ['React', 'TypeScript', 'Web Performance', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'job-google',
    type: 'Full-time',
    title: 'Software Engineer, Google Cloud Infrastructure',
    company: 'Google',
    companySlug: 'google',
    logo: '/images/google_logo.svg',
    featured: true,
    isHot: true,
    location: 'Singapore & Remote',
    workPolicy: 'Hybrid',
    salary: '$4,500 - $6,500',
    salaryPeriod: '/ month',
    perkHighlight: '+ GSUs Equity',
    posted: '2 days ago',
    duration: 'Permanent',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Build resilient distributed backends, developer tools, and regional cloud gateways connecting emerging enterprise markets.',
    fullDesc: 'Join Google’s global cloud infrastructure group working on high-availability platforms, developer tooling, and localized network performance enhancements.',
    responsibilities: [
      'Write scalable, secure backend services in Go, C++, or Java for mission-critical Google Cloud services.',
      'Design fault-tolerant APIs and data synchronization pipelines across multi-region datacenters.',
      'Participate in code reviews, design docs creation, and system scalability reviews.',
    ],
    requirements: [
      'BS or MS degree in Computer Science or equivalent practical experience.',
      'Strong knowledge of algorithms, data structures, and concurrent system design.',
      'Proficiency in Go, Java, C++, or Python.',
    ],
    benefits: [
      'Industry-leading salary and Google equity grant (GSUs)',
      'World-class comprehensive healthcare and wellness allowance',
      'Continuous education reimbursement and international mobility',
    ],
    skills: ['Go', 'Cloud Architecture', 'Distributed Systems', 'Kubernetes', 'gRPC'],
  },
  {
    id: 'intern-datadog',
    type: 'Internship',
    title: 'Distributed Systems & Observability Intern',
    company: 'Datadog',
    companySlug: 'datadog',
    logo: '/images/datadog_logo.png',
    featured: true,
    isHot: true,
    location: 'New York, NY & Remote',
    workPolicy: 'Hybrid',
    salary: '$6,500',
    salaryPeriod: '/ month',
    perkHighlight: '+ Housing Allowance',
    posted: '3 days ago',
    duration: '12-16 weeks',
    coverImage: '/images/clean_datadog_building.jpg',
    shortDesc: 'Formulate streaming telemetry compression and automated anomaly detection algorithms handling petabyte-scale infrastructure logs.',
    fullDesc: 'As a Distributed Systems & Observability Intern at Datadog, you will formulate empirical algorithms to analyze multi-petabyte telemetry streams in real-time.',
    responsibilities: [
      'Design and benchmark low-latency inference pipelines handling over 100M metric samples per second.',
      'Collaborate with staff researchers on self-supervised anomaly detection across Kubernetes clusters.',
      'Implement reproducible evaluation frameworks to test telemetry agents.',
    ],
    requirements: [
      'Enrolled in BS/MS/PhD in Computer Science, Applied Mathematics, or related field graduating in 2026/2027.',
      'Proficiency in Python, Go, or Rust with practical knowledge of distributed consensus.',
    ],
    benefits: [
      '$6,500 monthly internship compensation',
      'Dedicated corporate housing or housing stipend',
      '1-on-1 mentorship with Staff Systems Architects',
    ],
    skills: ['Rust', 'Go', 'Distributed Systems', 'Observability', 'Linux'],
  },
  {
    id: 'intern-bytedance',
    type: 'Internship',
    title: 'Frontend Platform & Web Performance Intern',
    company: 'ByteDance',
    companySlug: 'bytedance',
    logo: '/images/bytedance_logo.png',
    featured: false,
    isHot: false,
    location: 'Singapore',
    workPolicy: 'Hybrid',
    salary: '$2,800',
    salaryPeriod: '/ month',
    perkHighlight: '+ Catered Meals',
    posted: '4 days ago',
    duration: '6 months',
    coverImage: '/images/clean_bytedance_building.jpg',
    shortDesc: 'Optimize web video playback pipelines, Core Web Vitals, and component rendering architectures for global consumer apps.',
    fullDesc: 'Join ByteDance Singapore engineering team working on global web performance, interactive video rendering, and state-of-the-art WebAssembly toolchains.',
    responsibilities: [
      'Optimize bundle size and initial page load rendering speed across APAC mobile web traffic.',
      'Implement WebAssembly video decoding components for ultra-smooth timeline scrubbing.',
      'Collaborate with UI/UX designers to craft fluid micro-interactions.',
    ],
    requirements: [
      'Undergraduate or Master student in Computer Science or Software Engineering.',
      'Strong proficiency in JavaScript, TypeScript, React, and browser profiling tools.',
    ],
    benefits: [
      '$2,800 monthly stipend + lunch & dinner catered on-site',
      'Fast-track interview conversion to full-time graduate offers',
    ],
    skills: ['TypeScript', 'React', 'WebAssembly', 'Performance', 'CSS3'],
  },
  {
    id: 'job-vinfast',
    type: 'Full-time',
    title: 'Senior Embedded Firmware & Battery Systems',
    company: 'VinFast Global',
    companySlug: 'vinfast',
    logo: '/images/vinfast.svg',
    featured: true,
    isHot: true,
    location: 'Hai Phong & Singapore',
    workPolicy: 'Hybrid',
    salary: '$4,500 - $5,500',
    salaryPeriod: '/ month',
    perkHighlight: '+ Relocation Package',
    posted: '5 days ago',
    duration: 'Permanent',
    coverImage: 'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Architect real-time embedded firmware and CAN bus communications for next-generation electric vehicle powertrains.',
    fullDesc: 'VinFast Global R&D is hiring Senior Embedded Firmware Engineers to design safety-critical automotive control systems, BMS telemetry, and high-frequency power electronics.',
    responsibilities: [
      'Develop real-time embedded C/C++ firmware conforming to ISO 26262 ASIL-D functional safety standards.',
      'Integrate BMS telemetry sensors and vehicle CAN-FD communication protocols.',
      'Conduct hardware-in-the-loop (HIL) automated test benches.',
    ],
    requirements: [
      '5+ years embedded software development experience with ARM Cortex-M or automotive MCUs.',
      'Mastery of MISRA C/C++, RTOS (FreeRTOS or AUTOSAR), and bus analyzers.',
    ],
    benefits: [
      'Competitive monthly base + performance incentives',
      'Full expat relocation allowance and housing subsidy',
      'Company vehicle lease discount and family medical care',
    ],
    skills: ['Embedded C', 'AUTOSAR', 'CAN-FD', 'ISO 26262', 'RTOS'],
  },
  {
    id: 'job-stripe',
    type: 'Full-time',
    title: 'Infrastructure & Payment Rails Engineer',
    company: 'Stripe',
    companySlug: 'stripe',
    logo: 'https://static.builtin.com/dist/images/home/topCompanies/stripe.svg',
    featured: false,
    isHot: false,
    location: 'San Francisco & Remote',
    workPolicy: 'Remote',
    salary: '$5,800 - $7,200',
    salaryPeriod: '/ month',
    perkHighlight: '+ Equity Package',
    posted: '1 week ago',
    duration: 'Permanent',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Build 99.999% uptime payment rails, idempotency infrastructure, and distributed financial ledgers.',
    fullDesc: 'At Stripe, you will engineer infrastructure that moves hundreds of billions of dollars annually with zero-downtime ledger consistency.',
    responsibilities: [
      'Design idempotent transactional gateways handling peak Black Friday transaction volumes.',
      'Eliminate tail latencies across global distributed database clusters (Spanner / CockroachDB).',
    ],
    requirements: [
      '4+ years backend systems experience in Ruby, Go, Java, or Rust.',
      'Deep understanding of distributed consensus, ACID guarantees, and fault-tolerant computing.',
    ],
    benefits: [
      'Generous base salary + competitive Stripe equity options',
      'Flexible global remote work policy',
      'Generous parental leave and comprehensive insurance',
    ],
    skills: ['Go', 'Distributed Databases', 'Idempotency', 'Cloud Infrastructure'],
  },
  {
    id: 'job-now-1',
    type: 'Full-time',
    title: 'Staff Enterprise Cloud & Workflow Architect',
    company: 'ServiceNow',
    companySlug: 'servicenow',
    logo: '/images/logo_now_clean.png',
    featured: true,
    isHot: true,
    location: 'Santa Clara, CA & Singapore',
    workPolicy: 'Hybrid',
    salary: '$6,800 - $8,200',
    salaryPeriod: '/ month',
    perkHighlight: '+ Annual Bonus',
    posted: '3 days ago',
    shortDesc: 'Lead the architectural transformation of ServiceNow digital workflow engines for Fortune 500 enterprises.',
    fullDesc: 'Architect next-generation cloud workflow automation, enterprise agentic execution planes, and global multitenant data stores.',
    responsibilities: [
      'Design resilient, highly scalable cloud architectures handling over 2 billion daily transactions.',
      'Lead cross-organizational technical initiatives for zero-downtime database upgrades.',
    ],
    requirements: [
      '8+ years in enterprise cloud systems design and high-concurrency microservices.',
      'Deep mastery of distributed messaging, caching, and multi-region failover.',
    ],
    benefits: [
      'Top-tier compensation package with comprehensive equity grants',
      'Generous 401(k) / provident fund matching',
    ],
    skills: ['Java', 'Microservices', 'Distributed Systems', 'Kafka', 'Cloud Architecture'],
  },
  {
    id: 'job-grab-1',
    type: 'Full-time',
    title: 'Lead Backend Systems Engineer - Superapp Dispatch',
    company: 'Grab',
    companySlug: 'grab',
    logo: '/images/logo_grab_clean.png',
    featured: false,
    isHot: false,
    location: 'Singapore & Remote',
    workPolicy: 'Hybrid',
    salary: '$4,200 - $5,800',
    salaryPeriod: '/ month',
    perkHighlight: '+ GrabCar Credits',
    posted: '4 days ago',
    shortDesc: 'Engineer real-time matching, dynamic surge pricing algorithms, and high-frequency dispatch microservices.',
    fullDesc: 'Join Grab Southeast Asia’s core mobility platform team to optimize matching throughput, GPS telemetry, and driver dispatch across 8 countries.',
    responsibilities: [
      'Build sub-10ms dispatching engines in Go processing 500k ride queries per minute.',
      'Scale geo-distributed Kafka pipelines and distributed Redis clusters.',
    ],
    requirements: [
      '5+ years building backend systems in Go, Java, or C++ with high concurrency.',
      'Strong background in geospatial indexing and distributed transactions.',
    ],
    benefits: [
      'Competitive salary + annual performance bonuses',
      'Grab transport & food monthly allowance',
    ],
    skills: ['Go', 'Kafka', 'Redis', 'Geospatial', 'High Concurrency'],
  },
];

// Unified complete list for search & filters
export const enhancedJobsData: JobListing[] = [...topBestJobs, ...globalTechJobs];

export const opportunitiesData = enhancedJobsData.map((j) => ({
  ...j,
  typeLabel: j.type,
  compensation: `${j.salary} ${j.salaryPeriod || ''} ${j.perkHighlight || ''}`.trim(),
  salaryAmount: j.salary,
  companyLogo: j.logo,
  industry: j.company.includes('Metfone')
    ? 'Telecommunications & AI Systems'
    : j.company.includes('Datadog')
    ? 'Cloud Infrastructure & Observability'
    : j.company.includes('ByteDance')
    ? 'Consumer Internet & AI Research'
    : j.company.includes('Vinmec')
    ? 'Digital Healthcare & JCI Hospital'
    : j.company.includes('Việt Nhật') || j.company.includes('SEEV')
    ? 'Electronics & Industrial Automation'
    : 'Software Engineering & Cloud',
  remote: j.workPolicy === 'Remote',
}));

export function Jobs() {
  const searchString = useSearch();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [workPolicyFilter, setWorkPolicyFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'salary' | 'popular'>('recent');
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination for the Top "Việc Làm Tốt Nhất" section (3x3 grid)
  const [bestJobsPage, setBestJobsPage] = useState(0);
  const bestJobsPerPage = 9;

  // Pagination for the Main Job Directory
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  // Parse URL search params
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const searchParam = params.get('search');
    const typeParam = params.get('type');
    const locParam = params.get('location');

    if (searchParam) setQuery(searchParam);
    if (typeParam) setSelectedType(typeParam);
    if (locParam) setLocationFilter(locParam);
  }, [searchString]);

  // Load saved jobs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sandbox_saved_jobs');
      if (saved) setSavedJobs(JSON.parse(saved));
    } catch {
      // fallback
    }
  }, []);

  const toggleSave = (jobId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isNowSaved = !savedJobs[jobId];
    const updated = { ...savedJobs, [jobId]: isNowSaved };
    setSavedJobs(updated);
    try {
      localStorage.setItem('sandbox_saved_jobs', JSON.stringify(updated));
    } catch {
      // fallback
    }
    showToast(isNowSaved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered jobs calculation for the main directory
  const filteredJobs = useMemo(() => {
    return enhancedJobsData.filter((job) => {
      // Filter by type
      if (selectedType === 'Full-time' && job.type !== 'Full-time') return false;
      if (selectedType === 'Internship' && job.type !== 'Internship') return false;
      if (selectedType === 'Remote' && job.workPolicy !== 'Remote' && !job.remote) return false;
      if (selectedType === 'Part-time' && job.type !== 'Part-time') return false;
      if (selectedType === 'Hot' && !job.isHot) return false;
      if (selectedType === 'HighSalary' && !job.salary.includes('tr') && !job.salary.includes('$6') && !job.salary.includes('$5') && !job.salary.includes('$4')) return false;

      // Filter by location
      if (locationFilter !== 'All') {
        const qLoc = locationFilter.toLowerCase();
        const jLoc = job.location.toLowerCase();
        if (!jLoc.includes(qLoc) && !(locationFilter === 'Remote' && job.workPolicy === 'Remote')) {
          return false;
        }
      }

      // Filter by work policy
      if (workPolicyFilter !== 'All') {
        if (job.workPolicy !== workPolicyFilter) return false;
      }

      // Filter by query
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = job.company.toLowerCase().includes(q);
        const matchLocation = job.location.toLowerCase().includes(q);
        const matchSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchCompany && !matchLocation && !matchSkills) return false;
      }

      return true;
    });
  }, [selectedType, locationFilter, workPolicyFilter, query]);

  // Sorted jobs
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortBy === 'salary') {
      return list.sort((a, b) => (b.salary.includes('200tr') || b.salary.includes('$6') ? 1 : -1));
    }
    if (sortBy === 'popular') {
      return list.sort((a, b) => (b.isHot ? 1 : -1));
    }
    return list;
  }, [filteredJobs, sortBy]);

  // Paginated directory jobs
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;
    return sortedJobs.slice(start, start + jobsPerPage);
  }, [sortedJobs, currentPage, jobsPerPage]);

  // Top "Việc Làm Tốt Nhất" paginated items
  const totalBestPages = Math.ceil(topBestJobs.length / bestJobsPerPage) || 1;
  const currentBestJobs = useMemo(() => {
    const start = bestJobsPage * bestJobsPerPage;
    return topBestJobs.slice(start, start + bestJobsPerPage);
  }, [bestJobsPage]);

  return (
    <div className="enhanced-jobs-page">
      {/* SEO Meta Tags */}
      <SEO
        title="Explore Tech Jobs & Opportunities | SandBox"
        description="Discover thousands of verified tech jobs, engineering internships, and high-paying remote roles from leading companies. Search with transparent salary ranges."
        canonical={`${typeof window !== 'undefined' ? window.location.origin : ''}/jobs`}
        ogImage="/images/og-jobs.png"
        keywords={['tech jobs', 'software engineering jobs', 'vietnam jobs', 'remote tech jobs', 'it recruitment']}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          1. HERO SECTION: Clean SandBox Style (Matches Companies.tsx seamlessly)
         ========================================================================= */}
      <section className="sample-companies-hero">
        <div className="container sample-hero-container">
          {/* Left Hero Area */}
          <div className="sample-hero-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>VERIFIED OPPORTUNITIES · 2026 BENCHMARKS</span>
            </div>

            <h1 className="sample-hero-title">
              Find Your Next<br />
              <span className="sample-title-blue">Tech Career Move</span>
            </h1>

            <p className="sample-hero-desc">
              Explore verified tech jobs, engineering internships, and remote roles from industry leaders with transparent salary benchmarks.
            </p>

            {/* Clean Single Row Search & Filter Bar */}
            <div className="sample-search-single-row">
              {/* Search Input Pill */}
              <div className="sample-search-pill">
                <Search size={16} className="sample-search-icon" />
                <input
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="sample-search-input"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs text-slate-400 hover:text-slate-600 px-1"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  className="sample-search-btn"
                  onClick={() => {
                    const el = document.getElementById('jobs-directory-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Search
                </button>
              </div>

              {/* Location Select Pill */}
              <div className="sample-filter-pill">
                <MapPin size={14} className="sample-pill-icon" />
                <select
                  value={locationFilter}
                  onChange={(e) => {
                    setLocationFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="sample-pill-select"
                >
                  <option value="All">All Locations</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Phnom Penh">Phnom Penh</option>
                  <option value="Remote">Remote</option>
                  <option value="US">United States</option>
                </select>
                <ChevronDown size={12} className="sample-pill-chevron" />
              </div>

              {/* Work Policy Select Pill */}
              <div className="sample-filter-pill">
                <Briefcase size={14} className="sample-pill-icon" />
                <select
                  value={workPolicyFilter}
                  onChange={(e) => {
                    setWorkPolicyFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="sample-pill-select"
                >
                  <option value="All">All Work Modes</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
                <ChevronDown size={12} className="sample-pill-chevron" />
              </div>
            </div>
          </div>

          {/* Right Hero Area: Skyline with "Grow Your Career with SandBox" (Matches Companies.tsx) */}
          <div className="sample-hero-right">
            <div className="sample-hero-card-banner">
              <div className="sample-callout-text">
                <span className="sample-callout-script">Grow Your Career</span>
                <span className="sample-callout-sub">with SandBox</span>
              </div>
              <img
                src="/images/company_hero_skyscraper.png"
                alt="Grow Your Career with SandBox"
                className="sample-skyline-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. VIỆC LÀM TỐT NHẤT / TOP FEATURED JOBS (Directly from user's screenshot)
         ========================================================================= */}
      <BestJobsSection />

      {/* =========================================================================
          3. MAIN DIRECTORY: Filter Pills & Full Responsive Listings
         ========================================================================= */}
      <section className="container py-8" id="jobs-directory-anchor">
        {/* Pills Filter Toolbar: All Jobs | Full-time | Internship | Remote | Hot */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                selectedType === 'All'
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => {
                setSelectedType('All');
                setCurrentPage(1);
              }}
            >
              All Jobs ({enhancedJobsData.length})
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedType === 'Full-time'
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => {
                setSelectedType('Full-time');
                setCurrentPage(1);
              }}
            >
              Full-time (92)
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedType === 'Internship'
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => {
                setSelectedType('Internship');
                setCurrentPage(1);
              }}
            >
              Internships (24)
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedType === 'Remote'
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => {
                setSelectedType('Remote');
                setCurrentPage(1);
              }}
            >
              <Wifi size={12} className="inline mr-1 text-blue-500" />
              Remote (32)
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedType === 'Hot'
                  ? 'bg-red-600 text-white shadow-red-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => {
                setSelectedType('Hot');
                setCurrentPage(1);
              }}
            >
              <Flame size={12} className="inline mr-1 text-red-500" />
              Hot Jobs
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedType === 'HighSalary'
                  ? 'bg-amber-600 text-white shadow-amber-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => {
                setSelectedType('HighSalary');
                setCurrentPage(1);
              }}
            >
              <Star size={12} className="inline mr-1 text-amber-500" />
              High Compensation
            </button>
          </div>

          {/* Right Controls: Count, View Mode & Sort */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{sortedJobs.length}</strong> positions
            </span>

            {/* Grid / List Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-slate-200 text-xs font-semibold text-slate-700 py-1.5 pl-3 pr-7 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Most Recent</option>
                <option value="salary">Highest Salary</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {sortedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8 my-6">
            <Building2 size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No matching positions found</h3>
            <p className="text-sm text-slate-500 mb-4">Try clearing your filters or using different search keywords.</p>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                setQuery('');
                setSelectedType('All');
                setLocationFilter('All');
                setWorkPolicyFilter('All');
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ==========================================
             GRID VIEW: Clean, modern, highly readable cards
             ========================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedJobs.map((job) => {
              const isSaved = !!savedJobs[job.id];
              return (
                <div
                  key={job.id}
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-5 relative overflow-hidden"
                >
                  {/* Top Bar: Company info & Bookmark */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 p-2 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                            <span>{job.company}</span>
                            {job.featured && <ShieldCheck size={13} className="text-blue-500" />}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin size={11} />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleSave(job.id, e)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isSaved
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                        title={isSaved ? 'Saved' : 'Save Job'}
                      >
                        <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Job Title */}
                    <Link
                      href={`/jobs/${job.id}`}
                      className="block text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2 leading-snug"
                    >
                      {job.title}
                    </Link>

                    {/* Policy & Type Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {job.type}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          job.workPolicy === 'Remote'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : job.workPolicy === 'Hybrid'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                            : 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        {job.workPolicy}
                      </span>
                      {job.isHot && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 inline-flex items-center gap-1">
                          <Flame size={11} className="fill-red-500" />
                          Hot
                        </span>
                      )}
                    </div>

                    {/* Compensation & Perk */}
                    <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-2.5 mb-3">
                      <div className="text-sm font-bold text-orange-600 flex items-center gap-1">
                        <span>{job.salary}</span>
                        {job.salaryPeriod && <span className="text-xs font-normal text-slate-500">{job.salaryPeriod}</span>}
                      </div>
                      {job.perkHighlight && (
                        <div className="text-[11.5px] text-slate-500 mt-0.5 font-medium">{job.perkHighlight}</div>
                      )}
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 text-xs font-medium text-slate-600">
                      {job.skills.slice(0, 4).map((s, idx, arr) => (
                        <span key={s} className="inline-flex items-center gap-2">
                          <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">
                            {s}
                          </span>
                          {idx < arr.length - 1 && (
                            <span className="text-slate-300 font-normal select-none">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Posted date & Apply Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      {job.posted}
                    </span>

                    <Link
                      href={`/jobs/${job.id}`}
                      className="opp-apply-btn !py-2 !px-4 !text-xs"
                    >
                      <span>View Details & Apply →</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ==========================================
             LIST VIEW: High-density, professional row layout
             ========================================== */
          <div className="flex flex-col gap-3">
            {paginatedJobs.map((job) => {
              const isSaved = !!savedJobs[job.id];
              return (
                <div
                  key={job.id}
                  className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => {
                    window.location.href = `/jobs/${job.id}`;
                  }}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 p-2 flex items-center justify-center shrink-0 shadow-sm">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {job.title}
                        </h3>
                        {job.isHot && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 inline-flex items-center gap-0.5">
                            <Flame size={10} className="fill-red-500" /> Hot
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <span className="font-semibold text-slate-700">{job.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">{job.type}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">{job.workPolicy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="text-right">
                      <div className="text-sm font-bold text-orange-600">
                        {job.salary} {job.salaryPeriod}
                      </div>
                      <div className="text-xs text-slate-400">{job.posted}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => toggleSave(job.id, e)}
                        className={`p-2 rounded-lg border transition ${
                          isSaved ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                        title="Save Job"
                      >
                        <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      <Link
                        href={`/jobs/${job.id}`}
                        className="opp-apply-btn !py-2 !px-4 !text-xs whitespace-nowrap"
                      >
                        View Details & Apply →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Directory Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                const el = document.getElementById('jobs-directory-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  type="button"
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    currentPage === p
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    setCurrentPage(p);
                    const el = document.getElementById('jobs-directory-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {p}
                </button>
              );
            })}

            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                const el = document.getElementById('jobs-directory-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Jobs;
