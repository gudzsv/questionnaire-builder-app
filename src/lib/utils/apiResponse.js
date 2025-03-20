import { NextResponse } from 'next/server';

export function createApiResponse({ message, data = null, status = 200 }) {
	return NextResponse.json(data ? { message, data } : { message }, { status });
}
