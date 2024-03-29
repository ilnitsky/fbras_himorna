<template>
    <main class="main">
        <MyHeader />
        <section class="result">
            <div class="wrap">
                <div class="result-header">
                  <h4 v-if="(getTable || results) && getTable.table.data.length > 0 || results.table.data.length > 0> 0">{{ results.title || getTable.title}}</h4>
                  <h4 v-else>Nothing found, please try again</h4>
                  <a @click="download" class="button violet download" v-if="(getTable || results) && getTable.table.data.length > 0 || results.table.data.length > 0">
                    <p>Download</p>
                  </a>
                </div>
                <MyTable :max="10" v-if="results" :data="getTable.table || results.table" />
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
import axios from 'axios'

export default {
  name: 'result',
  components: {
    MyHeader,
    MyTable,
    Loader,
    MyFooter
  },
  data() {
    return {
      results: null,
      link: null
    }
  },
  computed: {
    getTable () {
      return this.$store.getters.getResults
    }
  },
  methods: {
    async download() {
      this.$store.dispatch('setLoader', true)
      let query = `/lncrna/api/v1/download`;
      let searchData = await this.$store.getters.getSearchData;
      axios.post(
          query,
          JSON.stringify(searchData),
          {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/csv',
            },
            timeout: 1000 * 60 * 60 * 24 * 7
        })
        .then(({ data }) => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'Table.csv'); //any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .finally(()=>{
          this.$store.dispatch('setLoader', false);
        })

        ;
      }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    this.results = await this.$store.getters.getResults
    this.$store.dispatch('setLoader', false)
  }
}

</script>
