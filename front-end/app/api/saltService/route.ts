export async function GET() {
  return new Response(
    JSON.stringify({
      salt: "1234567890123456789012345678901234567890",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
