/*global location history */
sap.ui.define([
		"zjblessons/Worklist/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"zjblessons/Worklist/model/formatter",
		"sap/m/Table",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (BaseController, JSONModel, formatter, Table, Filter, FilterOperator) {
		"use strict";

		return BaseController.extend("zjblessons.Worklist.controller.Worklist", {

			formatter: formatter,

			onInit : function () {
				const oViewModel = new JSONModel({
				
				});
				this.setModel(oViewModel, "worklistView");
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
					 oFilter = [new Filter('DocumentNumber', FilterOperator.Contains, sValue)];
					 
					 oTable.getBinding('items').filter(oFilter);
			}
		});
	}
);