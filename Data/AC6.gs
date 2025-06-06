function doPost(e) {
  try {
    const data = JSON.parse(e.parameter.data);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("otherBuilds");

    if (!sheet) {
      return ContentService.createTextOutput("Sheet 'otherBuilds' not found.");
    }

    sheet.appendRow([
      data.acName,
      data.parts[0],  // head
      data.parts[1],  // core
      data.parts[2],  // arms
      data.parts[3],  // legs
      data.parts[4],  // booster
      data.parts[5],  // generator
      data.parts[6],  // fcs
      data.parts[7],  // expansion
      data.parts[8],  // rarm
      data.parts[9],  // larm
      data.parts[10], // rback
      data.parts[11], // lback
      data.downloadCode,
      data.notes
    ]);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService.createTextOutput("Error: " + error).setMimeType(ContentService.MimeType.TEXT);
  }
}





function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("otherBuilds");
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const data = rows.map(row => {
    const entry = {};
    headers.forEach((h, i) => entry[h] = row[i]);
    return entry;
  });

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
