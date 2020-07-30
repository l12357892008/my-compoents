import { once, on } from 'element-ui/src/utils/dom';

// 新建vue自定义指令,用于同时处理单击和长按
/**自定义指令钩子函数
 * bind: 只调用一次,指令第一次绑定到元素时调用.在这里进行一次性初始化设置
 * inserted: 被绑定元素插入父节点时调用(仅保证父节点存在,但不一定已被插入文档中)
 * update: 所在组件的VNode更新时调用,但可以发生在其子VNode更新之前
 * componentUpdated: 指令所在组件的VNode及其子VNode全部更新后调用
 * unbind: 只调用一次,指令与元素解绑时调用
 */
/**钩子函数参数
 * el: 指令所绑定的元素, 可以用来直接操作dom
 * binding: 一个对象，包含以下property:
 *    name: 指令名,不包含v-前缀
 *    value: 指令的绑定值,如v-my-dd='1+1' ，绑定值为2
 *    oldValue: 指令绑定的前一个值,仅在update和componentUpdated中可用
 *    expression: 字符串形式的指令表达式,如v-my-dd='1+1' ，表达式为"1+1"
 *    arg: 传给指令的参数，如 v-my-directive:foo 中，参数为 "foo"
 *    modifiers: 一个包含修饰符的对象，如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }
 * vnode: Vue编译生成的虚拟节点
 * oldVnode: 上一个虚拟节点，仅在update和componentUpdated中可用
 */
export default {
  bind(el, binding, vnode) {
    let interval = null;
    let startTime;

    const handler = () => vnode.context[binding.expression].apply();
    /*const handler = () => vnode.context[binding.expression].apply();
      这句话只能说非常高深,得看了源码才能写出来.vnode时vue生成的虚拟节点用于模拟对应真实dom,
      就是一个js对象,里面context指向一个component类型的数据,component就是组件,所以context
      就是该vnode所在的组件的上下文.再binding.expression在inputNumber组件的例子里就是指'decrease'或'increase'
      这个函数,∴context[binding.expression]在该例中就是context['decrease']或context.decrease.
      既然context指向所在组件的上下文,在inputNumber例子中就相当于inputNumber里的this.decrease，取得
      了inputNumber的decrease函数
      最后的apply()就很奇怪了，apply的用法是参数的第一个表示要执行的目标对象，
      如果为null或者undefined则表示在window上调用该方法，这里没有参数，那就是undefined，所以是在window上执行
      这个我也不确定到底说的对不对，我把这句话改为
      const handler = () => vnode.context[binding.expression].apply(vnode);
      复制代码也没出现错误，这里也没搞清楚为啥直接apply()就行，我再把上面的改成下面这种，也就是直接执行函数，也没报错，一切正常
      const handler = () => vnode.context[binding.expression]()
      没整明白,看看情况以后有机会再整
    */

    const clear = () => {
      // 看松开与按下的时间间隔判断是单击还是长按后松开
      // 单击情况下就把handler函数运行一次,和click一样的流程
      // 长按情况下handler长按期间就运行过了，松开时就不用再执行了
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    on(el, 'mousedown', (e) => {  // 在el上监听鼠标按下
      if (e.button !== 0) return;  // 用于判断按下的是鼠标的哪个键,ie9+以上的都是左键0 中键1 右键2
      startTime = Date.now();
      once(document, 'mouseup', clear);  // 在document文档上监听一次鼠标松开,因为用户有可能鼠标移开目标元素后松开
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  }
};
