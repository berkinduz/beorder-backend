Beorder app backend development. 
with

PostgreSQL
Node JS
    Express
    Body Parser

<div>
    config.js dosyası ile db bağlantısı yapıldı.
</div>
<div>
    bağlanılan db'de queries klasörü içerisindeki modelle ile query'ler oluşturuldu.
</div>
<div>
    modellerin REST API'leri express yardımıyla index.js dosyası içerisinde oluşturuldu. Route'ler belirtildi.
</div>
<div>
    register işlemlerinde password hashing işlemi yapıldı. Bu işlem için postgre'nin pgcrypto modülü kullanıldı.
</div>
<div>
    login API'si oluşturuldu
</div>
<div>
    login API'sine JWT kullanılarak post anında token oluşturularak db'ye eklendi. 
</div>
<div>
    auth middlewaresi oluşturuldu. logout API'si oluşturuldu.
</div>