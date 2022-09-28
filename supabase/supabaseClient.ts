import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://getaikckzckdeufnubby.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdldGFpa2NremNrZGV1Zm51YmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyNzg2MDUsImV4cCI6MTk3OTg1NDYwNX0.g0ghjdTbkbHwU3Q-82RE8ohVYWMttEOLdUw8oSR8GMY"
);
