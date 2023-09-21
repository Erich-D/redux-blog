
export abstract class AstroidConstants{
    static readonly ASTEROID_01 = {size:{x:600,y:500}, radius:300, hits:6, rows:2, 
        colArrays:[
            [
                [{x:-146.5, y:12.5}, {x:-142.5, y:14.5}, {x:-137.5, y:17.5}, {x:-132.5, y:20.5}, {x:-128.5, y:23.5}, {x:-124.5, y:27.5}, {x:-121.5, y:32.5}, {x:-119.5, y:37.5}, {x:-115.5, y:40.5}, {x:-120.5, y:43.5}, {x:-111.5, y:45.5}],
                [{x:-28.5, y:48.5}, {x:-27.5, y:55.5}, {x:-27.5, y:61.5}, {x:-31.5, y:67.5}, {x:-37.5, y:70.5}, {x:-44.5, y:75.5}, {x:-49.5, y:79.5}, {x:-56.5, y:83.5}, {x:-62.5, y:88.5}, {x:-65.5, y:95.5}, {x:-67.5, y:101.5}, {x:-60.5, y:104.5}, {x:-54.5, y:107.5}, {x:-48.5, y:111.5}, {x:-41.5, y:114.5}, {x:-33.5, y:117.5}, {x:-29.5, y:123.5}, {x:-25.5, y:130.5}, {x:-20.5, y:137.5}, {x:-16.5, y:143.5}, {x:-12.5, y:148.5}, {x:-6.5, y:152.5}, {x:0.5, y:156.5}, {x:5.5, y:160.5}],
                [{x:133.5, y:73.5}, {x:139.5, y:78.5}, {x:143.5, y:82.5}, {x:147.5, y:88.5}, {x:151.5, y:94.5}, {x:153.5, y:100.5}, {x:154.5, y:106.5}, {x:152.5, y:113.5}, {x:151.5, y:119.5}, {x:148.5, y:126.5}, {x:147.5, y:132.5}, {x:145.5, y:139.5}, {x:148.5, y:145.5}, {x:152.5, y:151.5}, {x:153.5, y:158.5}, {x:155.5, y:166.5}, {x:159.5, y:171.5}, {x:162.5, y:177.5}, {x:169.5, y:182.5}, {x:175.5, y:185.5}, {x:181.5, y:190.5}, {x:188.5, y:193.5}],
                [{x:56.5, y:-155.5}, {x:60.5, y:-160.5}, {x:64.5, y:-167.5}, {x:67.5, y:-173.5}, {x:73.5, y:-180.5}, {x:80.5, y:-185.5}, {x:88.5, y:-184.5}, {x:94.5, y:-179.5}, {x:101.5, y:-178.5}, {x:108.5, y:-176.5}, {x:115.5, y:-175.5}, {x:120.5, y:-170.5}, {x:127.5, y:-166.5}, {x:134.5, y:-162.5}, {x:139.5, y:-157.5}, {x:144.5, y:-152.5}, {x:149.5, y:-145.5}, {x:153.5, y:-138.5}, {x:158.5, y:-132.5}, {x:163.5, y:-125.5}, {x:170.5, y:-120.5}, {x:176.5, y:-115.5}, {x:184.5, y:-111.5}, {x:188.5, y:-106.5}, {x:184.5, y:-99.5}, {x:177.5, y:-94.5}, {x:170.5, y:-90.5}, {x:166.5, y:-85.5}, {x:164.5, y:-77.5}, {x:163.5, y:-70.5}, {x:160.5, y:-62.5}, {x:161.5, y:-54.5}, {x:161.5, y:-46.5}, {x:162.5, y:-39.5}, {x:167.5, y:-34.5}, {x:174.5, y:-29.5}, {x:179.5, y:-26.5}, {x:184.5, y:-21.5}, {x:186.5, y:-15.5}, {x:188.5, y:-9.5}]
            ],[
                [{x:-280.5, y:-5.5}, {x:-276.5, y:0.5}, {x:-272.5, y:5.5}, {x:-267.5, y:9.5}, {x:-262.5, y:15.5}, {x:-257.5, y:19.5}, {x:-252.5, y:24.5}, {x:-246.5, y:28.5}, {x:-241.5, y:32.5}, {x:-235.5, y:37.5}, {x:-228.5, y:42.5}, {x:-223.5, y:47.5}, {x:-216.5, y:53.5}, {x:-211.5, y:59.5}, {x:-205.5, y:63.5}, {x:-199.5, y:68.5}, {x:-191.5, y:71.5}, {x:-184.5, y:73.5}, {x:-177.5, y:78.5}, {x:-168.5, y:78.5}, {x:-161.5, y:71.5}, {x:-155.5, y:65.5}, {x:-148.5, y:60.5}, {x:-142.5, y:53.5}, {x:-134.5, y:47.5}, {x:-126.5, y:43.5}, {x:-106.5, y:43.5}, {x:-99.5, y:44.5}, {x:-90.5, y:45.5}, {x:-81.5, y:45.5}, {x:-73.5, y:46.5}, {x:-63.5, y:46.5}, {x:-58.5, y:47.5}, {x:-51.5, y:47.5}, {x:-43.5, y:48.5}, {x:-37.5, y:47.5}, {x:-21.5, y:43.5}, {x:-14.5, y:38.5}, {x:-7.5, y:34.5}, {x:0.5, y:28.5}, {x:6.5, y:26.5}, {x:13.5, y:23.5}, {x:18.5, y:20.5}, {x:25.5, y:19.5}],
                [{x:30.5, y:18.5}, {x:37.5, y:18.5}, {x:44.5, y:19.5}, {x:50.5, y:19.5}, {x:57.5, y:18.5}, {x:64.5, y:18.5}, {x:70.5, y:17.5}, {x:76.5, y:19.5}, {x:84.5, y:19.5}, {x:91.5, y:19.5}, {x:96.5, y:20.5}, {x:104.5, y:21.5}, {x:112.5, y:21.5}, {x:119.5, y:21.5}, {x:126.5, y:21.5}, {x:133.5, y:21.5}, {x:142.5, y:21.5}, {x:148.5, y:19.5}, {x:156.5, y:15.5}, {x:161.5, y:12.5}, {x:165.5, y:9.5}, {x:170.5, y:4.5}, {x:175.5, y:1.5}, {x:181.5, y:-2.5}, {x:186.5, y:-4.5}, {x:195.5, y:-10.5}, {x:203.5, y:-13.5}, {x:213.5, y:-14.5}, {x:220.5, y:-16.5}, {x:225.5, y:-16.5}, {x:233.5, y:-14.5}, {x:239.5, y:-12.5}, {x:247.5, y:-9.5}, {x:255.5, y:-5.5}, {x:260.5, y:-1.5}, {x:267.5, y:-0.5}, {x:274.5, y:-0.5}, {x:282.5, y:-2.5}, {x:290.5, y:-6.5}]
            ],[
                [{x:33.5, y:12.5}, {x:36.5, y:6.5}, {x:37.5, y:1.5}, {x:37.5, y:-5.5}, {x:37.5, y:-13.5}, {x:37.5, y:-19.5}, {x:37.5, y:-26.5}, {x:37.5, y:-34.5}, {x:37.5, y:-41.5}, {x:35.5, y:-49.5}, {x:33.5, y:-59.5}, {x:31.5, y:-67.5}, {x:30.5, y:-73.5}, {x:27.5, y:-82.5}, {x:23.5, y:-89.5}, {x:19.5, y:-98.5}, {x:15.5, y:-106.5}, {x:9.5, y:-113.5}, {x:3.5, y:-119.5}, {x:-0.5, y:-125.5}, {x:-5.5, y:-130.5}, {x:-9.5, y:-135.5}, {x:-12.5, y:-141.5}, {x:-16.5, y:-147.5}, {x:-19.5, y:-155.5}, {x:-15.5, y:-163.5}, {x:-13.5, y:-171.5}, {x:-8.5, y:-177.5}, {x:-6.5, y:-184.5}, {x:-6.5, y:-192.5}, {x:-6.5, y:-199.5}, {x:-11.5, y:-206.5}, {x:-16.5, y:-212.5}, {x:-22.5, y:-216.5}, {x:-30.5, y:-222.5}, {x:-35.5, y:-227.5}, {x:-42.5, y:-231.5}, {x:-51.5, y:-236.5}],
                [{x:21.5, y:25.5}, {x:15.5, y:29.5}, {x:9.5, y:33.5}, {x:6.5, y:38.5}, {x:2.5, y:43.5}, {x:-2.5, y:50.5}, {x:-7.5, y:56.5}, {x:-11.5, y:63.5}, {x:-13.5, y:71.5}, {x:-11.5, y:79.5}, {x:-9.5, y:85.5}, {x:-7.5, y:91.5}, {x:-4.5, y:98.5}, {x:0.5, y:105.5}, {x:3.5, y:111.5}, {x:7.5, y:118.5}, {x:10.5, y:124.5}, {x:14.5, y:130.5}, {x:18.5, y:136.5}, {x:21.5, y:142.5}, {x:23.5, y:148.5}, {x:26.5, y:156.5}, {x:28.5, y:164.5}, {x:30.5, y:172.5}, {x:32.5, y:179.5}, {x:36.5, y:185.5}, {x:40.5, y:191.5}, {x:43.5, y:198.5}, {x:44.5, y:204.5}, {x:44.5, y:212.5}, {x:44.5, y:219.5}, {x:45.5, y:226.5}, {x:44.5, y:231.5}],
                [{x:-139.5, y:-21.5}, {x:-134.5, y:-24.5}, {x:-128.5, y:-28.5}, {x:-123.5, y:-35.5}, {x:-121.5, y:-41.5}, {x:-118.5, y:-47.5}, {x:-117.5, y:-55.5}, {x:-115.5, y:-64.5}, {x:-113.5, y:-73.5}, {x:-108.5, y:-77.5}, {x:-101.5, y:-78.5}, {x:-94.5, y:-76.5}, {x:-89.5, y:-75.5}, {x:-83.5, y:-73.5}, {x:-76.5, y:-72.5}, {x:-70.5, y:-70.5}, {x:-66.5, y:-69.5}, {x:-61.5, y:-71.5}, {x:-54.5, y:-75.5}, {x:-50.5, y:-79.5}, {x:-45.5, y:-82.5}, {x:-40.5, y:-83.5}, {x:-34.5, y:-82.5}, {x:-30.5, y:-79.5}, {x:-25.5, y:-74.5}, {x:-20.5, y:-71.5}, {x:-14.5, y:-71.5}],
                [{x:186.5, y:-27.5}, {x:192.5, y:-28.5}, {x:197.5, y:-30.5}, {x:203.5, y:-31.5}, {x:208.5, y:-33.5}, {x:213.5, y:-35.5}, {x:220.5, y:-35.5}, {x:226.5, y:-35.5}, {x:231.5, y:-38.5}, {x:236.5, y:-41.5}, {x:240.5, y:-45.5}],
                [{x:27.5, y:184.5}, {x:19.5, y:181.5}, {x:15.5, y:183.5}, {x:10.5, y:186.5}, {x:5.5, y:188.5}, {x:0.5, y:190.5}, {x:-4.5, y:191.5}, {x:-9.5, y:191.5}, {x:-14.5, y:191.5}, {x:-18.5, y:191.5}, {x:-23.5, y:190.5}, {x:-28.5, y:194.5}, {x:-31.5, y:196.5}, {x:-38.5, y:200.5}, {x:-38.5, y:205.5}, {x:-43.5, y:207.5}, {x:-46.5, y:212.5}]
            ],[
                [{x:176.5, y:-122.5}, {x:185.5, y:-123.5}, {x:191.5, y:-124.5}, {x:199.5, y:-125.5}, {x:205.5, y:-130.5}, {x:207.5, y:-136.5}, {x:212.5, y:-141.5}, {x:218.5, y:-143.5}, {x:224.5, y:-144.5}],
                [{x:-13.5, y:-183.5}, {x:-18.5, y:-183.5}, {x:-25.5, y:-183.5}, {x:-30.5, y:-184.5}, {x:-37.5, y:-186.5}, {x:-42.5, y:-187.5}, {x:-48.5, y:-188.5}, {x:-54.5, y:-188.5}, {x:-60.5, y:-185.5}, {x:-63.5, y:-181.5}, {x:-70.5, y:-178.5}, {x:-78.5, y:-178.5}, {x:-86.5, y:-178.5}, {x:-92.5, y:-177.5}, {x:-98.5, y:-176.5}],
                [{x:-235.5, y:30.5}, {x:-233.5, y:23.5}, {x:-231.5, y:17.5}, {x:-230.5, y:10.5}, {x:-227.5, y:5.5}, {x:-226.5, y:-0.5}, {x:-224.5, y:-8.5}, {x:-222.5, y:-13.5}, {x:-223.5, y:-20.5}, {x:-225.5, y:-25.5}, {x:-228.5, y:-30.5}, {x:-232.5, y:-36.5}, {x:-233.5, y:-41.5}, {x:-236.5, y:-46.5}, {x:-237.5, y:-50.5}, {x:-236.5, y:-58.5}, {x:-234.5, y:-64.5}, {x:-232.5, y:-71.5}, {x:-229.5, y:-74.5}]
            ],[
                [{x:-220.5, y:-4.5}, {x:-214.5, y:-6.5}, {x:-209.5, y:-7.5}, {x:-205.5, y:-7.5}, {x:-201.5, y:-11.5}, {x:-197.5, y:-15.5}, {x:-192.5, y:-19.5}, {x:-189.5, y:-24.5}, {x:-188.5, y:-30.5}, {x:-188.5, y:-34.5}],
                [{x:-156.5, y:76.5}, {x:-152.5, y:80.5}, {x:-148.5, y:85.5}, {x:-145.5, y:89.5}, {x:-143.5, y:94.5}, {x:-141.5, y:99.5}, {x:-142.5, y:106.5}, {x:-144.5, y:112.5}, {x:-145.5, y:120.5}, {x:-147.5, y:126.5}, {x:-147.5, y:135.5}, {x:-147.5, y:142.5}, {x:-147.5, y:150.5}, {x:-147.5, y:158.5}],
                [{x:-79.5, y:-67.5}, {x:-81.5, y:-60.5}, {x:-83.5, y:-55.5}, {x:-78.5, y:-52.5}, {x:-71.5, y:-49.5}, {x:-67.5, y:-47.5}, {x:-61.5, y:-42.5}, {x:-61.5, y:-37.5}, {x:-60.5, y:-29.5}],
                [{x:154.5, y:-44.5}, {x:150.5, y:-39.5}, {x:145.5, y:-38.5}, {x:139.5, y:-39.5}, {x:134.5, y:-42.5}, {x:128.5, y:-43.5}, {x:121.5, y:-47.5}, {x:114.5, y:-49.5}, {x:108.5, y:-52.5}, {x:103.5, y:-53.5}, {x:99.5, y:-48.5}],
                [{x:103.5, y:-185.5}, {x:101.5, y:-191.5}, {x:99.5, y:-196.5}, {x:100.5, y:-200.5}, {x:103.5, y:-205.5}, {x:101.5, y:-210.5}, {x:99.5, y:-216.5}, {x:94.5, y:-220.5}]
            ]
        ],
        paths:[
            "M 0 250 44.5 231.5 45.5 226.5 44.5 219.5 44.5 212.5 44.5 204.5 43.5 198.5 40.5 191.5 36.5 185.5 32.5 179.5 30.5 172.5 28.5 164.5 26.5 156.5 23.5 148.5 21.5 142.5 18.5 136.5 14.5 130.5 10.5 124.5 7.5 118.5 3.5 111.5 0.5 105.5 -4.5 98.5 -7.5 91.5 -9.5 85.5 -11.5 79.5 -13.5 71.5 -11.5 63.5 -7.5 56.5 -2.5 50.5 2.5 43.5 6.5 38.5 9.5 33.5 15.5 29.5 21.5 25.5 30.5 18.5 37.5 18.5 44.5 19.5 50.5 19.5 57.5 18.5 64.5 18.5 70.5 17.5 76.5 19.5 84.5 19.5 91.5 19.5 96.5 20.5 104.5 21.5 112.5 21.5 119.5 21.5 126.5 21.5 133.5 21.5 142.5 21.5 148.5 19.5 156.5 15.5 161.5 12.5 165.5 9.5 170.5 4.5 175.5 1.5 181.5 -2.5 186.5 -4.5 195.5 -10.5 203.5 -13.5 213.5 -14.5 220.5 -16.5 225.5 -16.5 233.5 -14.5 239.5 -12.5 247.5 -9.5 255.5 -5.5 260.5 -1.5 267.5 -0.5 274.5 -0.5 282.5 -2.5 290.5 -6.5 300 0 300 250 Z",
            "M -300 0 -280.5 -5.5 -276.5 0.5 -272.5 5.5 -267.5 9.5 -262.5 15.5 -257.5 19.5 -252.5 24.5 -246.5 28.5 -241.5 32.5 -235.5 37.5 -228.5 42.5 -223.5 47.5 -216.5 53.5 -211.5 59.5 -205.5 63.5 -199.5 68.5 -191.5 71.5 -184.5 73.5 -177.5 78.5 -168.5 78.5 -161.5 71.5 -155.5 65.5 -148.5 60.5 -142.5 53.5 -134.5 47.5 -126.5 43.5 -106.5 43.5 -99.5 44.5 -90.5 45.5 -81.5 45.5 -73.5 46.5 -63.5 46.5 -58.5 47.5 -51.5 47.5 -43.5 48.5 -37.5 47.5 -21.5 43.5 -14.5 38.5 -7.5 34.5 0.5 28.5 6.5 26.5 13.5 23.5 18.5 20.5 25.5 19.5 21.5 25.5 15.5 29.5 9.5 33.5 6.5 38.5 2.5 43.5 -2.5 50.5 -7.5 56.5 -11.5 63.5 -13.5 71.5 -11.5 79.5 -9.5 85.5 -7.5 91.5 -4.5 98.5 0.5 105.5 3.5 111.5 7.5 118.5 10.5 124.5 14.5 130.5 18.5 136.5 21.5 142.5 23.5 148.5 26.5 156.5 28.5 164.5 30.5 172.5 32.5 179.5 36.5 185.5 40.5 191.5 43.5 198.5 44.5 204.5 44.5 212.5 44.5 219.5 45.5 226.5 44.5 231.5 0 250 -300 250 Z",
            "M -300 0 -280.5 -5.5 -276.5 0.5 -272.5 5.5 -267.5 9.5 -262.5 15.5 -257.5 19.5 -252.5 24.5 -246.5 28.5 -241.5 32.5 -235.5 37.5 -228.5 42.5 -223.5 47.5 -216.5 53.5 -211.5 59.5 -205.5 63.5 -199.5 68.5 -191.5 71.5 -184.5 73.5 -177.5 78.5 -168.5 78.5 -161.5 71.5 -155.5 65.5 -148.5 60.5 -142.5 53.5 -134.5 47.5 -126.5 43.5 -106.5 43.5 -99.5 44.5 -90.5 45.5 -81.5 45.5 -73.5 46.5 -63.5 46.5 -58.5 47.5 -51.5 47.5 -43.5 48.5 -37.5 47.5 -21.5 43.5 -14.5 38.5 -7.5 34.5 0.5 28.5 6.5 26.5 13.5 23.5 18.5 20.5 25.5 19.5 33.5 12.5 36.5 6.5 37.5 1.5 37.5 -5.5 37.5 -13.5 37.5 -19.5 37.5 -26.5 37.5 -34.5 37.5 -41.5 35.5 -49.5 33.5 -59.5 31.5 -67.5 30.5 -73.5 27.5 -82.5 23.5 -89.5 19.5 -98.5 15.5 -106.5 9.5 -113.5 3.5 -119.5 -0.5 -125.5 -5.5 -130.5 -9.5 -135.5 -12.5 -141.5 -16.5 -147.5 -19.5 -155.5 -15.5 -163.5 -13.5 -171.5 -8.5 -177.5 -6.5 -184.5 -6.5 -192.5 -6.5 -199.5 -11.5 -206.5 -16.5 -212.5 -22.5 -216.5 -30.5 -222.5 -35.5 -227.5 -42.5 -231.5 -51.5 -236.5 0 -250 -300 -250 Z",
            "M 0 -250 -51.5 -236.5 -42.5 -231.5 -35.5 -227.5 -30.5 -222.5 -22.5 -216.5 -16.5 -212.5 -11.5 -206.5 -6.5 -199.5 -6.5 -192.5 -6.5 -184.5 -8.5 -177.5 -13.5 -171.5 -15.5 -163.5 -19.5 -155.5 -16.5 -147.5 -12.5 -141.5 -9.5 -135.5 -5.5 -130.5 -0.5 -125.5 3.5 -119.5 9.5 -113.5 15.5 -106.5 19.5 -98.5 23.5 -89.5 27.5 -82.5 30.5 -73.5 31.5 -67.5 33.5 -59.5 35.5 -49.5 37.5 -41.5 37.5 -34.5 37.5 -26.5 37.5 -19.5 37.5 -13.5 37.5 -5.5 37.5 1.5 36.5 6.5 33.5 12.5 30.5 18.5 37.5 18.5 44.5 19.5 50.5 19.5 57.5 18.5 64.5 18.5 70.5 17.5 76.5 19.5 84.5 19.5 91.5 19.5 96.5 20.5 104.5 21.5 112.5 21.5 119.5 21.5 126.5 21.5 133.5 21.5 142.5 21.5 148.5 19.5 156.5 15.5 161.5 12.5 165.5 9.5 170.5 4.5 175.5 1.5 181.5 -2.5 186.5 -4.5 195.5 -10.5 203.5 -13.5 213.5 -14.5 220.5 -16.5 225.5 -16.5 233.5 -14.5 239.5 -12.5 247.5 -9.5 255.5 -5.5 260.5 -1.5 267.5 -0.5 274.5 -0.5 282.5 -2.5 290.5 -6.5 300 0 300 -250 Z"
        ]
    }
    static readonly ASTEROID_02 = {size:{x:520,y:430}, radius:215, hits:4, rows:2, colArrays:[[],[],[]], paths:[]}
    static readonly ASTEROID_03 = {size:{x:500,y:360}, radius:180, hits:4, rows:2, colArrays:[[],[],[]], paths:[]}
    static readonly ASTEROID_04 = {size:{x:350,y:300}, radius:162, hits:4, rows:2, colArrays:[[],[],[]], paths:[]}
    static readonly ASTEROID_05 = {size:{x:450,y:200}, radius:100, hits:4, rows:2, colArrays:[[],[],[]], paths:[]}
    static readonly ASTEROID_06 = {size:{x:320,y:240}, radius:160, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_07 = {size:{x:300,y:250}, radius:137, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_08 = {size:{x:240,y:240}, radius:120, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_09 = {size:{x:250,y:230}, radius:120, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_10 = {size:{x:260,y:240}, radius:125, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_11 = {size:{x:240,y:150}, radius:105, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_12 = {size:{x:170,y:180}, radius:87, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_13 = {size:{x:190,y:160}, radius:87, hits:3, rows:1, colArrays:[[],[]], paths:[]}
    static readonly ASTEROID_14 = {size:{x:110,y:110}, radius:55, hits:2, rows:1, colArrays:[[]], paths:[]}
    static readonly ASTEROID_15 = {size:{x:70,y:100}, radius:42, hits:2, rows:1, colArrays:[[]], paths:[]}
    static getIndex(indx:number){
        switch(indx){
            case 1:
                return this.ASTEROID_01
            case 2:
                return this.ASTEROID_02
            case 3:
                return this.ASTEROID_03
            case 4:
                return this.ASTEROID_04
            case 5:
                return this.ASTEROID_05
            case 6:
                return this.ASTEROID_06
            case 7:
                return this.ASTEROID_07
            case 8:
                return this.ASTEROID_08
            case 9:
                return this.ASTEROID_09
            case 10:
                return this.ASTEROID_10
            case 11:
                return this.ASTEROID_11
            case 12:
                return this.ASTEROID_12
            case 13:
                return this.ASTEROID_13
            case 14:
                return this.ASTEROID_14
            case 15:
                return this.ASTEROID_15 
            default:
                return this.ASTEROID_01   
        }
    }
}