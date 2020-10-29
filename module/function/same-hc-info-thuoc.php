<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $thuoc = isset($_POST['thuoc']) ? $_POST['thuoc'] : 0;


    $sql = "select * from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty where ten_thuoc = '$thuoc' order by so_luong_tim_kiem desc limit 1";


    $query = mysqli_query($conn, $sql);

    $result = array();


    if (mysqli_num_rows($query) > 0){

    	//lấy hoạt chất của thuốc đó
	    $row = mysqli_fetch_assoc($query);
	    $hoatchat = $row['hoat_chat'];

	 //    $rutgon1 = explode(';', $hoatchat);
		// $rutgon2 = explode('-', $rutgon1[0]);
		// $rutgon = rtrim($rutgon2[0]);

		//lấy hoạt chất đầu tiên
	    $rutgon1 = explode(';', $hoatchat);
		$rutgon2 = explode('-', $rutgon1[0]);
		$rutgon3 = rtrim($rutgon2[0]);
		$rutgon = "";

		for ($i = 0; $i < strlen($rutgon3); $i ++) {
			if (is_numeric($rutgon3[$i]) ) {
				break;
			} else {
				$rutgon = $rutgon . $rutgon3[$i];
			}
		}
		$rutgon = rtrim($rutgon);

		//tìm kiếm các thuốc có hoạt chất đó
		$sql = "select * from thuoc where ten_thuoc != '$thuoc' and hoat_chat like '%$rutgon%' order by so_luong_tim_kiem desc limit 8";

		$query = mysqli_query($conn, $sql);

		if (mysqli_num_rows($query) > 0){
		    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
		    	
		        $result[] = array(
		            'ten_thuoc' => $row['ten_thuoc'],
		            'so_dang_ki' => $row['so_dang_ki'],
		            'hoat_chat' => $row['hoat_chat']
		        );
		    }
		}
	}

	

	die (json_encode($result));

?>