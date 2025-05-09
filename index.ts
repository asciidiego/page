Bun.serve({
    routes: {
        "/": new Response("Hello World"),
    },

    fetch(request, server) {
        return new Response("Not Found", { status: 404 });
    },
});
