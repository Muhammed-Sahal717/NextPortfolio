import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Get all projects
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, created_at");

  const baseUrl = "https://sahal-portfolio.vercel.app"; // Update this with your real URL

  // 2. Generate URLs for each project
  const projectUrls = (projects || []).map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 3. Return static + dynamic routes
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
