
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ICopyListPageProps } from '../../containers/CopyListPage';
import { kRoutes } from '../../utils/config';

export default class CopyList extends React.Component<ICopyListPageProps, {}> {
    constructor(pProps) {
        super(pProps);

    }

    public render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="row justify-content-center">

                </div>

                <div className="row justify-content-center">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <BackButton />
                    </div>
                </div>

            </div>
        );
    }
}

// interface INextButtonProps {
//     directories: IDirState[];
// }

// class NextButton extends React.PureComponent<INextButtonProps, {}> {
//     public render() {
//         const showButton = this.props.directories.every(x => x.files && x.files.length > 0);
//         console.log(this.props.directories, showButton);
//         return (
//             showButton ?
//                 <Link className="btn btn-success m-2" to={kRoutes.ARBORIST} >
//                     Next <i className="fa fa-pagelines" aria-hidden="true"></i>
//                 </Link>
//                 : null
//         );
//     }
// }

class BackButton extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <Link className="btn btn-light m-2" to={kRoutes.DIRECTORIES} >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>  Back
            </Link>
        );
    }
}
