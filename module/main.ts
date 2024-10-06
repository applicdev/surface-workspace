import { route, type Route } from "jsr:@std/http/unstable-route";
import { serveDir } from "jsr:@std/http/file-server";
import { STATUS_CODE, STATUS_TEXT } from "jsr:@std@0.224.0/http/status.ts";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/**/" }),
    handler: (req) => {
       // this should be in static _404 to be consistent with GitHub pages
       const urn = new URL(req.url);
       urn.pathname = urn.pathname.slice(0, -1);

       return Response.redirect(req.url.substring());
    },
  },
  {
    pattern: new URLPattern({ pathname: "" }),
    handler: () =>  Response.redirect('/outline'),
  },
  {
    pattern: new URLPattern({ pathname: "/api" }),
    handler: () => Response.json({ 
      code: 0,
      message: `${STATUS_CODE.Not.Found}: ${STATUS_TEXT[STATUS_CODE.Not.Found]}`,
    }),
  },
  {
    pattern: new URLPattern({ pathname: "/:target{@:tag}?" }),
    handler: targetHandler
  },
  {
    pattern: new URLPattern({ pathname: "/:target{@:tag}?/:subpath*" }),
    handler: targetHandler
  },
  {
    pattern: new URLPattern({ pathname: "/static/*" }),
    handler: (req: Request) => serveDir(req, { fsRoot: "public", urlRoot: "static", }),
  }
];

function targetHandler(_req: Request) {
  return (_req, _info, params) =>  Response.json({...params?.pathname.groups})
}

function defaultHandler(_req: Request) {
  return new Response("Not found", { status: 404 });
}

Deno.serve(route(routes, defaultHandler));
