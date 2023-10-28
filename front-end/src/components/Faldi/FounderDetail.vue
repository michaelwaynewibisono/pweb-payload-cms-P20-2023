<template>
    <div>
      <h2>Detail Founder</h2>
      <div>
        <h3>Nama: {{ $route.params.name }}</h3>
        <p>Tentangku: <br>{{ founderDetail }}</p>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        founderDetails: {
          "Michael Wayne": "Penjelasan khusus untuk Founder 1",
          "Khansa Adia Rahma": "Penjelasan khusus untuk Founder 2",
          "Refaldi Agustian": "Penjelasan khusus untuk Founder 3",
        }
      };
    },
    computed: {
      founderDetail() {
        // Ambil nama founder dari parameter route
        const founderName = this.$route.params.name;
  
        // Temukan penjelasan khusus untuk founder berdasarkan nama
        const detail = this.founderDetails[founderName];
  
        return detail || "Tidak ada penjelasan yang tersedia.";
      }
    },
  };
</script>
  
<style scoped>
    .founder-detail {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .founder-info {
    margin-top: 20px;
    }

    h2 {
    color: #333;
    }

    h3 {
    font-size: 24px;
    color: #007bff;
    }

    p {
    font-size: 16px;
    color: #5719ae;
    margin-top: 10px;
    }
</style>