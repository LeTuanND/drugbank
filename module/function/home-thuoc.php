<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $sql = "select * from thuoc order by so_luong_tim_kiem desc limit 4";

    $query = mysqli_query($conn, $sql);

    $result = array();

    if (mysqli_num_rows($query) > 0){
	    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
	        $result[] = array(
	            'ten_thuoc' => $row['ten_thuoc'],
	            'anh_image' => $row['anh_image']
	        );
	    }
	}
	die (json_encode($result));

?>