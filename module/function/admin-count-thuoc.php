<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $search = isset($_POST['search']) ? $_POST['search'] : 0;

    if ($search === "kocodulieu") {
    	$sql = "select count(ID_thuoc) as total from thuoc";
    } else {
    	$sql = "select count(ID_thuoc) as total from thuoc where ten_thuoc like '%$search%'";
    }

    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0){
	    $row = mysqli_fetch_assoc($query);
	    echo ceil($row['total']/15);
	}

?>