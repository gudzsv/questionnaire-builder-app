'use client';

import Loader from '@/modules/common/Lader/Loader.jsx';
import { useEffect } from 'react';

const Loading = () => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.removeAttribute('style');
		};
	}, []);

	return <Loader />;
};

export default Loading;
