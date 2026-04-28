const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://xswaeawwqkbuqrmitevj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzd2FlYXd3cWtidXFybWl0ZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzkxNzEsImV4cCI6MjA5Mjk1NTE3MX0.KMCuwG__EAV8SGUXwut4vQ_AjOagr4JngH4C56O0Jq8'
);

async function test() {
  const { data, error } = await supabase.from('leads').select('*');
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Data length:', data.length);
    console.log('Data:', data);
  }
}
test();
