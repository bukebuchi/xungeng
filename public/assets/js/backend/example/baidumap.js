define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {
    var Controller = {
        index: function () {
            //
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'example/baidumap/index',
                    add_url: 'example/baidumap/add',
                    edit_url: 'example/baidumap/edit',
                    del_url: 'example/baidumap/del',
                    multi_url: 'example/baidumap/multi',
                    table: '',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                [
                {checkbox: true},
                {field: 'id', title: 'ID', operate: false},
                {field: 'admin_id', title: __('Admin_id'), visible: false, operate: false},
                {field: 'username', title: __('Username'), formatter: Table.api.formatter.search},
                {field: 'title', title: __('Title')},
                {field: 'url', title: __('Url'), align: 'left'},
                {field: 'ip', title: __('IP')},
                {field: 'createtime', title: __('Create time'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
                {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        map: function () {
            Form.api.bindevent($("form[role=form]"));
            require(['async!BMap'], function () {
                // 更多文档可参考 http://lbsyun.baidu.com/jsdemo.htm
                // 百度地图API功能
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.404, 39.915);

                map.centerAndZoom(point, 13); //设置中心坐标点和级别
                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);               // 将标注添加到地图中
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

                map.enableDragging();   //开启拖拽
                //map.enableInertialDragging();   //开启惯性拖拽
                map.enableScrollWheelZoom(true); //是否允许缩放
                //map.centerAndZoom("上海",15); //根据城市名设定地图中心点
                var mapObj = new AMap.Map('allmap');
                //加载定位插件
                mapObj.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                });
                mapObj.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                //AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
                var geolocation = new BMap.Geolocation();
                // geolocation.getCurrentPosition(function (r) {
                //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                //         var mk = new BMap.Marker(r.point);
                //         map.addOverlay(mk);
                //         map.panTo(r.point);
                //         Layer.alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                //     } else {
                //         Layer.alert('failed' + this.getStatus());
                //     }

    }

    function onComplete(data) {
        if ("SUCCESS" == data.info) {
            //高德地图转百度地图坐标
            //因为系统中使用的均是百度的坐标,此处需要将高德坐标转换成百度坐标
            var ggPoint = new BMap.Point(data.position.lng, data.position.lat);
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(ggPoint);
            //坐标转换方法的意义可以查询 http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition
            convertor.translate(pointArr, 3, 5, function (data) {
                if (data.status === 0) {
                    $scope.gisLoc = data.points[0].lng + "," + data.points[0].lat;
                }
            })
            fulladdress = data.formattedAddress;
            $scope.gis = fulladdress;
            $scope.gisInfo = "";
        } else {
            $scope.gisInfo = "地址解析失败";
        }
    }



                // 点搜索按钮时解析地址坐标
                $(document).on('click', '.btn-search', function () {
                    // 创建地址解析器实例
                    var myGeo = new BMap.Geocoder();
                    // 将地址解析结果显示在地图上,并调整地图视野
                    myGeo.getPoint($("#searchaddress").val(), function (point) {
                        if (point) {
                            map.centerAndZoom(point, 16);
                            map.addOverlay(new BMap.Marker(point));
                        } else {
                            Layer.alert("您选择地址没有解析到结果!");
                        }
                    });
                });

            });
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});