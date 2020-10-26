<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $thuoc = isset($_POST['thuoc']) ? $_POST['thuoc'] : 0;

    $sql = "UPDATE thuoc SET so_luong_tim_kiem = so_luong_tim_kiem + 1 WHERE ten_thuoc = '$thuoc'";

    $query = mysqli_query($conn, $sql);

    $sql = "select * from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty where ten_thuoc = '$thuoc' order by so_luong_tim_kiem desc limit 1";


    $query = mysqli_query($conn, $sql);

    $result = array();


    if (mysqli_num_rows($query) > 0){
	    $row = mysqli_fetch_assoc($query);
	    $result["ten_thuoc"] = $thuoc;
	    $result["so_dang_ki"] = $row["so_dang_ki"];
	    $result["hoat_chat"] = $row["hoat_chat"];
	    $result["quy_cach_dong_goi"] = $row["quy_cach_dong_goi"];
	    $result["dang_bao_che"] = $row["dang_bao_che"];
	    $result["han_su_dung"] = $row["han_su_dung"];
	    $result["ten_cong_ty"] = $row["ten_cong_ty"];
	    $result["gia_thanh"] = $row["gia_thanh"];
	    
	}
	die (json_encode($result));

?>