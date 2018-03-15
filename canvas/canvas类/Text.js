export default class Line {
  constructor(props) {
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.startX = 0;
    this.startY = 0;
    this.text = 'abc'; //文字内容
    this.fontColor = 'red'; //文字颜色
    this.strokeStyle = ''; //描边颜色
    this.fontSize = 12; //字体大小
    this.textBaseline = 'top'; //文字上下对齐方式
    this.fontFamily = 'Arial'; //字体
    this.textAlign = 'center'; //文字左右对齐方式
    Object.assign(this, props);
    return this;
  }
  render(ctx) {
    let {
      x,
      y,
      rotation,
      startX,
      startY,
      text,
      fontColor,
      strokeStyle,
      fontSize,
      textBaseline,
      fontFamily,
      textAlign
    } = this;
    rotation = rotation * Math.PI / 180;
    ctx.save();
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.fillStyle = fontColor;
    ctx.strokeStyle = strokeStyle;
    ctx.textBaseline = textBaseline;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.fillText(text, startX, startY);
    if (strokeStyle) ctx.stroke();
    ctx.stroke();
    ctx.restore();
  }
}