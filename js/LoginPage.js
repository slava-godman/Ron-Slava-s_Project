$(document).ready(function () {
<<<<<<< HEAD
    $('#loginButton').on('click', function () {
      // Hide the button
      $(this).hide();
  
      // Show the progress bar
      $('#progressWrapper').show();
  
      // Animate progress bar
=======
  $('#loginButton').on('click', function () {
    const email = $('#form2Example1').val();
    const password = $('#form2Example2').val();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Get users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check for matching user
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      // User found -> proceed to login animation
      $(this).hide();
      $('#progressWrapper').show();

>>>>>>> 8a04b049f9facea2fb4a35016386fe932ebf6f29
      let progress = 0;
      const interval = setInterval(function () {
        progress += 1;
        $('#progressBar').css('width', progress + '%').text(progress + '%');
<<<<<<< HEAD
  
=======

>>>>>>> 8a04b049f9facea2fb4a35016386fe932ebf6f29
        if (progress >= 100) {
          clearInterval(interval);
          window.location.href = "app.html";
        }
      }, 70);
<<<<<<< HEAD
    });
  });
  
  
  
=======
    } else {
      // User not found
      alert('Invalid email or password.');
    }
  });
});
>>>>>>> 8a04b049f9facea2fb4a35016386fe932ebf6f29
