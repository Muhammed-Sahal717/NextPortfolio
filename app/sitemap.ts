import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: projects } = await supabase
    .from("projects")
    .select("slug, created_at")
    .order("created_at", { ascending: false });

  const projectUrls =
    projects?.map((project) => ({
      url: `https://sahal-web.vercel.app/projects/${project.slug}`,
      lastModified: project.created_at ? new Date(project.created_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || [];

  return [
    {
      url: "https://sahal-web.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://sahal-web.vercel.app/engineering",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://sahal-web.vercel.app/profile",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
