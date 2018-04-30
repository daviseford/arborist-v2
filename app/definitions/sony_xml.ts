export interface IBasicSorterEntry {
    dir: string;       // e.g. 'A'
    filename: string;  // e.g. 'C0002.MP4'
    filepath: string;  // full filepath on local computer
    xml_filename: string;  // the filename converted to XML format
    xml_filepath: string;  // the presumed location of the MP4's XML file
}

export interface ISorterEntry {
    dir: string;       // e.g. 'A'
    filename: string;  // e.g. 'C0002.MP4'
    filepath: string;  // full filepath on local computer
    xml_filename: string;  // the filename converted to XML format
    xml_filepath: string;  // the presumed location of the MP4's XML file
    filesize_gb: number;
    created_date: string;
    device_manufacturer: string;
    duration_mins: number;
    fps: number;
    model_name: string;
}

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
        RecordingMode: [IRecordingMode],
        AudioFormat: [IAudioFormat],
        VideoFormat: [IVideoFormat],
    };
}

interface IRecordingMode {
    $: {
        cacheRec: string;   // e.g. 'false'
        type: string;       // e.g. 'normal'
    };
}
interface IAudioFormat {
    $: {
        numOfChannel: string;       // e.g. '2'
    };
    AudioRecFormat: [{
        $: {
            audioCodec: string;     // e.g. 'LPCM16'
            port: string;           // e.g. 'DIRECT'
            trackDst: string;       // e.g. 'CH1'
        },
    }];
}

interface IVideoFormat {
    VideoFrame: [{
        $: {
            videoCodec: string;     // 'AVC_3840_2160_HP@L51'
            captureFps: string;     // '29.97p'
            formatFps: string;      // '29.97p'
        };
    }];
    VideoRecPort: [{ $: { port: string; } }]; // 'DIRECT'
    VideoLayout: [{
        $: {
            pixel: string;              // '3840'
            numOfVerticalLine: string;  // '2160'
            aspectRatio: string;        // '16:9'
        };
    }];
}
