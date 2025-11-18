import { type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.toString()
  return Response.json({ query })
}

export async function POST(request: Request) {
  // console.log({ request })
  const res = await request.json()
  return Response.json({ res })
}
