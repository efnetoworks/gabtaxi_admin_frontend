<template>
  <div>
      <h3>Heatmap</h3>
      <div class="form-group col-6">
          <label for="">Heat Map Toggle</label>
          <select id="" class="form-control">
              <option value="">Heat Map Options</option>
              <option value="">Surge on demand</option>
              <option value="">Drivers Surge</option>
              <option value="">Passengers Surge</option>
          </select>
      </div>
      <center>
        <Map :key="mapKey" :locarea="{name:selectedArea}"/>
        </center>
  </div>
</template>

<script>
import Map from './map2.vue'
    export default{
        components:{Map},
        data() {
            return {
                user:null,
                opencreateform:false,
                showtable:true,
                singleObject:null,
                tableKey:0,
                updateMode:false,
                isLoading:false,
                filter:1,
                mapKey:0,
                selectedArea:"Maitama"

            }
        },

        methods: {


        },
    }
</script>


