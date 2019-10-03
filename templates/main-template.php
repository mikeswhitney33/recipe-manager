<?php 
    if(!isset($title)){
        $title = "No Content";
    }
    if(!isset($content)){
        $content = "<h1>No Content</h1>";
    }
    if(!isset($js_scripts)){
        $js_scripts = "";
    }
    if(!isset($css_links)){
        $css_links = "";
    }
?>

<!DOCTYPE HTML>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <title><?php echo $title; ?></title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="/shared/css/master.css">
        <?php echo $css_links; ?>
    </head>
    <body>
        <div class="wrapper">
            <?php include("header.php"); ?>
            <div class="background-image"></div>
            <?php echo $content; ?>
            <?php include("footer.php"); ?>
        </div>
    </body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="/shared/js/master.js"></script>
    <?php echo $js_scripts; ?>
</html>