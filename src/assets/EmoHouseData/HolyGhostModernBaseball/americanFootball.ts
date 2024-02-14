import { GameDataType } from '../../../slices/GameSlice.js';

export default {
  zillowHouseData: {
    images: [
      'https://photos.zillowstatic.com/fp/703ae26825c8a06da8d0a28b4b98580f-cc_ft_1536.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/American_Football_House_%28corrected%29.jpg/1200px-American_Football_House_%28corrected%29.jpg',
      'https://yeahnogreat.files.wordpress.com/2020/03/img_9125.jpg?w=1024',
      'https://pbs.twimg.com/media/Fuz51miWcAIiCmy.jpg:large',
      'https://img.atlasobscura.com/ZZnhqGZCM0wXqpknfl4BAucvO5Q4VmFmfXRt5ji7HOg/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy81Y2Q1/Mjg4Mi1iYjNmLTRj/ZDYtYTgyYy1kMGQ4/YzgzNjFjOWYzNGUz/MDRmZWJjYzZjZjk3/MzFfMTQ3NDMzNDky/N0FtZXJpY2FuX0Zv/b3RiYWxsX0hvdXNl/X1NpZGVfb2ZfSG91/c2UuSlBH.jpg',
      'https://i.redd.it/sk2xiz1l7jl61.jpg',
      'https://pbs.twimg.com/media/ESruB7DXgAAv7Q2.jpg',
      'https://cdn.vox-cdn.com/thumbor/XsRHcPuoEw3iJprDkCK4ll1bf9Q=/0x0:1315x603/1000x1429/filters:focal(803x256:804x257)/cdn.vox-cdn.com/uploads/chorus_asset/file/19896651/New_Project__1_.png'
    ],
    city: 'Urbana',
    price: 200000,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1893,
    streetAddress: '704 W High St',
    scores: {
      walkScore: 82,
      transitScore: 60,
      bikeScore: 79
    },
    zestimate: 208500,
    rentZestimate: 1420,
    daysOnZillow: 290,
    livingArea: 1280,
    state: 'IL',
    zillowHouseUrl:
      'https://www.zillow.com/homedetails/704-W-High-St-Urbana-IL-61801/89056214_zpid/',
    latitude: 40.110046,
    longitude: -88.21656
  },
  aIGuess: null,
  classifiedImages: null
} as GameDataType;
