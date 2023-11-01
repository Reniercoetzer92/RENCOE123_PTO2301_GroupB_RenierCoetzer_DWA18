import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nfbvphgapjsbsmnmqujv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mYnZwaGdhcGpzYnNtbm1xdWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyMzMyMzAsImV4cCI6MjAxMTgwOTIzMH0.BnoPUxHLsE_-hbhAayyG7i0-FLQL-egi8QAwWJi9rOg'
export const supabase = createClient(supabaseUrl, supabaseKey)