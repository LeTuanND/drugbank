<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $sql = "select * from co_so_kinh_doanh order by sl_tim_kiem desc limit 4";

    $query = mysqli_query($conn, $sql);

    $result = array();

    if (mysqli_num_rows($query) > 0){
	    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
	        $result[] = array(
	            'ten_cong_ty' => $row['ten_cong_ty'],
	            'dien_thoai' => $row['dien_thoai'],
	            'lhkd' => $row['loai_hinh_kinh_doanh'],
	        );
	    }
	}
	die (json_encode($result));

?>