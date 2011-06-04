Ext.require([
	'Diddle.view.Viewport',
	'Ext.layout.container.Border',
	'Ext.MessageBox'
]);
		
Ext.application({
    name: 'Diddle',
	
    controllers: [
        'Main'
    ],
	
    launch: function() {		
		Ext.create('Diddle.view.Viewport');	
	}
});
