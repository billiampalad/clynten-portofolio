/**
 * Projects Content & Architectural Case Studies
 * Aligned with Clynten's engineered systems & Meer Mohsin brutalist-luxury reference
 */

export const PROJECTS_DATA = [
  {
    id: 'sim-kerjasama',
    step: '01',
    code: 'SYS // PRJ-01',
    shortTitle: 'SIM POLIMDO',
    title: 'SIM Kerjasama Mitra Industri',
    subtitle: 'Institutional Partnership & Industrial Management System',
    category: 'Full Stack & Enterprise System',
    period: '2024 — PRESENT',
    client: 'Politeknik Negeri Manado (DUDI)',
    status: 'DEPLOYED // ACTIVE',
    summary:
      'A robust enterprise web platform transforming institutional partnership tracking between vocational polytechnic and hundreds of industrial enterprise partners.',
    fullSummary:
      'Sistem informasi berbasis web enterprise untuk mendigitalisasi, memonitor, dan mengelola kemitraan institusional antara perguruan tinggi vokasi dengan sektor dunia usaha dan dunia industri (DUDI).',
    tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'REST API', 'Alpine.js', 'Vite'],
    metrics: [
      { label: 'EFFICIENCY GAIN', val: '+78%' },
      { label: 'DATA INTEGRITY', val: '100% ACID' },
      { label: 'AVG LATENCY', val: '< 65ms' },
    ],
    accentColor: '#d60407',
    ambientGlow: 'from-amber-600/20 via-red-950/40 to-transparent',
    themeColor: 'rgba(214, 4, 7, 0.4)',
    image: '/assets/projects/gambar 1/1.webp',
    screenMockup: {
      headline: 'PARTNERSHIP INTELLIGENCE // DUDI',
      subline: 'Real-time agreement lifecycle & compliance monitoring engine',
      statLabel: 'ACTIVE MOUs',
      statVal: '142 PARTNERS',
      statusText: 'SECURE SSL // RBAC ENFORCED',
    },
    wireframe: {
      tag: 'ARCHITECTURE_TOPOLOGY',
      badge: 'RBAC_SECURITY_LAYER',
      spec: 'MULTI_ROLE_AUTH // DOCUMENT_LIFECYCLE // AUDIT_TRAIL',
    },
    caseStudy: {
      overview:
        'Sistem ini dirancang untuk mengatasi inefisiensi pengarsipan manual dan pelacakan status MoU/MoA kemitraan kampus dengan ratusan mitra industri di seluruh Indonesia.',
      challenges: [
        'Fragmentasi data kemitraan fisik yang memperlambat pelaporan akreditasi dan verifikasi legalitas.',
        'Kebutuhan kontrol hak akses bertingkat (Admin, Jurusan, Mitra Industri, Pimpinan).',
        'Validasi dokumen digital dan sistem notifikasi kedaluwarsa masa berlaku perjanjian kerjasama.',
      ],
      solutions: [
        'Arsitektur MVC termodularisasi menggunakan Laravel dengan Service Repository pattern.',
        'Implementasi skema database relasional ternormalisasi (MySQL) dengan indexing teroptimasi.',
        'Sistem autentikasi aman dengan granular Role-Based Access Control (RBAC) dan audit logging aktivitas.',
        'Dashboard metrik interaktif untuk memonitor distribusi sektor mitra, dokumen aktif, dan timeline evaluasi.',
      ],
      deliverables: [
        'Portal Manajemen MoU/MoA Kemitraan Kampus',
        'Sistem Verifikasi Dokumen & Masa Berlaku Otomatis',
        'RESTful API Endpoint untuk Integrasi Pangkalan Data',
        'Executive Analytics Dashboard & Export Rekap',
      ],
      links: {
        demo: '#',
        repo: '#',
      },
    },
  },
  {
    id: 'ai-cctv',
    step: '02',
    code: 'SYS // PRJ-02',
    shortTitle: 'AI CCTV EDGE',
    title: 'AI Edge CCTV & Spatial Pipeline',
    subtitle: 'Real-time Computer Vision Surveillance & Telemetry Inference',
    category: 'AI & Edge Computing',
    period: '2023 — 2024',
    client: 'Applied Research & Prototyping',
    status: 'OPTIMIZED // PRODUCTION',
    summary:
      'High-throughput computer vision edge pipeline performing real-time video stream telemetry, anomaly detection, and sub-30ms inference processing.',
    fullSummary:
      'Pipeline pemrosesan video cerdas berbasis edge computing untuk deteksi objek dinamis, analisis pergerakan anomali, dan streaming telemetri pengawasan secara real-time.',
    tech: ['Python', 'OpenCV', 'YOLOv8', 'RTSP Streams', 'FastAPI', 'Ubuntu Linux'],
    metrics: [
      { label: 'INFERENCE SPEED', val: '38 FPS' },
      { label: 'DETECTION ACCURACY', val: '94.6%' },
      { label: 'PIPELINE LATENCY', val: '24ms' },
    ],
    accentColor: '#8b5cf6',
    ambientGlow: 'from-purple-600/20 via-indigo-950/40 to-transparent',
    themeColor: 'rgba(139, 92, 246, 0.4)',
    image: '/assets/projects/ai-cctv.jpg',
    screenMockup: {
      headline: 'NEURAL SURVEILLANCE MATRIX',
      subline: 'Multi-stream RTSP tensor inference & intrusion detection',
      statLabel: 'FRAME THROUGHPUT',
      statVal: '38.4 FPS EDGE',
      statusText: 'ZERO-COPY BUFFER // TENSORRT FP16',
    },
    wireframe: {
      tag: 'EDGE_INFERENCE_ENGINE',
      badge: 'YOLO_TENSOR_PIPELINE',
      spec: 'RTSP_INGEST // ZERO_COPY_BUFFER // EVENT_DISPATCH',
    },
    caseStudy: {
      overview:
        'Mengembangkan sistem pengawasan berbasis visi komputer di perangkat edge yang mampu menganalisis aliran RTSP kamera CCTV secara simultan tanpa membebani bandwidth jaringan cloud.',
      challenges: [
        'Keterbatasan daya komputasi perangkat edge saat memproses multiple video stream resolusi 1080p.',
        'Penurunan akurasi deteksi pada kondisi pencahayaan malam atau sudut kamera ekstrem.',
        'Kebutuhan waktu respons milidetik saat mendeteksi anomali objek terlarang.',
      ],
      solutions: [
        'Kuantisasi model YOLOv8 (TensorRT / FP16) untuk memaksimalkan throughput akselerasi GPU lokal.',
        'Algoritma frame skipping adaptif dan tracking centroid untuk menghemat beban CPU hingga 40%.',
        'Penyusunan arsitektur event-driven dengan FastAPI WebSocket untuk broadcast peringatan seketika.',
      ],
      deliverables: [
        'Edge Video Inference Service Daemon',
        'Real-time Anomaly Detection Engine',
        'WebSocket Streaming Telemetry Client',
        'Automated Incident Clip Recording Storage',
      ],
      links: {
        demo: '#',
        repo: '#',
      },
    },
  },
  {
    id: 'network-infra',
    step: '03',
    code: 'SYS // PRJ-03',
    shortTitle: 'CAMPUS VLAN',
    title: 'Enterprise Campus VLAN & Routing',
    subtitle: 'Multi-tier Segmented High-Availability Network Infrastructure',
    category: 'Network Engineering & Infrastructure',
    period: '2023 — 2024',
    client: 'Laboratory & Campus Enterprise Topology',
    status: 'VERIFIED // STABLE',
    summary:
      'Segmented high-availability campus network topology with robust inter-VLAN routing, dynamic OSPF failover, and hardware-accelerated traffic filtering.',
    fullSummary:
      'Perancangan dan implementasi topologi jaringan kampus terdistribusi dengan segmentasi VLAN multi-tier, routing inter-VLAN berkecepatan tinggi, serta manajemen bandwidth cerdas.',
    tech: ['MikroTik RouterOS', 'Cisco IOS', 'VLAN 802.1Q', 'OSPF', 'Wireshark', 'Subnetting'],
    metrics: [
      { label: 'NETWORK UPTIME', val: '99.9%' },
      { label: 'PACKET LOSS', val: '< 0.02%' },
      { label: 'ISOLATED VLANS', val: '12 SEGMENTS' },
    ],
    accentColor: '#06b6d4',
    ambientGlow: 'from-cyan-600/20 via-blue-950/40 to-transparent',
    themeColor: 'rgba(6, 182, 212, 0.4)',
    image: '/assets/projects/campus-vlan.jpg',
    screenMockup: {
      headline: 'ENTERPRISE ROUTING TOPOLOGY',
      subline: 'Multi-tier 802.1Q VLAN trunking & bandwidth management',
      statLabel: 'ISOLATED SUBNETS',
      statVal: '12 SEGMENTS',
      statusText: 'OSPF PEERING // FIREWALL STATEFUL',
    },
    wireframe: {
      tag: 'CORE_ROUTER_TOPOLOGY',
      badge: 'VLAN_TRUNKING_802.1Q',
      spec: 'INTER_VLAN_ROUTING // FIREWALL_FILTER // QUEUE_TREE',
    },
    caseStudy: {
      overview:
        'Penyusunan blueprint arsitektur jaringan skala kampus untuk memisahkan domain siaran (broadcast domain) antara ruang server, laboratorium komputasi, administrasi, dan akses publik.',
      challenges: [
        'Tingginya broadcast storm dan risiko keamanan lateral akibat topologi jaringan flat (tanpa segmentasi).',
        'Monopoli bandwidth oleh lalu lintas non-prioritas yang mengganggu layanan server internal.',
        'Kebutuhan failover routing otomatis antara dua link ISP berbeda.',
      ],
      solutions: [
        'Pemisahan 12 subnet VLAN dengan trunking standar IEEE 802.1Q pada switch managed Cisco.',
        'Konfigurasi routing dinamis OSPF dan Static Policy-Based Routing (PBR) pada MikroTik Core Router.',
        'Penerapan firewall filter stateful dan Queue Tree PCQ (Per Connection Queue) untuk keadilan bandwidth.',
      ],
      deliverables: [
        'Topologi Jaringan Enterprise Terstandarisasi',
        'Skema Segmentasi VLAN & Alokasi VLSM Subnetting',
        'Aturan Firewall Hardening & Port Security',
        'Dokumentasi Audit Analisis Paket Wireshark',
      ],
      links: {
        demo: '#',
        repo: '#',
      },
    },
  },
  {
    id: 'spatial-gis',
    step: '04',
    code: 'SYS // PRJ-04',
    shortTitle: 'SPATIAL GIS',
    title: 'Geospatial Analytics & Spatial Mapping',
    subtitle: 'Multi-layer Geographic Data Analysis & Spatial Clustering',
    category: 'Data Science & Geospatial Intelligence',
    period: '2023',
    client: 'Spatial Research Projects',
    status: 'RESOLVED // ARCHIVED',
    summary:
      'High-precision geospatial modeling system delivering automated spatial vector processing, demographic density clustering, and sub-meter zoning layers.',
    fullSummary:
      'Eksplorasi data spasial dan pemetaan analitis multi-layer untuk memodelkan zonasi wilayah, klasterisasi geografis, dan interpretasi pola lingkungan secara visual.',
    tech: ['Python', 'QGIS', 'GeoPandas', 'Shapely', 'Figma', 'GeoJSON'],
    metrics: [
      { label: 'SPATIAL ACCURACY', val: 'Sub-Meter' },
      { label: 'DATASETS INTEGRATED', val: '15+ Layers' },
      { label: 'PROCESSING SPEED', val: '3.2x Faster' },
    ],
    accentColor: '#10b981',
    ambientGlow: 'from-emerald-600/20 via-teal-950/40 to-transparent',
    themeColor: 'rgba(16, 185, 129, 0.4)',
    image: '/assets/projects/spatial-gis.jpg',
    screenMockup: {
      headline: 'VECTOR SPATIAL INTELLIGENCE',
      subline: 'Multi-layer demographic clustering & zoning classification',
      statLabel: 'CRS ACCURACY',
      statVal: 'EPSG SUB-METER',
      statusText: 'R-TREE SPATIAL INDEX // GEOJSON ENGINE',
    },
    wireframe: {
      tag: 'SPATIAL_VECTOR_LAYER',
      badge: 'EPSG_COORDINATE_GRID',
      spec: 'BUFFER_ZONE_ANALYSIS // HEATMAP_CLUSTERING // GEOJSON_EXPORT',
    },
    caseStudy: {
      overview:
        'Pengolahan dan pemetaan kumpulan data spasial berskala besar untuk menghasilkan visualisasi zonasi informatif dengan akurasi koordinat tinggi.',
      challenges: [
        'Inkonsistensi sistem proyeksi koordinat peta (CRS) antar berbagai layer data tabular dan shapefile.',
        'Volume data geometri poligon besar yang lambat dirender tanpa optimasi simplifikasi.',
        'Penyajian output kartografis yang harus mudah dipahami oleh pemangku kebijakan non-teknis.',
      ],
      solutions: [
        'Standardisasi transformasi CRS terpadu menggunakan pustaka GeoPandas dan PyProj.',
        'Optimasi pemrosesan spasial berbasis algoritma R-Tree spatial indexing dan topologi simplifikasi.',
        'Perancangan visualisasi antarmuka peta tematik berstandar kartografi modern di QGIS dan Figma.',
      ],
      deliverables: [
        'Peta Zonasi Tematik Multi-layer Beresolusi Tinggi',
        'Skrip Otomasi Pengolahan Data Spasial Python',
        'Dataset GeoJSON Terintegrasi',
        'Laporan Analisis Klaster Geospasial',
      ],
      links: {
        demo: '#',
        repo: '#',
      },
    },
  },
]
