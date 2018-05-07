
import * as React from 'react';
import { Link } from 'react-router-dom';
import { batchUpdateCopyList } from '../../actions/copy_list_actions';
import { ICopyListPageProps } from '../../containers/CopyListPage';
import { IBasicSorterEntry } from '../../definitions/sony_xml';
import { kRoutes } from '../../utils/config';
import { getBasicSorterEntries_Sony, parseBasicSorterEntries, processUpdatedXMLArray } from './helpers/sony';

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
        const basicSorterEntries = this.props.directories.reduce((accum: IBasicSorterEntry[], dir) => {
            const entries = getBasicSorterEntries_Sony(dir);
            entries.forEach(e => accum.push(e));
            return accum;
        }, []);
        const sorterEntries = parseBasicSorterEntries(basicSorterEntries);
        // At this point, we've got the XML objects for the copy list
        // push them out to state/copylist
        const copy_list = processUpdatedXMLArray(sorterEntries, this.props.directories, this.props.destination);
        console.log('copy_list', copy_list);
        this.props.dispatch(batchUpdateCopyList(copy_list));

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
