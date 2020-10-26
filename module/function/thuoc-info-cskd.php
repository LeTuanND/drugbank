<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $cskd = isset($_POST['cskd']) ? $_POST['cskd'] : 0;

   	$sql = "select * from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty where cskd.ten_cong_ty = '$cskd' order by so_luong_tim_kiem desc limit 6";

    $query = mysqli_query($conn, $sql);

    $result = array();

    if (mysqli_num_rows($query) > 0){
	    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
	        $result[] = array(
	            'ten_thuoc' => $row['ten_thuoc'],
	            'so_dang_ki' => $row['so_dang_ki'],
	            'hoat_chat' => $row['hoat_chat'],
	            'gia_thanh' => $row['gia_thanh']
	        );
	    }
	}
	die (json_encode($result));

?>