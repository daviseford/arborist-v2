import { get } from 'clean-text-utils';
import _ = require('lodash');
import * as React from 'react';
import * as Tree from 'react-tree-graph';
import { getDirNameFromFilepath } from '../../api/FileUtil';
import { ICopyList } from '../../definitions/copylist';
import { kDirectoryPrimary, kDirectorySecondary } from '../../utils/config';

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

interface ITreeGraphState {
    data: { [key: string]: any };
}

// const ElementNames = {
//     ROOT: 'root',
// };

export default class TreeGraph extends React.Component<ITreeGraphProps, ITreeGraphState> {
    constructor(props: ITreeGraphProps) {
        super(props);

        this.state = {
            data: { name: 'Scenes', children: [] },
        };
        this.parseCopyListEntry = this.parseCopyListEntry.bind(this);
        this.getTargetDirName = this.getTargetDirName.bind(this);
        this.getDest = this.getDest.bind(this);
        this.prepareCopyList = this.prepareCopyList.bind(this);
        this.buildD3Data = this.buildD3Data.bind(this);
    }

    public componentDidMount() {
        if (this.props.copy_list) {
            this.setState({ data: this.buildD3Data() });
        }
    }

    public componentDidUpdate(prevProps) {
        if (this.props.copy_list.length !== prevProps.copy_list.length) {
            this.setState({ data: this.buildD3Data() });
        }
    }

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
        const cp_obj = this.prepareCopyList(this.props.copy_list);
        if (cp_obj.copy_list.length === 0) { return {}; }
        const target_dir_name: string = this.getTargetDirName(this.props.copy_list);
        // tslint:disable-next-line:max-line-length
        const other_dir_names: string[] = _.uniq(cp_obj.copy_list.map(x => x.dir_name)).filter(x => x !== target_dir_name);

        // Build the source files
        const folders = [target_dir_name, ...other_dir_names].map((name: string) => {
            const dir_child: { [key: string]: any } = {
                children: cp_obj.copy_list
                    .filter(x => x.dir_name === name).map(file => ({ name: file.dest_file_name })),
                name,
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
        return (
            <div>
                <Tree
                    data={this.state.data}
                    height={400}
                    width={400}
                    animated={true}
                // svgProps={{
                //     // className: 'custom',
                // }}
                />
            </div>
        );
    }
}
