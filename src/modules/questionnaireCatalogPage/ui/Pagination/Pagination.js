import Link from 'next/link';
import s from './Pagination.module.scss';

export default function Pagination({ page, totalPages }) {
	const prevPage = page > 1 ? page - 1 : null;
	const nextPage = page < totalPages ? page + 1 : null;

	return (
		<div className={s.pagination}>
			<Link href={`?page=${prevPage}`}>
				<button disabled={nextPage}>Previous</button>
			</Link>
			<span>
				{page} / {totalPages}
			</span>
			<Link href={`?page=${nextPage}`}>
				<button disabled={prevPage}>Next</button>
			</Link>
		</div>
	);
}
