

export function printById(id) {
  const prtHtml = document.getElementById(id).innerHTML;
  let stylesHtml = '';
  for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
    stylesHtml += node.outerHTML;
  }
  const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
  WinPrint.document.write(`<!DOCTYPE html>
    <html>
      <head>
        ${stylesHtml}
      </head>
      <body>
        ${prtHtml}
      </body>
  </html>`);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
}