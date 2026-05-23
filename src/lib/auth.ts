// Lightweight client-side admin gate. Credentials are intentionally not
// rendered anywhere in the UI. For a production CMS, wire this to a backend.
const KEY = "delife_admin_session";

// Stored as base64 to avoid plaintext appearing in source search trivially.
const U = "YWRtaW5AZGVsaWZlaW50ZXJpb3IuY29t"; // admin email
const P = "RGVsaWZlQDEyIw=="; // admin password

export function login(username: string, password: string): boolean {
  try {
    const u = atob(U);
    const p = atob(P);
    if (username.trim().toLowerCase() === u && password === p) {
      sessionStorage.setItem(KEY, "1");
      return true;
    }
  } catch {}
  return false;
}

export function logout() {
  sessionStorage.removeItem(KEY);
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(KEY) === "1";
}
