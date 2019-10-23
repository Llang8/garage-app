<template>
  <div class="index">
    <div class="flex-row">
      <div class="search-bar">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.87593 6.36905C7.5152 5.59986 7.83322 4.61386 7.76384 3.6162C7.69445 2.61855 7.243 1.68604 6.5034 1.01271C5.76381 0.339372 4.79304 -0.0229483 3.79304 0.00112737C2.79304 0.025203 1.84082 0.433822 1.13451 1.14197C0.428188 1.85012 0.0221532 2.80326 0.00087999 3.80311C-0.0203932 4.80295 0.344731 5.77249 1.02029 6.51003C1.69585 7.24756 2.62982 7.69629 3.62789 7.76286C4.62596 7.82943 5.61128 7.50871 6.37884 6.86743L9.39494 9.89265C9.42744 9.92628 9.46633 9.95309 9.50932 9.97152C9.55231 9.98995 9.59854 9.99963 9.64532 9.99999C9.69209 10.0003 9.73847 9.99139 9.78174 9.97362C9.82501 9.95586 9.8643 9.92964 9.89732 9.89652C9.93034 9.8634 9.95643 9.82403 9.97405 9.78071C9.99168 9.7374 10.0005 9.691 9.99998 9.64424C9.99946 9.59748 9.98964 9.55128 9.97106 9.50836C9.95249 9.46544 9.92554 9.42666 9.8918 9.39427L6.87593 6.36905ZM3.8964 7.06771C3.26536 7.06983 2.6479 6.8847 2.12217 6.53576C1.59644 6.18681 1.18609 5.68975 0.943095 5.10751C0.700096 4.52526 0.635369 3.88402 0.757109 3.26497C0.878849 2.64592 1.18158 2.07692 1.62697 1.62999C2.07237 1.18306 2.64039 0.878317 3.25912 0.75434C3.87785 0.630363 4.51947 0.69273 5.10273 0.933544C5.68599 1.17436 6.18466 1.58279 6.5356 2.10712C6.88654 2.63146 7.07397 3.24811 7.07416 3.87901C7.07484 4.7229 6.74063 5.53259 6.14487 6.1304C5.54912 6.72821 4.74047 7.06531 3.8964 7.06771Z" fill="black"/>
        </svg>
        <input type="text" v-model="search">
      </div>
      <div class="results-count">
        <p><strong>{{ results.length }}</strong> sales in a <strong>{{ radiusMI }} mile</strong> radius.</p>
      </div>
    </div>
    <div class="results-container">
      <div class="result" v-for="i in 10">
        <img src="https://placehold.it/120x120" alt="Garage Sale Pic">
        <h1 class="sale-title">Large multi-family garage sale</h1>
        <h2 class="sale-town">Hawthorne Woods</h2>
        <p class="sale-description">Lots of NEW items, in addition to normal garage sale finds. Women's clothes and shoes , household items, outdoor and garden, holiday decor, tools, collectables, throw rugs and decorative rugs, cosmetics and beauty products...</p>
        <p class="categories"><strong>Categories: </strong>Toys Tools Clothes Games Home</p>
        <h3 class="distance">{{ Math.floor(Math.random() * 26) }} Miles</h3>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      search: '',
      results: ['','',''],
      radiusMI: 20
    }
  }
}
</script>

<style lang="scss">
@import '../assets/root.scss';

.index {
  padding: 16px 12px;
  font-family: 'Roboto', sans-serif;

  .flex-row {
    display: flex;
    justify-content: space-between;

    .search-bar {
      min-width: 156px;
      width: 50%;
      height: 24px;
      border-radius: 5px;
      background-color: rgb(240, 240, 240);
      box-shadow: 2px 2px 2px rgba(20,20,20,.1);
      position: relative;
      padding: 0 0 0 20px;

      svg {
        position: absolute;
        left: 9px;
        top: 50%;
        transform: translateY(-50%);
      }

      input {
        border: 0;
        border-radius: 5px;
        background-color: transparent;
        width: 100%;
        height: 100%;
      } 
    }

    .results-count {
      font-size: 13px;
      font-weight: bold;
      color: #494949;
      margin-left: 10px;
      display: flex;
      align-items: center;

      strong {
        color: black;
      }
    }

  }
}

.results-container {
  padding-top: 25px;

  .result {
    position: relative;
    margin: 15px 0;

    img {
      float: left;
      margin: 0 10px 5px 0;
    }

    hr {
      margin-top: 15px;
    }

    h1 {
      font-size: 14px;
      font-family: 'Red Hat Text', sans-serif;
      font-weight: bold;
      color: $blue-text;
    }

    h2 {
      font-size: 12px;
      font-family: 'Red Hat Text', sans-serif;
      font-weight: bold;
      color: rgb(114, 114, 114);
      margin-bottom: 5px;
    }

    .distance {
      position: absolute;
      bottom: 15px;
      right: 15px;
      font-size: 12px;
    }

    p {
      color: rgb(114, 114, 114);
      font-size: 12px;
      margin-bottom: 10px;
    }

  }
}


</style>
