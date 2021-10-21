import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './PostFiltersForm.scss'

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};
PostFiltersForm.defaultProps = {
    onSubmit: null,
}
function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    //tao cho no 1 gia tri khong thay doi
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);
        if (!onSubmit) return;

        //khi go thi se xoa timeout truoc do
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)         
        };


        //khi go 1 ky tu thi se doi 0.3s
        typingTimeoutRef.current= setTimeout(() => {
            const formValues = { searchTerm: value };
            onSubmit(formValues)            
        }, 300);

    }
    return (
        <form>
            <input
                type="text"
                value={searchTerm}
                onChange={ handleSearchTermChange}
            />
        </form>
    );
}

export default PostFiltersForm;