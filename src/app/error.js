'use client';

export default function GlobalError({ error, reset }) {
	return (
		<div style={{ textAlign: 'center', padding: '20px' }}>
			<h2>Ooops... Something went wrong</h2>
			<p>Please try again later</p>
			<button
				onClick={() => {
					reset();
					window.location.reload();
				}}
			>
				Try Again
			</button>
		</div>
	);
}
