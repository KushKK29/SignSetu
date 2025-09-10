import { createSupabaseBrowser } from "./client";

export function subscribeToRoom(
  roomId: string,
  onChange: (payload: any) => void
) {
  const supabase = createSupabaseBrowser();
  return supabase
    .channel(`room:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "rooms",
        filter: `id=eq.${roomId}`,
      },
      (payload) => onChange(payload)
    )
    .subscribe();
}



