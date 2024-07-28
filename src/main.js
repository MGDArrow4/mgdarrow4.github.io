import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles.scss";

import { router } from "./router/router";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCalendarDays,
  faCaretLeft,
  faChartColumn,
  faChartPie,
  faChartSimple,
  faCheckCircle,
  faChurch,
  faCross,
  faFileArrowDown,
  faGear,
  faHospital,
  faHouse,
  faListUl,
  faPencil,
  faPersonRays,
  faPhone,
  faPlus,
  faRubleSign,
  faShuffle,
  faSquareCheck,
  faSquarePollVertical,
  faTrash,
  faTruckField,
} from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

library.add(
  faCalendarDays,
  faCaretLeft,
  faChartColumn,
  faChartPie,
  faChartSimple,
  faCheckCircle,
  faChurch,
  faCross,
  faFileArrowDown,
  faGear,
  faHospital,
  faHouse,
  faListUl,
  faPencil,
  faPersonRays,
  faPhone,
  faPlus,
  faRubleSign,
  faShuffle,
  faSquareCheck,
  faSquarePollVertical,
  faTrash,
  faTruckField,
  faBitcoin,
  faSquare
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount("#app");
