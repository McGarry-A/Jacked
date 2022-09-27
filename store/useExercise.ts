import { PostgrestError } from '@supabase/supabase-js';
import create from 'zustand'
import { supabase } from '../supabase/supabaseClient'
import { devtools, persist }  from 'zustand/middleware'
// AN EXERCISE IS A PATTERN OF MOVEMENT 
// EXERCISES ARE THE MOVEMENT ONLY AND DO NOT SAVE ANY DETAILS OF ANYONE PERFORMING THAT MOVEMENT
// A LIFT IF A PATTERN OF MOVEMENT WITH THOSE DETAILS ATTATCHED TO THE MOVEMENT

interface ExercisesInterface {
  id: number;
  created_at: string;
  exercise_name: string;
  targets: string;
  category: string;
  description: string;
  image: string;
}

interface state {
  exercises: () => Promise<ExercisesInterface[] | PostgrestError>
}

const useExercises = create<state>()(
      (set) => ({
        exercises: async () => {
          const { data, error } = await supabase
            .from('Exercisess')
            .select()
          if (error) return error
          return data as ExercisesInterface[]
        }
        }
      )
)


export default useExercises