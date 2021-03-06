import PropTypes from 'prop-types';
/**
 * Common PropTypes for all react-admin inputs
 */
declare const InputPropTypes: {
    label: PropTypes.Requireable<string>;
    resource: PropTypes.Requireable<string>;
    source: PropTypes.Requireable<string>;
};
export default InputPropTypes;
