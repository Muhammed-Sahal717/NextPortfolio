require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testSupabase() {
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("Fetching...");
    try {
        const { data, error } = await supabase.from('projects').select('*').limit(1);
        if (error) throw error;
        console.log("Success! Found", data.length, "projects.");
    } catch (e) {
        console.error("Error:", e);
    }
}

testSupabase();
