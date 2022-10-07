import {ReactComponent as Search} from '../svg/search.svg';
import {Button, Form} from 'react-bootstrap';
import '../css/Header.css';

function SearchForm ({searchProducts, setSearchParams}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchParams({search: query})
        searchProducts(query);
    }
    return <>
        <Form onSubmit={handleSubmit} className='my-5 mx-2 d-flex position-relative'>
            <Form.Control
                className='border-success'
                style={{paddingRight: '3rem'}}
                type='search' name='search'
                placeholder='Пошук' />
                <input type="submit" value="Search" className='d-none' />
            <Button variant='success' type='submit' className='position-absolute border-0' style={{left: '12.1rem'}}><Search /></Button>
        </Form>
    
    </>
}

export default SearchForm;