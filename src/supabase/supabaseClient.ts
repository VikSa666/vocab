import { createClient } from "@supabase/supabase-js";

const supabaseUrl = async () => {
  const url = await import.meta.env.VUE_SUPABASE_URL;
  if (!url) {
    throw new Error("VUE_SUPABASE_URL not set");
  }
  return url;
};
const supabaseKey = async () => {
  const key = await process.env.VUE_SUPAKEY;
  if (!key) {
    throw new Error("VUE_SUPAKEY not set");
  }
  return key;
};

export const supabase = createClient(await supabaseUrl(), await supabaseKey());
