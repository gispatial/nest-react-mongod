/// <reference types="react" />
import PropTypes from 'prop-types';
declare const TitleForRecord: {
    ({ defaultTitle, record, title }: {
        defaultTitle: any;
        record: any;
        title: any;
    }): JSX.Element;
    propTypes: {
        defaultTitle: PropTypes.Requireable<any>;
        record: PropTypes.Requireable<object>;
        title: PropTypes.Requireable<string | PropTypes.ReactElementLike>;
    };
};
export default TitleForRecord;
