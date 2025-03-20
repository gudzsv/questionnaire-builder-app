import Link from 'next/link';
import s from './Pagination.module.scss';

export default function Pagination({ page, totalPages }) {
	const prevPage = page > 1 ? page - 1 : null;
	const nextPage = page < totalPages ? page + 1 : null;

	return (
		<div className={s.pagination}>
			{prevPage && (
				<Link href={`?page=${prevPage}`} passHref>
					<button>Previous</button>
				</Link>
			)}
			<span>
				{page} / {totalPages}
			</span>
			{nextPage && (
				<Link href={`?page=${nextPage}`} passHref>
					<button>Next</button>
				</Link>
			)}
		</div>
	);
}
