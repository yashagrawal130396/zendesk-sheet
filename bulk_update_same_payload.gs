function bulkupdate() {
  var sheets = SpreadsheetApp.openById('SHEET_ID').getSheetByName('Sheet1');
  var count_ids = getNextRowbu(sheets);
  var zen_header = {'Content-Type': 'application/json',
                    "Authorization" : "Basic ZEN_ENCODED_HEADER==",            
                   };
  var matrix = [];
  
  if(count_ids >= 100) {
    var page1 = Math.floor(count_ids/100);
    for(var i = 0; i < page1; i++){
      if(i == 0) {
        var j = 1;
        var j2 = 100;
        
        var num_rows = j2;
        var range = sheets.getRange(j+1, 11, num_rows, 1).getValues();
        var combined = range.join(",");
        var zen_put_url = 'https://headout.zendesk.com/api/v2/tickets/update_many.json?ids=' + combined ;
        var payload = '{"ticket": {"additional_tags": ["ticket_sms_sent"]}}';
        
        var zen_put_options = {
          "method": "PUT",
          "contentType":"application/json",
          "headers" : zen_header,
          "payload" : payload
        };
        var create_res = UrlFetchApp.fetch(zen_put_url, zen_put_options);
      } 
      else {
        var j = 1 + (100*i);
        var j2 = 100;
        
        var num_rows = j2;
        var range = sheets.getRange(j+1, 11, num_rows, 1).getValues();
        var combined = range.join(",");
        var zen_put_url = 'https://headout.zendesk.com/api/v2/tickets/update_many.json?ids=' + combined ;
        var payload = '{"ticket": {"additional_tags": ["ticket_sms_sent"]}}';
        
        var zen_put_options = {
          "method": "PUT",
          "contentType":"application/json",
          "headers" : zen_header,
          "payload" : payload
        };
        var create_res = UrlFetchApp.fetch(zen_put_url, zen_put_options);
      }
    }
    for(var i = page1; i<=page1; i++) {
      var j = 1 + (100*i);
      var j2 = count_ids;
      var num_rows = j2 - (j-1);
      var nR2 = sheets.getLastRow() + 1;
      var range = sheets.getRange(j+1, 11, num_rows, 1).getValues();
      var combined = range.join(",");
      var zen_put_url = 'https://headout.zendesk.com/api/v2/tickets/update_many.json?ids=' + combined ;
      var payload = '{"ticket": {"additional_tags": ["ticket_sms_sent"]}}';
      
      var zen_put_options = {
        "method": "PUT",
        "contentType":"application/json",
        "headers" : zen_header,
        "payload" : payload
      };
      var create_res = UrlFetchApp.fetch(zen_put_url, zen_put_options);
    }
  }
  else {
    var j = 1;
    var j2 = count_ids;
    var num_rows = j2;
    var nR3 = sheets.getLastRow() + 1;
    var range = sheets.getRange(j+1, 11, num_rows, 1).getValues();
    var combined = range.join(",");
    var zen_put_url = 'https://headout.zendesk.com/api/v2/tickets/update_many.json?ids=' + combined ;
    var payload = '{"ticket": {"additional_tags": ["ticket_sms_sent"]}}';
    
    var zen_put_options = {
      "method": "PUT",
      "contentType":"application/json",
      "headers" : zen_header,
      "payload" : payload
    };
    var create_res = UrlFetchApp.fetch(zen_put_url, zen_put_options);
  }
  Logger.log('Success');
  return;
}


function getNextRowbu(sheets) {  
  var bookingids = sheets.getRange("E2:E").getValues();
  for (var i in bookingids) {
    if(bookingids[i][0] == "") {
      return Number(i);
      break;
    }
  }
}
