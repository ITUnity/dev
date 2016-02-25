
var app = angular.module('myApp', []);


app.config(['$compileProvider' , function ($compileProvider)
    {
          $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|sip):/);
    }]);
    
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
	
	//item selected event
	$scope.itemSelected=function(person){
		
		$scope.selectedPerson=person;
			
		document.getElementById("detailPanel").style.visibility = "visible";

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
           
           
           var selectProperties = "&selectproperties='SiteTitle,SPSiteUrl,Site,SiteDescription,SiteGroup,SiteLogo,SiteTemplate,contentclass,DisplayAuthor,SPWebURL,Title'"

           
           searchUrl = _spPageContextInfo.webAbsoluteUrl + "_api/search/query?querytext='SiteTitle:" + queryText + "*+(contentclass%3dSTS_Web+OR+contentclass%3dSTS_Site)+and(WebTemplate<>SPSPERSON+AND+WebTemplate<>APP)'&rowlimit=100" + selectProperties ;
           
           console.log("SearchURL:  " + searchUrl);
           
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
            
           
            
            if (results.length == 0) {
                //remove any cached results
                $scope.searchResults = []
                $scope.searchRefiners = [];
            }
            else {
            
            
            	var ResultList = []
	             $.each(results, function (index, result) {
                     
                    var SiteType;
                    
                    if (result.Cells.results[9].Value=="STS_Site")
                    {
                        SiteType="Site Collection"
                    } 
                    if (result.Cells.results[9].Value=="STS_Web")
                    {
                        SiteType="SubSite"
                    } 
                    if (result.Cells.results[8].Value=="Group")
                    {
                        SiteType="O365 Group"
                    }
                     
                    ResultList.push({SiteTitle:result.Cells.results[2].Value,SPSiteUrl:result.Cells.results[3].Value,Site:result.Cells.results[4].Value,SiteDescription:result.Cells.results[5].Value,SiteGroup:result.Cells.results[6].Value,SiteLogo:result.Cells.results[7].Value,SiteTemplate:result.Cells.results[8].Value,contentclass:SiteType,DisplayAuthor:result.Cells.results[10].Value,WebUrl:result.Cells.results[11].Value});
	             
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





	
