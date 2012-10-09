var api = {};
api.ads = {};

var data = {
   "_id": "506ef8d12bb8481bb7f537cfee58a4a5",
   "_rev": "1-ae9dbc499558b24127c518af9dcff58c",
   "name": "chpro",
   "file": "http://dev.ads.adlayerapp.com/13/506ef8d12bb8481bb7f537cfee58a4a5.jpg",
   "campaign_id": "50185aba8edc4a3e8d4f0467ee58a4a5",
   "link": "http://google.com.br",
   "type": "image",
   "width": "250",
   "height": "700",
   "status": true
};

var ad = ads.create(data);
api.ads[ad.id] = ad;