Ext.define('Diddle.view.Header', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.toolbar.Spacer'
	],
	alias: 'widget.layoutheader',
	
	initComponent: function() {
		Ext.apply(this, {
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			defaults: {
				xtype: 'button',
				minWidth: 70,
				margin: '0 2 0 0',
				padding: '5 5 5 10'
			},
			items: this.buildItems()
		});
		
		this.callParent(arguments);
	},

	buildItems: function() {
		return [
			{
				xtype: 'component',
				autoEl: {
					tag: 'h1',
					html: 'Diddle'
				}
			}, 
			{
				xtype: 'tbspacer',
				flex: 1
			},
			{
				text: 'Run',
				action: 'run',
				iconCls: 'applicationgo'
			},
			{
				text: 'Save',
				action: 'save',
				iconCls: 'disk'
			},
			{
				text: 'Reset',
				action: 'reset',
				iconCls: 'arrowundo'
			}
		];
	}
});