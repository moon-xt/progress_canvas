//index.js
// canvas
let w = "";
let h = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [{
        couponId: 1,
        saleCount:2,
        allCount:10
      },
      {
        couponId: 2,
        saleCount: 3,
        allCount: 8
      },
      {
        couponId: 3,
        saleCount: 10,
        allCount: 25
      }
    ],
  },
  onLoad() {
    this.data.couponList.map((item, index) => {
      this.shadowCanvas("bgCanvas" + item.couponId);
      let num = (item.saleCount / item.allCount).toFixed(2) * 100
      this.drawCanvas(num, "runCanvas" + item.couponId);
    })
  },
  //红色进度条canvas
  drawCanvas(num, id) {
    let allSrc = 0.015 * num; //应该绘制的弧度
    //计算出每个间隔应该绘制多少弧度
    let src = allSrc / 100;
    let n = 0;
    let myTime=setInterval(function(){
      let ctx2 = wx.createCanvasContext(id);
      n++;
      if(src * n >allSrc){
        clearInterval(myTime);
        n=0;
        return;
      }
      //百分数
      let grade = Math.round(src * n / 1.5 * 100);
      ctx2.setLineWidth("6");
      ctx2.setStrokeStyle("#ff1c35");
      ctx2.setLineCap("round");
      ctx2.beginPath();
      ctx2.setFontSize(10);
      ctx2.setTextAlign("center");
      ctx2.setTextBaseline("top");
      ctx2.setFillStyle("#ff1c35");
      ctx2.fillText(grade + "%", w, h);
      ctx2.arc(w, h, w - 8, 0.75 * Math.PI, (0.75 + src * n) * Math.PI, false); //每个间隔绘制的弧度
      ctx2.stroke();
      ctx2.draw();
    },16)
  },
  //透明进度条canvas
  shadowCanvas(id) {
    let ctx = wx.createCanvasContext(id);
    //获取canvas宽的的一半
    w = parseInt(65 / 2);
    //获取canvas高的一半，
    h = parseInt(65 / 2);
    //获取宽高的一半是为了便于找到中心点
    ctx.arc(w, h, w - 8, 0.75 * Math.PI, 2.25 * Math.PI, false); //绘制圆形弧线
    ctx.setStrokeStyle("rgba(255,28,53,0.2)"); //设置填充线条颜色
    ctx.setLineWidth("6");     //设置线条宽度
    ctx.setLineCap("round");        //设置线条端点样式
    ctx.stroke();     //对路径进行描边，也就是绘制线条。
    ctx.draw();       //开始绘制
  },
})