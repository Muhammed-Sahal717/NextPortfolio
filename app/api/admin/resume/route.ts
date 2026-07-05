import { createClient } from "@supabase/supabase-js";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// We use the service role key to bypass RLS policies since the admin
// is authenticated via middleware, ensuring they are authorized.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin.storage.from("resume").list("", {
            limit: 10,
            sortBy: { column: "created_at", order: "desc" },
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (data && data.length > 0) {
            const files = data.filter((f) => f.name !== ".emptyFolderPlaceholder");
            if (files.length > 0) {
                const file = files[0];
                const {
                    data: { publicUrl },
                } = supabaseAdmin.storage.from("resume").getPublicUrl(file.name);
                
                return NextResponse.json({ 
                    success: true, 
                    fileName: file.name,
                    url: publicUrl 
                });
            }
        }
        
        return NextResponse.json({ success: true, fileName: null, url: null });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized: You must be logged in to upload a resume." },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const oldFileName = formData.get("oldFileName") as string | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "Only PDF files are allowed" },
                { status: 400 }
            );
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size must be under 10MB" },
                { status: 400 }
            );
        }

        // Delete old resume if present
        if (oldFileName && oldFileName !== "null") {
            await supabaseAdmin.storage.from("resume").remove([oldFileName]);
        }

        // Upload new resume
        const fileName = `resume_${Date.now()}.pdf`;
        const { error } = await supabaseAdmin.storage
            .from("resume")
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, fileName });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized: You must be logged in to delete a resume." },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const fileName = searchParams.get("fileName");

        if (!fileName) {
            return NextResponse.json(
                { error: "No filename provided" },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin.storage
            .from("resume")
            .remove([fileName]);

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
