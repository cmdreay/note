
/* test case*/
JsLoader.allowCrosArg = true;
// JsLoader.loadFiles('./test1.js');
JsLoader.loadFiles(['./test2.js','test1.js','./test1.js?v=2']);
JsLoader.load('https://static.adzerk.net/ados.js');
