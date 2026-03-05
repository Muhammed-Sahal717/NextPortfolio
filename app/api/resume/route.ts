import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    const { data } = await supabase.storage.from("resume").list("", {
        limit: 10,
        sortBy: { column: "created_at", order: "desc" },
    });

    if (!data || data.length === 0) {
        return NextResponse.json({ url: null });
    }

    const files = data.filter(
        (f) => f.name !== ".emptyFolderPlaceholder"
    );

    if (files.length === 0) {
        return NextResponse.json({ url: null });
    }

    const file = files[0];
    const {
        data: { publicUrl },
    } = supabase.storage.from("resume").getPublicUrl(file.name);

    return NextResponse.json(
        { url: publicUrl, fileName: file.name },
        {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        }
    );
}
