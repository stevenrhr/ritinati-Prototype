import { createClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, email, no_hp, pilihan_kelas, pesan } = body;

    if (!nama || !email || !no_hp || !pilihan_kelas) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("pendaftaran")
      .insert([
        { nama, email, no_hp, pilihan_kelas, pesan }
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
