export const projects = [
  {
    slug: 'sentinelx',
    name: 'SentinelX',
    tagline: 'Cybersecurity vulnerability assessment and security reporting platform',

    overview:
      'SentinelX is an actively developing cybersecurity platform focused on reconnaissance, vulnerability assessment, security findings, and structured security reporting. The project is being developed as both a practical security tool and a research-oriented cybersecurity project.',

    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Nmap',
      'React',
      'Git',
      'GitHub',
    ],

    features: [
      'Network reconnaissance and security scanning',
      'Structured vulnerability assessment workflow',
      'Security findings and severity tracking',
      'Database-backed scan and assessment data',
      'Authentication and authorization',
      'Modular backend architecture',
      'Security-focused reporting and documentation',
    ],

    architecture:
      'Modular cybersecurity platform built with Python and FastAPI, using PostgreSQL with SQLAlchemy for persistent security assessment data. The system is organized into authentication, scanning, vulnerability assessment, data management, and reporting components.',

    github:
      'https://github.com/Yashwanth01-cyber/SentinelX',

    liveDemo: '#',

    status: 'Active Development',

    screenshots: [],
  },

  {
    slug: 'manufacturing-erp-management-system',
    name: 'Manufacturing ERP Management System',
    tagline: 'Integrated ERP platform for manufacturing operations and business workflow management',

    overview:
      'Manufacturing ERP Management System is a full-stack enterprise resource planning platform developed to centralize manufacturing operations including products, raw materials, suppliers, customers, purchasing, inventory, production, sales, employees, and management reporting. The system connects these modules through real business workflows instead of treating them as independent CRUD operations.',

    technologies: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Axios',
      'FastAPI',
      'Python',
      'SQLAlchemy',
      'PostgreSQL',
      'JWT',
      'Alembic',
      'Pytest',
      'ReportLab',
      'OpenPyXL',
      'Git',
      'GitHub',
    ],

    features: [
      'Role-based authentication and authorization',
      'Product and material management',
      'Supplier and customer management',
      'Purchase order and receiving workflow',
      'Inventory tracking with low-stock alerts',
      'Bill of Materials (BOM) management',
      'Production workflow with automatic material deduction',
      'Finished-product inventory management',
      'Sales workflow with stock verification and deduction',
      'Dashboard KPIs and operational charts',
      'PDF invoice generation',
      'Excel report exports',
      'QR code and barcode generation',
      'Printable product labels',
      'Audit logging and validation',
      'Duplicate transaction prevention',
    ],

    architecture:
      'Full-stack ERP architecture using React and Vite for the frontend, FastAPI with SQLAlchemy for backend services, and PostgreSQL for persistent business data. The system connects purchasing, inventory, BOM, production, sales, authentication, reporting, and audit functionality through centralized business logic and REST APIs.',

    github:
      'https://github.com/Yashwanth01-cyber/ERP-Management-System-',

    liveDemo: '#',

    status: 'Completed',

    screenshots: [],
  },

  {
    slug: 'talkshield',
    name: 'TalkShield',
    tagline: 'Security-focused spam call analysis application',

    overview:
      'TalkShield is a cybersecurity-focused project exploring suspicious communication and spam call analysis. The project combines application development with security concepts to investigate potentially malicious or unwanted communication patterns.',

    technologies: [
      'Python',
      'Flask',
      'React',
      'JavaScript',
      'Git',
      'GitHub',
    ],

    features: [
      'Spam call analysis',
      'Suspicious communication analysis',
      'Security-focused application design',
      'Backend API integration',
      'User-oriented security insights',
    ],

    architecture:
      'Client-server application architecture using React for the frontend and Flask for backend services. The application is organized around modular security-analysis functionality and API-based communication between frontend and backend components.',

    github:
      'https://github.com/Yashwanth01-cyber/TalkShield',

    liveDemo: '#',

    status: 'Active Development',

    screenshots: [],
  },
];
