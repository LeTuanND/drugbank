$("#submit").click(function(event) {
	/* Act on the event */
	$.ajax({
		url: 'module/function/login.php',
		type: 'post',
		dataType: 'text',
		data: {
			username: $("#username").val(),
			password: $("#password").val()
		},
		success: function(result) {
			
			if (result == "") {
				setTimeout(function(){alert("ban da dang nhap thanh cong")}, 2000);;
				location.assign("home.html");
			} else {
				alert(result);
				location.assign("login.html");
			}

		}
	})
});