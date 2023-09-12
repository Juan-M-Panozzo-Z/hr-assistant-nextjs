import { NextResponse } from "next/server";

export async function POST(req: Request) {

    NextResponse.json({
        status: 200,
        body: {
            message: `User enabled`,
        },
    });
}
