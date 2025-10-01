// utils/clientId.ts
export function getClientId() {
  if (typeof window === "undefined") return ""; // SSR safe

  let clientId = localStorage.getItem("clientId");
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem("clientId", clientId);
  }
  return clientId;
}
