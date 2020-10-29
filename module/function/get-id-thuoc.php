<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $thuoc = isset($_POST['thuoc']) ? $_POST['thuoc'] : 0;


    $sql = "select * from thuoc where ten_thuoc = '$thuoc' limit 1";


    $query = mysqli_query($conn, $sql);


    if (mysqli_num_rows($query) > 0){
	    $row = mysqli_fetch_assoc($query);
	   	$result = $row["ID_thuoc"];
	}
	echo $result;

?>