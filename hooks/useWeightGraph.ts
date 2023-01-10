import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { supabase } from "../supabase/supabaseClient";
import moment from "moment";

const useWeightTracker = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { status } = useAppSelector((state) => state.weightSlice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("weight")
          .select()
          .eq("user_id", userId)
          .order("id", { ascending: false })
          .limit(7);

        if (error) {
          console.error(error);
          setIsLoaded(true);
          return;
        }

        const labels = data.map((item) => {
          const dateOnly = item.created_at.split(" ")[0];
          return moment(dateOnly).format("DD/MM");
        });

        const values = data.map(({ weight }) => parseInt(weight)).reverse();

        setLabels(labels);
        setValues(values);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
        return;
      }
    };

    fetchData();
  }, [status]);

  return { isLoaded, labels, values };
};

export default useWeightTracker;
