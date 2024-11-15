const fetch = (req: Request) => {
  return new Response("Diego");
};

const state = {
  staticRoutes: {},
};
const reloadStaticRoutes = async () =>
  (state.staticRoutes = {
    "/": new Response(await Bun.file("./src/index.html").bytes(), {
      headers: {
        "Content-Type": "text/html",
      },
    }),
  });

await reloadStaticRoutes();

const server = Bun.serve({
  port: 5173,
  static: state.staticRoutes,
  fetch,
});

setInterval(async () => {
  await reloadStaticRoutes();
  server.reload({ fetch, static: state.staticRoutes });
}, 500);

console.log(`Listening on ${server.url}`);
