<template>
  <div class="col-sm-6 col-md-6">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model.number="quantity"
            :class="{ danger: insufficientFunds }"
          />
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            :class="insufficientFunds ? 'btn-danger' : 'btn-success'"
            @click="buyStock"
            :disabled="disabledBtn"
          >
            {{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    funds() {
      return this.$store.getters['funds'];
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    disabledBtn() {
      return (
        this.insufficientFunds ||
        this.quantity <= 0 ||
        !Number.isInteger(this.quantity)
      );
    },
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      this.$store.dispatch('buyStock', order);
      this.quantity = 0;
    },
  },
};
</script>

<style scoped>
.danger {
  border: 1px solid #d9534f;
}
</style>
