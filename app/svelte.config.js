// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-cloudflare';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		// ... truncated ...
	}
};

export default config;
