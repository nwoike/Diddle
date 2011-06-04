Ext.define('Diddle.model.Diddle', {
    extend: 'Ext.data.Model',
    fields: [ 
		{ name: 'id', type: 'int' },
		'css',
		'html',
		'javascript'
	],
	proxy: {
        type: 'localstorage',
        id: 'diddle'
    }
});