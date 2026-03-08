import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// We use the service role key to bypass RLS policies so we can 
// securely list the files in the bucket from the server without exposing
// the bucket to anonymous lists.
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
    const { data } = await supabaseAdmin.storage.from("resume").list("", {
        limit: 10,
        sortBy: { column: "created_at", order: "desc" },
    });

    if (!data || data.length === 0) {
        return NextResponse.json({ url: null }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const files = data.filter(
        (f) => f.name !== ".emptyFolderPlaceholder"
    );

    if (files.length === 0) {
        return NextResponse.json({ url: null }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const file = files[0];
    const {
        data: { publicUrl },
    } = supabaseAdmin.storage.from("resume").getPublicUrl(file.name);

    return NextResponse.json(
        { url: publicUrl, fileName: file.name },
        { headers: { 'Cache-Control': 'no-store' } }
    );
}
