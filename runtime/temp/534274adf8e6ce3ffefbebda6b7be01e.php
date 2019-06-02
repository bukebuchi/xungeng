<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:77:"D:\wamp64\xungeng\public/../application/admin\view\cwmap\maplocation\map.html";i:1559272051;s:57:"D:\wamp64\xungeng\application\admin\view\common\meta.html";i:1557482264;s:59:"D:\wamp64\xungeng\application\admin\view\common\script.html";i:1557482264;}*/ ?>

<!DOCTYPE html>
<html lang="<?php echo $config['language']; ?>">
    <head>
        <meta charset="utf-8">
<title><?php echo (isset($title) && ($title !== '')?$title:''); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit">

<link rel="shortcut icon" href="/assets/img/favicon.ico" />
<!-- Loading Bootstrap -->
<link href="/assets/css/backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.css?v=<?php echo \think\Config::get('site.version'); ?>" rel="stylesheet">

<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
<!--[if lt IE 9]>
  <script src="/assets/js/html5shiv.js"></script>
  <script src="/assets/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
    var require = {
        config:  <?php echo json_encode($config); ?>
    };
</script>
        <style type="text/css">
            body, html,#allmap{width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
            #search{position:absolute;top:20px;left:20px;}
        </style>
    </head>

    <body class="inside-header inside-aside <?php echo defined('IS_DIALOG') && IS_DIALOG ? 'is-dialog' : ''; ?>">
        <div class="container-fluid" id="search">
            <div class="row">
                <div class="col-xs-12 col-sm-4">
                    <form role="form" action="">
                        <div class="input-group" style="width:300px;">
                            <input type="text" id="searchaddress" class="form-control" data-primary-key="locationname" data-source="" />
                            <span class="input-group-btn">
                                <button class="btn btn-success btn-search" type="button"><?php echo __('Search'); ?></button>
                            </span>
                        </div>
                    </form>
                    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
                </div>
            </div>
        </div>
        <div id='allmap'></div>
        <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo $site['version']; ?>"></script>
    </body>
</html>