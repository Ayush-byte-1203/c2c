import { db } from "./db";
import { services, contractors, laborers, projects } from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(projects);
  await db.delete(laborers);
  await db.delete(contractors);
  await db.delete(services);

  // Seed services
  const serviceData = [
    {
      name: "Foundation Work",
      description: "Professional foundation services including excavation, concrete pouring, and structural support.",
      category: "Residential",
      startingPrice: "15000.00"
    },
    {
      name: "Roofing Installation",
      description: "Complete roofing solutions including shingle, tile, and metal roof installations.",
      category: "Residential",
      startingPrice: "8000.00"
    },
    {
      name: "Commercial Electrical",
      description: "Comprehensive electrical services for commercial buildings and office spaces.",
      category: "Commercial",
      startingPrice: "50000.00"
    },
    {
      name: "Plumbing Systems",
      description: "Complete plumbing installation and repair services for residential and commercial properties.",
      category: "Residential",
      startingPrice: "5000.00"
    },
    {
      name: "HVAC Installation",
      description: "Heating, ventilation, and air conditioning system installation and maintenance.",
      category: "Residential",
      startingPrice: "10000.00"
    },
    {
      name: "Industrial Steel Work",
      description: "Structural steel fabrication and installation for industrial facilities.",
      category: "Industrial",
      startingPrice: "100000.00"
    }
  ];

  const insertedServices = await db.insert(services).values(serviceData).returning();
  console.log(`Seeded ${insertedServices.length} services`);

  // Seed contractors
  const contractorData = [
    {
      name: "Michael Thompson",
      description: "Licensed general contractor with 15 years of experience in residential construction.",
      email: "michael@buildpro.com",
      phone: "(555) 123-4567",
      specialty: "Foundation & Structural Work",
      experience: "15 years",
      location: "Denver, CO",
      rating: "4.8",
      reviewCount: 127,
      isLicensed: true,
      isInsured: true,
      profileImage: "/api/placeholder/150/150"
    },
    {
      name: "Sarah Johnson",
      description: "Roofing specialist with expertise in residential and commercial roofing systems.",
      email: "sarah@roofexperts.com",
      phone: "(555) 234-5678",
      specialty: "Roofing & Exteriors",
      experience: "12 years",
      location: "Austin, TX",
      rating: "4.9",
      reviewCount: 89,
      isLicensed: true,
      isInsured: true,
      profileImage: "/api/placeholder/150/150"
    },
    {
      name: "David Chen",
      description: "Master electrician specializing in commercial electrical installations.",
      email: "david@powertech.com",
      phone: "(555) 345-6789",
      specialty: "Electrical Systems",
      experience: "18 years",
      location: "Seattle, WA",
      rating: "4.7",
      reviewCount: 156,
      isLicensed: true,
      isInsured: true,
      profileImage: "/api/placeholder/150/150"
    },
    {
      name: "Lisa Rodriguez",
      description: "Plumbing contractor with extensive experience in both residential and commercial projects.",
      email: "lisa@flowplumbing.com",
      phone: "(555) 456-7890",
      specialty: "Plumbing & Water Systems",
      experience: "14 years",
      location: "Phoenix, AZ",
      rating: "4.6",
      reviewCount: 98,
      isLicensed: true,
      isInsured: true,
      profileImage: "/api/placeholder/150/150"
    },
    {
      name: "Robert Wilson",
      description: "HVAC specialist providing heating and cooling solutions for homes and businesses.",
      email: "robert@climatepro.com",
      phone: "(555) 567-8901",
      specialty: "HVAC Systems",
      experience: "16 years",
      location: "Chicago, IL",
      rating: "4.8",
      reviewCount: 143,
      isLicensed: true,
      isInsured: true,
      profileImage: "/api/placeholder/150/150"
    },
    {
      name: "Jennifer Lee",
      description: "Industrial construction specialist with expertise in steel and concrete work.",
      email: "jennifer@industrialbuild.com",
      phone: "(555) 678-9012",
      specialty: "Industrial Construction",
      experience: "20 years",
      location: "Houston, TX",
      rating: "4.9",
      reviewCount: 78,
      isLicensed: true,
      isInsured: true,
      profileImage: "/api/placeholder/150/150"
    }
  ];

  const insertedContractors = await db.insert(contractors).values(contractorData).returning();
  console.log(`Seeded ${insertedContractors.length} contractors`);

  // Seed laborers
  const laborerData = [
    {
      name: "Carlos Martinez",
      specialty: "Concrete Work",
      experience: "8 years",
      rating: "4.7",
      reviewCount: 45,
      profileImage: "/api/placeholder/120/120",
      hourlyRate: "25.00",
      isAvailable: true
    },
    {
      name: "James Anderson",
      specialty: "Electrical Assistant",
      experience: "5 years",
      rating: "4.5",
      reviewCount: 32,
      profileImage: "/api/placeholder/120/120",
      hourlyRate: "22.00",
      isAvailable: true
    },
    {
      name: "Maria Garcia",
      specialty: "Painting & Finishing",
      experience: "10 years",
      rating: "4.8",
      reviewCount: 67,
      profileImage: "/api/placeholder/120/120",
      hourlyRate: "20.00",
      isAvailable: false
    },
    {
      name: "Thomas Brown",
      specialty: "Plumbing Helper",
      experience: "3 years",
      rating: "4.4",
      reviewCount: 28,
      profileImage: "/api/placeholder/120/120",
      hourlyRate: "18.00",
      isAvailable: true
    },
    {
      name: "Ana Hernandez",
      specialty: "Roofing Assistant",
      experience: "6 years",
      rating: "4.6",
      reviewCount: 38,
      profileImage: "/api/placeholder/120/120",
      hourlyRate: "24.00",
      isAvailable: true
    },
    {
      name: "Kevin O'Connor",
      specialty: "General Construction",
      experience: "12 years",
      rating: "4.7",
      reviewCount: 82,
      profileImage: "/api/placeholder/120/120",
      hourlyRate: "28.00",
      isAvailable: false
    }
  ];

  const insertedLaborers = await db.insert(laborers).values(laborerData).returning();
  console.log(`Seeded ${insertedLaborers.length} laborers`);

  // Seed projects
  const projectData = [
    {
      title: "Modern Family Home Foundation",
      description: "Complete foundation work for a 3,500 sq ft modern family home including excavation and concrete pouring.",
      category: "Residential",
      contractorId: insertedContractors[0].id,
      contractorName: "Michael Thompson",
      completionYear: 2023,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Commercial Office Roof Replacement",
      description: "Full roof replacement for a 15,000 sq ft commercial office building with energy-efficient materials.",
      category: "Commercial",
      contractorId: insertedContractors[1].id,
      contractorName: "Sarah Johnson",
      completionYear: 2023,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Hospital Electrical System Upgrade",
      description: "Complete electrical system upgrade for a 50,000 sq ft hospital facility with emergency backup systems.",
      category: "Commercial",
      contractorId: insertedContractors[2].id,
      contractorName: "David Chen",
      completionYear: 2022,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Luxury Home Plumbing Installation",
      description: "High-end plumbing installation for a custom luxury home with smart water management systems.",
      category: "Residential",
      contractorId: insertedContractors[3].id,
      contractorName: "Lisa Rodriguez",
      completionYear: 2023,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Shopping Mall HVAC System",
      description: "Complete HVAC system installation for a 200,000 sq ft shopping mall with zone control.",
      category: "Commercial",
      contractorId: insertedContractors[4].id,
      contractorName: "Robert Wilson",
      completionYear: 2022,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Manufacturing Plant Steel Framework",
      description: "Structural steel framework for a new 100,000 sq ft manufacturing facility.",
      category: "Industrial",
      contractorId: insertedContractors[5].id,
      contractorName: "Jennifer Lee",
      completionYear: 2023,
      image: "/api/placeholder/400/300"
    }
  ];

  const insertedProjects = await db.insert(projects).values(projectData).returning();
  console.log(`Seeded ${insertedProjects.length} projects`);

  console.log("Database seeding completed successfully!");
}

seedDatabase().catch(console.error);