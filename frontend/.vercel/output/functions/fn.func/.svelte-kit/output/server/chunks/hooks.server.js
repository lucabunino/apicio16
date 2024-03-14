async function handle({ event, resolve }) {
  const response = await resolve(event, {
    preload: ({ type, path }) => type === "otf"
  });
  return response;
}
export {
  handle
};
