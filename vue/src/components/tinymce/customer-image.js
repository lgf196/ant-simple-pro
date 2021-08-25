export function initCustomerImagePlugin() {
  const pluginManager = window.tinymce.util.Tools.resolve('tinymce.PluginManager')

  function createFileInput() {
    return new Promise(resolve => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.onchange = e => {
        const target = e.target
        const file = target.files && target.files[0]
        resolve(file)
      }
      input.click()
    })
  }

  function commandRegister(editor) {
    editor.addCommand('mceImageUpload', () => {
      createFileInput().then(file => {
        function success(url) {
          editor.insertContent(`<img src="${url}" alt="加载失败" style="max-width: 100%;height: auto;" />`)
        }
        // 对外暴露上传回调
        editor.settings.imageSelectorCallback(file, success)
      })
    })
  }

  function componentRegister(editor) {
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

  function PluginA() {
    // ...
  }

  return PluginA
}
