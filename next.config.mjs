/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		additionalData: `
      @use 'src/styles/variables' as *;
    `,
	},
};

export default nextConfig;
