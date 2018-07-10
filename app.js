// // 能够开启http服务 引入http模块
// let http = require("http");

// // 生成路径 path
// let path = require("path");

// // 引入文件系统
// let fs = require("fs");

// // 配置网站的根目录
// let rootPath = path.join(__dirname, "www");
// // console.log('根目录是:',rootPath);

// // 开启服务
// http
//   .createServer((request, response) => {
//     // console.log('请求来了');
//     // console.log(request.url);
//     // 根据请求的url 生成静态资源服务器中的绝对路径
//     let filePath = path.join(rootPath, request.url);
//     // console.log(filePath);
//     // 判断访问的这个目录是否存在
//     let isExist = fs.existsSync(filePath);
//     // 如果存在
//     if (isExist) {
//       // 只有存在才需要继续走
//       // 生成文件列表
//       fs.readdir(filePath, (err, files) => {
//         // 如果是文件
//         if (err) {
//           console.log(err);
//           // console.log('不是文件夹');
//           // 能够进到这里 说明是文件
//           // 读取文件 返回读取的文件
//           fs.readFile(filePath, (err, data) => {
//             // 直接返回
//             response.end(data);
//           });
//         }
//         // 如果是文件夹 
//         else {
//           console.log(files);
//           // 直接判断是否存在首页
//           if (files.indexOf("index.html") != -1) {
//             console.log("有首页");
//             // 读取首页即可
//             fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
//                 if(err){
//                     console.log(err);
//                 }else{
//                     response.end(data);
//                 }
//             })
//           }
//           // 如果没有首页
//           else {
//             // 没有首页
//             let backData = "";
//             for (let i = 0; i < files.length; i++) {
//               backData += `<h2><a href="./${files[i]}">${files[i]}</a></h2>`;
//             }
//             response.writeHead(200, {
//               "content-type": "text/html;charset=utf-8"
//             });
//             response.end(backData);
//           }
//         }
//       });
//     } else {
//       // 不存在 返回 404
//       response.writeHead(404, {
//         "content-type": "text/html;charset=utf-8"
//       });
//       response.end(`
//                 <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
//                 <html><head>
//                 <title>404 Not Found</title>
//                 </head><body>
//                 <h1>Not Found</h1>
//                 <p>The requested URL /index.hththt was not found on this server.</p>
//                 </body></html>
//         `);
//     }
//     // console.log(filePath,isExist);

//     // 响应内容
//     // response.end('you come')
//   })
//   .listen(80, "127.0.0.1", () => {
//     console.log("开始监听 127.0.0.1:80");
//   });

// 开启http
let http = require('http');
// 生成路径
let path = require('path');
// 引入文件
let fs = require('fs');
// require mime模块  是第三方模块
let mime=require('mime');
// 引入querystring模块
let querystring=require('querystring');
// 配置网站根目录
let rootpath = path.join(__dirname,'www');
// 开启服务
http.createServer((request,response)=>{
    // 根据请求的url，生成静态资源服务器中的绝对路径
    let filepath=path.join(rootpath,querystring.unescape(request.url));
    // 判断访问的这个目录是否存在
    let isexist = fs.existsSync(filepath);
    // 如果存在这个目录，那么就进到这里
    if(isexist){
      //如果存在，就进入到这里，进入这里之后判断是文件还是文件夹？
      // 读取文件
      fs.readdir(filepath,(err,files)=>{
        // console.log(err);
        // console.log(files);
        if(err){
          // 如果是文件,进到这里
          // 读取文件
          fs.readFile(filepath,(err,data)=>{
            // 读取完文件判断文件的类型，是css还是html还是mp4格式等等
            if(err){
              console.log(err);
            }else{
              response.writeHead(200,{
                "content-type":mime.getType(filepath)
              })
              response.end(data);
            }
          })
        }else{
          // 如果是文件夹，进到这里
          // 直接判断有没首页index.html页面；
          if(files.indexOf("index.html") != -1){
            // 进到这里说明有首页
            // 读取文件，返回首页
            fs.readFile(path.join(filepath,'index.html'),(err,data)=>{
              if(err){
                console.log(err);
              }else{
                response.end(data);
              }
            });
          }else{
            // 进到这里，说明没有首页
            //遍历目录，并且返回目录列表，包a标签，可以点击跳转
            let backData='';
            for(let i = 0;i<files.length;i++){
              // 根目录request.url=>/
              backData+=`<h2><a href="${request.url=="/"?"":request.url}/${files[i]}">${files[i]}</a><h2>`
            }
            response.writeHead(200,{
              "content-type":"text/html;charset=utf-8"
            })
            response.end(backData);
          }
        }
      })
    }else{
      // 进到这里说明没有这个目录，就返回404
      response.writeHead(404,{
        "content-type": "text/html;charset=utf-8"
      });
      response.end(`
          <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
          <html><head>
          <title>404 Not Found</title>
          </head><body>
          <h1>Not Found</h1>
          <p>The requested URL /index.hththt was not found on this server.</p>
          </body></html>
      `);
    }
}).listen(80,'127.0.0.1',()=>{
  console.log('开始监听 127.0.0.1:80');
});