import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — redirect to the new sign-in page.
export const Route = createFileRoute("/admin-login")({
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
  component: () => null,
});
