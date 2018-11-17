import { get } from 'clean-text-utils';
import _ = require('lodash');
import * as React from 'react';
import * as Tree from 'react-tree-graph';
import { getDirNameFromFilepath } from '../../api/FileUtil';
import { ICopyList } from '../../definitions/copylist';
import { kDirectoryPrimary, kDirectorySecondary } from '../../utils/config';

// tslint:disable:object-literal-sort-keys
// const data = {
//     name: 'Parent',
//     children: [{
//         name: 'Child One',
//         children: [{
//             name: 'Child Three One',
//         }, {
//             name: 'Child Four One',
//         }],
//     }, {
//         name: 'Child Two',
//     }],
// };

interface ITreeGraphProps {
    copy_list: ICopyList[];
}

interface ITreeGraphCopyListEntry {
    dest_dir_name: string;
    dest_file_name: string;
    dest_xml_dir_name: string;
    dir_name: string;
    filename: string;
    type: string;
    xml_dir_name: string;
}

// const ElementNames = {
//     ROOT: 'root',
// };

export default class TreeGraph extends React.Component<ITreeGraphProps, {}> {
    constructor(props: ITreeGraphProps) {
        super(props);

        this.state = {
        };
        this.parseCopyListEntry = this.parseCopyListEntry.bind(this);
    }

    // public componentDidMount() {

    // }

    public getTargetDirName(copy_list: ICopyList[]): string {
        try {
            const res = copy_list.find(x => x.type === kDirectoryPrimary);
            if (!res) { return ''; }
            return getDirNameFromFilepath(res.filepath);
        } catch (err) {
            return '';
        }
    }

    public getDest(copy_list: ICopyList[]): string {
        try {
            const res = copy_list.find(x => x.type === kDirectoryPrimary);
            if (!res) { return ''; }
            return getDirNameFromFilepath(res.filepath);
        } catch (err) {
            return '';
        }
    }

    public parseCopyListEntry(copy_list: ICopyList): ITreeGraphCopyListEntry {
        return {
            dest_dir_name: getDirNameFromFilepath(copy_list.dest),
            dest_file_name: get.filename(copy_list.dest),
            dest_xml_dir_name: getDirNameFromFilepath(copy_list.dest_xml),
            dir_name: getDirNameFromFilepath(copy_list.filepath),
            filename: copy_list.filename,
            type: copy_list.type || kDirectorySecondary,
            xml_dir_name: getDirNameFromFilepath(copy_list.xml_filepath),
        };
    }

    public prepareCopyList(copy_list: ICopyList[]): { copy_list: ITreeGraphCopyListEntry[], target_dir: string } {
        if (!copy_list || copy_list.length === 0) { return { copy_list: [], target_dir: '' }; }
        return {
            copy_list: copy_list.map(this.parseCopyListEntry),
            target_dir: this.getTargetDirName(copy_list),
        };
    }

    public buildD3Data(): any {
        // const copy_list = this.props.copy_list;
        const res: any = { name: 'Scenes', children: [] };
        const copy_obj = this.prepareCopyList(copy_list_stock);
        if (copy_obj.copy_list.length === 0) { return {}; }
        const target_dir_name: string = this.getTargetDirName(copy_list_stock);
        // tslint:disable-next-line:max-line-length
        const other_dir_names: string[] = _.uniq(copy_obj.copy_list.map(x => x.dir_name)).filter(x => x !== target_dir_name);

        // Build the source files
        const folders = [target_dir_name, ...other_dir_names].map((name: string) => {
            const dir_child: { [key: string]: any } = {
                name,
                children: copy_obj.copy_list.filter(x => x.dir_name === name || x.dest_dir_name === name).map(file => {
                    return { name: file.dest_file_name };
                }),
            };
            if (name === target_dir_name) {
                dir_child.gProps = { className: 'red-node' };
            }
            return dir_child;
        });
        res.children = folders;
        return res;
    }

    public render() {
        // const copy_list = this.props.copy_list;
        const copy_data = this.buildD3Data();
        console.log(copy_data);
        return (
            <div>
                <Tree
                    data={copy_data}
                    height={400}
                    width={400}
                    animated={true}
                    svgProps={{
                        className: 'custom',
                    }}
                />
            </div>
        );
    }
}

const copy_list_stock: ICopyList[] = [
    {
        copying: false,
        created_date: '2016-10-02T12:18:27',
        dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/A_C0001.MP4',
        dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/A_C0001M01.XML',
        device_manufacturer: 'Sony',
        dir: '/Users/davisford/Documents/arborist-v2/vids/A',
        done: false,
        done_xml: false,
        duration_mins: 5.67,
        filename: 'C0001.MP4',
        filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0001.MP4',
        filesize_gb: 3.99253254,
        fps: 30,
        index: 0,
        model_name: 'ILCE-7SM2',
        scene_index: 1,
        type: 'dir-primary',
        xml_filename: 'C0001M01.XML',
        xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0001M01.XML',
    },
    {
        copying: false,
        created_date: '2016-10-02T12:17:22',
        dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/D_C0001.MP4',
        dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/D_C0001M01.XML',

        device_manufacturer: 'Sony',
        dir: '/Users/davisford/Documents/arborist-v2/vids/D',

        done: false,
        done_xml: false,
        duration_mins: 6.53,
        filename: 'C0001.MP4',
        filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0001.MP4',
        filesize_gb: 4.535319882,
        fps: 30,
        index: 0,
        model_name: 'ILCE-7SM2',
        scene_index: 1,
        type: 'dir-secondary',
        xml_filename: 'C0001M01.XML',
        xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0001M01.XML',
    },
    {
        copying: false,
        created_date: '2016-10-02T12:30:46',
        dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/A_C0002.MP4',
        dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/A_C0002M01.XML',

        device_manufacturer: 'Sony',
        dir: '/Users/davisford/Documents/arborist-v2/vids/A',

        done: false,
        done_xml: false,
        duration_mins: 6.69,
        filename: 'C0002.MP4',
        filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0002.MP4',
        filesize_gb: 4.74330734,
        fps: 30,
        index: 1,
        model_name: 'ILCE-7SM2',
        scene_index: 2,
        type: 'dir-primary',
        xml_filename: 'C0002M01.XML',
        xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0002M01.XML',
    },
    {
        copying: false,
        created_date: '2016-10-02T12:29:57',
        dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/D_C0002.MP4',
        dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/D_C0002M01.XML',
        device_manufacturer: 'Sony',
        dir: '/Users/davisford/Documents/arborist-v2/vids/D',

        done: false,
        done_xml: false,
        duration_mins: 7.54,
        filename: 'C0002.MP4',
        filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0002.MP4',
        filesize_gb: 5.33235996,
        fps: 30,
        index: 1,
        model_name: 'ILCE-7SM2',
        scene_index: 2,
        type: 'dir-secondary',
        xml_filename: 'C0002M01.XML',
        xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0002M01.XML',
    },
];
