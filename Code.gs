function fetchSchoolData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.appendRow(['Primary School Name', 'School Type', 'Email']);
  
  var baseUrl = 'https://search.moe.gov.sg/solr/moe_school_index/select';
  var totalSchools = 182;
  var schoolsProcessed = 0;
  
  while (schoolsProcessed < totalSchools) {
    var params = {
      q: '*',
      fq: 'school_journey_ss:"Primary school" AND active_b:true',
      sort: 'slug_s asc',
      rows: '20',
      start: schoolsProcessed,
    };

    var url = baseUrl + '?' + Object.keys(params).map(function(key) {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&');
    
    try {
      var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      var jsonData = JSON.parse(response.getContentText());
      
      if (jsonData && jsonData.response && jsonData.response.docs) {
        var schools = jsonData.response.docs;
        for (var i = 0; i < schools.length; i++) {
          var school = schools[i];
          var schoolName = school.school_name_s || 'Unknown';
          var schoolType = school.school_type_ss ? school.school_type_ss.join(', ') : 'Unknown';
          var schoolSlug = school.slug_s;
          var schoolUrl = 'https://www.moe.gov.sg/schoolfinder/schooldetail?schoolname=' + schoolSlug;
          var email = getEmailFromSchoolPage(schoolUrl);
          sheet.appendRow([schoolName, schoolType, email]);
        }
        schoolsProcessed += schools.length;
      } else {
        Logger.log("Unable to find the expected data in the response.");
        break;
      }
    } catch (e) {
      Logger.log("Error during the API request: " + e.message);
      break;
    }
  }

  function getEmailFromSchoolPage(schoolUrl) {
    try {
      var response = UrlFetchApp.fetch(schoolUrl);
      var html = response.getContentText();
      var emailMatch = html.match(/mailto:([^"]+)/);
      return emailMatch && emailMatch[1] ? emailMatch[1] : 'Email not found';
    } catch (e) {
      Logger.log("Error fetching school page: " + e.message);
      return 'Error fetching email';
    }
  }

  Logger.log("Data extraction complete.");
}
