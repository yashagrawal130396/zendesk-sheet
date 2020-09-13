function bulk() {
 var sheets = SpreadsheetApp.openById('SHEET_ID').getSheetByName('SHEET_NAME');
    var zen_header = {'Content-Type': 'application/json',
             "Authorization" : "Basic ZENDESK_ACCESS_TOKEN==",            
             };
  
  for(var i = 2; i < 1002; i+=100){ 
  var content = sheets.getRange(Number(i), 24, 64, 1).getDisplayValues();
    var combined = content.join(",");
    var zen_create_url = 'https://ZENDESK_URL/api/v2/tickets/update_many.json';
    try {
      var payload = '{"tickets": ['+ combined +']';
  Logger.log(payload);
  var zen_create_options = {
        "method": "PUT",
        "contentType":"application/json",
        "headers" : zen_header,
        "payload" : payload
          };
  var create_res = UrlFetchApp.fetch(zen_create_url, zen_create_options);
  Logger.log(create_res);
      if(content.length > 100) {var len = 100;} else {var len = content.length;}
    sheets.getRange(Number(i), 2, len, 1).setValue("Sent");
    } catch(err) {
    sheets.getRange(Number(i), 2, len, 1).setValue(err);
    }
  }
}
