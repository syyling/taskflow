import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://ovvpdikubzjsartwefmo.supabase.co'
const supabaseKey = import.meta.env.VITE_API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)