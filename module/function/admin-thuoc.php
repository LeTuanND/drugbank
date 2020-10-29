<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $page = isset($_POST['page']) ? $_POST['page'] : 0;
    $search = isset($_POST['search']) ? $_POST['search'] : 0;
    $count = ($page - 1 )*15;

    if ($search === "kocodulieu") {
    	$sql = "select * from co_so_kinh_doanh cskd join thuoc t on t.ID_cong_ty = cskd.ID_cong_ty order by ten_thuoc limit 15 offset $count";
    } else {
    	$sql = "select * from co_so_kinh_doanh cskd join thuoc t on t.ID_cong_ty = cskd.ID_cong_ty where ten_thuoc like '%$search%' order by ten_thuoc limit 15 offset $count";
    }
    



    $query = mysqli_query($conn, $sql);

    $result = array();

    if (mysqli_num_rows($query) > 0){
	    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
	        $result[] = array(
	            'so_dki' => $row['so_dang_ki'],
	            'ten_thuoc' => $row['ten_thuoc'],
	            'hoat_chat' => $row['hoat_chat'],
	            'cty' => $row['ten_cong_ty']
	        );
	    }
	}
	die (json_encode($result));

?>