<template>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="getChartData" />
</template>
  
<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export default {
  name: "DounghnutChart",
  components: { Doughnut },
  props: ["colors", "dataChart", "lablesChart"],
  data() {
    return {
      chartData: {},
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    getChartData() {
      return {
        labels: this.$props.lablesChart,
        datasets: [
          {
            data: this.$props.dataChart,
            backgroundColor: this.$props.colors,
            borderColor: "#00191D",
            borderWidth: "1",
          },
        ],
      };
    },
  },
};
</script>