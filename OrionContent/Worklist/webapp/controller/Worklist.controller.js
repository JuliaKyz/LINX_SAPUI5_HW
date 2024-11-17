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

        onInit: function () {
            const oViewModel = new JSONModel({
                sCount: '0'
            });
            this.setModel(oViewModel, "worklistView");
        },
        
        onBeforeRendering: function() {
            this._bindTable();
        },
        
        _bindTable: function() { 
            const oTable = this.getView().byId('table');
            
            oTable.bindItems({
                path: '/zjblessons_base_Headers',
                sorter: [new Sorter('Created', true)],
                template: this._getTableTemplate(),
                urlParameters: {
                    $select: 'HeaderID,DocumentNumber,DocumentDate,PlantText,RegionText,Description,Created'
                },
                events: {
                    dataRequested: () => {
                        this._getTableCounter();
                    }
                }
            });
        },
        
        _getTableCounter: function() { 
            this.getModel().read('/zjblessons_base_Headers/$count', {
                success: (sCount) => {
                    this.getModel('worklistView').setProperty('/sCount', sCount);
                }
            });
        },
        
        _getTableTemplate: function() { 
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
        
        onPressDelete: function(oEvent) {
            const oBindingContext = oEvent.getSource().getBindingContext();
            const sKey = this.getModel().createKey('/zjblessons_base_Headers', {
                HeaderID: oBindingContext.getProperty('HeaderID')
            });
            this.getModel().remove(sKey);
        },
        
        onSearch: function(oEvent) {
            const sValue = oEvent.getParameter('value');
            this._searchHandler(sValue);
        },
        
        onLiveSearch: function(oEvent) {
            const sValue = oEvent.getParameter('newValue');
            this._searchHandler(sValue);
        },
        
        _searchHandler: function(sValue) { 
            const oTable = this.getView().byId('table');
            const oFilter = sValue.length ? [
                new Filter('DocumentNumber', FilterOperator.Contains, sValue),
                new Filter('DocumentNumber', FilterOperator.Contains, sValue)
            ] : [];
            
            oTable.getBinding('items').filter(oFilter);
        },
        
        onPressRefresh: function() {
            this._bindTable();
        },
        
        onPressCreate: function() {
            this._loadCreateDialog();
        },
        
        _loadCreateDialog: async function() {
            this._oDialog = await Fragment.load({
                name: 'zjblessons.Worklist.view.fragment.CreateDialog',
                controller: this
            });
            this.getView().addDependent(this._oDialog);
            this._oDialog.open();
        },
        
        onDialogBeforeOpen: function(oEvent) {
            const oDialog = oEvent.getSource();
            const oParams = {
                Version: 'A',
                HeaderID: '0',
                Created: new Date(),
                IntegrationId: null
            };
            const oEntry = this.getModel().createEntry('/tHeaders', {
                properties: oParams
            });
            oDialog.setBindingContext(oEntry);
        },
        
        onPressCancel: function() {
            this.getModel().resetChanges();
            this._oDialog.close();
        },
        
        onPressSave: function(oEvent) {
            this.getModel().submitChanges({
                success: () => {
                    sap.m.MessageToast.show('Created'); 
                    this._bindTable();
                }
            });
            this._oDialog.close();
        },
        
        onItemSelect: function(oEvent) {
            const oSelectedItem = oEvent.getParameter('listItem');
            const sHeaderID = oSelectedItem.getBindingContext().getProperty('HeaderID');
            
            this.getRouter().navTo('object', {
                objectId: sHeaderID
            });
        }
    });
});