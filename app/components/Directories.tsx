import * as React from 'react';
import { IDirectoryProps } from '../containers/DirectoriesPage';

export default class Directories extends React.Component<IDirectoryProps, {}> {
    constructor(pProps) {
        super(pProps);
    }

    public render() {
        console.log(this.props);
        // https://stackoverflow.com/questions/4852017/how-to-initialize-an-arrays-length-in-javascript
        // const cam_num = Array.from(Array(this.props.camera.number));
        return (
            <div>
                {/* {cam_num.map()} */}

            </div>
        );
    }
}

// interface IDirectoryCardProps {

// }

// class DirectoryCard extends React.PureComponent<IDirectoryCardProps, any> {
//   public render() {
//     return (
//       <div>

//       </div>
//     );
//   }
// }
