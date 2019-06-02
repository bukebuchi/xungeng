define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'dispute/index' + location.search,
                    add_url: 'dispute/add',
                    edit_url: 'dispute/edit',
                    del_url: 'dispute/del',
                    multi_url: 'dispute/multi',
                    table: 'dispute',
                }
            });

            var table = $("#table");

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
                        {field: 'category_ids', title: __('Category_ids'), formatter: Table.api.formatter.search},
                        {field: 'hobbydata', title: __('Hobbydata'), searchList: {"music":__('Hobbydata music'),"reading":__('Hobbydata reading'),"swimming":__('Hobbydata swimming')}, operate:'FIND_IN_SET', formatter: Table.api.formatter.label},
                        {field: 'city', title: __('City'), operate: false},
                        {field: 'images', title: __('Images'), events: Table.api.events.image, formatter: Table.api.formatter.images, operate: false},
                        {field: 'keywords', title: __('Keywords'),operate: 'LIKE %...%', formatter: Table.api.formatter.search},
                        
                        {field: 'genderdata', title: __('Genderdata'), searchList: {"male":__('Genderdata male'),"female":__('Genderdata female')}, formatter: Table.api.formatter.normal, operate: false},
                        {field: 'identity', title: __('Identity'), operate: 'LIKE %...%', formatter: Table.api.formatter.search},
                        {field: 'views', title: __('Views'), operate: false},
                        {field: 'title', title: __('Title'), operate: false},
                        {field: 'activitytime', title: __('Activitytime'), formatter: Table.api.formatter.datetime, operate:'RANGE', addclass:'datetimerange', sortable: true},
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