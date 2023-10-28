<template>
  <div>
    <!-- <h2>Daftar Founder</h2> -->
    <table class="founder-table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>NRP</th>
          <th>Hobi</th>
          <th></th> <!-- Kolom kosong untuk tombol "View More" -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(founder, index) in founders" :key="index">
          <td>{{ founder.id }}</td>
          <td>{{ founder.nama }}</td>
          <td>{{ founder.nrp }}</td>
          <td>{{ founder.hobi }}</td>
          <td><router-link :to="'/founders/' + founder.nama" class="view-more-button">View More</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      founders: [
        { id: 1, nama: "Michael Wayne", nrp: "5027221071", hobi: "Main sosmed" },
        { id: 2, nama: "Khansa Adia Rahma", nrp: "5027221037 ", hobi: "Cooking" },
        { id: 3, nama: "Refaldi Agustian", nrp: "5027211015", hobi: "Turu" },
        // Tambahkan data founder lainnya sesuai kebutuhan
      ],
    };
  },

  showFounderDetail(founder) {
    // Menggunakan router-link untuk mengarahkan ke rute dengan nama founder
    this.$router.push({
      name: 'FounderDetail',
      params: { name: founder.name }
    });
  },
};
</script>

<style>
.founder-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.founder-table th,
.founder-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.founder-table th {
  background-color: #f2f2f2;
}

.view-more-button {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-more-button:hover {
  background-color: #0056b3;
}
</style>
  