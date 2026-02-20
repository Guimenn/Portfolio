export async function GET() {
  return new Response('dh=669bf5fe4728655a024bcdb193041899d0b07059', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
