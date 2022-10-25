<template>
  <div>
    <div class="paper">
      <div class="head">
        <center>
          <div class="receipt_label">
            <p class="label">Receipt</p>
          </div>
          <h5 v-if="items != null">#{{ String(items.summary.ref_no).padStart(7, 0)}}</h5>
        </center>
      </div>
      <div class="body">
        <div class="tableArea">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody v-if="items != null">
              <tr v-for="item in items.products" :key="item">
                <td>{{item.name}}</td>
                <td>{{item.qty}}</td>
                <td>{{item.price}}</td>
                <td>{{item.price * item.qty}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="TotalCalc" v-if="items != null">
          <div class="row">
            <div class="col-4">Subotal:</div>
            <div class="col-4">&#8358; {{items.summary.amount}}</div>
          </div>
          <div class="row">
            <div class="col-4">Discount</div>
            <div class="col-4">{{items.summary.discount}} %</div>
          </div>
          <div class="row">
            <div class="col-4">V.A.T</div>
            <div class="col-4">{{items.summary.vat}}</div>
          </div>
          <div class="row">
            <div class="col-4">Total</div>
            <div class="col-4">&#8358; {{Math.ceil(items.summary.total)}}</div>
          </div>
        </div>
      </div>
      <div class="footnote mt-5">
        <center>
          <small>
            <p><i>thank you for your patronage! see you next time.</i></p>
            <b>{{ this.details }}</b>
          </small>
        </center>
      </div>
    </div>

  </div>
</template>
<script>
  export default{
    props:{
      items:null,
      details:null
    },
    data() {
      return {

      }
    },
  }
</script>
<style scoped>
.receipt_label{
  border: 1px solid black;
  border-radius: 100%;
  width: 70px;
  height: 60px;
  padding: 5px;
  color: white;
  background-color:black;
  margin-bottom:2%
}

.label{
  position:relative;
  margin-top: 10px;
}

td,th{
  font-size: smaller;
}
</style>
