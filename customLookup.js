import { LightningElement, wire, api } from "lwc";
import searchRecords from "@salesforce/apex/customLookupController.searchRecords";
const DELAY = 300;

export default class CustomLookup extends LightningElement {
    @api apiName = "Account";
    searchValue = "A";

    @api objectLabel = "Account";
    @api iconName = "standard:account";
    delayTimeout;

    // want to store the record in to the object
    selectedRecord = {
        selectedId: "",
        selectedName: ""
    };

    displayOptions = false;

    @wire(searchRecords, {
        objectApiName: "$apiName",
        searchKey: "$searchValue"
    })
    outputs;

    get isRecordSelected() {
        return this.selectedRecord.selectedId === "" ? false : true;
    }

    changeHandler(event) {
        // As soon as user enter something handler will execute and new value will be populate here,as soon as new value
        // populated wire method will call here,getting output ,we are getting out apex method called every input
        // of the method, hitting the sf server and getting the response.

        window.clearTimeout(this.delayTimeout);
        let enteredValue = event.target.value;

        // After this delay, this function will call
        this.delayTimeout = setTimeout(() => {
            this.searchValue = enteredValue;
            this.displayOptions = true;
        }, DELAY);
    }

    clickHandler(event) {
        // to identify the which record the user has selected for that

        let selectedId = event.currentTarget.dataset.item;
        console.log("selectedId", selectedId);
        let outputRecord = this.outputs.data.find(currItem => currItem.id === selectedId);

        // populate the values

        this.selectedRecord = {
            selectedId: outputRecord.id,
            selectedName: outputRecord.name
        };

        this.displayOptions = false;
    }

    removalSelectedHandler(event) {
        this.selectedRecord = {
            selectedId: "",
            selectedName: ""
        };

        this.displayOptions = false;
    }
}

// step 1 : create apex class
// step 2 : handle it using wire decorator
