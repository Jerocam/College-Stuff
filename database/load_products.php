<?php

include "dbconnect.php";
$conn = dbConnect();

$item_per_page = 8;
if(isset($_POST["page"])){
    $page_number = filter_var($_POST["page"], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH); //filter number
    if(!is_numeric($page_number)){die('Invalid page number!');} //incase of invalid page number
}else { $page_number = 1;} //if there's no page number, set it to 1

$results = $conn->query("SELECT COUNT(id) FROM new_product");//get total number of records from database
$get_total_rows = $results->fetch_row(); //hold total records in variable
$total_pages = ceil($get_total_rows[0]/$item_per_page);//break records into pages
$page_position = (($page_number-1) * $item_per_page);
$results = "SELECT * FROM new_product LIMIT $page_position, $item_per_page";
    
$query = $conn->query($results);

while($row = $query->fetch_assoc()) {
    $load_id = $row['id']; 
    $load_contact = $row['name_cont'];
    $load_email = $row['email_cont'];
    $load_phone = $row['phone_cont'];
    $load_prodname = $row['product_name'];
    $load_price = $row['product_price'];
    $load_desc = $row['product_desc'];
    $load_categ = $row['product_categ'];
    $load_image = $row['product_img'];

    echo '
    <div class="nlist col-md-3 '.$load_categ.'">
        <div class="card mb-3">
            <div class="dRow">
                <div class="cl1"> 
                    <img src="database/upload/'.$load_image.'" class="card-img-top" alt="img">
                </div>
                <div class="cl2">
                    <div class="card-body">
                        <h5 class="card-title">'.$load_prodname.'</h5>
                        <div class="row">
                            <div class="cl2A col-sm-7">
                                <p class="lead">$'.$load_price.'</p>
                            </div>
                            <div class="cl2B col-sm-6" hidden>
                                <p class="card-text">'.$load_desc.'</p>
                            </div>
                            <div class="cl2C col-sm-5">
                                <button type="button" class="btn btn-md btn-info myBtn btn-block" data-toggle="modal" data-target="#id'.$load_id.'">More Info</button>
                                <!-- Modal -->
                                <div class="modal fade" id="id'.$load_id.'" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Product Information</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <img src="database/upload/'.$load_image.'" class="img-fluid" alt="img">
                                        <hr>
                                        <table class="table">
                                                <thead class="thead-dark">
                                                    <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    <th scope="row">Title</th>
                                                    <td>'.$load_prodname.'</td>
                                                    </tr>
                                                    <tr>
                                                    <th scope="row">Description</th>
                                                    <td>'.$load_desc.'</td>
                                                    </tr>
                                                    <tr>
                                                    <th scope="row">Price</th>
                                                    <td>$'.$load_price.'</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th scope="row">Contact</th>
                                                        <td>'.$load_phone.' / '.$load_email.'</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ';
}

echo '<div class="container">';
    echo paginate_function($item_per_page, $page_number, $get_total_rows[0], $total_pages);
echo '</div>';

function paginate_function($item_per_page, $current_page, $total_records, $total_pages){
    $pagination = '';

    if($total_pages > 0 && $total_pages != 1 && $current_page <= $total_pages){ //verify total pages and current page number
        $pagination .= '<ul class="pagination justify-content-center">';
        
        $right_links    = $current_page + 2;
        $previous       = $current_page - 2; //previous link 
        $next           = $current_page + 1; //next link
        $first_link     = true; //boolean var to decide our first link
        
        if($current_page > 1){
            $previous_link = ($previous<=0)?1:$previous;
            $pagination .= '<li class="first page-item"><a href="javascript:void(0);" data-page="1" title="First" class="page-link">«</a></li>'; //first link
            $pagination .= '<li class="page-item"><a href="javascript:void(0);" data-page="'.$previous_link.'" title="Previous" class="page-link">Prev</a></li>'; //previous link
                for($i = ($current_page-2); $i < $current_page; $i++){ //Create left-hand side links
                    if($i > 0){
                        $pagination .= '<li class="page-item"><a href="javascript:void(0);" data-page="'.$i.'" title="Page'.$i.'" class="page-link">'.$i.'</a></li>';
                    }
                }   
            $first_link = false; //set first link to false
        }
        
        if($first_link){ //if current active page is first link
            $pagination .= '<li class="first page-item active"><a href="javascript:void(0);" class="page-link">'.$current_page.'</a></li>';
        }elseif($current_page == $total_pages){ //if it's the last active link
            $pagination .= '<li class="last page-item active"><a href="javascript:void(0);" class="page-link">'.$current_page.'</a></li>';
        }else{ //regular current link
            $pagination .= '<li class="page-item active"><a href="javascript:void(0);" class="page-link">'.$current_page.'</a></li>';
        }
                
        for($i = $current_page+1; $i < $right_links ; $i++){ //create right-hand side links
            if($i<=$total_pages){
                $pagination .= '<li class="page-item"><a href="javascript:void(0);" data-page="'.$i.'" title="Page '.$i.'" class="page-link">'.$i.'</a></li>';
            }
        }
        if($current_page < $total_pages){ 
				$next_link = ($i > $total_pages)? $total_pages : $i;
                $pagination .= '<li class="page-item"><a href="javascript:void(0);" data-page="'.$next_link.'" title="Next" class="page-link">Next</a></li>'; //next link
                $pagination .= '<li class="last page-item"><a href="javascript:void(0);" data-page="'.$total_pages.'" title="Last" class="page-link">»</a></li>'; //last link
        }
        
        $pagination .= '</ul>'; 
    }
    return $pagination; //return pagination links
}

clearstatcache();
dbClose($conn);

?>

