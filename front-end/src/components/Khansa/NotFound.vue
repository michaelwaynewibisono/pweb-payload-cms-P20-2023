<template>
    <div class="error-container">
        <h1 aria-label="404 Error">4<span></span>4</h1>
        <h2>This Page Does not Exist Now</h2>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold flex justify-center py-2 px-4 rounded-full my-4">
            <li><a href="/">Back Home</a></li>
        </button>
    </div>
</template>
  
<style scoped lang="scss">
.error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: sans-serif;
    text-align: center;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    color: white;
    background-color: #333;
    /* Ganti warna latar belakang sesuai keinginan */
}

h1 {
    font-size: 4em;
    /* Menggunakan ukuran font yang lebih besar */
    font-weight: 700;
    color: #fff;
    /* Menggunakan warna putih */
    position: relative;
    margin-bottom: 20px;
    /* Menambahkan margin ke bawah */
}

h1 span::after {
    content: '🕛';
    font-size: 0.9em;
    animation: clock 5s linear infinite;
}

h2 {
    font-size: 1.5em;
    /* Menggunakan ukuran font yang lebih besar */
    font-weight: 400;
    line-height: 1.2;
    color: #fff;
    /* Menggunakan warna putih */
    font-family: sans-serif;
}

@keyframes clock {
    0% {
        content: '🕛';
    }

    10% {
        content: '🕐';
    }

    20% {
        content: '🕑';
    }

    30% {
        content: '🕒';
    }

    40% {
        content: '🕓';
    }

    50% {
        content: '🕔';
    }

    60% {
        content: '🕕';
    }

    70% {
        content: '🕖';
    }

    80% {
        content: '🕗';
    }

    90% {
        content: '🕘';
    }

    100% {
        content: '🕛';
    }
}</style>  