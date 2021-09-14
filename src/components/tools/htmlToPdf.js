 
 
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */

function downloadPDF(element, pdfName) {
  html2canvas(element, {
     logging:false
  }).then(function(canvas) {
     var pdf = new JsPDF('p', 'mm', 'a4');//A4纸，纵向
       var ctx = canvas.getContext('2d'),
        a4w = 190, a4h = 257,//A4大小，210mm x 297mm，左右保留10mm，上下保留20mm的边距，显示区域190x257
          imgHeight = Math.floor(a4h * canvas.width / a4w),//按A4显示比例换算一页图像的像素高度
          renderedHeight = 0;
     
     var headCont = document.getElementById("head-cont");//放在页眉的图标
     var footCont = document.getElementById("foot-cont");//放在页眉的图标
     while(renderedHeight < canvas.height) {
       var page = document.createElement("canvas");
       page.width = canvas.width;
       page.height = Math.min(imgHeight, canvas.height - renderedHeight);//可能内容不足一页
       
       //用getImageData剪裁指定区域，并画到前面创建的canvas对象中
       page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
       //添加图像到页面，保留10mm/20mm边距
       pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 20, a4w, Math.min(a4h, a4w * page.height / page.width));
       //添加页眉logo
       pdf.addImage(headCont, 'PNG', 0, 0);
       pdf.addImage(footCont, 'PNG', 0, 275);
       
       renderedHeight += imgHeight;
       if(renderedHeight < canvas.height) {
         pdf.addPage();//如果后面还有内容，添加一个空页
       }
       // delete page;
     }
     
     pdf.save(pdfName);
   });
}

// function downloadPDF(ele, pdfName){

//     let eleW = ele.offsetWidth;// 获得该容器的宽
//     let eleH = ele.offsetHeight;// 获得该容器的高
//     let eleOffsetTop = ele.offsetTop;  // 获得该容器到文档顶部的距离
//     let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离

//     var canvas = document.createElement("canvas");
//     var abs = 0;

//     let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
//     let win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

//     if(win_out>win_in){
//         // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
//         abs = (win_out - win_in)/2;    // 获得滚动条宽度的一半
//         // console.log(a, '新abs');
//     }
//     canvas.width = eleW * 2;    // 将画布宽&&高放大两倍
//     canvas.height = eleH * 2;

//     var context = canvas.getContext("2d");
//     context.scale(2, 2);
//     context.translate(-eleOffsetLeft -abs, -eleOffsetTop);
//     // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
//     // translate的时候，要把这个差值去掉

//     // html2canvas(element).then( (canvas)=>{ //报错
//     // html2canvas(element[0]).then( (canvas)=>{
//     html2canvas( ele, {
//         dpi: 300,
//         // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
//         useCORS:true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
//     } ).then( (canvas)=>{
//         var contentWidth = canvas.width;
//         var contentHeight = canvas.height;
//         //一页pdf显示html页面生成的canvas高度;
//         var pageHeight = contentWidth / 592.28 * 841.89;
//         //未生成pdf的html页面高度
//         var leftHeight = contentHeight;
//         //页面偏移
//         var position = 61;
//         //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//         var imgWidth = 595.28;
//         var imgHeight = 595.28/contentWidth * contentHeight - 61;
//         var pageData = canvas.toDataURL('image/jpeg', 1.0);
//         var pdf = new JsPDF('', 'pt', 'a4');

//         var headCont = document.getElementById("head-cont");

//         //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//         //当内容未超过pdf一页显示的范围，无需分页
//         if (leftHeight < pageHeight) {
//             //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
//             pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
//             // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
//             //添加页眉logo
//             pdf.addImage(headCont, 'PNG', 0, 0, imgWidth, 61);
//         } else {    // 分页
//             while(leftHeight > 0) {
//                 pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
//                 pdf.addImage(headCont, 'PNG', 0, 0, imgWidth, 61);
//                 leftHeight -= pageHeight;
//                 position -= (841.89 - 61);
//                 //避免添加空白页
//                 if(leftHeight > 0) {
//                     pdf.addPage();
//                 }
//             }
//         }
//         //可动态生成
//         pdf.save(pdfName);
//     })
// }

// function downloadPDF(ele, pdfName, cb) {
//   html2canvas(ele, {
//     scale: 2,
//     dpi: 300,
//     // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
//     useCORS: true //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
//   }).then(canvas => {
//     //未生成pdf的html页面高度
//     var leftHeight = canvas.height;

//     var a4Width = 190;
//     var a4Height = 277; //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
//     //一页pdf显示html页面生成的canvas高度;
//     var a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height);

//     //pdf页面偏移
//     var position = 0;

//     var pageData = canvas.toDataURL("image/jpeg", 1.0);

//     var pdf = new JsPDF("p", "mm", "a4"); //A4纸，纵向
//     var index = 1,
//       canvas1 = document.createElement("canvas"),
//       height;
//     pdf.setDisplayMode("fullwidth", "continuous", "FullScreen");
//     function createImpl(canvas) {
//       console.log(leftHeight, a4HeightRef);
//       if (leftHeight > 0) {
//         index++;

//         var checkCount = 0;
//         if (leftHeight > a4HeightRef) {
//           var i = position + a4HeightRef;
//           for (i = position + a4HeightRef; i >= position; i--) {
//             var isWrite = true;
//             for (var j = 0; j < canvas.width; j++) {
//               var c = canvas.getContext("2d").getImageData(j, i, 1, 1).data;

//               if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
//                 isWrite = false;
//                 break;
//               }
//             }
//             if (isWrite) {
//               checkCount++;
//               if (checkCount >= 10) {
//                 break;
//               }
//             } else {
//               checkCount = 0;
//             }
//           }
//           height =
//             Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
//           if (height <= 0) {
//             height = a4HeightRef;
//           }
//         } else {
//           height = leftHeight;
//         }

//         canvas1.width = canvas.width;
//         canvas1.height = height;

//         console.log(index, "height:", height, "pos", position);

//         var ctx = canvas1.getContext("2d");
//         ctx.drawImage(
//           canvas,
//           0,
//           position,
//           canvas.width,
//           height,
//           0,
//           0,
//           canvas.width,
//           height
//         );

//         var pageHeight = Math.round((a4Width / canvas.width) * height);
//         // pdf.setPageSize(null, pageHeight)
//         if (position != 0) {
//           pdf.addPage();
//         }
//         pdf.addImage(
//           canvas1.toDataURL("image/jpeg", 1.0),
//           "JPEG",
//           10,
//           10,
//           a4Width,
//           (a4Width / canvas1.width) * height
//         );
//         leftHeight -= height;
//         position += height;
//         if (leftHeight > 0) {
//           setTimeout(createImpl, 500, canvas);
//         } else {
//           pdf.save(pdfName);
//         }
//       }
//     }

//     //当内容未超过pdf一页显示的范围，无需分页
//     if (leftHeight < a4HeightRef) {
//       pdf.addImage(
//         pageData,
//         "JPEG",
//         0,
//         0,
//         a4Width,
//         (a4Width / canvas.width) * leftHeight
//       );
//       pdf.save(pdfName);
//     } else {
//       try {
//         pdf.deletePage(0);
//         setTimeout(createImpl, 500, canvas);
//       } catch (err) {
//         // console.log(err);
//       }
//     }
//     cb && cb();
//   });
// }
export default {
    downloadPDF
}