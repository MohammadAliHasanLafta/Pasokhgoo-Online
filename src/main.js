import { createApp } from "vue";
// import the package
import App from "./App.vue";
import router from "./router";
import Primevue from "primevue/config";
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';  // optional
import Paginator from 'primevue/paginator';
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-orange/theme.css";  
import 'primeicons/primeicons.css';

createApp(App)
.use(router)
.use(Primevue)
.use(VueAwesomePaginate)
.component("Button",Button)
.component("DataTable",DataTable)
.component("Column",Column)
.component("ColumnGroup",ColumnGroup)
.component("Row",Row)
.component("Paginator",Paginator)
.mount("#app");