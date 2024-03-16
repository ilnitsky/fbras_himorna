<template>
    <main class="main">
        <MyHeader />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Histone modification: {{$route.params.id}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="modification || getData">
                      <h4>{{ modification.chart.title || getData.chart.title }}</h4>
                      <ChartPeaks :data="modification.chart || getData.chart" />
                  </div>
                  <div class="block-none" v-if="!modification && !this.$store.getters.loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <MyTable :max="10" v-if="modification" :data="getData.table || modification.table" />
            </div>
        </section>
        <Loader />
        <MyFooter />
    </main>
</template>
<script>
import MyHeader from '@/components/MyHeader';
import MyFooter from '@/components/MyFooter';
import MyTable from '@/components/MyTable';
import Loader from '@/components/Loader';
import ChartPeaks from '@/components/charts/ChartPeaks'

export default {
  name: 'histone',
  components: {
    MyHeader,
    MyTable,
    Loader,
    MyFooter,
    ChartPeaks
  },
  data() {
    return {
      modification: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getHistone
    }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    this.modification = await this.$store.dispatch('fetchHistone', [this.$route.params.id, 1, 10])
    this.$store.dispatch('setLoader', false)
  }
}

</script>
