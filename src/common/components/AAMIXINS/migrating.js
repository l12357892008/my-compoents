import { kebabCase } from 'element-ui/src/utils/util';
/**
 * 专门用于在控制台显示迁移指导(如vue1.x 迁移到 vue2.x).
 *
 * Usage:
 * import Migrating from 'element-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
export default {
  mounted() {
    if (process.env.NODE_ENV === 'production') return;   // 只在开发环境需要使用
    if (!this.$vnode) return;  // 若调用的上下文不是vue组件(不包含vue虚拟DOM结点)则直接return不作任何处理
    const { props = {}, events = {} } = this.getMigratingConfig();   // 获取组件中getMigratingConfig函数返回的参数
    const { data, componentOptions } = this.$vnode;   // 获取组件虚拟结点的data(不是放数据的那个data)和componentOptions
    const definedProps = data.attrs || {};    // 获取所有父组件传过来没被props接收的属性
    const definedEvents = componentOptions.listeners || {};

    for (let propName in definedProps) { 
      propName = kebabCase(propName); // 把驼峰命名转为短横线命名
      // this.getMigratingConfig()会返回一个props对象包含一些属性(每个属性对应一个提示),如果用户确实往该组件传入了这些属性,
      // 就把该属性对应的提示打印在控制台
      if (props[propName]) {  
        console.warn(`[Element Migrating][${this.$options.name}][Attribute]: ${props[propName]}`);
      }
    }

    for (let eventName in definedEvents) {
      eventName = kebabCase(eventName); // compatible with camel case
      if (events[eventName]) {   // 与上同理
        console.warn(`[Element Migrating][${this.$options.name}][Event]: ${events[eventName]}`);
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {},
        events: {}
      };
    }
  }
};
