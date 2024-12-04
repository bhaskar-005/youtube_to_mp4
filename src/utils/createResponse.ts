import { NextResponse } from "next/server";

export class createResponse {
    static error(message: string, status: number = 404, otherData?: object) {
        return NextResponse.json(
            { 
                success: false,
                error: message,
                ...otherData,
            },
            {
                status: status,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    static message(message: string, status: number = 200, otherData?: object) {
        return NextResponse.json(
            { 
                success: true,
                message: message,
                ...otherData,
            },
            {
                status: status,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
