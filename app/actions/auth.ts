'use server';

import { createAuthActions } from '@insforge/sdk/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const auth = createAuthActions({ cookies: await cookies() });
  const { data, error } = await auth.signUp({
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    name: String(formData.get('name') ?? ''),
  });
  return { user: data?.user ?? null, error: error ? { message: error.message } : null };
}

export async function signIn(formData: FormData) {
  const auth = createAuthActions({ cookies: await cookies() });
  const { data, error } = await auth.signInWithPassword({
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  });
  return { user: data?.user ?? null, error: error ? { message: error.message } : null };
}

export async function signOut() {
  const auth = createAuthActions({ cookies: await cookies() });
  const { error } = await auth.signOut();
  return { error: error ? { message: error.message } : null };
}

/**
 * The form-facing variant used by the sidebar's "Keluar": clears the session
 * and leaves the app, so the caller needs no client-side navigation of its own.
 */
export async function signOutAndRedirect() {
  const auth = createAuthActions({ cookies: await cookies() });
  await auth.signOut();
  redirect('/login');
}
