import payload from 'payload';

const initPromise = payload.init();

export const GET = async (req: Request) => {
  await initPromise;
  const url = new URL(req.url);
  const route = url.pathname.replace('/api/payload', '');

  const result = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return new Response(await result.text(), {
    status: result.status,
    headers: new Headers(result.headers),
  });
};

export const POST = async (req: Request) => {
  await initPromise;
  const url = new URL(req.url);
  const route = url.pathname.replace('/api/payload', '');
  const body = await req.text();

  const result = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  return new Response(await result.text(), {
    status: result.status,
    headers: new Headers(result.headers),
  });
};
