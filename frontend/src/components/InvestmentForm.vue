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

export default {
  setup() {
    const investment = ref({
      date: '',
      amount: 0,
      stock: '',
    });

    const investmentsList = ref([]);

    const fetchInvestments = () => {
      fetch('/api/investments')
        .then(response => response.json())
        .then(data => {
          console.log('Investments fetched:', data);
          investmentsList.value = data;
        })
        .catch(error => {
          console.error('Error fetching investments:', error);
        });
    };

    onMounted(() => {
      fetchInvestments(); // 在頁面載入時呼叫 fetchInvestments
    });

    const submitForm = () => {
      // 在這裡呼叫 POST /api/investments API，使用 investment 數據
      console.log('投資紀錄：', investment.value);

      fetch('/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(investment.value),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Investment created:', data);
          fetchInvestments()  // reload
        })
        .catch(error => {
          console.error('Error creating investment:', error);
          // 在這裡處理錯誤
        });
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW', options);
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
