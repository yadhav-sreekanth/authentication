const { createClient } = supabase;
const supabaseUrl = 'https://aglwpzjhwnschiqfdfvi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbHdwempod25zY2hpcWZkZnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMjk4MjcsImV4cCI6MjA2MzkwNTgyN30.Dll76ZLjXhSC6qrSf43FRcWOeHE9_YMd3zPa09P5hws';
const supabaseClient = createClient(supabaseUrl, supabaseKey);
async function signUp() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
     const password = document.getElementById("signup-password").value;

    const { data, error } = await supabaseClient.auth.signUp({
    email,
     password,
       options: {
      data: {
        full_name: name
              }}});
   if (error) {
    alert("Sign Up Error: " + error.message);
    } else {
    alert("Check your email to confirm sign-up!");   
  }}
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    alert("Login Error: " + error.message);
  } else {
    showUserDetails(data.user);
  }}
async function showUserDetails(user) {
  const { data: userData, error } = await supabaseClient.auth.getUser();
  if (error) {
    document.getElementById("user-info").innerText = "Error retrieving user";
    return;
  }
  const info = `
Name: ${userData.user.user_metadata.full_name}
Email: ${userData.user.email}
ID: ${userData.user.id}
`;
  document.getElementById("user-info").innerText = info;
}
