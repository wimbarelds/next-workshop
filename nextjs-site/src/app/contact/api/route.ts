export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  // Imagine there being some sendgrid thing here with secret API keys etc
  console.log({ name, email, message });
  return Response.json({ success: true });
}
