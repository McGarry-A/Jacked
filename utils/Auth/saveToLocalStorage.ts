import { Session } from "@supabase/supabase-js";

const saveToLocalStorage = (session: Session) => {
    localStorage.removeItem("JACKED__ACCESS_TOKEN")
    localStorage.setItem("JACKED__ACCESS_TOKEN", JSON.stringify(session))
}

export default saveToLocalStorage