define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'traffic/index' + location.search,
                    add_url: 'traffic/add',
                    edit_url: 'traffic/edit',
                    del_url: 'traffic/del',
                    multi_url: 'traffic/multi',
                    table: 'traffic',
                }
            });

            var table = $("#table");
//给添加按钮添加`data-area`属性
            $(".btn-add").data("area", ["100%", "100%"]);
            //当内容渲染完成给编辑按钮添加`data-area`属性
            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                $(".btn-editone").data("area", ["100%", "100%"]);
            });
            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                search: false,
                commonSearch: true,
                searchFormVisible: true,
                searchFormTemplate: 'customformtpl',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'category_ids', title: __('Category_ids'),formatter: Table.api.formatter.search},
                        {field: 'addressname', title: __('Addressname'),operate: false},
                        {field: 'activitytime', title: __('Activitytime'), operate:'RANGE', addclass:'datetimerange', sortable: true},
                        {field: 'images', title: __('Images'), events: Table.api.events.image, formatter: Table.api.formatter.images, operate: false},
                        {field: 'hobbydata', title: __('Hobbydata'), searchList: {"qd":__('Hobbydata qd'),"sd":__('Hobbydata sd'),"xc":__('Hobbydata xc')}, operate:'FIND_IN_SET', formatter: Table.api.formatter.label, operate: false},
                        {field: 'keywords', title: __('Keywords'), operate: false},
                        {field: 'age', title: __('Age'), operate: false},
                        {field: 'identity', title: __('Identity'), operate: false},
                        {field: 'city', title: __('City'), operate: false},
                        {field: 'telhone', title: __('Telhone'), operate: false},
                        {field: 'genderdata', title: __('Genderdata'), searchList: {"male":__('Genderdata male'),"female":__('Genderdata female')}, formatter: Table.api.formatter.normal, operate: false},
                        {field: 'addcontent', title: __('Addcontent'), operate: false},
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
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});