tinymce.PluginManager.add('lineheight', function(editor, url) {
    var pluginName='设置行高';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    var lineheight_val = editor.getParam('lineheight_val', '1 1.5 1.6 1.75 1.8 2 3 4 5');

    editor.on('init', function() {
        editor.formatter.register({
            lineheight: {
                selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table',
                styles: { 'line-height': '%value' }
            }
        });
    });

    var doAct = function (value) {
        editor.formatter.apply('lineheight', { value: value });
        editor.fire('change', {});
    };

    editor.ui.registry.getAll().icons.lineheight || editor.ui.registry.addIcon('lineheight','<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.984 12.984v-1.969h12v1.969h-12zM9.984 18.984v-1.969h12v1.969h-12zM9.984 5.016h12v1.969h-12v-1.969zM6 6.984v10.031h2.484l-3.469 3.469-3.516-3.469h2.484v-10.031h-2.484l3.516-3.469 3.469 3.469h-2.484z"></path></svg>');
    
    editor.ui.registry.addMenuButton('lineheight', {
        icon: 'lineheight',
        tooltip: pluginName,
        fetch: function(callback) {
            var dom = editor.dom;
            var blocks = editor.selection.getSelectedBlocks();
            var lhv = 0;
            global$1.each(blocks, function(block) {
                if(lhv==0){
                    lhv = dom.getStyle(block,'line-height') ? dom.getStyle(block,'line-height') : 0;
                }
            });

            var items = lineheight_val.split(' ').map(function(item){
                var text = item;
                var value = item;
                return {
                    type: 'togglemenuitem',
                    text: text,
                    active : lhv==value ? true :false,
                    onAction: function() {
                        doAct(value);
                    }
                };
            });
            callback(items);
        }
    });

    return {
        getMetadata: function () {
            return  {
                name: pluginName,
                url: "http://tinymce.ax-z.cn/more-plugins/lineheight.php",
            };
        }
    };
});
