<template>
  <div class="loading">
    <div class="progress__container">
      <div
        class="progress__fill"
        :style="{ width: progress__fill + '%' }"
      ></div>

      <span class="progress__text">{{ Math.round(progressValue /10)}}%</span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      progressValue: 0,
      progress__fill: 0,
    };
  },
  computed : {
      progress__fill(){
          return this.progress__fill.toFixed();
      }
  },
  created() {
    setInterval(() => {
      if (this.progress__fill < 100){
      this.progress__fill += 0.1;
      this.progressValue += 1;
      }
      else{
          clearInterval();
      }
    }, 10);
  },
};
/*
    gammal js, ej vue.js kompatibelt
    function updateProgressBar(progressbar,value){
        value= Math.round(value);
        document.querySelector(".progress__fill").style.width =`${value}%`;
        document.querySelector(".progress__text").textContent =`${value}%`;
    }
    
    const myProgressBar = document.querySelector(".progress");

    updateProgressBar(myProgressBar, 72);
    */
</script>



<style scoped>
.progress__container {
  align-self: center;
  position: relative;
  width: 210px;
  height: 30px;
  background: grey;
  border-radius: 5px;
}

.progress__text {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}

.progress__fill {
  position: absolute;
  border-radius:5px;
  height: 100%;
  background: green;
  transition: all 0.2;
}
</style>