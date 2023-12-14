document.addEventListener('DOMContentLoaded', function() {
    var downloadBtn = document.getElementById('downloadBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            var urlInput = document.getElementById('urlInput').value;
            var resultDiv = document.getElementById('result');
            var loadingDiv = document.getElementById('loading');

            // Tampilkan animasi loading
            loadingDiv.style.display = "block";
            // Atur ukuran teks, jenis font, dan warna loading
            loadingDiv.style.fontSize = "20px";
            loadingDiv.style.fontFamily = "verdana";
            loadingDiv.style.color = "white";

            var apiUrl = "https://tiktok-full-info-without-watermark.p.rapidapi.com/vid/index?url=" + urlInput;

            fetch(apiUrl, {
                headers: {
                    "X-RapidAPI-Key": "8a9451b54bmsh997e8b63578a8c7p1cdbcejsnd3dcbee782ed",
                    "X-RapidAPI-Host": "tiktok-full-info-without-watermark.p.rapidapi.com"
                }
            })
            .then(response => response.json())
            .then(data => {
                // Tidak menampilkan deskripsi dari API

                var postType = data.post_type;

                if (postType === "video_post") {
                    var videoElement = document.createElement('video');
                    videoElement.src = data.video[0];
                    videoElement.controls = true;
                    videoElement.style.width = "6cm";
                    videoElement.style.height = "6cm";
                    videoElement.style.display = "block";
                    videoElement.style.margin = "0 auto"; // Tengahkan elemen
                    videoElement.style.marginBottom = "15px"; // Tambahkan spasi di bawah elemen

                    resultDiv.innerHTML = "";
                    resultDiv.appendChild(videoElement);
                } else {
                    var imageElement = document.createElement('img');
                    imageElement.src = data.cover[0];
                    imageElement.style.width = "65cm";
                    imageElement.style.height = "65cm";
                    imageElement.style.display = "block";
                    imageElement.style.margin = "0 auto"; // Tengahkan elemen
                    imageElement.style.marginBottom = "10px"; // Tambahkan spasi di bawah elemen

                    resultDiv.innerHTML = "";
                    resultDiv.appendChild(imageElement);
                }

                // Tombol download tanpa membuka tab baru
                var downloadButton = document.createElement('button');
                downloadButton.innerHTML = "Download? Tekan Titik Tiga Di Sebelah Kanan Video";
                downloadButton.addEventListener('click', function() {
                    // Gunakan fungsi download tanpa membuka tab baru
                    downloadMedia(postType === "video_post" ? data.video[0] : data.cover[0]);
                });

                // Tengahkan tombol download
                downloadButton.style.display = "block";
                downloadButton.style.margin = "0 auto";

                resultDiv.appendChild(downloadButton);

                // Sembunyikan animasi loading setelah mendapatkan hasil dari API
                loadingDiv.style.display = "none";
            })
            .catch(error => {
                resultDiv.innerHTML = "Error: MASUKAN URL DULU DONG KAKAK:)";
                // Sembunyikan animasi loading jika terjadi kesalahan
                loadingDiv.style.display = "none";
            });
        });
    } else {
        console.error("Element with ID 'downloadBtn' not found.");
    }

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

    // Fungsi untuk melakukan download tanpa membuka tab baru
    function downloadMedia(mediaUrl) {
        var a = document.createElement('a');
        a.href = mediaUrl;
        a.download = 'downloaded_media';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});