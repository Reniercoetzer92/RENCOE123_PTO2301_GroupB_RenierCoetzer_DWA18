import { createClient } from '@supabase/supabase-js'

/**
 * The URL of the Supabase project.
 * @type {string}
 */
const supabaseUrl = 'https://nfbvphgapjsbsmnmqujv.supabase.co'

/**
 * The Supabase API key for authentication.
 * @type {string}
 */
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mYnZwaGdhcGpzYnSmtbm1xdWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyMzMyMzAsImV4cCI6MjAxMTgwOTIzMH0.BnoPUxHLsE_-hbhAayyG7i0-FLQL-egi8QAwWJi9rOg'

/**
 * The Supabase client for making API requests to the Supabase project.
 * @type {object}
 */
export const supabase = createClient(supabaseUrl, supabaseKey)
