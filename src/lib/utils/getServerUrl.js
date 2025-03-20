import { headers } from 'next/headers';

export function getServerUrl() {
	const headersList = headers();
	const host = headersList.get('host');
	const protocol = host === 'localhost' ? 'http' : 'https';
	return `${protocol}://${host}:3000/`;
}
