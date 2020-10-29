// kiểm tra đăng nhập
$.ajax({
    url: 'module/function/checkss.php',
    type: 'post',
    dataType: 'text',
    
    success: function(result) {
        if (result != "") {
            $('.user .nav-link').text('Xin Chào: ' + result.toUpperCase());
            $('.user').css('visibility', 'visible');
            $('.dangnhap .nav-link').text("ĐĂNG XUẤT");
            $('.dangnhap .nav-link').attr('href', './module/function/logout.php');

            $('.admin').css('visibility', 'visible');
        } else {
            $('.user').css('visibility', 'hidden');

            $('.dangnhap .nav-link').text("ĐĂNG NHẬP");
            $('.dangnhap .nav-link').attr('href', 'login.html');

            $('.admin').css('visibility', 'hidden');
        }
    }
});