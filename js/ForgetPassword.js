$(document).ready(function () {
    $('#forgotPasswordBtn').on('click', function () {
        // Hide button and show progress bar
        $(this).hide();
        $('#forgotProgressBarContainer').show();
        
        let progress = 0;
        const interval = setInterval(function () {
            progress += 1;
            $('#forgotProgressBar').css('width', progress + '%').attr('aria-valuenow', progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(function () {
                    alert('A reset password was successfully sent to your email!');
                    // Optional: Show button again and reset bar
                    $('#forgotPasswordBtn').show();
                    $('#forgotProgressBarContainer').hide();
                    $('#forgotProgressBar').css('width', '0%').attr('aria-valuenow', 0);
                }, 300);
            }
        }, 30); // 30ms per 1% = about 3 seconds total
    });
});
