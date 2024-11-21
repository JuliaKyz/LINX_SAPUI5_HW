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
        
      jsonAnnotation: new JSONModel({
      RequestAtLeast: "",
      Annotation: [
        {
          "id": "HeaderID",
          "label": "{i18n>HeaderID}",
          "Column": {
            "order": 1,
            "sortProperty": "HeaderID",
            "visible": true,
            "type": "text",
            "select": "HeaderID",
            "text": "{HeaderID}"
          },
          "Filter": {
            "order": 1,
            "mode": "SingleSelectMaster",
            "filter": "HeaderID",
            "text": "HeaderID",
            "sort": "HeaderID",
            "key": "HeaderID",
            "entitySet": "zjblessons_base_Headers",
            "visible": true,
            "hidden": false
          }
        },
        {
          "id": "MaterialID",
          "label": "{i18n>MaterialID}",
          "Column": {
            "order": 2,
            "sortProperty": "MaterialID",
            "visible": true,
            "type": "text",
            "select": "MaterialID",
            "text": "{MaterialID}"
          },
          "Filter": {
            "order": 2,
            "mode": "MultiSelect",
            "filter": "MaterialID",
            "text": "MaterialID",
            "sort": "MaterialID",
            "key": "MaterialID",
            "entitySet": "zjblessons_base_Materials",
            "visible": true,
            "hidden": false
          }
        },
        {
          "id": "GroupID",
          "label": "{i18n>GroupID}",
          "Column": {
            "order": 3,
            "sortProperty": "GroupID",
            "visible": true,
            "type": "text",
            "select": "GroupID",
            "text": "{GroupID}"
          },
          "Filter": {
            "order": 3,
            "mode": "MultiSelect",
            "filter": "GroupID",
            "text": "GroupID",
            "sort": "GroupID",
            "key": "GroupID",
            "entitySet": "zjblessons_base_Groups",
            "visible": true,
            "hidden": false
          }
        },
        {
          "id": "SubGroupID",
          "label": "{i18n>SubGroupID}",
          "Column": {
            "order": 4,
            "sortProperty": "SubGroupID",
            "visible": true,
            "type": "text",
            "select": "SubGroupID",
            "text": "{SubGroupID}"
          },
          "Filter": {
            "order": 4,
            "mode": "MultiSelect",
            "filter": "SubGroupID",
            "text": "SubGroupID",
            "sort": "SubGroupID",
            "key": "SubGroupID",
            "entitySet": "zjblessons_base_SubGroups",
            "visible": true,
            "hidden": false
          }
        },
        {
          "id": "Quantity",
          "label": "{i18n>Quantity}",
          "Column": {
            "order": 5,
            "sortProperty": "Quantity",
            "visible": true,
            "type": "number",
            "select": "Quantity",
            "number": "{Quantity}",
            "emphasized": false
          },
          "Filter": {
            "order": 5,
            "mode": "SearchField",
            "filter": "Quantity",
            "text": "Quantity",
            "sort": "Quantity",
            "key": "Quantity",
            "filterKey": "Quantity",
            "entitySet": "zjblessons_base_Items",
            "visible": true,
            "hidden": false
          }
        },
        {
          "id": "Price",
          "label": "{i18n>Price}",
          "Column": {
            "order": 6,
            "sortProperty": "Price",
            "visible": true,
            "type": "number",
            "select": "Price",
            "number": "{Price}",
            "emphasized": false
          },
          "Filter": {
            "order": 6,
            "mode": "SearchField",
            "filter": "Price",
            "text": "Price",
            "sort": "Price",
            "key": "Price",
            "filterKey": "Price",
            "entitySet": "zjblessons_base_Items",
            "visible": true,
            "hidden": false
          }
        },
        {
          "id": "Created",
          "label": "{i18n>Created}",
          "Column": {
            "order": 7,
            "sortProperty": "Created",
            "sortOrder": 1,
            "sort": "desc",
            "visible": true,
            "type": "date",
            "typeFormat":"medium",
            "text": "{Created}"
          },
          "Filter": {
            "order": 7,
            "visible": true,
            "hidden": false,
            "mode": "DateField",
            "datePath": "Created",
            "dateMode": true,
            "entitySet": "zjblessons_base_Items",
            "selectedPeriod": "all",
            "visiblePeriodButtons": "day, week, month, year, all"
          }
        },
        {
          "id": "CreatedBy",
          "label": "{i18n>CreatedBy}",
          "Column": {
            "order": 8,
            "sortProperty": "CreatedByFullName",
            "visible": true,
            "type": "avatarAndLink",
            "select": "CreatedByAvatar, CreatedByFullName",
          },
          "Filter": {
            "order": 8,
            "mode": "MultiSelect",
            "filter": "CreatedBy",
            "text": "CreatedByFullName",
            "sort": "CreatedByFullName",
            "image": "CreatedByAvatar",
            "key": "CreatedBy",
            "entitySet": "jbcommon_auth_CreatedBy",
            "visible": true,
            "hidden": false
          }
        },
        {
          "id": "Modified",
          "label": "{i18n>Modified}",
          "Column": {
            "order": 9,
            "sortProperty": "Modified",
            "sort": "desc",
            "visible": true,
            "type": "dateTime",
            "typeFormat":"medium",
            "text": "{Modified}"
          },
          "Filter": {
            "order": 9,
            "visible": true,
            "hidden": false,
            "mode": "DateField",
            "datePath": "Modified",
            "dateMode": true,
            "entitySet": "zjblessons_base_Items",
            "selectedPeriod": "all",
            "visiblePeriodButtons": "day, week, month, year, all"
          }
        },
        {
          "id": "ModifiedBy",
          "label": "{i18n>ModifiedBy}",
          "Column": {
            "order": 10,
            "sortProperty": "ModifiedByFullName",
            "visible": true,
            "type": "avatarAndLink",
            "select": "ModifiedByAvatar, ModifiedByFullName",
          },
          "Filter": {
            "order": 10,
            "mode": "MultiSelect",
            "filter": "ModifiedBy",
            "text": "ModifiedByFullName",
            "sort": "ModifiedByFullName",
            "image": "ModifiedByAvatar",
            "key": "ModifiedBy",
            "entitySet": "jbcommon_auth_ModifiedBy",
            "visible": true,
            "hidden": false
          }
        }
      ]
    }),

        onInit: function () {
            const oViewModel = new JSONModel({
                sCount: '0'
            });
            this.setModel(oViewModel, "worklistView");
            
            this.setModel(jsonAnnotation,"annotation");
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