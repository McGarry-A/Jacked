import { supabase } from "../supabaseClient";

interface Props {
  exerciseId: number;
  setNumber: number;
}

const getPreviousSet = async ({
  exerciseId,
  setNumber,
}: Props): Promise<{ weight: number | null; reps: number | null }> => {
  try {
    const { data, error } = await supabase
      .from("set")
      .select("weight, reps, liftId")
      .eq("exerciseId", exerciseId)
      .eq("setNumber", setNumber)
      .order("liftId", { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
      return { weight: null, reps: null };
    }
    
    return data[0];
  } catch (error) {
    console.error(error);
    return { weight: null, reps: null };
  }
};

export default getPreviousSet;
