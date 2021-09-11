

async function tojs() {

    let a = [
        {
            "id": 1000000001,
            "code": "CFGPMS",
            "RefNo": "1.1",
            "master": true,
            "name_cn": "PMS 配置",
            "name_en": "PMS Configuration",
            "name_th": "การกำหนดค่า PMS",
            "addchild": false,
            "children": [
                {
                    "id": 1000000002,
                    "code": "CFGPROP",
                    "RefNo": "1.1.1",
                    "master": true,
                    "name_en": "Property Configuration",
                    "name_th": "การกำหนดค่า Property",
                    "addchild": false,
                    "children": [
                        {
                            "id": 1000000003,
                            "code": "PROPERTY",
                            "RefNo": "1.1.1.1",
                            "master": true,
                            "name_en": "Property Master",
                            "addchild": true,
                            "children": [
                                {
                                    "code": "SPJ1",
                                    "RefNo": "1.1.1.1.1",
                                    "master": false,
                                    "name_en": "SPJ1",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:4:14",
                                    "description": "SPJ1 Property"
                                },
                                {
                                    "code": "SPJ2",
                                    "RefNo": "1.1.1.1.2",
                                    "master": false,
                                    "name_en": "SPJ2",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:6:52",
                                    "description": "SPJ2 Property"
                                },
                                {
                                    "code": "TKSA",
                                    "RefNo": "1.1.1.1.3",
                                    "master": false,
                                    "name_en": "TKSA",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:7:54",
                                    "description": "TKSA Property"
                                },
                                {
                                    "code": "TS36",
                                    "RefNo": "1.1.1.1.4",
                                    "master": false,
                                    "name_en": "TS36",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:8:19",
                                    "description": "TS36 Property"
                                }
                            ],
                            "createdate": "2021-08-13 12:03:00",
                            "description": "PROPERTY description"
                        },
                        {
                            "id": 1000000004,
                            "code": "BUILDING",
                            "RefNo": "1.1.1.2",
                            "master": true,
                            "name_en": "Building Master",
                            "addchild": true,
                            "children": [
                                {
                                    "code": "TOWER1",
                                    "RefNo": "1.1.1.2.1",
                                    "master": false,
                                    "name_en": "TOWER 1",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:8:58",
                                    "description": "TOWER1 Desc"
                                },
                                {
                                    "code": "TOWER2",
                                    "RefNo": "1.1.1.2.2",
                                    "master": false,
                                    "name_en": "TOWER 2",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:9:13",
                                    "description": "TOWER2"
                                },
                                {
                                    "code": "TOWER3",
                                    "RefNo": "1.1.1.2.3",
                                    "master": false,
                                    "name_en": "TOWER 3",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:9:33",
                                    "description": "TOWER 3 Desc"
                                }
                            ],
                            "createdate": "2021-08-13 12:03:00",
                            "description": "BUILDING description"
                        },
                        {
                            "id": 1000000005,
                            "code": "EXPOSURE",
                            "RefNo": "1.1.1.3",
                            "master": true,
                            "name_en": "Exposure",
                            "addchild": true,
                            "children": [
                                {
                                    "code": "MOUNTAIN",
                                    "RefNo": "1.1.1.3.1",
                                    "master": false,
                                    "name_en": "Mountain View",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:12:35",
                                    "description": "Mountain View"
                                },
                                {
                                    "code": "SEA",
                                    "RefNo": "1.1.1.3.2",
                                    "master": false,
                                    "name_en": "Sea View",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:13:1",
                                    "description": "Sea View"
                                },
                                {
                                    "code": "TOWN",
                                    "RefNo": "1.1.1.3.3",
                                    "master": false,
                                    "name_en": "Town View",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:13:31",
                                    "description": "Town View"
                                },
                                {
                                    "code": "MARKET",
                                    "RefNo": "1.1.1.3.4",
                                    "master": false,
                                    "name_en": "Market View",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:15:37",
                                    "description": "Market View"
                                }
                            ],
                            "createdate": "2021-08-13 12:03:00",
                            "description": "EXPOSURE description"
                        },
                        {
                            "id": 1000000006,
                            "code": "FLOOR",
                            "RefNo": "1.1.1.4",
                            "master": true,
                            "name_en": "Floor",
                            "name_th": "ชั้น",
                            "addchild": true,
                            "createdate": "2021-08-13 12:03:00",
                            "description": "FLOOR description",
                            "children": [
                                {
                                    "code": "F3",
                                    "RefNo": "1.1.1.4.1",
                                    "master": false,
                                    "name_en": "F3",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:10:4",
                                    "description": "Floor 3"
                                },
                                {
                                    "code": "F4",
                                    "RefNo": "1.1.1.4.2",
                                    "master": false,
                                    "name_en": "F4",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:11:11",
                                    "description": "Floor 4"
                                },
                                {
                                    "code": "F5",
                                    "RefNo": "1.1.1.4.3",
                                    "master": false,
                                    "name_en": "F5",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:11:34",
                                    "description": "Floor 5"
                                },
                                {
                                    "code": "F6",
                                    "RefNo": "1.1.1.4.4",
                                    "master": false,
                                    "name_en": "F6",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:11:57",
                                    "description": "Floor 6"
                                },
                                {
                                    "code": "F7",
                                    "RefNo": "1.1.1.4.5",
                                    "master": false,
                                    "name_en": "F7",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:11:57",
                                    "description": "Floor 7"
                                }
                            ],
                        },
                        {
                            "id": 1000000007,
                            "code": "ZONE",
                            "RefNo": "1.1.1.5",
                            "master": true,
                            "name_en": "Zone/Wing",
                            "addchild": true,
                            "children": [
                                {
                                    "code": "EAST",
                                    "RefNo": "1.1.1.5.1",
                                    "master": false,
                                    "name_en": "East",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:10:4",
                                    "description": "East Desc"
                                },
                                {
                                    "code": "NORTH",
                                    "RefNo": "1.1.1.5.2",
                                    "master": false,
                                    "name_en": "North",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:11:11",
                                    "description": "North Desc"
                                },
                                {
                                    "code": "SOUTH",
                                    "RefNo": "1.1.1.5.3",
                                    "master": false,
                                    "name_en": "South",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:11:34",
                                    "description": "South Desc"
                                },
                                {
                                    "code": "WEST",
                                    "RefNo": "1.1.1.5.4",
                                    "master": false,
                                    "name_en": "West",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:11:57",
                                    "description": "West Desc"
                                }
                            ],
                            "createdate": "2021-08-13 12:03:00",
                            "description": "ZONE description"
                        }
                    ],
                    "createdate": "2021-08-13 12:03:00",
                    "description": "CFGPROP Configuration"
                },
                {
                    "id": 1000000008,
                    "code": "CFGROOM",
                    "RefNo": "1.1.2",
                    "master": true,
                    "name_en": "Room Configuration",
                    "name_th": "การกำหนดค่าห้อง",
                    "addchild": false,
                    "children": [
                        {
                            "id": 1000000009,
                            "code": "RMTYPE",
                            "RefNo": "1.1.2.1",
                            "master": true,
                            "name_en": "Room Type",
                            "name_th": "ประเภทห้อง",
                            "addchild": true,
                            "children": [
                                {
                                    "code": "SUPERIOR",
                                    "RefNo": "1.1.2.1.1",
                                    "master": false,
                                    "name_en": "SUPERIOR",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:21:58",
                                    "description": "Superior"
                                },
                                {
                                    "code": "DELUX",
                                    "RefNo": "1.1.2.1.2",
                                    "master": false,
                                    "name_en": "DELUX",
                                    "addchild": false,
                                    "createdate": "2021-09-10 14:22:29",
                                    "description": "DELUX"
                                }
                            ],
                            "createdate": "2021-08-13 12:03:00",
                            "description": "CFGPMS description"
                        },
                        {
                            "id": 1000000010,
                            "code": "RMCAT",
                            "RefNo": "1.1.2.2",
                            "master": true,
                            "name_en": "Room Category",
                            "name_th": "ประเภทห้อง",
                            "addchild": true,
                            "children": [
                                {
                                    "code": "ROOMSIZE",
                                    "RefNo": "1.1.2.2.1",
                                    "master": false,
                                    "name_en": "Room Size",
                                    "addchild": true,
                                    "createdate": "2021-09-10 14:24:17",
                                    "description": "Room Size",
                                    "children": [
                                        {
                                            "code": "SQ56",
                                            "RefNo": "1.1.2.2.1.1",
                                            "master": false,
                                            "name_en": "56 sq.m",
                                            "addchild": false,
                                            "createdate": "2021-09-10 14:24:41",
                                            "description": "56 sq.m"
                                        },
                                        {
                                            "code": "SQ100",
                                            "RefNo": "1.1.2.2.1.1",
                                            "master": false,
                                            "name_en": "100 sq.m",
                                            "addchild": false,
                                            "createdate": "2021-09-10 14:24:41",
                                            "description": "100 sq.m"
                                        }
                                    ]
                                },
                                {
                                    "code": "ROOMSEG",
                                    "RefNo": "1.1.2.2.2",
                                    "master": false,
                                    "name_en": "Room Seg",
                                    "addchild": true,
                                    "createdate": "2021-09-10 14:24:41",
                                    "description": "Room Seg",
                                    "children": [
                                        {
                                            "code": "SEG1",
                                            "RefNo": "1.1.2.2.2.1",
                                            "master": false,
                                            "name_en": "1",
                                            "addchild": false,
                                            "createdate": "2021-09-10 14:24:41",
                                            "description": "1"
                                        },
                                        {
                                            "code": "SEG2",
                                            "RefNo": "1.1.2.2.2.1",
                                            "master": false,
                                            "name_en": "2",
                                            "addchild": false,
                                            "createdate": "2021-09-10 14:24:41",
                                            "description": "2"
                                        },
                                        {
                                            "code": "SEG3",
                                            "RefNo": "1.1.2.2.2.1",
                                            "master": false,
                                            "name_en": "3",
                                            "addchild": false,
                                            "createdate": "2021-09-10 14:24:41",
                                            "description": "3"
                                        }
                                    ]
                                },
                                {
                                    "code": "ROOMSTATUS",
                                    "RefNo": "1.1.2.2.3",
                                    "master": false,
                                    "name_en": "Room Status",
                                    "addchild": true,
                                    "createdate": "2021-09-10 14:25:6",
                                    "description": "Room Status",
                                    "children": [
                                        {
                                            "code": "IN",
                                            "RefNo": "1.1.2.2.2.1",
                                            "master": false,
                                            "name_en": "In House",
                                            "addchild": false,
                                            "createdate": "2021-09-10 14:24:41",
                                            "description": "In House"
                                        },
                                        {
                                            "code": "VC",
                                            "RefNo": "1.1.2.2.2.1",
                                            "master": false,
                                            "name_en": "Vacant Clean",
                                            "addchild": false,
                                            "createdate": "2021-09-10 14:24:41",
                                            "description": "Vacant Clean"
                                        }
                                    ]
                                }
                            ],
                            "createdate": "2021-08-13 12:03:00",
                            "description": "RMCAT description"
                        },
                        {
                            "id": 1000000011,
                            "code": "ROOM",
                            "RefNo": "1.1.2.3",
                            "master": true,
                            "name_en": "Room Master Maintenance",
                            "name_th": "การบำรุงรักษาห้องมาสเตอร์",
                            "addchild": true,
                            "createdate": "2021-08-13 12:03:00",
                            "description": "ROOM description"
                        }
                    ],
                    "createdate": "2021-08-13 12:03:00",
                    "description": "CFG"
                },
                {
                    "id": 1000000012,
                    "code": "CFGITEM",
                    "RefNo": "1.1.3",
                    "master": true,
                    "name_en": "Item Configuration",
                    "name_th": "การกำหนดค่ารายการ",
                    "addchild": false,
                    "children": [
                        {
                            "id": 1000000013,
                            "code": "ITEMTYPE",
                            "RefNo": "1.1.3.1",
                            "master": true,
                            "name_en": "Item Type",
                            "name_th": "ประเภทรายการ",
                            "addchild": true,
                            "createdate": "2021-08-13 12:03:00",
                            "description": "ITEMTYPE description"
                        },
                        {
                            "id": 1000000014,
                            "code": "ITEMCAT",
                            "RefNo": "1.1.3.2",
                            "master": true,
                            "name_en": "Item Category",
                            "name_th": "หมวดหมู่รายการ",
                            "addchild": true,
                            "createdate": "2021-08-13 12:03:00",
                            "description": "ITEMCAT description"
                        }
                    ],
                    "createdate": "2021-08-13 12:03:00",
                    "description": "CFGITEM description"
                },
                {
                    "id": 1000000015,
                    "code": "CFGRSVN",
                    "RefNo": "1.1.4",
                    "master": true,
                    "name_en": "Reservation Configuration",
                    "name_th": "การกำหนดค่าการจอง",
                    "addchild": false,
                    "children": [
                        {
                            "id": 1000000016,
                            "code": "MARKET",
                            "RefNo": "1.1.4.1",
                            "master": true,
                            "name_en": "Market segment Maintenance",
                            "name_th": "การบำรุงรักษาส่วนตลาด",
                            "addchild": true,
                            "createdate": "2021-08-13 12:03:00",
                            "description": "MARKET description"
                        },
                        {
                            "id": 1000000017,
                            "code": "SOURCE",
                            "RefNo": "1.1.4.2",
                            "master": true,
                            "name_en": "Source Maintenance",
                            "name_th": "การบำรุงรักษาแหล่งที่มา",
                            "addchild": true,
                            "createdate": "2021-08-13 12:03:00",
                            "description": "SOURCE description"
                        }
                    ],
                    "createdate": "2021-08-13 12:03:00",
                    "description": "CFGRSVN description"
                }
            ],
            "createdate": "2021-08-13 12:03:00",
            "description": "CFGPMS description"
        },
        {
            "id": 1000000018,
            "code": "CFGSYS",
            "RefNo": "1.2",
            "master": true,
            "name_en": "System Configuration",
            "name_th": "การกำหนดค่าระบบ",
            "addchild": false,
            "children": [
                {
                    "id": 1000000019,
                    "code": "USER",
                    "RefNo": "1.2.1",
                    "master": true,
                    "name_en": "User Management",
                    "name_th": "การจัดการผู้ใช้",
                    "addchild": true,
                    "children": [],
                    "createdate": "2021-08-13 12:03:00",
                    "description": "USER description"
                },
                {
                    "id": 1000000020,
                    "code": "ROLE",
                    "RefNo": "1.2.2",
                    "master": true,
                    "name_en": "Role Management",
                    "name_th": "การจัดการบทบาท",
                    "addchild": true,
                    "createdate": "2021-08-13 12:03:00",
                    "description": "ROLE description"
                }
            ],
            "createdate": "2021-08-13 12:03:00",
            "description": "CFGSYS description"
        }
    ]
    // [
    //   {
    //     "id": 1000000001,
    //     "RefNo": "1.1",
    //     "code": "CFGPMS",
    //     "name_en": "PMS Configuration",
    //     "name_th": "การกำหนดค่า PMS",
    //     "name_cn": "PMS 配置",
    //     "description": "CFGPMS description",
    //     "createdate": "2021-08-13 12:03:00",
    //     "master": true,
    //     "addchild": false,
    //     "children": [
    //       {
    //         "id": 1000000002,
    //         "RefNo": "1.1.1",
    //         "code": "CFGPROP",
    //         "name_en": "Property Configuration",
    //         "name_th": "การกำหนดค่า Property",
    //         "description": "CFGPROP Configuration",
    //         "createdate": "2021-08-13 12:03:00",
    //         "master": true,
    //         "addchild": false,
    //         "children": [
    //           {
    //             "id": 1000000003,
    //             "RefNo": "1.1.1.1",
    //             "code": "PROPERTY",
    //             "name_en": "Property Master",
    //             "description": "PROPERTY description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           },
    //           {
    //             "id": 1000000004,
    //             "RefNo": "1.1.1.2",
    //             "code": "BUILDING",
    //             "name_en": "Building Master",
    //             "description": "BUILDING description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           },
    //           {
    //             "id": 1000000005,
    //             "RefNo": "1.1.1.3",
    //             "code": "EXPOSURE",
    //             "name_en": "Exposure",
    //             "description": "EXPOSURE description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           },
    //           {
    //             "id": 1000000006,
    //             "RefNo": "1.1.1.4",
    //             "code": "FLOOR",
    //             "name_en": "Floor",
    //             "name_th": "ชั้น",
    //             "description": "FLOOR description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           },
    //           {
    //             "id": 1000000007,
    //             "RefNo": "1.1.1.5",
    //             "code": "ZONE",
    //             "name_en": "Zone/Wing",
    //             "description": "ZONE description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           }
    //         ]
    //       },
    //       {
    //         "id": 1000000008,
    //         "RefNo": "1.1.2",
    //         "code": "CFGROOM",
    //         "name_en": "Room Configuration",
    //         "name_th": "การกำหนดค่าห้อง",
    //         "description": "CFG",
    //         "createdate": "2021-08-13 12:03:00",
    //         "master": true,
    //         "addchild": false,
    //         "children": [
    //           {
    //             "id": 1000000009,
    //             "RefNo": "1.1.2.1",
    //             "code": "RMTYPE",
    //             "name_en": "Room Type",
    //             "name_th": "ประเภทห้อง",
    //             "description": "CFGPMS description",
    //             "master": true,
    //             "addchild": true,
    //             "createdate": "2021-08-13 12:03:00",
    //           },
    //           {
    //             "id": 1000000010,
    //             "RefNo": "1.1.2.2",
    //             "code": "RMCAT",
    //             "name_en": "Room Category",
    //             "name_th": "ประเภทห้อง",
    //             "description": "RMCAT description",
    //             "master": true,
    //             "addchild": true,
    //             "createdate": "2021-08-13 12:03:00",
    //           },
    //           {
    //             "id": 1000000011,
    //             "RefNo": "1.1.2.3",
    //             "code": "ROOM",
    //             "name_en": "Room Master Maintenance",
    //             "name_th": "การบำรุงรักษาห้องมาสเตอร์",
    //             "description": "ROOM description",
    //             "master": true,
    //             "addchild": true,
    //             "createdate": "2021-08-13 12:03:00",
    //           }
    //         ]
    //       },
    //       {
    //         "id": 1000000012,
    //         "RefNo": "1.1.3",
    //         "code": "CFGITEM",
    //         "name_en": "Item Configuration",
    //         "name_th": "การกำหนดค่ารายการ",
    //         "description": "CFGITEM description",
    //         "createdate": "2021-08-13 12:03:00",
    //         "master": true,
    //         "addchild": false,
    //         "children": [
    //           {
    //             "id": 1000000013,
    //             "RefNo": "1.1.3.1",
    //             "code": "ITEMTYPE",
    //             "name_en": "Item Type",
    //             "name_th": "ประเภทรายการ",
    //             "description": "ITEMTYPE description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           },
    //           {
    //             "id": 1000000014,
    //             "RefNo": "1.1.3.2",
    //             "code": "ITEMCAT",
    //             "name_en": "Item Category",
    //             "name_th": "หมวดหมู่รายการ",
    //             "description": "ITEMCAT description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           }
    //         ]
    //       },
    //       {
    //         "id": 1000000015,
    //         "RefNo": "1.1.4",
    //         "code": "CFGRSVN",
    //         "name_en": "Reservation Configuration",
    //         "name_th": "การกำหนดค่าการจอง",
    //         "description": "CFGRSVN description",
    //         "createdate": "2021-08-13 12:03:00",
    //         "master": true,
    //         "addchild": false,
    //         "children": [
    //           {
    //             "id": 1000000016,
    //             "RefNo": "1.1.4.1",
    //             "code": "MARKET",
    //             "name_en": "Market segment Maintenance",
    //             "name_th": "การบำรุงรักษาส่วนตลาด",
    //             "description": "MARKET description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           },
    //           {
    //             "id": 1000000017,
    //             "RefNo": "1.1.4.2",
    //             "code": "SOURCE",
    //             "name_en": "Source Maintenance",
    //             "name_th": "การบำรุงรักษาแหล่งที่มา",
    //             "description": "SOURCE description",
    //             "createdate": "2021-08-13 12:03:00",
    //             "master": true,
    //             "addchild": true,
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     "id": 1000000018,
    //     "RefNo": "1.2",
    //     "code": "CFGSYS",
    //     "name_en": "System Configuration",
    //     "name_th": "การกำหนดค่าระบบ",
    //     "description": "CFGSYS description",
    //     "createdate": "2021-08-13 12:03:00",
    //     "master": true,
    //     "addchild": false,
    //     "children": [
    //       {
    //         "id": 1000000019,
    //         "RefNo": "1.2.1",
    //         "code": "USER",
    //         "name_en": "User Management",
    //         "name_th": "การจัดการผู้ใช้",
    //         "description": "USER description",
    //         "createdate": "2021-08-13 12:03:00",
    //         "master": true,
    //         "addchild": true,
    //       },
    //       {
    //         "id": 1000000020,
    //         "RefNo": "1.2.2",
    //         "code": "ROLE",
    //         "name_en": "Role Management",
    //         "name_th": "การจัดการบทบาท",
    //         "description": "ROLE description",
    //         "createdate": "2021-08-13 12:03:00",
    //         "master": true,
    //         "addchild": true,
    //       }
    //     ]
    //   }
    // ]
    let b = await JSON.stringify(a, null, 2);
    console.log(b)
}


tojs();