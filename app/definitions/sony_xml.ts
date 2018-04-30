
export interface IParsedSonyXMLObject {
    created_date: string;
    device_manufacturer: string;
    duration_mins: number;
    fps: number;
    model_name: string;
}

export interface ISonyXMLObj {
    NonRealTimeMeta: {
        Duration: [{
            $: {
                value: string;      // e.g. '11760'
            },
        }],
        LtcChangeTable: [{
            $: {
                tcFps: string;      // e.g. '30'
                halfStep: string;   // e.g. 'false'
            },
        }],
        CreationDate: [{
            $: {
                value: string;      // e.g. 2016-10-02T12:29:57-05:00
            },
        }],
        Device: [{
            $: {
                manufacturer: string;   // 'Sony'
                modelName: string;      // e.g. 'ILCE-7SM2'
                serialNo: string;       // e.g. '4294967295'
            },
        }],
    };
}
