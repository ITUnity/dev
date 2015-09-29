

var app = angular.module('myApp', []);

app.config(['$compileProvider' , function ($compileProvider)
    {
          $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|sip):/);
    }]);

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
    })
        
app.controller('myCtrl', function($scope){

	//controller scoped public stuff
	$scope.searchResults = [];
	$scope.searchRefiners = [];
	$scope.selectedPerson;
	$scope.selectedRefiners=[];
    
    
    //init function
    $scope.init = function () {
    
    $scope.getResults("",false);
    
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
        $scope.showSpinner();
        $scope.currentDoc = doc;
    }
    
      //item MouseOut event
	$scope.itemHoverOff=function(doc){
        $scope.hideSpinner();
        document.getElementById("previewPanel").style.visibility = "hidden";
         $scope.currentDoc = null;
    }
	
	//item selected event
	$scope.itemSelected=function(person){
        
        $scope.selectedPerson=person;
         $scope.graphResults=[];
		document.getElementById("detailPanel").style.visibility = "visible";
        
        //lookup the recently edited documents for the selected person
        var searchUrl = _spPageContextInfo.webAbsoluteUrl + "_api/search/query?querytext='*'&rowlimit=50&sourceid='8413cd39-2156-4e00-b54d-11efd9abdb89'&clienttype='ContentSearchRegular'&properties='GraphQuery:ACTOR(" + person.DocId + "\\, action\\:1003)'";
    
       
            
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
	$scope.refinerClick=function(refinement){
		
		$scope.selectedRefiners.push('Department',refinement);
		$scope.getResults($scope.searchValue,true);
		

	}
	
		
	//search get results action
	$scope.getResults= function(searchTerm, isRefinement)
        {
            if (!isRefinement)
            {
                $scope.selectedRefiners=[];
                
            }
           var queryText=" ";
           
           if(searchTerm!=null)
           {
               queryText = searchTerm;
                $scope.searchValue = searchTerm;
           }
           else
           {
               queryText = $scope.searchValue;   
               
           }
            
           try{
                if(queryText!="undefined"){
                        queryText = queryText.replace(/\s/g, "* ");
                        queryText = encodeURIComponent(queryText);
                }
                else
                {
                	   queryText = "*";
                        queryText = encodeURIComponent(queryText);
                }
           }
           catch(err)
           {}
           
           var refinerText="";
            var searchUrl="";
           
           
           var selectProperties = "&selectproperties='Department,JobTitle,Memberships,Path,PictureURL,PreferredName,SipAddress,Skills,WorkEmail,WorkPhone,MobilePhone,Colleagues,OfficeNumber,HierarchyUrl,DocId'&sortlist='FirstName:Ascending'"

           
           //debug refiners
           if (typeof($scope.selectedRefiners) != "undefined" && $scope.selectedRefiners != "not available" && $scope.selectedRefiners.length>0)
           {
           	
               refinerText = "&refinementfilters='" + encodeURIComponent($scope.selectedRefiners[0]) + ":\"" + encodeURIComponent($scope.selectedRefiners[1]) + "*\"'" ;
               
               searchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='PreferredName:" + queryText + "*'" + refinerText +"&sourceid='B09A7990-05EA-4AF9-81EF-EDFAB16C4E31'&rowlimit=30&refiners='Department(sort=name/ascending)'" + selectProperties ;
           }
           else
           {
               searchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='PreferredName:" + queryText + "*'&sourceid='B09A7990-05EA-4AF9-81EF-EDFAB16C4E31'&rowlimit=30&refiners='Department(sort=name/ascending)'" + selectProperties ;
               
           }
           
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
            }
            else {
            
            
            	var ResultList = []
	             $.each(results, function (index, result) {
	             	var delveUrl = "https://micronets2015b-my.sharepoint.com/_layouts/15/me.aspx?p=" + encodeURIComponent(result.Cells.results[21].Value) + "&v=work";
	             	ResultList.push({Department:result.Cells.results[2].Value,JobTitle:result.Cells.results[3].Value,Memberships:result.Cells.results[4].Value.split(";"),Path:result.Cells.results[5].Value,PictureURL:result.Cells.results[6].Value,PreferredName:result.Cells.results[7].Value,SipAddress:result.Cells.results[8].Value,Skills:result.Cells.results[9].Value,WorkEmail:result.Cells.results[10].Value,WorkPhone:result.Cells.results[11].Value,MobilePhone:result.Cells.results[12].Value,OfficeNumber:result.Cells.results[13].Value,HierarchyUrl:result.Cells.results[14].Value,DelveURL:delveUrl,DocId:result.Cells.results[1].Value });
                });
			
                //returns the results and refines to the global arrays
                $scope.searchResults=ResultList;
                $scope.searchRefiners = refiners;
            
                //notifies the binding engine that the data has changed
			     $scope.$digest();
            }
        }
        
        function onGetSearchResultsFail(data, errorCode, errorMessage) {
            alert('got error');
            $('#related-content-results').text('An error occurred whilst searching for related content - ' + errorMessage);
        }
            

        }
        
        
        
        
    }
    
    
);





	
