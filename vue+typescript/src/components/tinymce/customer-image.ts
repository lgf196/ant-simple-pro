import type { Editor, PluginManager } from 'tinymce'

export function initCustomerImagePlugin() {
  const pluginManager = window.tinymce.util.Tools.resolve('tinymce.PluginManager') as PluginManager

  function createFileInput() {
    return new Promise(resolve => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.onchange = e => {
        const target = e.target as HTMLInputElement
        const file = target.files && target.files[0]
        resolve(file)
      }
      input.click()
    })
  }

  function commandRegister(editor: Editor) {
    editor.addCommand('mceImageUpload', () => {
      createFileInput().then(file => {
        function success(url: string) {
          editor.insertContent(`<img src="${url}" alt="加载失败" style="max-width: 100%;height: auto;" />`)
        }
        // 对外暴露上传回调
        editor.settings.imageSelectorCallback(file, success)
      })
    })
  }

  function componentRegister(editor: Editor) {
    editor.ui.registry.addButton('customerimageupload', {
      icon: 'image',
      tooltip: '上传图片',
      onAction: () => {
        editor.execCommand('mceImageUpload')
      }
    })
  }

  pluginManager.add('customerimageupload', editor => {
    componentRegister(editor)
    commandRegister(editor)
  })

  function Plugin() {
    // ...
  }

  return Plugin
}
