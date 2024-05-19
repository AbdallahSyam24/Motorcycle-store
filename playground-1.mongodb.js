
use('MotorcycleDB');

db.getCollection('manufacturers').insertMany(
    [
        {
            "name": "Harley-Davidson",
            "country": "USA",
            "year": 1903,
            "logo": "https://example.com/harley-davidson-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "Sportster",
                    "cc": 883,
                    "year": 1957
                },
                {
                    "_id": ObjectId(),
                    "name": "Softail",
                    "cc": 1868,
                    "year": 1984
                },
                {
                    "_id": ObjectId(),
                    "name": "Street Glide",
                    "cc": 1868,
                    "year": 2006
                },
                {
                    "_id": ObjectId(),
                    "name": "Fat Boy",
                    "cc": 1868,
                    "year": 1990
                },
                {
                    "_id": ObjectId(),
                    "name": "Iron 883",
                    "cc": 883,
                    "year": 2010
                }
            ]
        },
        {
            "name": "Honda",
            "country": "Japan",
            "year": 1948,
            "logo": "https://example.com/honda-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "CBR",
                    "cc": 1000,
                    "year": 1987
                },
                {
                    "_id": ObjectId(),
                    "name": "CRF",
                    "cc": 250,
                    "year": 2002
                },
                {
                    "_id": ObjectId(),
                    "name": "Gold Wing",
                    "cc": 1833,
                    "year": 1974
                },
                {
                    "_id": ObjectId(),
                    "name": "Africa Twin",
                    "cc": 1100,
                    "year": 1988
                },
                {
                    "_id": ObjectId(),
                    "name": "Rebel",
                    "cc": 300,
                    "year": 1985
                }
            ]
        },
        {
            "name": "Yamaha",
            "country": "Japan",
            "year": 1953,
            "logo": "https://example.com/yamaha-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "YZF",
                    "cc": 600,
                    "year": 1996
                },
                {
                    "_id": ObjectId(),
                    "name": "MT",
                    "cc": 850,
                    "year": 2013
                },
                {
                    "_id": ObjectId(),
                    "name": "FZ",
                    "cc": 1000,
                    "year": 2004
                },
                {
                    "_id": ObjectId(),
                    "name": "R1",
                    "cc": 998,
                    "year": 1998
                },
                {
                    "_id": ObjectId(),
                    "name": "VMAX",
                    "cc": 1679,
                    "year": 1985
                }
            ]
        },
        {
            "name": "Suzuki",
            "country": "Japan",
            "year": 1909,
            "logo": "https://example.com/suzuki-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "GSX-R",
                    "cc": 1000,
                    "year": 1985
                },
                {
                    "_id": ObjectId(),
                    "name": "V-Strom",
                    "cc": 650,
                    "year": 2004
                },
                {
                    "_id": ObjectId(),
                    "name": "Hayabusa",
                    "cc": 1340,
                    "year": 1999
                },
                {
                    "_id": ObjectId(),
                    "name": "DR-Z",
                    "cc": 400,
                    "year": 2000
                },
                {
                    "_id": ObjectId(),
                    "name": "Boulevard",
                    "cc": 805,
                    "year": 2005
                }
            ]
        },
        {
            "name": "Kawasaki",
            "country": "Japan",
            "year": 1896,
            "logo": "https://example.com/kawasaki-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "Ninja",
                    "cc": 300,
                    "year": 1984
                },
                {
                    "_id": ObjectId(),
                    "name": "Versys",
                    "cc": 650,
                    "year": 2007
                },
                {
                    "_id": ObjectId(),
                    "name": "Z900",
                    "cc": 948,
                    "year": 2020
                },
                {
                    "_id": ObjectId(),
                    "name": "Concours",
                    "cc": 1352,
                    "year": 1986
                },
                {
                    "_id": ObjectId(),
                    "name": "KLR",
                    "cc": 650,
                    "year": 1987
                }
            ]
        },
        {
            "name": "Ducati",
            "country": "Italy",
            "year": 1926,
            "logo": "https://example.com/ducati-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "Panigale",
                    "cc": 959,
                    "year": 2012
                },
                {
                    "_id": ObjectId(),
                    "name": "Monster",
                    "cc": 821,
                    "year": 1993
                },
                {
                    "_id": ObjectId(),
                    "name": "Scrambler",
                    "cc": 800,
                    "year": 2015
                },
                {
                    "_id": ObjectId(),
                    "name": "Multistrada",
                    "cc": 1260,
                    "year": 2003
                },
                {
                    "_id": ObjectId(),
                    "name": "Diavel",
                    "cc": 1262,
                    "year": 2011
                }
            ]
        }
        ,
        {
            "name": "BMW",
            "country": "Germany",
            "year": 1916,
            "logo": "https://example.com/bmw-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "S 1000 RR",
                    "cc": 1000,
                    "year": 2009
                },
                {
                    "_id": ObjectId(),
                    "name": "R 1250 GS",
                    "cc": 1254,
                    "year": 2018
                },
                {
                    "_id": ObjectId(),
                    "name": "K 1600 GT",
                    "cc": 1649,
                    "year": 2010
                },
                {
                    "_id": ObjectId(),
                    "name": "F 900 R",
                    "cc": 895,
                    "year": 2020
                },
                {
                    "_id": ObjectId(),
                    "name": "G 310 GS",
                    "cc": 313,
                    "year": 2017
                }
            ]
        }
        ,
        {
            "name": "Triumph",
            "country": "United Kingdom",
            "year": 1902,
            "logo": "https://example.com/triumph-logo.png",
            "models": [
                {
                    "_id": ObjectId(),
                    "name": "Street Triple",
                    "cc": 765,
                    "year": 2007
                },
                {
                    "_id": ObjectId(),
                    "name": "Tiger",
                    "cc": 900,
                    "year": 1936
                },
            ]
        }
    ]
);
