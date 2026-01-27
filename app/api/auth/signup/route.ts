import { supabaseServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, fullName } = body;

        if (!email || !password) {
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
                full_name: fullName,
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
