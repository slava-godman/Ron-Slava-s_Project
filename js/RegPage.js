$(document).ready(function () {
    $('#register').on('click', function () {
      const email = $('#form2Example1').val().trim();
      const password = $('#form2Example2').val().trim();

      console.log("Email:", email);
      console.log("Password:", password);
  
      if (!email || !password) {
        alert('Please fill in all fields.');
        return;
      }
  
      // Get existing users from localStorage
      let users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Check if user already exists
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        alert('User already exists.');
        return;
      }
  
      // Add new user
      users.push({ email: email, password: password });
  
      // Save back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Registration successful!');
    });
  });
  