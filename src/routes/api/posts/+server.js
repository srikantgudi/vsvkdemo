import { json } from "@sveltejs/kit";

export async function GET() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await resp.json();
  return json(data);
}