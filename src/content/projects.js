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
    title: 'SIM POLIMDO',
    subtitle: 'SIM POLIMDO is a web-based collaboration management system designed to eliminate manual archiving and streamline the full agreement lifecycle (MoU, MoA, and IA) across polytechnic industry partners. Built with Laravel (MVC architecture) and MySQL, it features multi-tiered RBAC, interactive executive monitoring dashboards, a structured digital validation and evaluation workflow, and automated reporting in PDF/Excel.',
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
    gallery: [
      '/assets/projects/gambar 1/1.2.webp',
      '/assets/projects/gambar 1/1.3.webp',
      '/assets/projects/gambar 1/1.4.webp',
    ],
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
    gallery: [
      '/assets/projects/ai-cctv.jpg',
      '/assets/projects/spatial-gis.jpg',
      '/assets/projects/campus-vlan.jpg',
    ],
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
    gallery: [
      '/assets/projects/campus-vlan.jpg',
      '/assets/projects/ai-cctv.jpg',
      '/assets/projects/spatial-gis.jpg',
    ],
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
    gallery: [
      '/assets/projects/spatial-gis.jpg',
      '/assets/projects/ai-cctv.jpg',
      '/assets/projects/campus-vlan.jpg',
    ],
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
  },
]
