import { 
  services, 
  contractors, 
  laborers, 
  projects, 
  contactSubmissions,
  type Service, 
  type InsertService,
  type Contractor,
  type InsertContractor,
  type Laborer,
  type InsertLaborer,
  type Project,
  type InsertProject,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and } from "drizzle-orm";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  
  // Contractors
  getContractors(): Promise<Contractor[]>;
  getContractor(id: number): Promise<Contractor | undefined>;
  getContractorsBySpecialty(specialty: string): Promise<Contractor[]>;
  getContractorsByLocation(location: string): Promise<Contractor[]>;
  
  // Laborers
  getLaborers(): Promise<Laborer[]>;
  getLaborersBySpecialty(specialty: string): Promise<Laborer[]>;
  getAvailableLaborers(): Promise<Laborer[]>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectsByContractor(contractorId: number): Promise<Project[]>;
  
  // Contact
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private services: Map<number, Service>;
  private contractors: Map<number, Contractor>;
  private laborers: Map<number, Laborer>;
  private projects: Map<number, Project>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentServiceId: number;
  private currentContractorId: number;
  private currentLaborerId: number;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.services = new Map();
    this.contractors = new Map();
    this.laborers = new Map();
    this.projects = new Map();
    this.contactSubmissions = new Map();
    this.currentServiceId = 1;
    this.currentContractorId = 1;
    this.currentLaborerId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize services
    const initialServices: InsertService[] = [
      {
        name: "Foundation Work",
        description: "Professional foundation services including excavation, concrete pouring, and structural support.",
        category: "residential",
        startingPrice: "5000.00"
      },
      {
        name: "Framing & Structure",
        description: "Expert framing services for residential and commercial structures with quality materials.",
        category: "residential",
        startingPrice: "8000.00"
      },
      {
        name: "Roofing Services",
        description: "Complete roofing solutions including installation, repair, and maintenance services.",
        category: "residential",
        startingPrice: "12000.00"
      },
      {
        name: "Electrical & Plumbing",
        description: "Licensed electrical and plumbing services for all construction projects.",
        category: "residential",
        startingPrice: "3500.00"
      },
      {
        name: "Interior Finishing",
        description: "High-quality interior finishing including drywall, painting, and flooring.",
        category: "residential",
        startingPrice: "6500.00"
      },
      {
        name: "Office Buildings",
        description: "Complete commercial office construction and renovation services.",
        category: "commercial",
        startingPrice: "50000.00"
      },
      {
        name: "Retail Spaces",
        description: "Specialized retail construction and tenant improvement services.",
        category: "commercial",
        startingPrice: "25000.00"
      },
      {
        name: "Warehouses & Distribution",
        description: "Large-scale warehouse and distribution center construction.",
        category: "industrial",
        startingPrice: "75000.00"
      }
    ];

    initialServices.forEach(service => {
      const newService: Service = { ...service, id: this.currentServiceId++ };
      this.services.set(newService.id, newService);
    });

    // Initialize contractors
    const initialContractors: InsertContractor[] = [
      {
        name: "Michael Thompson",
        email: "michael@buildpro.com",
        phone: "(555) 123-4567",
        specialty: "General Contractor",
        description: "20+ years experience in residential and commercial construction. Specializing in custom homes and renovations.",
        experience: "20+ years experience",
        location: "Downtown District",
        rating: "4.9",
        reviewCount: 127,
        isLicensed: true,
        isInsured: true,
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Sarah Rodriguez",
        email: "sarah@electropro.com",
        phone: "(555) 234-5678",
        specialty: "Electrical Contractor",
        description: "Expert electrical contractor specializing in residential and commercial electrical systems, smart home installations.",
        experience: "15+ years experience",
        location: "North District",
        rating: "5.0",
        reviewCount: 89,
        isLicensed: true,
        isInsured: true,
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "David Chen",
        email: "david@plumbpro.com",
        phone: "(555) 345-6789",
        specialty: "Plumbing Contractor",
        description: "Master plumber with expertise in residential, commercial plumbing systems, and emergency repairs.",
        experience: "18+ years experience",
        location: "South District",
        rating: "4.8",
        reviewCount: 156,
        isLicensed: true,
        isInsured: true,
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
      }
    ];

    initialContractors.forEach(contractor => {
      const newContractor: Contractor = { ...contractor, id: this.currentContractorId++ };
      this.contractors.set(newContractor.id, newContractor);
    });

    // Initialize laborers
    const initialLaborers: InsertLaborer[] = [
      {
        name: "Carlos Martinez",
        specialty: "Master Carpenter",
        experience: "12+ years experience",
        hourlyRate: "45.00",
        rating: "4.9",
        reviewCount: 67,
        isAvailable: true,
        profileImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
      },
      {
        name: "Jennifer Liu",
        specialty: "Electrical Technician",
        experience: "8+ years experience",
        hourlyRate: "52.00",
        rating: "5.0",
        reviewCount: 43,
        isAvailable: true,
        profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
      },
      {
        name: "Robert Johnson",
        specialty: "Plumbing Specialist",
        experience: "15+ years experience",
        hourlyRate: "48.00",
        rating: "4.8",
        reviewCount: 91,
        isAvailable: true,
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
      }
    ];

    initialLaborers.forEach(laborer => {
      const newLaborer: Laborer = { ...laborer, id: this.currentLaborerId++ };
      this.laborers.set(newLaborer.id, newLaborer);
    });

    // Initialize projects
    const initialProjects: InsertProject[] = [
      {
        title: "Modern Family Home",
        description: "3,500 sq ft modern home with sustainable features and smart home integration.",
        category: "Custom Residential Build",
        contractorId: 1,
        contractorName: "Michael Thompson",
        completionYear: 2024,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        title: "Corporate Office Renovation",
        description: "Complete renovation of 15,000 sq ft office space with modern amenities.",
        category: "Commercial Office Space",
        contractorId: 2,
        contractorName: "Sarah Rodriguez",
        completionYear: 2024,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        title: "Industrial Warehouse",
        description: "50,000 sq ft warehouse facility with advanced logistics systems.",
        category: "Distribution Center",
        contractorId: 3,
        contractorName: "David Chen",
        completionYear: 2024,
        image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        title: "Kitchen Remodel",
        description: "Complete kitchen transformation with premium materials and appliances.",
        category: "Luxury Kitchen Renovation",
        contractorId: 1,
        contractorName: "Michael Thompson",
        completionYear: 2024,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        title: "Spa Bathroom",
        description: "Luxury spa-style bathroom with premium finishes and smart features.",
        category: "Master Bathroom Remodel",
        contractorId: 2,
        contractorName: "Sarah Rodriguez",
        completionYear: 2024,
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        title: "Restaurant Build-out",
        description: "Complete restaurant build-out with commercial kitchen and dining areas.",
        category: "Restaurant Construction",
        contractorId: 3,
        contractorName: "David Chen",
        completionYear: 2024,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      }
    ];

    initialProjects.forEach(project => {
      const newProject: Project = { ...project, id: this.currentProjectId++ };
      this.projects.set(newProject.id, newProject);
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.category === category);
  }

  async getContractors(): Promise<Contractor[]> {
    return Array.from(this.contractors.values());
  }

  async getContractor(id: number): Promise<Contractor | undefined> {
    return this.contractors.get(id);
  }

  async getContractorsBySpecialty(specialty: string): Promise<Contractor[]> {
    return Array.from(this.contractors.values()).filter(contractor => contractor.specialty === specialty);
  }

  async getContractorsByLocation(location: string): Promise<Contractor[]> {
    return Array.from(this.contractors.values()).filter(contractor => contractor.location === location);
  }

  async getLaborers(): Promise<Laborer[]> {
    return Array.from(this.laborers.values());
  }

  async getLaborersBySpecialty(specialty: string): Promise<Laborer[]> {
    return Array.from(this.laborers.values()).filter(laborer => laborer.specialty.toLowerCase().includes(specialty.toLowerCase()));
  }

  async getAvailableLaborers(): Promise<Laborer[]> {
    return Array.from(this.laborers.values()).filter(laborer => laborer.isAvailable);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByContractor(contractorId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.contractorId === contractorId);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: this.currentContactId++,
      submittedAt: new Date().toISOString()
    };
    this.contactSubmissions.set(newSubmission.id, newSubmission);
    return newSubmission;
  }
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.category, category));
  }

  async getContractors(): Promise<Contractor[]> {
    return await db.select().from(contractors);
  }

  async getContractor(id: number): Promise<Contractor | undefined> {
    const result = await db.select().from(contractors).where(eq(contractors.id, id));
    return result[0] || undefined;
  }

  async getContractorsBySpecialty(specialty: string): Promise<Contractor[]> {
    return await db.select().from(contractors).where(like(contractors.specialty, `%${specialty}%`));
  }

  async getContractorsByLocation(location: string): Promise<Contractor[]> {
    return await db.select().from(contractors).where(like(contractors.location, `%${location}%`));
  }

  async getLaborers(): Promise<Laborer[]> {
    return await db.select().from(laborers);
  }

  async getLaborersBySpecialty(specialty: string): Promise<Laborer[]> {
    return await db.select().from(laborers).where(like(laborers.specialty, `%${specialty}%`));
  }

  async getAvailableLaborers(): Promise<Laborer[]> {
    return await db.select().from(laborers).where(eq(laborers.isAvailable, true));
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProjectsByContractor(contractorId: number): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.contractorId, contractorId));
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
