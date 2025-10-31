import { defineStore } from "pinia";
import { api } from "../utils/api";
import { notification } from "ant-design-vue";

export interface WeekStat {
  week: number;
  visits: number;
  users: number;
  pageViews: number;
}

export interface StatisticResponse {
  month: number;
  year: number;
  weekly: WeekStat[];
}

export interface UserStats {
  totalUsersCount: number;
  sellerCount: number;
  customerCount: number;
  moderatorCount: number;
  blockedCount: number;
}

const useStatistic = defineStore("statistic", {
  state: () => ({
    graphInfo: {} as StatisticResponse,
    usersStats: {} as UserStats,
    loading: false,
  }),

  actions: {
    async getStatistic({ month, year }: { month: number; year: string }) {
      try {
        this.loading = true;
        const { data } = await api({
          url: "/api/statistic",
          method: "GET",
          params: { month, year },
        });
        this.graphInfo = data;
        this.usersStats = data.usersStats;
      } catch (error: any) {
        const errorMessage = error.response?.data.message || error;
        notification.error({
          message: errorMessage,
        });
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useStatistic;
