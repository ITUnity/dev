

 // Include app dependency on ngOfficeUIFabric
   

var app = angular.module('myApp',  [
        'officeuifabric.core',
        'officeuifabric.components'
      ]);

app.config(['$compileProvider' , function ($compileProvider)
    {
          $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|sip):/);
    }]);

// Directive to provide for a fallback image
app.directive('fallbackSrc', function () {
		var fallbackSrc = {
			link: function postLink(scope, iElement, iAttrs) {
				iElement.bind('error', function () {
					angular.element(this).attr("src", iAttrs.fallbackSrc);
				});
			}
		}
		return fallbackSrc;
	});
    

    
app.directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    //call the function that was passed
                    scope.$apply(attrs.imageonload);
                });
            }
        };
    });

          
app.controller('myCtrl', function($scope, $window){

    $scope.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	//controller scoped public stuff
	$scope.searchResults = [];
	$scope.searchRefiners = [];
	$scope.selectedPerson = null;
	$scope.selectedRefiners=[];
    $scope.HoverMessage = null; 
    
    
    //init function
    $scope.init = function () {
    
    $scope.filterSelection = "All";
    $scope.searchValue = "";
    $scope.getResults("",false);
    
    }
    
    $scope.hideDetailPanel = function() {
        return $window.innerWidth <= 767; 
    }
    
      //item hideSpinner event
	$scope.hideSpinner=function(){
        document.getElementById("Spinner").style.visibility = "hidden";
        
    }
    //item showSpinner event
	$scope.showSpinner=function(){
        document.getElementById("Spinner").style.visibility = "visible";
        
    }
    
    
    //item Mouseover event
	$scope.itemHover=function(doc){
        document.getElementById("previewPanel").style.visibility = "visible";
        // $scope.showSpinner();
        $scope.currentDoc = doc;
    }
    
      //item MouseOut event
	$scope.itemHoverOff=function(doc){
        $scope.hideSpinner();
        document.getElementById("previewPanel").style.visibility = "hidden";
         $scope.currentDoc = null;
    }
    
    $scope.showActionHover=function(hoverMessage){
        $scope.HoverMessage = hoverMessage;
    }
	
    $scope.inputFocus=function(){
        document.getElementById("BigSearch").style.border = "border: 2px solid #71afe5";
        document.getElementById("BigSearch").style.color = "#71afe5";
    }
    
    $scope.inputBlur=function(){
        document.getElementById("BigSearch").style.border = "border: 2px solid whitesmoke";
        document.getElementById("BigSearch").style.color = "gray";
    }
   
	//item selected event
	$scope.itemSelected=function(person){

        if(!$scope.hideDetailPanel()){
            
            $scope.selectedPerson=person;
            $scope.graphResults=[];
            
            // initially set to display:none so it doesn't slide out when first loading.  set to display block when first shown. css classes will slide in/out after that.
            document.getElementById("detailPanel").style.display = "block";
            
            //lookup the recently edited documents for the selected person
            var searchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='*'&rowlimit=50&sourceid='8413cd39-2156-4e00-b54d-11efd9abdb89'&clienttype='ContentSearchRegular'&properties='GraphQuery:ACTOR(" + person.DocId + "\\, action\\:1003)'";
    
            var executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
            executor.executeAsync(
                {
                    
                    url: searchUrl,
                    method: "GET",
                    headers: { "Accept": "application/json; odata=verbose" },
                    success: onGetGraphResultsSuccess,
                    error: onGetGraphResultsFail
                });
        }   
	}
    
    function onGetGraphResultsSuccess(data) {
        var jsonObject = JSON.parse(data.body);
        var results = jsonObject.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
        
        if (results.length == 0) {
            //remove any cached results
            $scope.graphResults = []
        }
        else {
            var ResultList = []
                $.each(results, function (index, result) {
                
                ResultList.push({Title:result.Cells.results[3].Value,Author:result.Cells.results[4].Value,Path:result.Cells.results[6].Value,LastModifedTime:result.Cells.results[9].Value,ServerRedirectedURL:result.Cells.results[15].Value,ServerRedirectedEmbedUrl:result.Cells.results[16].Value,ServerRedirectedPreviewUrl:result.Cells.results[17].Value,FileExtension:result.Cells.results[18].Value,ParentLink:result.Cells.results[20].Value,SPWebUrl:result.Cells.results[36].Value,OriginalPath:result.Cells.results[40].Value});
            });
        
            //returns the results and refines to the global arrays
            $scope.graphResults=ResultList;
            
        
            //notifies the binding engine that the data has changed
                $scope.$digest();
        }
    }
        
    function onGetGraphResultsFail(data, errorCode, errorMessage) {
        alert('got error getting graph results');
        $('#related-content-results').text('An error occurred whilst searching for related content - ' + errorMessage);
    }    

    //refiner click event
	$scope.refinerClick=function(refinerType, refinerValue) {	
        
     
        $scope.selectedRefiners = [];
        $scope.selectedRefiners.push({'Type':refinerType,'Value':refinerValue});
        $scope.getResults($scope.searchValue, true);	
	}
    
    $scope.changeFilter = function(filterSelection) {
        $scope.filterSelection = filterSelection;
        $scope.searchValue = "";
        
        $scope.getResults($scope.searchValue, false);
    }
 	
    $scope.closeDetailPanel = function() {
        $scope.selectedPerson = null;
    }
    
    $scope.cardPanelRight = function() {
        if ($scope.selectedPerson!=null)
            return "285px";
         else
            return "0px"
        
    }
     
     
    $scope.buildPeopleSearchUrl = function() {
        // part of all search queries
        var selectProperties = "&selectproperties='Department,JobTitle,Memberships,Path,PictureURL,PreferredName,SipAddress,Skills,WorkEmail,WorkPhone,MobilePhone,Colleagues,OfficeNumber,HierarchyUrl,DocId,LastNameSortable,FirstName,LastName'"
     
        // only return accounts with a sip address (rules out some system accounts)
        // there is no way in SP search to look for empty managed properties, so instead have to search for every other case a* - z*.
        // initially did this programmatically, but the processing for looping every click was unnecessary.
        var sipQuery = "SipAddress:A* OR SipAddress:B* OR SipAddress:C* OR SipAddress:D* OR SipAddress:E* OR SipAddress:F* OR SipAddress:G* OR SipAddress:H* OR SipAddress:I* OR SipAddress:J* OR SipAddress:K* OR SipAddress:L* OR SipAddress:M* OR SipAddress:N* OR SipAddress:O* OR SipAddress:P* OR SipAddress:Q* OR SipAddress:R* OR SipAddress:S* OR SipAddress:T* OR SipAddress:U* OR SipAddress:V* OR SipAddress:W* OR SipAddress:X* OR SipAddress:Y* OR SipAddress:Z*";
     
        var queryText = $scope.searchValue + "* ";                      
        
        if($scope.filterSelection == "All")
        {
            // handle all (currently, do nothing)
        } 
        else if($scope.filterSelection == "Team")
        {
            // handle team (nothing to do here.  handled below by adding team)
        }
        else
        {
            // selected A-Z.  Append the LastName filter to the queryText            
            if(queryText.trim() != "")
            {
                queryText += " AND "
            }
            
            queryText += "LastName:" + $scope.filterSelection + "* "
        }
        
        // construct base search url
        var url = "/_api/search/query?querytext='" + queryText + "+AND+AccountName:i:0%23.f|membership*+AND+(" + sipQuery + ")'&trimduplicates=false&rowlimit=100&refiners='Department(sort=name/ascending)'&rankingmodelid='0c77ded8-c3ef-466d-929d-905670ea1d72'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'" + selectProperties;  
        
        // refiners added if necessary
        if (typeof($scope.selectedRefiners) != "undefined" && $scope.selectedRefiners != "not available" && $scope.selectedRefiners.length>0)
        {        
            // TO DO: update logic to allow more than a specific refiner (currently only department)
            url += "&refinementfilters='" + encodeURIComponent($scope.selectedRefiners[0].Type) + ":\"" + encodeURIComponent($scope.selectedRefiners[0].Value) + "*\"'" ;
        }   
        
        // graph portion added if necessary. otherwise, sorting by lastName/firstName
        if($scope.filterSelection == "Team")
        {
            url += "&properties='GraphQuery:ACTOR(ME\\, action\\:1019),GraphRankingModel:{\"features\"\\:[{\"function\"\\:\"EdgeWeight\"}]}'";
        }
        else
        {
            url += "&sortlist='LastNameSortable:Ascending,FirstName:Ascending'";
        }
        
        return url;
    }
            
	//search get results action
	$scope.getResults= function(searchTerm, isRefinement)
    {            
        // current selection is no longer valid if further search/refimement is being done        
        $scope.selectedPerson = null;
         
        if (!isRefinement)
        {
            $scope.selectedRefiners=[];            
        }
        
        if($scope.filterSelection == "All")
        {
            $scope.filterDescription = "All Employees";
        }
        else if($scope.filterSelection == "Team")
        {
            $scope.filterDescription = "People I'm Working with in Office 365";
        }
        else
        {
            $scope.filterDescription = "Last name starting with " + $scope.filterSelection;
        }
        
        var searchUrl= $scope.buildPeopleSearchUrl();         
           
        // search can use the app web URL as the base, so no need to use SP.AppContextSite(@target) to access the host web..
        //note that we are sorting the refiners which is important for large orgs with many departments
        var executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        executor.executeAsync(
            {
                
                url: searchUrl,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: onGetSearchResultsSuccess,
                error: onGetSearchResultsFail
            }
        );

        function onGetSearchResultsSuccess(data) {
            
            var jsonObject = JSON.parse(data.body);
            var results = jsonObject.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
            var refiners = [];
            
            if (jsonObject.d.query.PrimaryQueryResult.RefinementResults!=null)
            {
            refiners=jsonObject.d.query.PrimaryQueryResult.RefinementResults.Refiners.results[0].Entries.results;
            }
            
            if (results.length == 0) {
                //remove any cached results
                $scope.searchResults = []
                $scope.searchRefiners = [];
                
                $scope.$digest();
            }
            else {
            
            
            	var ResultList = []
	             $.each(results, function (index, result) {
                     
                     
	             	var delveUrl = _spPageContextInfo.webAbsoluteUrl.split(".")[0] + "-my.sharepoint.com/_layouts/15/me.aspx?p=" + encodeURIComponent(result.Cells.results[10].Value) + "&v=work";
	             	
                                         
                     ResultList.push({
                        Department:result.Cells.results[2].Value,
                        JobTitle:result.Cells.results[3].Value,
                        Memberships:result.Cells.results[4].Value.split(";"),
                        Path:result.Cells.results[5].Value,
                        PictureURL:result.Cells.results[6].Value,
                        PreferredName:result.Cells.results[7].Value,
                        SipAddress:result.Cells.results[8].Value,
                        Skills:result.Cells.results[9].Value,
                        WorkEmail:result.Cells.results[10].Value,
                        WorkPhone:result.Cells.results[11].Value,
                        MobilePhone:result.Cells.results[12].Value,
                        OfficeNumber:result.Cells.results[13].Value,
                        HierarchyUrl:result.Cells.results[14].Value,
                        DelveURL:delveUrl,
                        DocId:result.Cells.results[1].Value,
                        LastName:result.Cells.results[17].Value,
                        FirstName:result.Cells.results[16].Value,
                        });
                });
			
                //returns the results and refines to the global arrays
                $scope.searchResults=ResultList;
                $scope.searchRefiners = refiners;
            
                //notifies the binding engine that the data has changed
			     $scope.$digest();
            }
        }
        
            function onGetSearchResultsFail(data, errorCode, errorMessage) {
                if(errorMessage="Bad Request")
                {
                    alert("Bad Request.  Did you configure the LastNameSortable property?")
                }
                else{
                    alert('got error:  '  + errorMessage);
                }
            }
        }
    } 
);





	
