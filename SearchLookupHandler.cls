public with sharing class SearchLookupHandler {
    @AuraEnabled(cacheable=true)
    public static List<sobject> searchRecords(string objectApiName, string searchKey) {
        List<sobject> sobjectList = new List<sobject>();
        if (String.isNotBlank(searchKey)) {
            System.debug('Inside the fun' + searchKey);
            String key = '%' + searchKey + '%';
            String queryString = 'SELECT Id, Name FROM ' + objectApiName + ' WHERE Name LIKE :key';
            sobjectList = Database.query(queryString, AccessLevel.USER_MODE);
        }

        return sobjectList;
    }
}
