
import InvoiceDesigner from '@views/InvoiceDesigner';
import InvoicePreViewer from '@views/InvoicePreViewer';

export default  [
  {
    path: '/invoiceDesign',
    component: InvoiceDesigner,
  },
  {
    path: '/invoicePreview',
    component: InvoicePreViewer
  },
];


export const protectedRouteConfig = [
];


export const cacheRuleMap = {
}

