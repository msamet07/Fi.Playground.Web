##  Fi Ticket Project

## **🎞 Projeden Görüntüler**





## Gereklilikler

- [x] React hooks
- [x] Router (react-router/ reach router / etc)
- [x] Context API
- [x] Form management library (react-hook-form(önerilen) / formik / etc)

## Dikkat edelim

- [x] Tüm formlarda gerekli validasyonlar olsun.
- [x] Back-end yazmak zorunda degilsiniz, back-end olarak firebase ya da mock bir api kullanabilirsiniz.
- [x] Back-end de SampleControler için unit test yazabilirsiniz.
- [x] Mümkünse admin paneline bir menü ekleyelim (başvuru listesi, çıkıs gibi işlemleri kapsasın)

## Bonus (Zorunlu degil, deneysel ozellikler

- [x] Mobil uyumlulu guzel bir tasarim
- [x] Kullanilabilir UX
- [x] Back-end de kendi Api mi ve tüm gerekli kurulumları yaptım.
- [x] Migration oluşturdum.
- [x] Front- End de Mockoon sorunsuz şekilde kullandım.
- [x] Mockoon ve Back-end dizaynımı birebir yaptım ,ileride Front-end i kendi oluşturduğum Api me bağlamak için sadece Çıkış Portunu /adresini güncellemem yetecek.
- [x] Back-end e aslında Ticket Formuna resim eklemek için de çalışma yaptım. Ama Fake Api ile bunu sağlamak istemediğim için Front-end tarafında henüz bunu kullanmadım.
- [x] Her 2 case dosyası için de verilen Sample lar ile ilerleme imkanı verilmiş olmasına rağmen , Ben back-endi sizin dediğiniz şekilde boş klasöre kodlarla kurdum.Front-end tarafında 2 Sayfa ile hiç yeni bir klasör yada route oluşturmadan projenize uyarlayabilirsiniz demenize karşın,Ben 2 farklı klasör ve 1 component açarak verilen temrini süsleyerek yapmaya çalıştım.

## Başvuru / ticket yönetim sistemi

### Genel Açıklama

Uygulamamız herkese açık bir başvuru formunun son kullanıcı tarafından doldurulması ile başlıyor.  
Formu dolduran kullanıcıya başvurusunu takip edebilecegi bir kod veriliyor. Kullanıcı başvuru durumu sayfasından bu kod ile başvurusunun çözülüp çözülemedigini kontrol edebiliyor.

Kullanıcı adı ve şifre ile girilebilen bir ekrandan da yetkili kullanıcılar gelen başvuruları görüntüleyebiliyor cevaplanmamış başvurulara cevap yazıp durumunu çözüldü / iptal edildi / bekliyor vb gibi güncelleyebiliyor. Gerekirse eski kayıtlara ulaşabiliyor.

#### Detaylı Açıklama

##### Routes / Paths

- /basvuru-olustur (default)
  - Public endpoint.
  - Başvuru formunu herhangi bir kullanıcının doldurmasına imkan verir.
  - Başvuru formunda \[Ad, Soyad, Yaş, TC, Başvuru Nedeni, Adres Bilgisi, Fotograflar/Ekler, Gonder\] butonu yer alır.
- /basvuru-basarili (Basvuru formu doldurulduktan sonra gelen sayfa)
  - Ekranda bir teşekkür mesajı yer alır ve kullanıcıya başvuru detayları ile birlikte başvuru kodu verilir.
- /basvuru-sorgula
  - Ekranda başvuru kodu girilebilen bir input ve sorgula butonu vardır.
- /basvuru/{basvuruNo}
  - Ekranda başvuru varsa bilgileri, son durumu ve verilen cevap(lar) yer alır.
  - Başvuru numarası hatalıysa 404(bulunamadı) mesajı çıkar.
- /admin/basvuru-listesi
  - Başarıli giriş sonrası bekleyen (çözülmemiş/cevaplanmamış) başvuruların listesi yer alır ve basit bilgiler sunar. (Başvuru yapan, tarih)
  - Başvuru listesinde her elemenda başvuruyu görüntüle butonu vardır.
- /admin/basvuru/{basvuruNo}
  - Başvurunun durumu güncellenebilir ve başvuruya cevap yazılabilir.
