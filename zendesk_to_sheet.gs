function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('SHEET_ID').getSheetByName('SHEET_NAME');
    var lR = sheet.getLastRow()
    var exportdata = [];
    var params = e.postData.contents;
    var data = JSON.parse(params);
    var tid = data.tid ;
    var range = sheet.getRange(1, 1, lR+1, 1).getDisplayValues();
    var nR = run(sheet, range, tid);
    
    var var1 = data.var1 ;
    var var2 = data.var2 ;
    var var3 = data.var3 ;
    
    var pastedata = [[var1],[var2],[var3]];
    exportdata.push(pastedata);
  }
  catch(err) {
    exportdata.push(err);
  }
  if(nR == -1) {
    sheet.getRange(lR+1, 1, exportdata.length, exportdata[0].length).setValues(exportdata);
  }
  else {
    sheet.getRange(nR, 1, exportdata.length, exportdata[0].length).setValues(exportdata);
  }
  return ContentService.createTextOutput("Received");
}

function run(sheet, range, tid) {
  for(var i in range) {
    if(range[i][0] == tid)
      return Number(i)+1;
  }
  return -1;
}
