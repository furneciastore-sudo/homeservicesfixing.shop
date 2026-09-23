/**
 * Custom Node.js entry point for hosts that run apps via a single startup
 * file (Passenger-style shared hosting, e.g. Hostinger's Node.js hosting)
 * rather than executing `next start` directly. Wraps the standard Next.js
 * request handler; behavior is identical to `next start` otherwise.
 *
 * The host is expected to set PORT (most Node.js panel hosts do this
 * automatically) and NODE_ENV=production.
 */
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
