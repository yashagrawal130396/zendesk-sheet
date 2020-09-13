function tracker() {
  var sheet = SpreadsheetApp.openById('SHEET_ID').getSheetByName('SHEET_NAME');
  var headers = {'Content-Type': 'application/json',
                 "Authorization" : "Basic ZENDESK_HEADER=="};
  
  var options = {
    method: "get",
    contentType:"application/json",
    headers : headers
  };
  var lR = sheet.getLastRow();
  var range = sheet.getRange(2, 1, lR, 7).getDisplayValues();
  
  for(var i in range) {
    try {
      if(range[i][0] == '') continue ;
      var url = 'https://ZEN_URL/api/v2/tickets/'+ range[i][0] +'/comments.json';
      var res = UrlFetchApp.fetch(url, options);
      var data = JSON.parse(res);
      var matrix = [];
      
      for(var j=0; j < data.count; j++) {
        if(String(data.comments[j].plain_body).indexOf("Read receipt") > -1) {
          var one = 'Email_seen';
          var two = data.comments[j].plain_body;
          var three = data.comments[j].created_at;
          var arr = []
          matrix = [one,two,three];
          arr.push(matrix);
          sheet.getRange(Number(i)+2, 5, arr.length, arr[0].length).setValues(arr);
          break;
        } else { continue; }
      }
      sheet.getRange(Number(i)+2, 10, 1, 1).setValue('Checked');
    }
    catch(err) {
      sheet.getRange(Number(i)+2, 10, 1, 1).setValue(err);
    }
  }
  SpreadsheetApp.flush();
}
