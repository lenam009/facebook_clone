import type { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } },
    response: NextResponse,
) {
    const { slug } = params;

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const type = searchParams.get('type') ?? '';

    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${type}/${slug}`);
}
