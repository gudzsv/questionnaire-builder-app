import Header from '@/modules/header/Header.js';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: 'Questionnaire Builder App',
	description: 'Web-based application for building questionnaires.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
