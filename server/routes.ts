import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const category = req.query.category as string;
      const services = category 
        ? await storage.getServicesByCategory(category)
        : await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Contractors routes
  app.get("/api/contractors", async (req, res) => {
    try {
      const { specialty, location } = req.query;
      let contractors;
      
      if (specialty) {
        contractors = await storage.getContractorsBySpecialty(specialty as string);
      } else if (location) {
        contractors = await storage.getContractorsByLocation(location as string);
      } else {
        contractors = await storage.getContractors();
      }
      
      res.json(contractors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contractors" });
    }
  });

  app.get("/api/contractors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contractor = await storage.getContractor(id);
      
      if (!contractor) {
        res.status(404).json({ error: "Contractor not found" });
        return;
      }
      
      res.json(contractor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contractor" });
    }
  });

  // Laborers routes
  app.get("/api/laborers", async (req, res) => {
    try {
      const { specialty, available } = req.query;
      let laborers;
      
      if (specialty) {
        laborers = await storage.getLaborersBySpecialty(specialty as string);
      } else if (available === 'true') {
        laborers = await storage.getAvailableLaborers();
      } else {
        laborers = await storage.getLaborers();
      }
      
      res.json(laborers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch laborers" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const contractorId = req.query.contractorId as string;
      const projects = contractorId 
        ? await storage.getProjectsByContractor(parseInt(contractorId))
        : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Placeholder image endpoint
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const w = parseInt(width) || 300;
    const h = parseInt(height) || 200;
    
    // Create a simple SVG placeholder
    const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#e2e8f0"/>
  <text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="14" fill="#718096">
    ${w}x${h}
  </text>
</svg>`;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);
  return httpServer;
}
