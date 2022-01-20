## Настройка работы сервера карт

* установить: ```nodejs``` и ```npm``` (если не установлено);
* в терминале ввести: ```npm install``` (установка зависимостей);
* установить npm-пакет: ```npm install -g browserify```;
* убедиться что папка ```data``` имеет следующую структуру:
  * ```data/csv``` (исходные таблицы с данными ```csv```-файлы);
  * ```data/json``` (промежуточные данные ```json```-файлы);
  * ```data/result``` (финальные данные ```js```-файлы);
* убедиться что в папке ```data/result``` присутствуют файлы:
  * ```fiber-lines.js```;
  * ```nodes.js```;
  * ```objects.js```;
* если файлов нет, то:
  * надо наполнить папку ```data/csv``` файлами ```nodes.csv```, ```objects.csv``` (спросить у админа);
  * запустить скрипт в терминале: ```node src/prepare-json-script.js``` который сгенерирует промежуточные файлы:
    * ```nodes.json```
    * ```objects.json```
  * скопировать вручную содержимое файлов:
    * ```./data/csv/nodes.json```;
    * ```./data/csv/objects.json```
  в следующие файлы:
    * ```./data/result/nodes.js``` -> ```const nodes = 'содержимое файла nodes.json'```;
    * ```./data/result/objects.js``` -> ```const objects = 'содержимое файла objects.json'```;
  * файл ```fiber-lines.js``` создается аналогично вручную копированием из ```fiber-lines.geojson```: яндекс-карты (экспорт ```geojson```);
* поправить файл: ```node_modules/leaflet/dist/leaflet.css```:
  * 351 и 356 стр: заменить ```images/layers-2x.png``` на ```images/layers.svg```;
* в терминале ввести: ```npm run build``` (копирование скриптов и стилей в public);
* в терминале ввести: ```npm run server``` (сервер должен быть доступен на ```http://localhost:8080```).
