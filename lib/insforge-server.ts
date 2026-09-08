import { createServerClient } from '@insforge/sdk/ssr';
import { cookies } from 'next/headers';

export async function getInsforgeServer() {
  const cookieStore = await cookies();
  return createServerClient({ cookies: cookieStore });
}
