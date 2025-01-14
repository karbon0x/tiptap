import {
  h,
  ref,
  PropType,
  onMounted,
  onBeforeUnmount,
  defineComponent,
} from 'vue'
import {
  FloatingMenuPlugin,
  FloatingMenuPluginKey,
  FloatingMenuPluginProps,
} from '@tiptap/extension-floating-menu'

export const FloatingMenu = defineComponent({
  name: 'FloatingMenu',

  props: {
    editor: {
      type: Object as PropType<FloatingMenuPluginProps['editor']>,
      required: true,
    },

    tippyOptions: {
      type: Object as PropType<FloatingMenuPluginProps['tippyOptions']>,
      default: () => ({}),
    },
  },

  setup({ editor, tippyOptions }, { slots }) {
    const root = ref<HTMLElement | null>(null)

    onMounted(() => {
      editor.registerPlugin(FloatingMenuPlugin({
        editor,
        element: root.value as HTMLElement,
        tippyOptions,
      }))
    })

    onBeforeUnmount(() => {
      editor.unregisterPlugin(FloatingMenuPluginKey)
    })

    return () => h('div', { ref: root }, slots.default?.())
  },
})
