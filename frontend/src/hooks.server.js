/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event, {
      preload: ({ type, path }) => type === 'otf'
  });

  return response;
}