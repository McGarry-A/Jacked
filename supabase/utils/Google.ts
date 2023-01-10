import { supabase } from "../supabaseClient";



export async function signout() {
  const { error } = await supabase.auth.signOut();

  if (error) return error
}
