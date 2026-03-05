"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- Sign Out ---
export async function signOut() {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
}

// --- Create Project ---
export async function createProject(formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const title = formData.get("title") as string;
    const slug =
        (formData.get("slug") as string) ||
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const techStackRaw = formData.get("tech_stack") as string;
    const tech_stack = techStackRaw
        ? techStackRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
    const image_url = formData.get("image_url") as string;
    const galleryRaw = formData.get("gallery_images") as string;
    const gallery_images = galleryRaw
        ? galleryRaw.split(",").map((u) => u.trim()).filter(Boolean)
        : [];
    const demo_url = (formData.get("demo_url") as string) || null;
    const github_url = (formData.get("github_url") as string) || null;
    const category = (formData.get("category") as string) || null;
    const timeline = (formData.get("timeline") as string) || null;

    const { error } = await supabase.from("projects").insert({
        title,
        slug,
        description,
        content,
        tech_stack,
        image_url,
        gallery_images,
        demo_url,
        github_url,
        category,
        timeline,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    redirect("/admin/projects");
}

// --- Update Project ---
export async function updateProject(id: number, formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const title = formData.get("title") as string;
    const slug =
        (formData.get("slug") as string) ||
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const techStackRaw = formData.get("tech_stack") as string;
    const tech_stack = techStackRaw
        ? techStackRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
    const image_url = formData.get("image_url") as string;
    const galleryRaw = formData.get("gallery_images") as string;
    const gallery_images = galleryRaw
        ? galleryRaw.split(",").map((u) => u.trim()).filter(Boolean)
        : [];
    const demo_url = (formData.get("demo_url") as string) || null;
    const github_url = (formData.get("github_url") as string) || null;
    const category = (formData.get("category") as string) || null;
    const timeline = (formData.get("timeline") as string) || null;

    const { error } = await supabase
        .from("projects")
        .update({
            title,
            slug,
            description,
            content,
            tech_stack,
            image_url,
            gallery_images,
            demo_url,
            github_url,
            category,
            timeline,
        })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath(`/projects/${slug}`);
    redirect("/admin/projects");
}

// --- Delete Project ---
export async function deleteProject(id: number) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    redirect("/admin/projects");
}
