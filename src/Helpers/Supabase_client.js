import { createClient } from '@supabase/supabase-js'

/**
 * The URL of the Supabase project.
 * @type {string}
 */
const supabaseUrl = 'https://vvsbbsfwkqasdefvfnwf.supabase.co'

/**
 * The Supabase API key for authentication.
 * @type {string}
 */
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2c2Jic2Z3a3Fhc2RlZnZmbndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0NzIzNjYsImV4cCI6MjAxNjA0ODM2Nn0.iKpoEmVztLWH-kEmRBSFzxA3WJ_0ijCp90onvyDFSPA'

/**
 * The Supabase client for making API requests to the Supabase project.
 * @type {object}
 */
export const supabase = createClient(supabaseUrl, supabaseKey)
