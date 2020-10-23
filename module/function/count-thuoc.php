<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $sql = "select count(ID_thuoc) as total from thuoc";


    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0){
	    $row = mysqli_fetch_assoc($query);
	    echo ceil($row['total']/15);
	}

?>