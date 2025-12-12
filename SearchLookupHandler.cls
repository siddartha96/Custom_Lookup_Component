public with sharing class SearchLookupHandler {
    @AuraEnabled(cacheable=true)
    public static List<Sobject> getSearchResults(String searchKey) {
        if (String.isNotBlank(searchKey)) {
        }
    }
}
