import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: NextRequest) {

  try {

    const data = await request.json();
    const { title, description, author } = data;

    if (typeof title !== "string") {
      throw new Error("Invalid title format");
    }

    if (!(title.length > 0 && title.length <= 80)) {
      throw new Error("Invalid title length");
    }

    if (typeof description !== "string") {
      throw new Error("Invalid description format");
    }

    if (!(description.length > 0 && description.length <= 500)) {
      throw new Error("Invalid description length");
    }

    if (typeof author !== "string") {
      throw new Error("Invalid author format");
    }

    if (!(author.length > 0 && author.length <= 40)) {
      throw new Error("Invalid author length");
    }

    try {

      const connectionString = "postgresql://postgres.edxdrjgaiwftvtpcyeii:"+
      "laOSUDvlWF4l937H@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

      const sql = postgres(connectionString);

      await sql`INSERT INTO public.post (title, description, author) VALUES (${title}, ${description}, ${author})`;
    } catch (error) {
      throw new Error("Failed to save post");
    }

    return NextResponse.json(
      { message: "Data is valid" },
    );
  } finally {}
}