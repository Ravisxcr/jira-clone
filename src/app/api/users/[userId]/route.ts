export function GET() {
  return Response.json({ userId: "123", name: "John Doe" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ message: "User created", user: body });
}

export function PUT() {
  return Response.json({ message: "User updated", userId: "123" });
}

export function DELETE() {
  return Response.json({ message: "User deleted", userId: "123" });
}

