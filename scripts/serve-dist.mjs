import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function serveDist(port = 0) {
  const root = resolve('dist');
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.png': 'image/png', '.ico': 'image/x-icon' };
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname === '/portfolio') { res.writeHead(301, { Location: '/portfolio/' }); res.end(); return; }
      if (!pathname.startsWith('/portfolio/')) { res.writeHead(404); res.end('Not found'); return; }
      let file = resolve(root, pathname.slice('/portfolio/'.length));
      if (file !== root && !file.startsWith(root + sep)) { res.writeHead(400); res.end(); return; }
      try {
        if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
        const body = await readFile(file);
        res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
        res.end(req.method === 'HEAD' ? undefined : body);
      } catch (error) {
        if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;
        res.writeHead(404, { 'Content-Type': types['.html'] });
        res.end(await readFile(resolve(root, '404.html')));
      }
    } catch (error) {
      console.error(error);
      res.writeHead(500); res.end('Static server error');
    }
  });
  await new Promise((ready, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', ready); });
  return { url: `http://127.0.0.1:${server.address().port}/portfolio/`, close: () => new Promise((done, reject) => server.close(error => error ? reject(error) : done())) };
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = await serveDist(Number(process.env.PORT ?? 4173));
  console.log(server.url);
}
