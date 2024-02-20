<template>
  <div>
    <!-- 現有投資紀錄清單 -->
    <h2>現有投資紀錄清單</h2>
    <ul>
      <li v-for="item in investmentsList" :key="item._id">
        {{ formatDate(item.date) }} - {{ item.amount }} - {{ item.stock }}
      </li>
    </ul>

    <!-- 新增投資紀錄 -->
    <h2>新增投資紀錄</h2>
    <form @submit.prevent="submitForm">
      <!-- 表單項目：日期、金額、股票名稱等 -->
      <label for="date">日期：</label>
      <input type="date" v-model="investment.date" required>

      <label for="amount">金額：</label>
      <input type="number" v-model="investment.amount" required>

      <label for="stock">股票名稱：</label>
      <input type="text" v-model="investment.stock" required>

      <!-- 提交按鈕 -->
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchInvestments, createInvestment } from '../services/InvestmentService'
import { formatDate } from '../utils/dateUtils'

export default {
  setup() {
    const investment = ref({
      date: '',
      amount: 0,
      stock: '',
    });

    const investmentsList = ref([]);

    const fetchInvestmentsData = async () => {
      const apiUrl = '/api/investments'
      try {
        const data = await fetchInvestments(apiUrl);
        investmentsList.value = data
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    };

    onMounted(() => {
      fetchInvestmentsData(); // 在頁面載入時呼叫 fetchInvestments
    });

    const submitForm = async () => {
      // 在這裡呼叫 POST /api/investments API，使用 investment 數據
      try {
        const formData = investment.value;
        console.log('投資紀錄：', formData);

        const apiUrl = '/api/investments'
        await createInvestment(apiUrl, formData);
        
        // Optionally, you can refresh the investment list after creating a new investment
        await fetchInvestmentsData();
      } catch (error) {
        console.error('Error creating investment:', error);
      }
    };

    return {
      investment,
      investmentsList,
      submitForm,
      formatDate,
    };
  },
};
</script>

<style scoped>
</style>
