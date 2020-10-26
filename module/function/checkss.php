<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");


	if(isset($_SESSION['username'])) {
		$username = $_SESSION['username'];
		
		$sql = "SELECT * FROM admin WHERE username = '$username' ";

		$query = mysqli_query($conn, $sql);

		if (mysqli_num_rows($query) > 0) {
			$row = mysqli_fetch_assoc($query);
			$result = $row['ho_ten'];
		}
	} else {
		$result = "";
	}

	echo $result;
 ?>