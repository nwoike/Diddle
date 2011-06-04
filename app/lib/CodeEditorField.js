Ext.define('Diddle.lib.CodeEditorField', {
	extend: 'Ext.form.field.TextArea',
	alias: 'widget.codeeditorfield',
	
	constructor: function(config) {
		Ext.applyIf(config, {
			indentUnit: 4
		});
		
		this.config = config;
        this.config.onFocus = Ext.bind(this.onFocus, this);
        
		this.callParent(arguments);
	},
	
	initComponent: function() {
		Ext.apply(this, {
			listeners: {
				scope: this,
				render: function(field) {
					this.editor = CodeMirror.fromTextArea(document.getElementById(field.getInputId()), this.config);		
				}
			}
		});
        
		this.callParent(arguments);
	},
    
    focus: function() {
        this.editor.focus();
    },
    
    onFocus: function() {
        this.fireEvent('focus', this);
    },
    
	destroy: function() {
		this.editor.toTextArea();
		this.callParent(arguments);
	},
	
	getValue: function() {
		this.editor.save();
		return this.callParent(arguments);
	},
	
	setValue: function(value) {
		if (this.editor) {
			this.editor.setValue(value);
		}
		
		return this.callParent(arguments);
	}
});