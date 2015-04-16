cordova.define("com.msopentech.indexedDB.RequireWebSql", function(require, exports, module) { window.openDatabase = window.openDatabase || require('com.msopentech.websql.WebSQL').openDatabase;

});
