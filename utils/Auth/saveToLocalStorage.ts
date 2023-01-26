import { Session } from "@supabase/supabase-js";

const saveToLocalStorage = (session: Session) => {
    localStorage.setItem("JACKED__ACCESS_TOKEN", JSON.stringify(session))
}

export default saveToLocalStorage