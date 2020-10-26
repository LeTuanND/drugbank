<?php  
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = "";

	if ($_POST['username'] != "" && $_POST['password'] != "") {
			# code...
		$username = $_POST['username'];
		$password = $_POST['password'];

		$sql = "SELECT * FROM admin WHERE username = '$username' AND password = md5('$password')";

		$check = mysqli_query($conn, $sql);

		if (mysqli_num_rows($check) > 0) {
			$_SESSION['username'] = $username;
			
		} else {
			$result = "sai tai khoan hoac ten dang nhap";
		}
	} else {
		$result = "vui long nhap đầy đủ";
	}

	


	echo $result;

?>