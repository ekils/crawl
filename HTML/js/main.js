requirejs.config({

    baseUrl: 'js',   // 設定根目錄
    paths: {        //  要讀取的js檔案
        js: 'demo',
        js2:'demo2',
        js3:'demo3'
    },
    shim: {        // 透過shim設定之後equirejs讀取順序
        'demo':{
            exports:'demo' // export：全局變數名稱
        },
        'demo2':{
            exports:'demo2'
        },
        'demo3':{
            exports:'demo3'
        }
    }

});

// requirejs(['demo2','demo']); //輸出順序
requirejs(['demo3']); //輸出順序
