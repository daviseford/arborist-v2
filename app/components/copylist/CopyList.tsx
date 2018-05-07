
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ICopyListPageProps } from '../../containers/CopyListPage';
import { IBasicSorterEntry } from '../../definitions/sony_xml';
import { kRoutes } from '../../utils/config';
import { getBasicSorterEntries_Sony, parseBasicSorterEntries } from './helpers/sony';

export default class CopyList extends React.Component<ICopyListPageProps, {}> {
    constructor(pProps) {
        super(pProps);
        this.getSonyXMLObjs = this.getSonyXMLObjs.bind(this);
    }

    // public parseAllXML(xml_array, callback) {
    //     async.map(xml_array, parseXMLObj, (err, results) => {
    //       if (err) { return callback(err); }
    //       callback(null, results);
    //     });
    //   }

    public componentDidMount() {
        this.getSonyXMLObjs();
    }

    public async getSonyXMLObjs() {
        const res = this.props.directories.reduce((a: IBasicSorterEntry[], b) => {
            const entries = getBasicSorterEntries_Sony(b);
            entries.forEach(e => a.push(e));
            return a;
        }, []);

        console.log('res', res);

        const a = parseBasicSorterEntries(res);
        console.log('a',a);

    }

    public render() {
    console.log(this.props);
    return (
        <div className="container">
            <div className="row justify-content-center">

            </div>

            <div className="row justify-content-center">
                <div className="btn-group" role="group" aria-label="back button">
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
