import { redirect } from "@remix-run/react";

export function loader() {
  return redirect("/");
}
export default function () {
  return null;
}
