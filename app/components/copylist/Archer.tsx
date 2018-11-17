import { get } from 'clean-text-utils';
import * as React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { getDirNameFromFilepath } from '../../api/FileUtil';
import { ICopyList } from '../../definitions/copylist';
import { kDirectoryPrimary, kDirectorySecondary } from '../../utils/config';

const rootStyle = { display: 'flex', justifyContent: 'center' };
const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between' };
const boxStyle = { padding: '10px', border: '1px solid black' };

interface IArcherDiagramProps {
    copy_list: ICopyList[];
}

interface IArcherCopyListEntry {
    dest_dir_name: string;
    dest_file_name: string;
    dest_xml_dir_name: string;
    dir_name: string;
    filename: string;
    type: string;
    xml_dir_name: string;
}

// interface IArcherDiagramState {}

const ElementNames = {
    ROOT: 'root',
};

export default class ArcherDiagram extends React.Component<IArcherDiagramProps, {}> {
    constructor(props: IArcherDiagramProps) {
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

    public parseCopyListEntry(copy_list: ICopyList): IArcherCopyListEntry {
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

    public prepareCopyList(copy_list: ICopyList[]): { copy_list: IArcherCopyListEntry[], target_dir: string } {
        if (!copy_list || copy_list.length === 0) { return { copy_list: [], target_dir: '' }; }
        return {
            copy_list: copy_list.map(this.parseCopyListEntry),
            target_dir: this.getTargetDirName(copy_list),
        };
    }

    // public buildArcherDirs() {

    // }

    public render() {
        // const copy_list = this.props.copy_list;
        // const copy_list = this.prepareCopyList(copy_list_stock);

        return (
            <div>
                <ArcherContainer strokeColor="green" >
                    {/* I want to see... a directory, with the files under it */}
                    {/* And the XML files! */}
                    <div style={rootStyle}>
                        <ArcherElement
                            id={ElementNames.ROOT}
                            relations={[{
                                from: { anchor: 'bottom' },
                                to: { anchor: 'top', id: 'element2' },
                            }]}
                        >
                            <div style={boxStyle}>Scenes</div>
                        </ArcherElement>
                    </div>

                    <div style={rowStyle}>
                        <ArcherElement
                            id="element2"
                            relations={[{
                                from: { anchor: 'right' },
                                label: <div style={{ marginTop: '-20px' }}>Arrow 2</div>,
                                to: { anchor: 'left', id: 'element3' },
                            }]}
                        >
                            <div style={boxStyle}>Element 2</div>
                        </ArcherElement>

                        <ArcherElement id="element3">
                            <div style={boxStyle}>Element 3</div>
                        </ArcherElement>

                        <ArcherElement
                            id="element4"
                            relations={[{
                                from: { anchor: 'left' },
                                label: 'Arrow 3',
                                to: { anchor: 'right', id: 'root' },
                            }]}
                        >
                            <div style={boxStyle}>Element 4</div>
                        </ArcherElement>
                    </div>
                </ArcherContainer>

            </div>
        );
    }
}

// const copy_list_stock: ICopyList[] = [
//     {
//         copying: false,
//         created_date: '2016-10-02T12:18:27',
//         dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/A_C0001.MP4',
//         dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/A_C0001M01.XML',
//         device_manufacturer: 'Sony',
//         dir: '/Users/davisford/Documents/arborist-v2/vids/A',
//         done: false,
//         done_xml: false,
//         duration_mins: 5.67,
//         filename: 'C0001.MP4',
//         filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0001.MP4',
//         filesize_gb: 3.99253254,
//         fps: 30,
//         index: 0,
//         model_name: 'ILCE-7SM2',
//         scene_index: 1,
//         type: 'dir-primary',
//         xml_filename: 'C0001M01.XML',
//         xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0001M01.XML',
//     },
//     {
//         copying: false,
//         created_date: '2016-10-02T12:17:22',
//         dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/D_C0001.MP4',
//         dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_1/D_C0001M01.XML',

//         device_manufacturer: 'Sony',
//         dir: '/Users/davisford/Documents/arborist-v2/vids/D',

//         done: false,
//         done_xml: false,
//         duration_mins: 6.53,
//         filename: 'C0001.MP4',
//         filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0001.MP4',
//         filesize_gb: 4.535319882,
//         fps: 30,
//         index: 0,
//         model_name: 'ILCE-7SM2',
//         scene_index: 1,
//         type: 'dir-secondary',
//         xml_filename: 'C0001M01.XML',
//         xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0001M01.XML',
//     },
//     {
//         copying: false,
//         created_date: '2016-10-02T12:30:46',
//         dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/A_C0002.MP4',
//         dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/A_C0002M01.XML',

//         device_manufacturer: 'Sony',
//         dir: '/Users/davisford/Documents/arborist-v2/vids/A',

//         done: false,
//         done_xml: false,
//         duration_mins: 6.69,
//         filename: 'C0002.MP4',
//         filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0002.MP4',
//         filesize_gb: 4.74330734,
//         fps: 30,
//         index: 1,
//         model_name: 'ILCE-7SM2',
//         scene_index: 2,
//         type: 'dir-primary',
//         xml_filename: 'C0002M01.XML',
//         xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/A/C0002M01.XML',
//     },
//     {
//         copying: false,
//         created_date: '2016-10-02T12:29:57',
//         dest: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/D_C0002.MP4',
//         dest_xml: '/Users/davisford/Documents/arborist-v2/vids/Scenes/Scene_2/D_C0002M01.XML',
//         device_manufacturer: 'Sony',
//         dir: '/Users/davisford/Documents/arborist-v2/vids/D',

//         done: false,
//         done_xml: false,
//         duration_mins: 7.54,
//         filename: 'C0002.MP4',
//         filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0002.MP4',
//         filesize_gb: 5.33235996,
//         fps: 30,
//         index: 1,
//         model_name: 'ILCE-7SM2',
//         scene_index: 2,
//         type: 'dir-secondary',
//         xml_filename: 'C0002M01.XML',
//         xml_filepath: '/Users/davisford/Documents/arborist-v2/vids/D/C0002M01.XML',
//     },
// ];
