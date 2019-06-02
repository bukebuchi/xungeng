require.config({
    paths: {
        'async': '../addons/cwmap/js/async',
        'BMap3': ['//api.map.baidu.com/api?v=3.0&ak=1KIoG8gRdLjwimAWjqgo8VhXnrzit74O'],
    },
    shim: {
        'BMap3': {
            deps: ['jquery'],
            exports: 'BMap3'
        }
    }
});
