<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $sql = "select * from co_so_kinh_doanh";

    $query = mysqli_query($conn, $sql);

    $result = array();

    if (mysqli_num_rows($query) > 0){
	    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
	        $result[] = array(
	            'ten_cong_ty' => $row['ten_cong_ty'],
	            'tru_so' => $row['dia_chi_tru_so_chinh'],
	            'loai_hinh_kinh_doanh' => $row['loai_hinh_kinh_doanh']
	        );
	    }
	}
	die (json_encode($result));

?>