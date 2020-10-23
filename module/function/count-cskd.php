<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $sql = "select count(ID_cong_ty) as total from co_so_kinh_doanh";


    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0){
	    $row = mysqli_fetch_assoc($query);
	    echo ceil($row['total']/10);
	}

?>