import InvoicePreViewer from "../views/InvoicePreViewer.vue";
import InvoiceDesigner from "../views/InvoiceDesigner.vue";

export default [
  { path: "/", redirect: "/invoiceDesign" },
  {
    path: "/invoiceDesign",
    component: InvoiceDesigner,
  },
  {
    path: "/invoicePreview",
    component: InvoicePreViewer,
  },
];

export const protectedRouteConfig = [];

export const cacheRuleMap = {};
