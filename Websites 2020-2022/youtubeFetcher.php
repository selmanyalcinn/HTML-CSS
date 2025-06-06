<?php
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit'])){
    $url = $_POST['url'];
    
    
}

function getYoutubeVideoID($url){

    $queryString = parse_url($url,PHP_URL_QUERY);
    parse_str($queryString,$params);
    // var_dump($queryString);
    // die();
    if(isset($params['v']) && strlen($params['v'])>0){
        return $params['v'];
    }else{
        return "Wrong youtube video url";
    }
}
$vidEoID = getYoutubeVideoID($url);
$api_key = ""; //your API Key
$api_ur='https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='.getYoutubeVideoID($url).'&key='.$api_key;

$data = json_decode(file_get_contents($api_ur));
// echo "<pre>";
// print_r($data);
// echo "</pre>";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Youtube Video Detials</title>
</head>
<body>
    <form action="#" method="POST">
    <label for="">Enter video URL</label>
    <input type="text" name="url" paceholder="Enter video url">
    <input type="submit" name="submit" value="submit">
    </form>

    <hr>
  
    <table>
    <tr>
        <td>
            <img src="https://img.youtube.com/vi/$vidEoID/0.jpg" alt="">
        </td>
    </tr>
        <tr>
            <td>Title</td>
            <td><?php echo $data->items['0']->snippet->title;?></td>
        </tr>
        <tr>
            <td>published Time</td>
            <td><?php echo $data->items['0']->snippet->publishedAt;?></td>
        </tr>
        <tr>
            <td>Duration</td>
            <td><?php echo $data->items['0']->contentDetails->duration;?></td>
        </tr>
        <tr>
            <td>View</td>
            <td><?php echo $data->items['0']->statistics->viewCount;?></td>
        </tr>
        <tr>
            <td>Like</td>
            <td><?php echo $data->items['0']->statistics->likeCount;?></td>
        </tr>
        <tr>
            <td>Dislike</td>
            <td><?php echo $data->items['0']->statistics->dislikeCount;?></td>
        </tr>
        <tr>
            <td>Comment</td>
            <td><?php echo $data->items['0']->statistics->commentCount;?></td>
        </tr>
    </table>
</body>
</html>