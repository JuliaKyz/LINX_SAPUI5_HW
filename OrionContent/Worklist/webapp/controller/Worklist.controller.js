/*global location history */
sap.ui.define([
		"zjblessons/Worklist/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"zjblessons/Worklist/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/Sorter",
		"sap/ui/model/FilterOperator",
		"sap/ui/core/Fragment"
	], function (BaseController, JSONModel, formatter, Filter, Sorter, FilterOperator, Fragment) {
		"use strict";

		return BaseController.extend("zjblessons.Worklist.controller.Worklist", {

			formatter: formatter,

			onInit : function () {
				const oViewModel = new JSONModel({
					sCount: '0'
				});
				this.setModel(oViewModel, "worklistView");
			},
			
			onBeforeRendering: function() {
				this._bindTable();
			},
			
			_bindTable(){
				const oTable = this.getView().byId('table');
				
				oTable.bindItems({
					path: '/zjblessons_base_Headers',
					sorter: [new Sorter('Created', true)],
					template: this._getTableTemplate(),
					urlParameters: {
						$select: 'HeaderID,DocumentNumber,DocumentDate,PlantText,RegionText,Description,Created'
					},
					events: {
						dataRequested: (oData) => {
							this._getTableCounter();
						}
					}
				})
			},
			
			_getTableCounter(){
				this.getModel().read('/zjblessons_base_Headers/$count', {
					success: (sCount => {
						this.getModel('worklistView').setProperty('/sCount', sCount);
					}
					)
				})
			},
			
			_getTableTemplate() {
    			const oTemplate = new sap.m.ColumnListItem({
        			type: 'Navigation',
        			cells: [
            			new sap.m.Text({ text: '{DocumentNumber}' }),
            			new sap.m.Text({ text: '{DocumentDate}' }),
            			new sap.m.Text({ text: '{PlantText}' }),
            			new sap.m.Text({ text: '{RegionText}' }),
            			new sap.m.Text({ text: '{Description}' }),
            			new sap.m.Text({ text: '{Created}' }),
            			new sap.m.Button({
                			type: 'Transparent',
                			icon: this.getResourceBundle().getText('iDecline'),
                			press: this.onPressDelete.bind(this)
            			})
        			]
    		});
    		return oTemplate;
			},
			
			onPressDelete(oEvent){
				const oBindingContext = oEvent.getSource().getBindingContext(),
				sKey = this.getModel().createKey('/zjblessons_base_Headers', {
					HeaderID: oBindingContext.getProperty('HeaderID')
				});
				this.getModel().remove(sKey);
			},
			
			onSearch(oEvent){
				const sValue = oEvent.getParameter('value');
				this._searchHeandler(sValue);
			},
			
			onLiveSearch(oEvent){
				const sValue = oEvent.getParameter('newValue');
				this._searchHeandler(sValue);
			},
			
			_searchHeandler(sValue){
				const oTable = this.getView().byId('table'),
					 oFilter = !!sValue.length ? [new Filter('DocumentNumber', FilterOperator.Contains, sValue), new Filter('DocumentNumber', FilterOperator.Contains, sValue)] : [];
					 
					 oTable.getBinding('items').filter(oFilter);
			},
			
			onPressRefresh(){
				this._bindTable();
			},
			
			onPressCreate(){
				this._loadCreateDialog();
			},
			
			_loadCreateDialog: async function(){
				this._oDialog = await Fragment.load({
					name: 'zjblessons.Worklist.view.fragment.CreateDialog',
					controller: this,
					id: this.getView().getId()
				}).then(oDoalog => {
					this.getView().addDependent(oDialog);
					return oDialog
				});
				
				this._oDialog.open();
			// this.getView().byId('Dialog', 'idPlantID')
			},
			
			onPressCancel(){
				this.getModel().resetChanges()
				this._oDialog.close();
			},
			
			onPressSave(){
				this._oDialog.close();
			}
		});
	}
);