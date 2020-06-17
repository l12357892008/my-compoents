/**计算多行文本输入域高度 */

let hiddenTextarea;  // 专门用来模拟传进来的textarea，用于计算高度

// 隐藏样式，加上这个后就实存名亡
const HIDDEN_STYLE = `
  height: 0 !important;
  visibility: hidden !important;
  overflow: hidden !important;
  position: absolute !important;
  z-index: -10000 !important;
  top: 0 !important;
  right: 0 !important;
`;

// 将需要计算的样式属性打包成数组，后面直接循环调用减少代码冗余
const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]


function calculateNodeStyling(targetElement) {
  // window.getComputedStyle(a) 返回a元素计算后的样式，只读
  // 拿到目标元素真实的style数据(计算后的)
  const style = window.getComputedStyle(targetElement)
  // .getPropertyValue('padding-bottom')  从element.style或window.getComputedStyle(a)中获取指定css属性的值
  const boxSizing = style.getPropertyValue('box-sizing');

  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) + 
    parseFloat(style.getPropertyValue('padding-top'))
  )

  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) + 
    parseFloat(style.getPropertyValue('border-top-width'))
  )

  const contextStyle = CONTEXT_STYLE.map(name => `${name} : ${style.getPropertyValue(name)}`).join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}

/**
 * 动态计算 textarea 的高度
 * @param {*} targetElement 需要计算高度的目标元素
 * @param {*} minRows 最小行，默认 1
 * @param {*} maxRows 最大行，默认 null
 */
export default function calcTextareaHeight(targetElement,minRows = 1,maxRows = null) {
  // 创建一个textarea元素放到body里,用它来模拟目标textarea元素
  // 所有的对元素的操作都用它来代替，避免改变了目标元素的内容或样式
  if(!hiddenTextarea) {  
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // 解构赋值
  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetElement);

  // 用hiddenTextarea模拟目标元素，并隐藏掉(只需要它CONTEXT_STYLE里的属性),用来计算高度
  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  // overflow:hidden和height:0不会压缩子元素的高度
  // scrollHeight 是一个元素内容的高度，包括由于溢出不可见的内容，包含padding
  let height = hiddenTextarea.scrollHeight;  
  const result = {};

  // 根据盒模型计算真实高度
  if (boxSizing === 'border-box'){
    height = height + borderSize
  } else if (boxSizing === 'content-box'){
    height = height - paddingSize
  }

  // 通过将内容置为空来计算单行文本所占高度
  hiddenTextarea.value = '';
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if(!!minRows){
    let minHeight = singleRowHeight * minRows;
    if(boxSizing === 'border-box'){
      minHeight = minHeight + paddingSize + borderSize;
    }
    // 最小高度取两者最大的
    height = Math.max(minHeight,height)
  }
  result.minHeight = `${height}px`;

  // 用完销毁
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
} 
