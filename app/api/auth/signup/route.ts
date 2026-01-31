import { supabaseServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, fullName, name } = body;
        const finalName = fullName || name;

        if (!email || !password || !finalName) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const { data, error } =
            await supabaseServer.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: {
                    name: finalName,
                },
            });

        if (error || !data.user) {
            return NextResponse.json(
                { message: error?.message || "Signup failed" },
                { status: 400 }
            );
        }

        const { error: insertError } = await supabaseServer
            .from("users")
            .insert({
                auth_id: data.user.id,
                email: data.user.email,
                name: finalName,
            });

        if (insertError) {
            return NextResponse.json(
                { message: insertError.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Signup success" },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
