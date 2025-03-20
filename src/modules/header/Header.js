import { APP_ROUTES } from '@/constants/index.js';
import Link from 'next/link.js';
import s from './Header.module.scss';

const { home, catalog, builder } = APP_ROUTES;

export default function Header() {
	return (
		<header>
			<nav>
				<ul className={s.headerList}>
					<li>
						<Link href={home}>Home</Link>
					</li>
					<li>
						<Link href={catalog}>Catalog</Link>
					</li>
					<li>
						<Link href={builder}>Builder</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
