import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.DB_URL!
const supabaseKey = process.env.DB_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)