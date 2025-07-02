# IBMS 3.5.2 - Integrated Barangay Management System

A comprehensive digital solution for barangay administration, emergency response, and community services in the Philippines.

## 🚀 Features

### Core Modules
- **Admin Portal** - Complete administrative dashboard
- **ResQNet** - Emergency response and disaster management
- **Health Portal** - Medical services and health records
- **Tanod System** - Security and patrol management
- **BMS** - Barangay management system
- **Resident Portal** - Citizen services and document requests

### Key Capabilities
- 📱 **Real-time Updates** - Live incident tracking and notifications
- 🔐 **Multi-level Authentication** - Role-based access control
- 📊 **Analytics Dashboard** - Comprehensive reporting and insights
- 🗺️ **Interactive Maps** - Google Maps integration for location services
- 📋 **Document Management** - Digital certificates and permits
- 🚨 **Emergency Response** - 911 integration and alert systems
- 📱 **QR Code Verification** - Secure resident identity verification
- 📹 **CCTV Integration** - Surveillance camera management
- 💬 **Communication Hub** - Radio and messaging systems

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Maps**: Google Maps API
- **Real-time**: WebSocket connections
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-org/ibms-3.5.2.git
   cd ibms-3.5.2
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Configure your environment variables:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## 📱 Module Access

### Admin Portal
- URL: `/admin`
- Features: User management, system settings, analytics

### Emergency Response (ResQNet)
- URL: `/ResQNet`
- Features: Incident management, emergency alerts, resource coordination

### Health Portal
- URL: `/health-portal`
- Features: Patient records, appointments, health programs

### Tanod System
- URL: `/tanod`
- Features: Security monitoring, patrol management, QR verification

### Resident Portal
- URL: `/portal`
- Features: Document requests, services, community information

## 🔧 Configuration

### Database Setup
1. Create a new Supabase project
2. Run the SQL migrations in `/database/migrations`
3. Configure Row Level Security (RLS) policies

### Google Maps Setup
1. Enable Google Maps JavaScript API
2. Enable Places API and Geocoding API
3. Add your domain to API restrictions

### CCTV Integration
- Supports major brands: Hikvision, Dahua, Axis, Uniview
- RTSP/HTTP stream compatibility
- PTZ control capabilities

## 🔐 Security Features

- **Role-based Access Control** - Multiple user levels and permissions
- **Data Encryption** - All sensitive data encrypted at rest and in transit
- **Audit Logging** - Complete activity tracking and audit trails
- **Session Management** - Secure authentication and session handling
- **Input Validation** - Comprehensive data validation and sanitization

## 📊 Real-time Features

- **Live Incident Updates** - Real-time incident status changes
- **Emergency Alerts** - Instant emergency notifications
- **System Monitoring** - Live system health and performance metrics
- **User Activity** - Real-time user presence and activity tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@ibms.ph
- Documentation: [docs.ibms.ph](https://docs.ibms.ph)
- Issues: [GitHub Issues](https://github.com/your-org/ibms-3.5.2/issues)

## 🏆 Acknowledgments

- Barangay officials and staff for requirements and feedback
- Emergency response teams for system testing
- Community members for user acceptance testing
- Open source contributors and maintainers

---

**IBMS 3.5.2** - Empowering Filipino communities through digital transformation.
