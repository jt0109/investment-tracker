<template>
  <div>
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
import { ref } from 'vue';

export default {
  setup() {
    const investment = ref({
      date: '',
      amount: 0,
      stock: '',
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
          // 在這裡可以進行一些反饋或導航
        })
        .catch(error => {
          console.error('Error creating investment:', error);
          // 在這裡處理錯誤
        });
    };

    return {
      investment,
      submitForm,
    };
  },
};
</script>

<style scoped>
</style>
