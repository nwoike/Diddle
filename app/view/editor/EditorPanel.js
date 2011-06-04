Ext.define('Diddle.view.editor.EditorPanel', {
	extend: 'Ext.panel.Panel',
	requires: ['Diddle.lib.CodeEditorField', 'Diddle.lib.FadingTitle'],
	layout: 'fit',
	alias: 'widget.editorpanel',
	preventHeader: true,
	plugins: [
		{
			ptype: 'fadingtitle',
			title: this.title					
		}
	],
	
	initComponent: function() {	
		Ext.apply(this, {
			items: [
				{
					xtype: 'codeeditorfield',
					layout: 'fit',
					mode: this.mode,
					matchBrackets: this.matchBrackets
				}
			]
		});
        
		this.callParent(arguments);
	},
	
    focus: function() {
        this.down('codeeditorfield').focus();
    },
    
	getValue: function() {
		return this.down('codeeditorfield').getValue();
	},
	
	setValue: function(value) {
		this.down('codeeditorfield').setValue(value);
	},
	
	reset: function() {
		this.down('codeeditorfield').setValue('');
	}
});