define(['marionette', 'text!layouts/categories/form.html', 'dispatcher', 'widgets/widget', 'views/extrafields/widget', 'views/image/widget'], function(Marionette, template, K2Dispatcher, K2Widget, K2ViewExtraFieldsWidget, K2ViewImageWidget) {'use strict';

	// K2 category form view
	var K2ViewCategory = Marionette.Layout.extend({

		// Template
		template : _.template(template),

		// Regions
		regions : {
			imageRegion : '#appCategoryImage',
			extraFieldsRegion : '#appCategoryExtraFields'
		},

		// Model events
		modelEvents : {
			'sync' : 'update'
		},

		// Initialize
		initialize : function() {

			// Add a listener for the before save event
			K2Dispatcher.on('app:controller:beforeSave', function() {
				this.onBeforeSave();
			}, this);

		},

		// Serialize data for view
		serializeData : function() {
			var data = {
				'row' : this.model.toJSON(),
				'form' : this.model.getForm().toJSON()
			};
			return data;
		},

		update : function() {

			this.render();

			// Determine current itemId
			var itemId = this.model.get('id') || this.model.get('tmpId');

			// Image
			this.imageRegion.show(new K2ViewImageWidget({
				data : this.model,
				itemId : itemId,
				type : 'category'
			}));

			// Extra fields
			this.extraFieldsRegion.show(new K2ViewExtraFieldsWidget({
				filterId : this.model.get('parent_id'),
				resourceId : this.model.get('id'),
				scope : 'category'
			}));

		},

		// OnBeforeSave event
		onBeforeSave : function() {

			// Update form from editor contents
			K2Editor.save('description');
		},

		// OnBeforeClose event ( Marionette.js build in event )
		onBeforeClose : function() {

			// Is it new?
			if (this.model.isNew()) {
				// Delete any uploaded images
				K2Dispatcher.trigger('image:delete');
			}
		},

		// OnDomRefresh event ( Marionette.js build in event )
		onDomRefresh : function() {

			// Initialize the editor
			K2Editor.init();

			// Restore Joomla! modal events
			if ( typeof (SqueezeBox) !== 'undefined') {
				SqueezeBox.initialize({});
				SqueezeBox.assign($$('a.modal-button'), {
					parse : 'rel'
				});
			}
			// Setup widgets
			K2Widget.updateEvents(this.$el);

		}
	});
	return K2ViewCategory;
});
