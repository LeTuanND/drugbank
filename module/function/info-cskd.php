<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $cskd = isset($_POST['cskd']) ? $_POST['cskd'] : 0;

    $sql = "select * from co_so_kinh_doanh where ten_cong_ty = '$cskd'";


    $query = mysqli_query($conn, $sql);

    $result = array();


    if (mysqli_num_rows($query) > 0){
	    $row = mysqli_fetch_assoc($query);
	    $result["ten_cty"] = $cskd;
	    $result["dia_chi_tru_so"] = $row["dia_chi_tru_so_chinh"];
	    $result["dia_chi_kinh_doanh"] = $row["dia_chi_kinh_doanh"];
	    $result["loai_hinh_kd"] = $row["loai_hinh_kinh_doanh"];
	    $result["sdt"] = $row["dien_thoai"];
	}
	die (json_encode($result));

?>